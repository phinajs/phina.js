
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

      options = ({}).$safe(options, {
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
      });

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
        var w = canvas.context.measureText(line).width;
        if (width < w) {
          width = w;
        }
      }, this);
      if (this.align !== 'center') width*=2;

      return width + this.padding*2;
    },

    calcCanvasHeight: function() {
      var height = this.fontSize * this._lines.length;
      if (this.baseline !== 'middle') height*=2;
      return height*this.lineHeight + this.padding*2;
    },

    render: function(canvas) {
      var context = canvas.context;

      var text = this.text + '';
      var lines = this._lines;


      context.font = this.font;
      context.textAlign = this.align;
      context.textBaseline = this.baseline;

      var fontSize = this.fontSize;
      var lineSize = fontSize*this.lineHeight;
      var offset = -Math.floor(lines.length/2)*lineSize;
      offset += ((lines.length+1)%2) * (lineSize/2);

      if (this.stroke) {
        context.strokeStyle = this.stroke;
        context.lineWidth = this.strokeWidth;
        context.lineJoin = "round";
        context.shadowBlur = 0;
        lines.forEach(function(line, i) {
          context.strokeText(line, 0, i*lineSize+offset);
        }, this);
      }

      if (this.shadow) {
        context.shadowColor = this.shadow;
        context.shadowBlur = this.shadowBlur;
      }

      if (this.fill) {
        context.fillStyle = this.fill;
        lines.forEach(function(line, i) {
          context.fillText(line, 0, i*lineSize+offset);
        }, this);
      }
    },

    _accessor: {
      /**
       * text
       */
      text: {
        get: function() { return this._text; },
        set: function(v) {
          this._text = v;
          this._lines = (this.text + '').split('\n');
        },
      },

      font: {
        get: function() {
          return "{fontWeight} {fontSize}px {fontFamily}".format(this);
        },
      }
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

