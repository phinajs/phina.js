/*
 *
 */


phina.namespace(function() {

  /**
   * @class phina.graphics.CanvasRecorder
   * Reference <https://github.com/jnordberg/gif.js/>
   * @extends phina.util.EventDispatcher
   */
  phina.define('phina.graphics.CanvasRecorder', {

    superClass: 'phina.util.EventDispatcher',

    _id: null,
    objectURL: null,

    init: function(canvas, options) {
      this.superInit();

      this.canvas = canvas;

      this.gif = new GIF((options || {}).$safe({
        workers: 4,
        quality: 10,
        width: canvas.width,
        height: canvas.height,
      }));

      this.gif.on('finished', function(blob) {
        this.objectURL = URL.createObjectURL(blob);
        this.flare('finished');
      }.bind(this));
    },

    /**
     * key と value はアクセサを参照
     */
    setOption: function(key, value) {
      this.gif.setOption(key, value);
      return this;
    },

    /**
     * key と value はアクセサを参照
     */
    setOptions: function(options) {
      this.gif.setOptions(options);
      return this;
    },

    start: function(fps, recordingTime) {
      fps = fps || 30;
      recordingTime = recordingTime || 2000;
      var frameTime = 1000 / fps;
      var time = 0;
      this._id = setInterval(function() {
        var ctx = this.canvas.context;
        this.gif.addFrame(ctx, {
          copy: true,
          delay: frameTime,
        });

        time += frameTime;

        if (time > recordingTime) {
          this.stop();
        }
      }.bind(this), frameTime);

      return this;
    },

    stop: function() {
      if (this._id === null) return this;
      clearInterval(this._id);

      // レンダリング
      this.gif.render();
      this._id = null;
      return this;
    },

    open: function() {
      window.open(this.objectURL);
    },

    _accessor: {

      width: {
        get: function() {
          return this.gif.options.width || this.canvas.width;
        },
        set: function(width) {
          this.setOption('width', width);
        },
      },

      height: {
        get: function() {
          return this.gif.options.height || this.canvas.height;
        },
        set: function(height) {
          this.setOption('height', height);
        },
      },

      // GIF のクオリティ。低いほどハイクオリティ
      quality: {
        get: function() {
          return this.gif.options.quality;
        },
        set: function(quality) {
          this.setOption('quality', quality);
        },
      },

      // Worker の URL デフォルトで gif.worker.js
      workerScript: {
        get: function() {
          return this.gif.options.workerScript;
        },
        set: function(workerScript) {
          this.setOption('workerScript', workerScript);
        },
      },

      // 起動する Worker の数
      workers: {
        get: function() {
          return this.gif.options.workers;
        },
        set: function(workers) {
          this.setOption('workers', workers);
        },
      },

      // ループするか 0 でループ -1 でループしない
      repeat: {
        get: function() {
          return this.gif.options.repeat;
        },
        set: function(repeat) {
          this.setOption('repeat', repeat);
        },
      },

      // true で ループ false でループしない
      loop: {
        get: function() {
          return this.gif.options.repeat === 0;
        },
        set: function(loop) {
          this.setOption('repeat', loop ? 0 : -1);
        },
      },

      // 透過する色 ? transparent hex color, 0x00FF00 = green
      transparent: {
        get: function() {
          return this.gif.options.transparent;
        },
        set: function(transparent) {
          this.setOption('transparent', transparent);
        },
      },

      // background color where source image is transparent
      background: {
        get: function() {
          return this.gif.options.background;
        },
        set: function(background) {
          this.setOption('background', background);
        },
      },
    }
  });


});
