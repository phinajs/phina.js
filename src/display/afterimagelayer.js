
phina.namespace(function () {

  /**
   * @class
   */
  phina.define('phina.display.AfterimageLayer', {
    superClass: 'phina.display.Layer',

    // 残像が描画される
    afterimage: null,
    _dummyCanvas: null,
    renderer: null,

    /**
     * 1フレームでどのぐらい薄くするか
     * 0.499 以上にすると永久に rate に応じた不透明度で残り続ける
     * 0.9 以下ならそこまで永久に残る残像は目立たない
     */
    rate: 0.8,

    // 画質(0.01 ~ 1.0)下げると軽くなるはず
    _quality: 1.0,

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

      this.width = dummy.width = after.width;
      this.height = dummy.height = after.height;

      this.renderer.init(dummy);


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
      this.renderer.renderChildren(this);
      dummyContext.restore();


      c.clearRect(0, 0, w, h);
      c.drawImage(dummy.canvas, 0, 0, w, h, 0, 0, w, h);

      if (this.isDrawing) canvas.context.drawImage(element, 0, 0, w, h, 0, 0, w, h);
    },

    _drawByQuality: function (canvas) {
      var after = this.afterimage;
      var element = after.canvas;
      var w = after.width, h = after.height;
      var c = after.context;
      var dummy = this._dummyCanvas;
      var dw = this.width;
      var dh = this.height;
      var dummyContext = dummy.context;


      dummyContext.clearRect(0, 0, dw, dh);

      dummyContext.save();
      dummyContext.globalAlpha = this.rate;
      dummyContext.drawImage(element, 0, 0, w, h, 0, 0, dw, dh);
      
      this.renderer.renderChildren(this);
      dummyContext.restore();


      c.clearRect(0, 0, w, h);
      c.drawImage(dummy.canvas, 0, 0, dw, dh, 0, 0, w, h);
      if (this.isDrawing) canvas.context.drawImage(element, 0, 0, w, h, 0, 0, dw, dh);
    },

    setQuality: function (q) {
      this.quality = q;
      return this;
    },

    getQuality: function () {
      return this._quality;
    },

    /**
     * 残像をクリア
     */
    clearImage: function () {
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
      var after = this.afterimage;
      image.context.drawImage(after.canvas, 0, 0, after.width, after.height, 0, 0, w, h);
      return image;
    },

    /**
     * 残像のイメージを描画するスプライト
     * copy 
     *   true でコピーした残像
     *   false,未指定で描画中の残像と同じもの  
     */
    getSprite: function (copy) {
      if (copy) {
        return phina.display.Sprite(this.getImage());
      } else {
        var sprite = phina.display.Sprite(this.afterimage);
        sprite.width = this.width;
        sprite.height = this.height;
        return sprite;
      }
    },

    _accessor: {
      quality: {
        get: function () {
          return this._quality;
        },
        set: function (q) {
          this._quality = q;
          var after = this.afterimage;
          if (q === 1) {
            this.draw = phina.display.AfterimageLayer.prototype.draw;
            after.width = this.width;
            after.height = this.height;
          } else {
            this.draw = this._drawByQuality;
            after.width = q * this.width;
            after.height = q * this.height;
          }
        }
      }
    }

  });
});
