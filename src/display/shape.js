
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
      this._renderBackground();

      return this;
    },

    _renderBackground: function(width, height, color) {
      width = width || (this.width + this.padding*2);
      height = height || (this.height + this.padding*2);
      color = color || this.backgroundColor;

      this.canvas.width = width;
      this.canvas.height= height;
      this.canvas.clearColor(color);

      return this;
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

});

phina.namespace(function() {
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
      this._renderBackground();

      this.canvas.transformCenter();

      if (this.fill) {
        this.canvas.context.fillStyle = this.fill;
        this.canvas.fillRoundRect(-this.width/2, -this.height/2, this.width, this.height, this.cornerRadius);
      }

      if (this.stroke) {
        this.canvas.context.lineWidth = this.strokeWidth;
        this.canvas.strokeStyle = this.stroke;
        this.canvas.strokeRoundRect(-this.width/2, -this.height/2, this.width, this.height, this.cornerRadius);
      }
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
});

phina.namespace(function() {

  /**
   * @class phina.display.CircleShape
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
      var size = this.radius*2 + this.padding*2;
      this._renderBackground(size, size);

      this.canvas.transformCenter();

      if (this.fill) {
        this.canvas.context.fillStyle = this.fill;
        this.canvas.fillCircle(0, 0, this.radius);
      }

      if (this.stroke) {
        this.canvas.context.lineWidth = this.strokeWidth;
        this.canvas.strokeStyle = this.stroke;
        this.canvas.strokeCircle(0, 0, this.radius);
      }
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

phina.namespace(function() {
  /**
   * @class phina.display.TriangleShape
   *
   */
  phina.define('phina.display.TriangleShape', {
    superClass: 'phina.display.Shape',
    init: function(options) {
      options = (options || {}).$safe({
        backgroundColor: 'transparent',
        fill: 'green',
        stroke: '#aaa',
        strokeWidth: 4,

        radius: 32,
      });
      this.superInit(options);

      this.radius = options.radius;
    },

    _render: function() {
      var size = this.radius*2 + this.padding*2;
      this._renderBackground(size, size);

      var canvas = this.canvas;

      canvas.transformCenter();

      if (this.fill) {
        canvas.context.fillStyle = this.fill;
        canvas.fillPolygon(0, 0, this.radius, 3);
      }

      if (this.stroke) {
        canvas.context.lineWidth = this.strokeWidth;
        canvas.strokeStyle = this.stroke;
        canvas.strokePolygon(0, 0, this.radius, 3);
      }
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

phina.namespace(function() {
  /**
   * @class phina.display.StarShape
   *
   */
  phina.define('phina.display.StarShape', {
    superClass: 'phina.display.Shape',
    init: function(options) {
      options = (options || {}).$safe({
        backgroundColor: 'transparent',
        fill: 'yellow',
        stroke: '#aaa',
        strokeWidth: 4,

        radius: 32,
        sides: 5,
        sideIndent: 0.38,
      });
      this.superInit(options);

      this.radius = options.radius;
      this.sides = options.sides;
      this.sideIndent = options.sideIndent;
    },

    _render: function() {
      var size = this.radius*2 + this.padding*2;
      this._renderBackground(size, size);

      var canvas = this.canvas;

      canvas.transformCenter();

      if (this.fill) {
        canvas.context.fillStyle = this.fill;
        canvas.fillStar(0, 0, this.radius, this.sides, this.sideIndent);
      }

      if (this.stroke) {
        canvas.context.lineWidth = this.strokeWidth;
        canvas.strokeStyle = this.stroke;
        canvas.strokeStar(0, 0, this.radius, this.sides, this.sideIndent);
      }
    },

    _accessor: {
      radius: {
        get: function() { return this._radius; },
        set: function(v) { this._dirtyDraw = true; this._radius = v; },
      },
      sides: {
        get: function() { return this._sides; },
        set: function(v) { this._dirtyDraw = true; this._sides = v; },
      },
      sideIndent: {
        get: function() { return this._sideIndent; },
        set: function(v) { this._dirtyDraw = true; this._sideIndent = v; },
      },
    },
  });

});

phina.namespace(function() {
  /**
   * @class phina.display.PolygonShape
   *
   */
  phina.define('phina.display.PolygonShape', {
    superClass: 'phina.display.Shape',
    init: function(options) {
      options = (options || {}).$safe({
        backgroundColor: 'transparent',
        fill: 'cyan',
        stroke: '#aaa',
        strokeWidth: 4,

        radius: 32,
        sides: 5,
      });
      this.superInit(options);

      this.radius = options.radius;
      this.sides = options.sides;
    },

    _render: function() {
      var size = this.radius*2 + this.padding*2;
      this._renderBackground(size, size);

      var canvas = this.canvas;

      canvas.transformCenter();

      if (this.fill) {
        canvas.context.fillStyle = this.fill;
        canvas.fillPolygon(0, 0, this.radius, this.sides);
      }

      if (this.stroke) {
        canvas.context.lineWidth = this.strokeWidth;
        canvas.strokeStyle = this.stroke;
        canvas.strokePolygon(0, 0, this.radius, this.sides);
      }
    },

    _accessor: {
      radius: {
        get: function() { return this._radius; },
        set: function(v) { this._dirtyDraw = true; this._radius = v; },
      },
      sides: {
        get: function() { return this._sides; },
        set: function(v) { this._dirtyDraw = true; this._sides = v; },
      },
    },
  });

});


phina.namespace(function() {
  /**
   * @class phina.display.HeartShape
   *
   */
  phina.define('phina.display.HeartShape', {
    superClass: 'phina.display.Shape',
    init: function(options) {
      options = (options || {}).$safe({
        backgroundColor: 'transparent',
        fill: 'pink',
        stroke: '#aaa',
        strokeWidth: 4,

        radius: 32,
        cornerAngle: 45,
      });
      this.superInit(options);

      this.radius = options.radius;
      this.cornerAngle = options.cornerAngle;
    },

    _render: function() {
      var size = this.radius*2 + this.padding*2;
      this._renderBackground(size, size);

      var canvas = this.canvas;

      canvas.transformCenter();

      if (this.fill) {
        canvas.context.fillStyle = this.fill;
        canvas.fillHeart(0, 0, this.radius, this.cornerAngle);
      }

      if (this.stroke) {
        canvas.context.lineWidth = this.strokeWidth;
        canvas.strokeStyle = this.stroke;
        canvas.strokeHeart(0, 0, this.radius, this.cornerAngle);
      }
    },

    _accessor: {
      radius: {
        get: function() { return this._radius; },
        set: function(v) { this._dirtyDraw = true; this._radius = v; },
      },
      cornerAngle: {
        get: function() { return this._cornerAngle; },
        set: function(v) { this._dirtyDraw = true; this._cornerAngle = v; },
      },
    },
  });

});

