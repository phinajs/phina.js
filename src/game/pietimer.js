phina.namespace(function() {

  /**
   * @class phina.game.PieTimer
   * 
   */
  phina.define('phina.game.PieTimer', {
    superClass: 'phina.display.Shape',

    init: function(time, options) {
      options = (options || {}).$safe({
        fill: '#aaa',
        radius: 64,

        strokeWidth: 4,
        stroke: '#aaa',

        showPercentage: false, // TODO

        backgroundColor: 'transparent',
      });

      this.superInit(options);

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

    calcCanvasWidth: function () {
      return this.radius * 2 + this.padding * 2;
    },

    calcCanvasHeight: function () {
      return this.radius * 2 + this.padding * 2;
    },


    render: function() {

      var rate = this.time / this.limit;
      var end = (Math.PI*2)*rate;

      if (this.isStrokable()) {
        this.canvas.context.lineWidth = this.strokeWidth;
        this.canvas.strokeStyle = this.stroke;
        // this.canvas.strokePie(0, 0, this.radius, 0, end);
        this.canvas.strokeArc(0, 0, this.radius, 0-Math.PI/2, end-Math.PI/2);
      }

      this.canvas.context.fillStyle = this.fill;
      this.canvas.fillPie(0, 0, this.radius, 0, end);

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
          this._dirtyDraw = true;
        },
      }
    }
  });

});
