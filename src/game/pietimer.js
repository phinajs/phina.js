phina.namespace(function() {

  /**
   * @class phina.game.PieTimer
   * 
   */
  phina.define('phina.game.PieTimer', {
    superClass: 'phina.display.Shape',

    init: function(time, style) {
      style = (style || {}).$safe({
        color: '#aaa',
        radius: 64,

        stroke: true,
        strokeWidth: 4,
        strokeColor: '#aaa',

        showPercentage: false, // TODO

        backgroundColor: 'transparent',
      });

      this.superInit(style);

      this.label = phina.display.Label('hoge').addChildTo(this);

      this.time = 0;
      this.limit = time || 1000*10;

      this.starting = true;
    },

    update: function(app) {
      if (!this.starting) return ;

      this.time += app.ticker.deltaTime;
    },

    start: function() {
      this.starting = true;
    },

    stop: function() {
      this.starting = false;
    },

    _render: function() {
      var style = this.style;
      this.canvas.width = style.radius*2 + style.padding*2;
      this.canvas.height= style.radius*2 + style.padding*2;
      this.canvas.clearColor(style.backgroundColor);

      this.canvas.transformCenter();

      var rate = this.time / this.limit;
      var end = (Math.PI*2)*rate;

      if (style.stroke) {
        this.canvas.context.lineWidth = style.strokeWidth;
        this.canvas.strokeStyle = style.strokeColor;
        // this.canvas.strokePie(0, 0, style.radius, 0, end);
        this.canvas.strokeArc(0, 0, style.radius, 0-Math.PI/2, end-Math.PI/2);
      }

      this.canvas.context.fillStyle = style.color;
      this.canvas.fillPie(0, 0, style.radius, 0, end);

      if (this.label) {
        var left = Math.max(0, this.limit-this.time);
        this.label.text = Math.ceil(left/1000)+'';
      }
    },

    _accessor: {
      time: {
        get: function() {
          return this._time;
        },
        set: function(time) {
          this._time = time;
          this._render();
        },
      }
    }
  });

});
