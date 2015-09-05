

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
      sound.loadFromBuffer(this.source.buffer);
      sound.volume = this.volume;
      return sound;
    },

    play: function() {
      var context = this.context;
      // play
      this.source.start(context.currentTime);

      // cache play end
      var time = (this.source.buffer.duration/this.source.playbackRate.value)*1000;
      window.setTimeout(function(self) {
        self.flare('ended');
      }, time, this);

      return this;
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
      var source = context.createBufferSource();
      source.buffer = buffer;
      this.source = source;

      // connect
      this.source.connect(context.destination);
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

        var context = null;

        if (phina.global.AudioContext) {
            context = new AudioContext();
        }
        else if (phina.global.webkitAudioContext) {
            context = new webkitAudioContext();
        }
        else if (phina.global.mozAudioContext) {
            context = new mozAudioContext();
        }

        return context;
      })(),
    },

  });

});

