
phina.namespace(function() {

  /**
   * @class phina.display.Shape
   * 
   */
  phina.define('phina.display.Shape', {
    superClass: 'phina.display.CanvasElement',

    init: function(options) {
      options = (options || {}).$safe({
        width: 64,
        height: 64,
        padding: 8,

        backgroundColor: '#aaa',
        fill: '#00a',
        stroke: '#aaa',
        strokeWidth: 4,

        shadow: false,
        shadowBlur: 4,
      });
      this.superInit(options);

      this.padding = options.padding;

      this.backgroundColor = options.backgroundColor;
      this.fill = options.fill;
      this.stroke = options.stroke;
      this.strokeWidth = options.strokeWidth;
      
      this.shadow = options.shadow;
      this.shadowBlur = options.shadowBlur;

      this.canvas = phina.graphics.Canvas();
      this._dirtyDraw = true;

      this.on('enterframe', function() {
        if (this._dirtyDraw === true) {
          this._render();
          this._dirtyDraw = false;
        }
      });
    },

    _render: function() {
      this.canvas.width = this.width + this.padding*2;
      this.canvas.height= this.height + this.padding*2;

      this.canvas.clearColor(this.backgroundColor);
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
      width: {
        get: function() {
          return this._width;
        },
        set: function(v) {
          this._dirtyDraw = true; this._width = v;
        },
      },
      height: {
        get: function() {
          return this._height;
        },
        set: function(v) {
          this._dirtyDraw = true; this._height = v;
        },
      },
      padding: {
        get: function() {
          return this._padding;
        },
        set: function(v) {
          this._dirtyDraw = true; this._padding = v;
        },
      },
      backgroundColor: {
        get: function() {
          return this._backgroundColor;
        },
        set: function(v) {
          this._dirtyDraw = true;
          this._backgroundColor = v;
        },
      },
      fill: {
        get: function() {
          return this._fill;
        },
        set: function(v) {
          this._dirtyDraw = true;
          this._fill = v;
        },
      },
      stroke: {
        get: function() {
          return this._stroke;
        },
        set: function(v) {
          this._dirtyDraw = true;
          this._stroke = v;
        },
      },
      strokeWidth: {
        get: function() {
          return this._strokeWidth;
        },
        set: function(v) {
          this._dirtyDraw = true;
          this._strokeWidth = v;
        },
      },
      shadow: {
        get: function() {
          return this._shadow;
        },
        set: function(v) {
          this._dirtyDraw = true;
          this._shadow = v;
        },
      },
      shadowBlur: {
        get: function() {
          return this._shadowBlur;
        },
        set: function(v) {
          this._dirtyDraw = true;
          this._shadowBlur = v;
        },
      },
    },
  });

  /**
   * @class phina.display.RectangleShape
   * 
   */
  phina.define('phina.display.RectangleShape', {
    superClass: 'phina.display.Shape',
    init: function(options) {

      options = (options || {}).$safe({
        backgroundColor: 'transparent',
        fill: 'blue',
        stroke: '#aaa',
        strokeWidth: 4,

        cornerRadius: 0,
      });
      this.superInit(options);

      this.cornerRadius = options.cornerRadius;
    },

    _render: function() {
      this.canvas.width = this.width + this.padding*2;
      this.canvas.height= this.height + this.padding*2;
      this.canvas.clearColor(this.backgroundColor);

      this.canvas.transformCenter();

      if (this.stroke) {
        this.canvas.context.lineWidth = this.strokeWidth;
        this.canvas.strokeStyle = this.stroke;
        this.canvas.strokeRoundRect(-this.width/2, -this.height/2, this.width, this.height, this.cornerRadius);
      }

      this.canvas.context.fillStyle = this.fill;
      this.canvas.fillRoundRect(-this.width/2, -this.height/2, this.width, this.height, this.cornerRadius);
    },

    _accessor: {
      cornerRadius: {
        get: function() {
          return this._cornerRadius;
        },
        set: function(v) {
          this._dirtyDraw = true; this._cornerRadius = v;
        },
      }
    },

  });

  /**
   * @class phina.display.Shape
   * 
   */
  phina.define('phina.display.CircleShape', {
    superClass: 'phina.display.Shape',
    init: function(options) {
      options = (options || {}).$safe({
        backgroundColor: 'transparent',
        fill: 'red',
        stroke: '#aaa',
        strokeWidth: 4,

        radius: 32,
      });
      this.superInit(options);

      this.radius = options.radius;
    },

    _render: function() {
      this.canvas.width = this.radius*2 + this.padding*2;
      this.canvas.height= this.radius*2 + this.padding*2;
      this.canvas.clearColor(this.backgroundColor);

      this.canvas.transformCenter();

      if (this.stroke) {
        this.canvas.context.lineWidth = this.strokeWidth;
        this.canvas.strokeStyle = this.stroke;
        this.canvas.strokeCircle(0, 0, this.radius);
      }

      this.canvas.context.fillStyle = this.fill;
      this.canvas.fillCircle(0, 0, this.radius);
    },

    _accessor: {
      radius: {
        get: function() {
          return this._radius;
        },
        set: function(v) {
          this._dirtyDraw = true; this._radius = v;
        },
      }
    },
  });

});

