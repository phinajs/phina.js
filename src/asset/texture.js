phina.namespace(function() {

  /**
   * @class phina.asset.Texture
   * @extends phina.asset.Asset
   */
  phina.define('phina.asset.Texture', {
    superClass: "phina.asset.Asset",

    /**
     * @constructor
     */
    init: function() {
      this.superInit();
    },

    _load: function(resolve) {
      this.domElement = new Image();

      var isLocal = (location.protocol == 'file:');
      if ( !isLocal && !(/^data:/.test(this.src)) ) {
        // this.domElement.crossOrigin = 'Anonymous'; // クロスオリジン解除
      }

      var self = this;
      this.domElement.onload = function(e) {
        self.loaded = true;
        resolve(self);
      };
      this.domElement.onerror = function(e) {
        console.error("[phina.js] not found `{0}`!".format(this.src));

        var key = self.src.split('/').last.replace('.png', '').split('?').first.split('#').first;
        e.target.onerror = null;
        e.target.src = "http://dummyimage.com/128x128/444444/eeeeee&text=" + key;
      };

      this.domElement.src = this.src;
    },

    clone: function () {
      var image = this.domElement;
      var canvas = phina.graphics.Canvas().setSize(image.width, image.height);
      var t = phina.asset.Texture();
      canvas.context.drawImage(image, 0, 0);
      t.domElement = canvas.domElement;
      return t;
    },

    transmit: function(color) {
      // imagaオブジェクトをゲット
      var image = this.domElement;
      // 新規canvas作成
      var canvas = phina.graphics.Canvas().setSize(image.width, image.height);
      // 新規canvasに描画
      canvas.context.drawImage(image, 0, 0);
      // canvas全体のイメージデータ配列をゲット
      var imageData = canvas.context.getImageData(0, 0, canvas.width, canvas.height);
      var data = imageData.data;
      // 透過色の指定がなければ左上のrgb値を抽出
      var r = (color !== undefined) ? color.r : data[0];
      var g = (color !== undefined) ? color.g : data[1];
      var b = (color !== undefined) ? color.b : data[2];
      // 配列を4要素目から4つ飛び（アルファ値）でループ
      (3).step(data.length, 4, function(i) {
        // rgb値を逆算でゲットし、左上のrgbと比較
        if (data[i - 3] === r && data[i - 2] === g && data[i - 1] === b) {
          // 一致した場合はアルファ値を書き換える
          data[i] = 0;
        }
      });
      // 書き換えたイメージデータをcanvasに戻す
      canvas.context.putImageData(imageData, 0, 0);

      this.domElement = canvas.domElement;
    },

    filter: function (filters) {
      if (!filters) {
        return this;
      }
      if (!Array.isArray(filters)) {
        filters = [filters];
      }
      var image = this.domElement;
      var w = image.width;
      var h = image.height;
      var canvas = phina.graphics.Canvas().setSize(w, h);
      var imageData = null;

      canvas.context.drawImage(image, 0, 0);
      imageData = canvas.context.getImageData(0, 0, w, h);
      filters.forEach( function (fn) {
        if (typeof fn == 'function') {
          h.times( function (y) {
            w.times( function (x) {
              var i = (y * w + x) * 4;
              var pixel = imageData.data.slice(i, i + 4);
              fn(pixel, i, x, y, imageData);
            });
          });
        }
      });
      canvas.context.putImageData(imageData, 0, 0);
      this.domElement = canvas.domElement;
      return this;
    },

  });

});
