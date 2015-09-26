phina.namespace(function() {

  /**
   * @class phina.game.Gauge
   * 
   */
  phina.define('phina.game.Gauge', {
    superClass: 'phina.display.Shape',

    init: function(style) {
      style = (style || {}).$safe({
        width: 256,
        height: 32,

        color: 'white',
        radius: 64,

        stroke: true,
        strokeWidth: 4,
        strokeColor: '#aaa',

        cornerRadius: 4,
        gaugeColor: '#44f',

        backgroundColor: 'transparent',
      });
      this._reset();

      this.superInit(style);

      this.animation = true;
      this.animationTime = 1*1000;
    },

    setValue: function(value) {
      value = Math.clamp(value, 0, this._maxValue);

      this._realValue = value;

      // end when now value equal value of argument
      if (this._value === value) return ;

      // fire value change event
      this.flare('change');

      if (this.animation) {
        var time = (Math.abs(this._value-value)/this._maxValue)*this.animationTime;
        console.log(time);
        this.tweener
          .clear()
          .to({'_value': value}, time)
          .call(function() {
            // TODO
          });
      }
    },

    update: function() {
      this._render();
    },

    _reset: function() {
      this._value = 100;
      this._value = this._maxValue = 100;
    },

    _render: function() {
      var style = this.style;
      this.canvas.width = style.width + style.padding*2;
      this.canvas.height= style.height + style.padding*2;
      // 
      this.canvas.clearColor(style.backgroundColor);

      this.canvas.transformCenter();

      var rate = this._value/this._maxValue;

      // draw color
      this.canvas.context.fillStyle = style.color;
      this.canvas.fillRect(-style.width/2, -style.height/2, style.width, style.height);
      // draw gauge
      this.canvas.context.fillStyle = style.gaugeColor;
      this.canvas.fillRect(-style.width/2, -style.height/2, style.width*rate, style.height);
      // draw stroke
      if (style.stroke) {
        this.canvas.context.lineWidth = style.strokeWidth;
        this.canvas.strokeStyle = style.strokeColor;
        this.canvas.strokeRect(-style.width/2, -style.height/2, style.width, style.height);
      }
    },

    _accessor: {
      value: {
        get: function() {
          return this._value;
        },
        set: function(v) {
          this.setValue(v);
        },
      },
      // time: {
      //   get: function() {
      //     return this._time;
      //   },
      //   set: function(time) {
      //     this._time = time;
      //     this._render();
      //   },
      // }
    }
  });

});
