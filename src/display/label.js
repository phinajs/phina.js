
phina.namespace(function() {

  /**
   * @class phina.display.Label
   *
   */
  phina.define('phina.display.Label', {
    superClass: 'phina.display.Shape',

    /**
     * @constructor
     */
    init: function(options) {
      if (typeof arguments[0] !== 'object') {
        options = { text: arguments[0], };
      }
      else {
        options = arguments[0];
      }

      options = ({}).$safe(options, phina.display.Label.defaults);

      this.superInit(options);

      this.text = options.text;
      this.fontSize = options.fontSize;
      this.fontWeight = options.fontWeight;
      this.fontFamily = options.fontFamily;
      this.align = options.align;
      this.baseline = options.baseline;
      this.lineHeight = options.lineHeight;
    },

    calcCanvasWidth: function() {
      var width = 0;
      var canvas = this.canvas;
      canvas.context.font = this.font;
      this._lines.forEach(function(line) {
        var w = 0;
        line.forEach(function(elm) {
        	w += canvas.context.measureText(elm.text).width;
        });
        if (width < w) {
          width = w;
        }
      }, this);

      return width + this.padding*2;
    },

    calcCanvasHeight: function() {
      var height = this.fontSize * this._lines.length;
      if (this.baseline !== 'middle') height*=2;
      return height*this.lineHeight + this.padding*2;
    },

    prerender: function(canvas) {
      var context = canvas.context;
      context.font = this.font;
      context.textAlign = 'left';
      context.textBaseline = this.baseline;

      var lines = this._lines;
      this.lineSize = this.fontSize*this.lineHeight;
      this._offset = -Math.floor(lines.length/2)*this.lineSize;
      this._offset += ((lines.length+1)%2) * (this.lineSize/2);
    },

    renderFill: function(canvas) {
      this._lines.forEach(function(line, i) {
        // alignに対応するためすべてtextAlign='left'で表示開始位置を前後させる。
        var offsetX = 0;
        var w = 0;
        line.forEach(function(elm) {
          w += canvas.context.measureText(elm.text).width;
        });
        if (this.align == 'center') {
          offsetX = -1 * w / 2;
        } else if (this.align == 'left' || this.align == 'start') {
          offsetX = -1 * this.calcCanvasWidth() / 2 + this.padding;
        } else {
          offsetX = this.calcCanvasWidth() / 2 - w - this.padding;
        }

        // 1要素ごとに左にずらして表示
        line.forEach(function(elm) {
          offsetX += elm.doFill(canvas, offsetX, i*this.lineSize+this._offset);
        }, this);
      }, this);
    },

    renderStroke: function(canvas) {
      this._lines.forEach(function(line, i) {
        // alignに対応するためすべてtextAlign='left'で表示開始位置を前後させる。
        var offsetX = 0;
        var w = 0;
        line.forEach(function(elm) {
          w += canvas.context.measureText(elm.text).width;
        });
        if (this.align == 'center') {
          offsetX = -1 * w / 2;
        } else if (this.align == 'left' || this.align == 'start') {
          offsetX = -1 * this.calcCanvasWidth() / 2 + this.padding;
        } else {
          offsetX = this.calcCanvasWidth() / 2 - w - this.padding;
        }

        // 1要素ごとに左にずらして表示
        line.forEach(function(elm) {
          offsetX += elm.doStroke(canvas, offsetX, i*this.lineSize+this._offset);
        }, this);
      }, this);
    },

    _accessor: {
      /**
       * text
       */
      text: {
        get: function() { return this._text; },
        set: function(v) {
          this._text = v;
          // 配列でも文字列受け取る
          if (this._text instanceof Array) {
            this._textElements = this._text.map(function(str){
              return TextElement(str);
            });
          } else {
            this._textElements = [TextElement(this._text)];
          }

          // 改行ごとに要素を分割する
          this._lines = [];
          var line = [];
          this._textElements.forEach(function(element) {
            var first = true;
            element.splitElement('\n').forEach(function(elm) {
              if (first) {
                first = false;
              } else {
                this._lines.push(line);
                line = [];
              }
              line.push(elm);
            }, this);
          }, this);
          this._lines.push(line);
        },
      },

      font: {
        get: function() {
          return "{fontWeight} {fontSize}px {fontFamily}".format(this);
        },
      }
    },

    _static: {
      defaults: {
        backgroundColor: 'transparent',

        fill: 'black',
        stroke: null,
        strokeWidth: 2,

        //
        text: 'Hello, world!',
        //
        fontSize: 32,
        fontWeight: '',
        fontFamily: "'HiraKakuProN-W3'", // Hiragino or Helvetica,
        //
        align: 'center',
        baseline: 'middle',
        lineHeight: 1.2,
      },
    },

    _defined: function() {
      var Shape = phina.display.Shape;
      Shape.watchRenderProperty.call(this, 'text');
      Shape.watchRenderProperty.call(this, 'fontSize');
      Shape.watchRenderProperty.call(this, 'fontWeight');
      Shape.watchRenderProperty.call(this, 'fontFamily');
      Shape.watchRenderProperty.call(this, 'align');
      Shape.watchRenderProperty.call(this, 'baseline');
      Shape.watchRenderProperty.call(this, 'lineHeight');
    },
  });

});

