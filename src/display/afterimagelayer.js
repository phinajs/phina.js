
phina.namespace(function () {

  /**
   * @class
   */
  phina.define('phina.display.AfterimageLayer', {
    superClass: 'phina.display.Layer',

    // 残像が描画される
    afterimage: null,

    _dummyCanvas: null,
    _renderer: null,
    _dummyElement: null,

    /**
     * 1フレームでどのぐらい薄くするか
     * 0.499 以上にすると永久に rate に応じた不透明度で残り続ける
     * 0.9 以下ならそこまで永久に残る残像は目立たない
     */
    rate: 0.8,

    // sceneに描画するか
    isDrawing: true,

    childrenVisible: false,

    init: function (width, height) {
      this.superInit({
        width: width,
        height: height
      });


      var after = this.afterimage = this.canvas;
      var dummy = this._dummyCanvas = phina.graphics.Canvas();

      this.width = dummy.width = after.width
      this.height = dummy.height = after.height;

      this._renderer = phina.display.CanvasRenderer(dummy);
      this._dummyElement = phina.display.CanvasElement();
      this._dummyElement.children = this.children;

    },

    draw: function (canvas) {
      var after = this.afterimage;
      var element = after.canvas;

      var w = after.width, h = after.height;
      var c = after.context;
      var dummy = this._dummyCanvas;

      var dummyContext = dummy.context;

      dummyContext.clearRect(0, 0, w, h);
      dummyContext.globalAlpha = this.rate;
      dummyContext.drawImage(element, 0, 0, w, h, 0, 0, w, h);

      dummyContext.save();
      this._renderer.renderObject(this._dummyElement);
      dummyContext.restore();


      c.clearRect(0, 0, w, h);
      c.drawImage(dummy.canvas, 0, 0, w, h, 0, 0, w, h);

      if (this.isDrawing) canvas.context.drawImage(element, 0, 0, w, h, 0, 0, w, h);
    },


    /**
     * 残像をクリア
     */
    clear: function () {
      this.afterimage.clear();
      return this;
    },

    setRate: function (rate) {
      this.rate = rate;
      return this;
    },

    /**
     * 現時点での残像をコピーした画像を返す
     */
    getImage: function () {
      var image = phina.graphics.Canvas();
      var w = image.width = this.width;
      var h = image.height = this.height;
      image.context.drawImage(this.afterimage.canvas, 0, 0, w, h, 0, 0, w, h);
      return image;
    }

  });
});
