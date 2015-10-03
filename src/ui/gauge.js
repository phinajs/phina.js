phina.namespace(function() {

  /**
   * @class phina.ui.Gauge
   * 
   */
  phina.define('phina.ui.Gauge', {
    superClass: 'phina.display.Shape',

    init: function(options) {
      options = (options || {}).$safe({
        width: 256,
        height: 32,
        backgroundColor: 'transparent',
        fill: 'white',
        stroke: '#aaa',
        strokeWidth: 4,

        value: 100,
        maxValue: 100,
        gaugeColor: '#44f',
        cornerRadius: 4,
      });

      this.superInit(options);

      this._value = options.value;
      this.maxValue = options.maxValue;
      this.gaugeColor = options.gaugeColor;
      this.cornerRadius = options.cornerRadius;

      this.visualValue = options.value;
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

      this._value = value;
    },

    getRate: function() {
      var rate = this.visualValue/this.maxValue;
      return rate;
    },

    _render: function() {
      this._renderBackground();

      this.canvas.transformCenter();

      var rate = this.getRate();

      // draw color
      if (this.fill) {
        this.canvas.context.fillStyle = this.fill;
        this.canvas.fillRect(-this.width/2, -this.height/2, this.width, this.height);
      }
      // draw gauge
      this.canvas.context.fillStyle = this.gaugeColor;
      this.canvas.fillRect(-this.width/2, -this.height/2, this.width*rate, this.height);
      // draw stroke
      if (this.stroke) {
        this.canvas.context.lineWidth = this.strokeWidth;
        this.canvas.strokeStyle = this.stroke;
        this.canvas.strokeRect(-this.width/2, -this.height/2, this.width, this.height);
      }
    },

    _accessor: {
      value: {
        get: function() {
          return this._value;
        },
        set: function(v) {
          this._dirtyDraw = true;
          this.setValue(v);
        },
      },
      maxValue: {
        get: function() {
          return this._maxValue;
        },
        set: function(v) {
          this._dirtyDraw = true; this._maxValue = v;
        },
      },
      gaugeColor: {
        get: function() {
          return this._gaugeColor;
        },
        set: function(v) {
          this._dirtyDraw = true; this._gaugeColor = v;
        },
      },
      cornerRadius: {
        get: function() {
          return this._cornerRadius;
        },
        set: function(v) {
          this._dirtyDraw = true; this._cornerRadius = v;
        },
      },
    }
  });

});


phina.namespace(function() {

  /**
   * @class phina.ui.CircleGauge
   * 
   */
  phina.define('phina.ui.CircleGauge', {
    superClass: 'phina.ui.Gauge',

    init: function(options) {
      options = (options || {}).$safe({
        backgroundColor: 'transparent',
        fill: '#aaa',
        stroke: '#222',

        radius: 64,
        anticlockwise: true,
        showPercentage: false, // TODO
      });

      this.superInit(options);

      this.radius = options.radius;
      this.anticlockwise = options.anticlockwise;
      this.showPercentage = options.showPercentage;
    },

    _render: function() {
      var canvas = this.canvas;

      var size = this.radius*2 + this.padding*2;
      this._renderBackground(size, size);

      this.canvas.transformCenter();
      this.canvas.rotate(-Math.PI*0.5);
      this.canvas.scale(1, -1);

      var rate = this.getRate();
      var end = (Math.PI*2)*rate;
      var startAngle = 0;
      var endAngle = end;

      if (this.stroke) {
        this.canvas.context.lineWidth = this.strokeWidth;
        this.canvas.strokeStyle = this.stroke;
        this.canvas.strokeArc(0, 0, this.radius, startAngle, endAngle);
      }

      canvas.context.fillStyle = this.fill;
      canvas.fillPie(0, 0, this.radius, startAngle, endAngle);

      // if (this.showPercentage) {
      //   // TODO:
      //   var left = Math.max(0, this.limit-this.time);
      //   this.label.text = Math.ceil(left/1000)+'';
      // }
    },

  });



});

