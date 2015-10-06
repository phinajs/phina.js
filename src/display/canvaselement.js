
phina.namespace(function() {

  /**
   * @class phina.display.CanvasElement
   * 
   */
  phina.define('phina.display.CanvasElement', {
    superClass: 'phina.app.Object2D',

    /** 表示フラグ */
    visible: true,

    /** 子供を 自分のCanvasRenderer で描画するか */
    renderChildBySelf: false,

    init: function(options) {
      options = (options || {});
      
      this.superInit();

      this.visible = true;
      this.alpha = 1.0;
      this._worldAlpha = 1.0;

      this.width = options.width || 64;
      this.height = options.height || 64;
    },

    /**
     * 表示/非表示をセット
     */
    setVisible: function(flag) {
      this.visible = flag;
      return this;
    },

    /**
     * 表示
     */
    show: function() {
      this.visible = true;
      return this;
    },

    /**
     * 非表示
     */
    hide: function() {
      this.visible = false;
      return this;
    },

    /**
     * @private
     */
    _calcWorldAlpha: function() {
      if (!this.parent) {
        this._worldAlpha = this.alpha;
        return ;
      }
      else {
        var worldAlpha = (this.parent._worldAlpha !== undefined) ? this.parent._worldAlpha : 1.0; 
        // alpha
        this._worldAlpha = worldAlpha * this.alpha;
      }
    },
  });

});

