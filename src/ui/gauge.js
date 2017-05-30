phina.namespace(function() {

  /**
   * @class phina.ui.Gauge
   * @extends phina.display.Shape
   */
  phina.define('phina.ui.Gauge', {
    superClass: 'phina.display.Shape',

    init: function(options) {
      options = ({}).$safe(options, {
        width: 256,
        height: 32,
        backgroundColor: 'transparent',
        fill: 'white',
        stroke: '#aaa',
        strokeWidth: 4,

        value: 100,
        maxValue: 100,
        gaugeColor: '#44f',
        cornerRadius: 0,
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
      return this.value === 0;
    },

    setValue: function(value) {
      value = Math.clamp(value, 0, this._maxValue);

      // end when now value equal value of argument
      if (this.value === value) return ;

      // fire value change event
      this.flare('change');

      this._value = value;

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
    },

    getRate: function() {
      var rate = this.visualValue/this.maxValue;
      return rate;
    },

    prerender: function(canvas) {
      canvas.roundRect(-this.width/2, -this.height/2, this.width, this.height, this.cornerRadius);
    },

    postrender: function(canvas) {
      var rate = this.getRate();
      canvas.context.fillStyle = this.gaugeColor;
      canvas.context.save();
      canvas.context.clip();
      canvas.fillRect(-this.width/2, -this.height/2, this.width*rate, this.height);
      canvas.context.restore();
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
    },

    _defined: function() {
      phina.display.Shape.watchRenderProperty.call(this, 'value');
      phina.display.Shape.watchRenderProperty.call(this, 'maxValue');
      phina.display.Shape.watchRenderProperty.call(this, 'gaugeColor');
      phina.display.Shape.watchRenderProperty.call(this, 'cornerRadius');
    },
  });

});


phina.namespace(function() {

  /**
   * @class phina.ui.CircleGauge
   * @extends phina.ui.Gauge
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

      this.setBoundingType('circle');

      this.radius = options.radius;
      this.anticlockwise = options.anticlockwise;
      this.showPercentage = options.showPercentage;
    },

    prerender: function(canvas) {
      var rate = this.getRate();
      var end = (Math.PI*2)*rate;
      this.startAngle = 0;
      this.endAngle = end;
      
      this.canvas.rotate(-Math.PI*0.5);
      this.canvas.scale(1, -1);
    },

    renderFill: function(canvas) {
      canvas.fillPie(0, 0, this.radius, this.startAngle, this.endAngle);
    },

    renderStroke: function(canvas) {
      canvas.strokeArc(0, 0, this.radius, this.startAngle, this.endAngle);
    },

    postrender: function() {
      // if (this.showPercentage) {
      //   // TODO:
      //   var left = Math.max(0, this.limit-this.time);
      //   this.label.text = Math.ceil(left/1000)+'';
      // }
    },

  });



});

