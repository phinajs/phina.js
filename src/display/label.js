
phina.namespace(function() {

  /**
   * @class phina.display.Label
   * 
   */
  phina.define('phina.display.Label', {
    superClass: 'phina.display.Shape',

    init: function(text, style) {

      if (arguments.length >= 2) {
        style.text = text;
      }
      else {
        if (typeof arguments[0] === 'string') {
          style = { text: text, };
        }
        else {
          style = arguments[0];
        }
      }

      style = (style || {}).$safe({
        text: 'Hello, world!',
        color: 'black',

        stroke: true,
        strokeColor: '#222',
        strokeWidth: 2,

        fontSize: 32,
        fontWeight: '',
        fontFamily: "'HiraKakuProN-W3'", // Hiragino or Helvetica,

        shadowBlur: 0,
        shadowColor: 'black',

        align: 'center',
        baseline: 'middle',
        lineHeight: 1.2,

        backgroundColor: 'transparent',
      });

      this.superInit(style);
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
      if (this.style.align !== 'center') width*=2;
      return width;
    },

    calcHeight: function() {
      var height = this.style.fontSize * this._lines.length;
      if (this.style.baseline !== 'middle') height*=2;
      return height*this.style.lineHeight;
    },

    _render: function() {
      var style = this.style;
      var canvas = this.canvas;
      var context = canvas.context;

      var fontSize = this.style.fontSize;
      var font = "{fontWeight} {fontSize}px {fontFamily}".format(this.style);
      var lines = this._lines = this.style.text.split('\n');
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

      context.lineJoin = "round";

      var lineSize = fontSize*style.lineHeight;
      var offset = -Math.floor(lines.length/2)*lineSize;
      offset += ((lines.length+1)%2) * (lineSize/2);

      if (this.style.stroke) {
        context.shadowBlur = 0;
        lines.forEach(function(line, i) {
          context.strokeText(line, 0, i*lineSize+offset);
        }, this);
      }

      context.shadowBlur = this.style.shadowBlur;
      context.shadowColor = this.style.shadowColor;
      lines.forEach(function(line, i) {
        context.fillText(line, 0, i*lineSize+offset);
      }, this);
    },

    _accessor: {
      text: {
        get: function() {
          return this.style.text;
        },
        set: function(v) {
          this.style.text = v;
        },
      },
    }
  });

});

