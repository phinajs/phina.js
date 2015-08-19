phina.namespace(function() {

  /**
   * @class phina.app.BaseApp
   * ベースとなるアプリケーションクラス
   */
  phina.define('phina.app.BaseApp', {
    superClass: 'phina.event.EventDispatcher',

    /** awake */
    awake: null,
    /** fps */
    fps: null,
    /** frame */
    frame: null,

    /**
     * @constructor
     */
    init: function(element) {
      this.superInit();
      this._scenes = [phina.app.Scene()];

      this.updater = phina.app.Updater(this);

      this.awake = true;
      this.ticker = phina.util.Ticker();
    },

    run: function() {
      var self = this;

      this.ticker.tick(function() {
        self._loop();
      });

      this.ticker.start();

      return this;
    },

    replaceScene: function(scene) {
      var e = null;
      if (this.currentScene) {
        this.flare('exit', {
          app: this
        });
        this.currentScene.app = null;
      }
      this.currentScene = scene;
      this.currentScene.app = this;
      this.flare('enter', {
        app: this,
      });

      return this;
    },

    _loop: function() {
      this._update();
      this._draw();
    },


    _update: function() {
      if (this.awake) {
        this.update && this.update();
        this.updater.update(this.currentScene);
      }
    },

    /**
     * 描画用仮想関数
     * @private
     */
    _draw: function() {},

    _accessor: {
      currentScene: {
        "get": function()   { return this._scenes[0]; },
        "set": function(v)  { this._scenes[0] = v; },
      },
    },

  });

  
});
