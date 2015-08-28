
phina.namespace(function() {

  /**
   * @class phina.display.Label
   * 
   */
  phina.define('phina.display.Label', {
    superClass: 'phina.display.Shape',

    init: function(text) {
      this.superInit();

      this.canvas = phina.graphics.Canvas();

      this.style = {
        color: 'black',
        
        strokeColor: '#222',
        stroke: true,
        strokeWidth: 2,
        
        fontSize: 32,
        fontWeight: '',
        fontFamily: "'HiraKakuProN-W3'", // Hiragino or Helvetica,

        align: 'center',
        baseline: 'middle',

        shadowBlur: 0,
        shadowColor: 'black',

        backgroundColor: 'transparent',

        padding: 8,
      };

      this.observeStyle();

      this.text = text || 'hoge\nfoo\nbar';
    },

    calcWidth: function() {
      var width = 0;
      var canvas = this.canvas;
      this._lines.forEach(function(line) {
        var w = canvas.context.measureText(line).width;
        if (width < w) {
          width = w;
        }
      }, this);
      return width;
    },

    calcHeight: function() {
      return this.style.fontSize * this._lines.length;
    },

    _render: function() {
      var style = this.style;
      var canvas = this.canvas;
      var context = canvas.context;

      var fontSize = this.style.fontSize;
      var font = "{fontWeight} {fontSize}px {fontFamily}".format(this.style);
      var lines = this.text.split('\n');
      canvas.context.font = font;

      canvas.width = this.calcWidth() + style.padding*2;
      canvas.height = this.calcHeight() + style.padding*2;
      canvas.clearColor(style.backgroundColor);

      canvas.transformCenter();
      context.font = font;
      context.textAlign = this.style.align;
      context.textBaseline = this.style.baseline;

      context.fillStyle = this.style.color;
      context.strokeStyle = this.style.strokeColor;
      context.lineWidth = this.style.strokeWidth;

      context.shadowBlur = this.style.shadowBlur;
      context.shadowColor = this.style.shadowColor;

      var offset = -Math.floor(lines.length/2)*fontSize;
      lines.forEach(function(line, i) {
        context.fillText(line, 0, i*fontSize+offset);
      }, this);

      if (this.style.stroke) {
        context.shadowBlur = 0;
        lines.forEach(function(line, i) {
          context.strokeText(line, 0, i*fontSize+offset);
        }, this);
      }
    },

    _accessor: {
      text: {
        get: function() {
          return this._text;
        },
        set: function(v) {
          this._text = v;
          this._lines = v.split('\n');
          this._render();
        },
      },
    }
  });

});

