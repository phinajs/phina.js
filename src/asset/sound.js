

phina.namespace(function() {

  /**
   * @class phina.asset.Sound
   * @extends phina.asset.Asset
   */
  phina.define('phina.asset.Sound', {
    superClass: "phina.asset.Asset",
    
    _loop: false,
    _loopStart: 0,
    _loopEnd: 0,
    _playbackRate: 1,
    
    /**
     * @constructor
     */
    init: function() {
      this.superInit();
      this.context = phina.asset.Sound.getAudioContext();
      this.gainNode = this.context.createGain();
    },

    play: function(when, offset, duration) {
      when = when ? when + this.context.currentTime : 0;
      offset = offset || 0;

      if (this.source) {
        // TODO: キャッシュする？
      }

      var source = this.source = this.context.createBufferSource();
      var buffer = source.buffer = this.buffer;
      source.loop = this._loop;
      source.loopStart = this._loopStart;
      source.loopEnd = this._loopEnd;
      source.playbackRate.value = this._playbackRate;

      // connect
      source.connect(this.gainNode);
      this.gainNode.connect(phina.asset.Sound.getMasterGain());
      // play
      if (duration !== undefined) {
        source.start(when, offset, duration);
      }
      else {
        source.start(when, offset);
      }
      
      // check play end
      source.addEventListener('ended', function(){
        this.flare('ended');
      }.bind(this));

      return this;
    },

    stop: function() {
      // stop
      if (this.source) {
        // stop すると source.endedも発火する
        this.source.stop && this.source.stop(0);
        this.source = null;
        this.flare('stop');
      }

      return this;
    },

    pause: function() {
      this.source.playbackRate.value = 0;
      this.flare('pause');
      return this;
    },

    resume: function() {
      this.source.playbackRate.value = this._playbackRate;
      this.flare('resume');
      return this;
    },

    // 試してみるなう
    _oscillator: function(type) {
      var context = this.context;

      var oscillator = context.createOscillator();

      // Sine wave is type = “sine”
      // Square wave is type = “square”
      // Sawtooth wave is type = “saw”
      // Triangle wave is type = “triangle”
      // Custom wave is type = “custom” 
      oscillator.type = type || 'sine';

      this.source = oscillator;
      // connect
      this.source.connect(context.destination);
    },

    loadFromBuffer: function(buffer) {
      var context = this.context;

      // set default buffer
      if (!buffer) {
        buffer = context.createBuffer( 1, 44100, 44100 );
        var channel = buffer.getChannelData(0);

        for( var i=0; i < channel.length; i++ )
        {
          channel[i] = Math.sin( i / 100 * Math.PI);
        }
      }

      // source
      this.buffer = buffer;
    },

    setLoop: function(loop) {
      this.loop = loop;
      return this;
    },
    setLoopStart: function(loopStart) {
      this.loopStart = loopStart;
      return this;
    },
    setLoopEnd: function(loopEnd) {
      this.loopEnd = loopEnd;
      return this;
    },
    
    setPlaybackRate: function(playbackRate) {
      this.playbackRate = playbackRate;
      return this;
    },

    _load: function(r) {
      if (/^data:/.test(this.src)) {
        this._loadFromURIScheme(r);
      }
      else {
        this._loadFromFile(r);
      }
    },

    _loadFromFile: function(r) {
      var self = this;

      var xml = new XMLHttpRequest();
      xml.open('GET', this.src);
      xml.onreadystatechange = function() {
        if (xml.readyState === 4) {
          if ([200, 201, 0].indexOf(xml.status) !== -1) {

            // 音楽バイナリーデータ
            var data = xml.response;

            // webaudio 用に変換
            self.context.decodeAudioData(data, function(buffer) {
              self.loadFromBuffer(buffer);
              r(self);
            }, function() {
              console.warn("音声ファイルのデコードに失敗しました。(" + self.src + ")");
              r(self);
              self.flare('decodeerror');
            });

          } else if (xml.status === 404) {
            // not found

            self.loadError = true;
            self.notFound= true;
            r(self);
            self.flare('loaderror');
            self.flare('notfound');

          } else {
            // サーバーエラー

            self.loadError = true;
            self.serverError = true;
            r(self);
            self.flare('loaderror');
            self.flare('servererror');
          }
        }
      };

      xml.responseType = 'arraybuffer';

      xml.send(null);
    },

    _loadFromURIScheme: function(r) {
      var byteString = '';
      if (this.src.split(',')[0].indexOf('base64') >= 0) {
        byteString = atob(this.src.split(',')[1]);
      }
      else {
        byteString = unescape(this.src.split(',')[1]);
      }

      var self = this;
      var len = byteString.length;
      var buffer = new Uint8Array(len);

      for (var i=0; i<len; ++i) {
        buffer[i] = byteString.charCodeAt(i);
      }

      // webaudio 用に変換
      this.context.decodeAudioData(buffer.buffer, function(buffer) {
        self.loadFromBuffer(buffer);
        r(self);
      }, function() {
        console.warn("音声ファイルのデコードに失敗しました。(" + self.src + ")");
        self.loaded = true;
        r(self);
      });
    },

    loadDummy: function() {
      this.loadFromBuffer();
    },

    _accessor: {
      volume: {
        get: function()  { return this.gainNode.gain.value; },
        set: function(v) { this.gainNode.gain.value = v; },
      },
      loop: {
        get: function()  { return this._loop; },
        set: function(v) {
          this._loop = v;
          if (this.source) this.source._loop = v;
        },
      },
      loopStart: {
        get: function()  { return this._loopStart; },
        set: function(v) {
          this._loopStart = v;
          if (this.source) this.source._loopStart = v;
        },
      },
      loopEnd: {
        get: function()  { return this._loopEnd; },
        set: function(v) {
          this._loopEnd = v;
          if (this.source) this.source._loopEnd = v;
        },
      },
      playbackRate: {
        get: function() { return this._playbackRate; },
        set: function(v) {
          this._playbackRate = v;
          if(this.source && this.source.playbackRate.value !== 0){
            this.source.playbackRate.value = v;
          }
        },
      }
    },

    _defined: function() {
      this.accessor('volume', {
        get: function() {
          return this.getMasterGain().gain.value;
        },
        set: function(v) {
          this.getMasterGain().gain.value = v;
        },
      });
      
    },
    
    _static: {
      
      getMasterGain: function() {
        if(!this._masterGain) {
          var context = this.getAudioContext();
          this._masterGain = context.createGain();
          this._masterGain.connect(context.destination);
        }
        return this._masterGain;
      },
      
      getAudioContext: function() {
        if (!phina.util.Support.webAudio) return null;

        if (this.context) return this.context;

        var g = phina.global;
        var context = null;

        if (g.AudioContext) {
          context = new AudioContext();
        }
        else if (g.webkitAudioContext) {
          context = new webkitAudioContext();
        }
        else if (g.mozAudioContext) {
          context = new mozAudioContext();
        }

        this.context = context;

        return context;
      },
    },

  });

});

