

phina.namespace(function() {

  /**
   * @class phina.asset.Sound
   * 
   */
  phina.define('phina.asset.Sound', {
    superClass: "phina.asset.Asset",

    /**
     * @constructor
     */
    init: function() {
      this.superInit();
      this.context = phina.asset.Sound.audioContext;
    },

    /**
     * 複製
     */
    clone: function() {
      var sound = phina.asset.Sound();
      sound.loadFromBuffer(this.buffer);
      sound.volume = this.volume;
      return sound;
    },

    play: function() {
      if (this.source) {
        // TODO: キャッシュする？
      }

      this.source = this.context.createBufferSource();
      this.source.buffer = this.buffer;
      // connect
      this.source.connect(this.context.destination);
      // play
      this.source.start(0);

      // check play end
      if (this.source.buffer) {
        var time = (this.source.buffer.duration/this.source.playbackRate.value)*1000;
        window.setTimeout(function(self) {
          self.flare('ended');
        }, time, this);
      }

      return this;
    },

    stop: function() {
      this.source.stop();
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

    _load: function(r) {
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
              console.warn("音声ファイルのデコードに失敗しました。(" + src + ")");
              self.loaded = true;
              r(self);
            });
          }
        }
      };

      xml.responseType = 'arraybuffer';
      xml.send(null);
    },

    _static: {
      audioContext: (function() {
        if (phina.isNode()) return null;

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

        return context;
      })(),
    },

  });

});

