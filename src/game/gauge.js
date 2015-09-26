phina.namespace(function() {

  /**
   * @class phina.game.Gauge
   * 
   */
  phina.define('phina.game.Gauge', {
    superClass: 'phina.display.Shape',

    init: function(style) {
      style = (style || {}).$safe({
        value: 100,
        maxValue: 100,
        gaugeColor: '#44f',

        width: 256,
        height: 32,

        color: 'white',
        radius: 64,

        stroke: true,
        strokeWidth: 4,
        strokeColor: '#aaa',

        cornerRadius: 4,

        backgroundColor: 'transparent',
      });

      this.superInit(style);

      this.visualValue = style.value;
      this.animation = true;
      this.animationTime = 1*1000;
    },

    /**
     * 満タンかをチェック
     */
    isFull: function() {
      return this.value === this.maxValue;
    },

    /**
     * 空っぽかをチェック
     */
    isEmpty: function() {
      return this.value == 0;
    },

    setValue: function(value) {
      value = Math.clamp(value, 0, this._maxValue);

      // end when now value equal value of argument
      if (this.value === value) return ;

      // fire value change event
      this.flare('change');

      if (this.animation) {
        var range = Math.abs(this.visualValue-value);
        var time = (range/this.maxValue)*this.animationTime;

        this.tweener.ontween = function() {
          this._dirtyDraw = true;
        }.bind(this);
        this.tweener
          .clear()
          .to({'visualValue': value}, time)
          .call(function() {
            this.flare('changed');
            if (this.isEmpty()) {
              this.flare('empty');
            }
            else if (this.isFull()) {
              this.flare('full');
            }
          }, this);
      }
      else {
        this.visualValue = value;
        this.flare('changed');
        if (this.isEmpty()) {
          this.flare('empty');
        }
        else if (this.isFull()) {
          this.flare('full');
        }
      }

      this.style.value = value;
    },

    _render: function() {
      var style = this.style;
      this.canvas.width = style.width + style.padding*2;
      this.canvas.height= style.height + style.padding*2;
      // 
      this.canvas.clearColor(style.backgroundColor);

      this.canvas.transformCenter();

      var rate = this.visualValue/this.maxValue;

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
          return this.style.value;
        },
        set: function(v) {
          this.setValue(v);
        },
      },
      maxValue: {
        get: function() {
          return this.style.maxValue;
        },
        set: function(v) {
          this.style.maxValue = v;
        },
      },
    }
  });

});
