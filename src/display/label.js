
phina.namespace(function() {

  /**
   * @class phina.display.Label
   * 
   */
  phina.define('phina.display.Label', {
    superClass: 'phina.display.CanvasElement',

    init: function(text) {
      this.superInit();

      this.canvas = phina.graphics.Canvas();

      this.style = {
        color: 'red',
        
        strokeColor: 'green',
        stroke: true,
        strokeWidth: 4,
        
        align: 'center',
        baseline: 'middle',

        shadowBlur: 10,
        shadowColor: 'yellow',

        padding: 16,
      };

      this.text = text || 'hoge';

      Object.observe(this.style, function(changes) {
        this._render();
      }.bind(this));

      setTimeout(function() {
        this.style.color = 'blue';
      }.bind(this), 1000);
    },

    _render: function() {
      var fontSize = 128;
      var fontFamily = fontSize+"px 'メイリオ'";
      var lines = this.text.split('\n');
      this.canvas.context.font = fontFamily;
      var width = 0;
      lines.forEach(function(line) {
        var w = this.canvas.context.measureText(line).width;
        if (width < w) {
          width = w;
        }
      }, this);
      this.width = width;
      this.height = fontSize * lines.length;

      // this.canvas.clearColor('#aaa');
      this.canvas.transformCenter();
      this.canvas.context.font = fontFamily;
      this.canvas.context.textAlign = this.style.align;
      this.canvas.context.textBaseline = this.style.baseline;

      this.canvas.context.fillStyle = this.style.color;
      this.canvas.context.strokeStyle = this.style.strokeColor;
      this.canvas.context.lineWidth = this.style.strokeWidth;

      this.canvas.context.shadowBlur = this.style.shadowBlur;
      this.canvas.context.shadowColor = this.style.shadowColor;

      var offset = -Math.floor(lines.length/2)*fontSize;
      lines.forEach(function(line, i) {
        this.canvas.context.fillText(line, 0, i*fontSize+offset);
      }, this);

      if (this.style.stroke) {
        this.canvas.context.shadowBlur = 0;
        lines.forEach(function(line, i) {
          this.canvas.context.strokeText(line, 0, i*fontSize+offset);
        }, this);
      }
    },

    draw: function(canvas) {
      var image = this.canvas.domElement;
      var w = image.width;
      var h = image.height;
      canvas.context.drawImage(image,
        0, 0, w, h,
        -w*this.origin.x, -h*this.origin.y, w, h
        );
    },

    _accessor: {
      text: {
        get: function() {
          return this._text;
        },
        set: function(v) {
          this._text = v;
          this._render();
        },
      },
      width: {
        get: function() {
          return this._width;
        },
        set: function(v) {
          this._width = v;
          if (!this.canvas) return ;
          this.canvas.width = v + this.style.padding*2;
        },
      },
      height: {
        get: function() {
          return this._height;
        },
        set: function(v) {
          this._height = v;
          if (!this.canvas) return ;
          this.canvas.height = v + this.style.padding*2;
        },
      },
    }
  });

});

