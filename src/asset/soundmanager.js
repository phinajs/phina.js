phina.namespace(function() {

  /**
   * @class phina.asset.SoundManager
   * ### Ref
   * - http://evolve.reintroducing.com/_source/classes/as3/SoundManager/SoundManager.html
   * - https://github.com/nicklockwood/SoundManager
   */
  phina.define('phina.asset.SoundManager', {
    _static: {
      volume: 0.8,
      musicVolume: 0.8,
      muteFlag: false,
      currentMusic: null,

      play: function(name, when, offset, duration) {
        var sound = phina.asset.AssetManager.get('sound', name);

        sound.volume = this.getVolume();
        sound.play(when, offset, duration);

        return sound;
      },

      stop: function() {
        // TODO: 
      },
      pause: function() {
        // TODO: 
      },
      fade: function() {
        // TODO: 
      },
      setVolume: function(volume) {
        this.volume = volume;
      },
      getVolume: function() {
        return this.volume;
      },

      /*
       * ミュート
       */
      mute: function() {
        this.muteFlag = true;
        if (this.currentMusic) {
          this.currentMusic.volume = 0;
        }
        return this;
      },
      /*
       * ミュート解除
       */
      unmute: function() {
        this.muteFlag = false;
        if (this.currentMusic) {
          this.currentMusic.volume = this.getVolumeMusic();
        }
        return this;
      },
      isMute: function() {
        return this.muteFlag;
      },

      playMusic: function(name, fadeTime, loop, when, offset, duration) {
        loop = (loop !== undefined) ? loop : true;

        if (this.currentMusic) {
          this.stopMusic(fadeTime);
        }

        var music = phina.asset.AssetManager.get('sound', name);

        music.setLoop(loop);
        music.play(when, offset, duration);

        if (fadeTime > 0) {
          var count = 32;
          var counter = 0;
          var unitTime = fadeTime/count;
          var volume = this.getVolumeMusic();

          music.volume = 0;
          var id = setInterval(function() {
            counter += 1;
            var rate = counter/count;
            music.volume = rate*volume;

            if (rate >= 1) {
              clearInterval(id);
              return false;
            }

            return true;
          }, unitTime);
        }
        else {
          music.volume = this.getVolumeMusic();
        }

        this.currentMusic = music;

        return this.currentMusic;
      },

      stopMusic: function(fadeTime) {
        if (!this.currentMusic) { return ; }

        var music = this.currentMusic;
        this.currentMusic = null;

        if (fadeTime > 0) {
          var count = 32;
          var counter = 0;
          var unitTime = fadeTime/count;
          var volume = this.getVolumeMusic();

          music.volume = 0;
          var id = setInterval(function() {
            counter += 1;
            var rate = counter/count;
            music.volume = volume*(1-rate);

            if (rate >= 1) {
              music.stop();
              clearInterval(id);
              return false;
            }

            return true;
          }, unitTime);
        }
        else {
          music.stop();
        }
      },

      /*
       * 音楽を一時停止
       */
      pauseMusic: function() {
        if (!this.currentMusic) { return ; }
        this.currentMusic.pause();
      },
      /*
       * 音楽を再開
       */
      resumeMusic: function() {
        if (!this.currentMusic) { return ; }
        this.currentMusic.resume();
      },
      /*
       * 音楽のボリュームを設定
       */
      setVolumeMusic: function(volume) {
        this.musicVolume = volume;
        if (this.currentMusic) {
          this.currentMusic.volume = volume;
        }

        return this;
      },
      /*
       * 音楽のボリュームを取得
       */
      getVolumeMusic: function() {
        return this.musicVolume;
      },

    },
  });

});
