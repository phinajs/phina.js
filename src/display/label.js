
phina.namespace(function() {

  /**
   * @class phina.display.Label
   * @extends phina.display.Shape
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

    prerender: function(canvas) {
      var context = canvas.context;
      context.font = this.font;
      context.textAlign = this.align;
      context.textBaseline = this.baseline;

      var lines = this._lines;
      this.lineSize = this.fontSize*this.lineHeight;
      this._offset = -Math.floor(lines.length/2)*this.lineSize;
      this._offset += ((lines.length+1)%2) * (this.lineSize/2);
    },

    renderFill: function(canvas) {
      var context = canvas.context;
      this._lines.forEach(function(line, i) {
        context.fillText(line, 0, i*this.lineSize+this._offset);
      }, this);
    },

    renderStroke: function(canvas) {
      var context = canvas.context;
      this._lines.forEach(function(line, i) {
        context.strokeText(line, 0, i*this.lineSize+this._offset);
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
          this._lines = (this.text + '').split('\n');
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

