phina.namespace(function() {

  /**
   * @class phina.asset.Font
   * 
   */
  phina.define("phina.asset.Font", {
    superClass: "phina.asset.Asset",

    /**
     * @constructor
     */
    init: function() {
      this.superInit();
    },

    load: function(key, path) {
      this.src = path;
      this.key = key;

      var reg = /(.*)(?:\.([^.]+$))/;
      var type = path.match(reg)[2];
      var format = "unknown";
      switch (type) {
        case "ttf":
            format = "truetype"; break;
        case "otf":
            format = "opentype"; break;
        case "woff":
            format = "woff"; break;
        case "woff2":
            format = "woff2"; break;
        default:
            console.warn("サポートしていないフォント形式です。(" + path + ")");
      }
      this.format = format;

      if (format !== "unknown") {
        var text = "@font-face { font-family: '{0}'; src: url({1}) format('{2}'); }".format(key, path, format);
        var e = document.querySelector("head");
        var fontFaceStyleElement = document.createElement("style");
        if (fontFaceStyleElement.innerText) {
          fontFaceStyleElement.innerText = text;
        } else {
          fontFaceStyleElement.textContent = text;
        }
        e.appendChild(fontFaceStyleElement);
      }

      return phina.util.Flow(this._load.bind(this));
    },

    _load: function(resolve) {
      if (this.format !== "unknown") {
        this.checkLoaded(this.key, function() {
          this.loaded = true;
          resolve(this);
        }.bind(this));
      } else {
        this.loaded = true;
        resolve(this);
      }
    },

    checkLoaded: function (font, callback) {
      var canvas = phina.graphics.Canvas();
      var DEFAULT_FONT = canvas.context.font.split(' ')[1];
      canvas.context.font = '40px ' + DEFAULT_FONT;

      var checkText = "1234567890-^\\qwertyuiop@[asdfghjkl;:]zxcvbnm,./\!\"#$%&'()=~|QWERTYUIOP`{ASDFGHJKL+*}ZXCVBNM<>?_１２３４５６７８９０－＾￥ｑｗｅｒｔｙｕｉｏｐａｓｄｆｇｈｊｋｌｚｘｃｖｂｎｍ，．あいうかさたなをん時は金なり";

      var before = canvas.context.measureText(checkText).width;
      canvas.context.font = '40px ' + font + ', ' + DEFAULT_FONT;

      var checkLoadFont = function () {
        if (canvas.context.measureText(checkText).width !== before) {
          callback && callback();
        } else {
          setTimeout(checkLoadFont, 100);
        }
      };
      setTimeout(checkLoadFont, 100);
    },
  });
});
