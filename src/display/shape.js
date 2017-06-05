
phina.namespace(function() {

  /**
   * @class phina.display.Shape
   * @extends phina.display.PlainElement
   */
  var Shape = phina.define('phina.display.Shape', {
    superClass: 'phina.display.PlainElement',

    init: function(options) {
      options = ({}).$safe(options, {
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

      this.watchDraw = true;
      this._dirtyDraw = true;

      this.on('enterframe', function() {
        // render
        if (this.watchDraw && this._dirtyDraw === true) {
          this.render(this.canvas);
          this._dirtyDraw = false;
        }
      });
    },

    calcCanvasWidth: function() {
      return this.width + this.padding*2;
    },

    calcCanvasHeight: function() {
      return this.height + this.padding*2;
    },

    calcCanvasSize: function () {
      return {
        width: this.calcCanvasWidth(),
        height: this.calcCanvasHeight(),
      };
    },

    isStrokable: function() {
      return this.stroke && 0 < this.strokeWidth;
    },

    prerender: function(canvas) {

    },
    postrender: function(canvas) {

    },
    renderFill: function(canvas) {
      canvas.fill();
    },
    renderStroke: function(canvas) {
      canvas.stroke();
    },

    render: function(canvas) {
      var context = canvas.context;
      // リサイズ
      var size = this.calcCanvasSize();
      canvas.setSize(size.width, size.height);
      // クリアカラー
      canvas.clearColor(this.backgroundColor);
      // 中心に座標を移動
      canvas.transformCenter();

      // 描画前処理
      this.prerender(this.canvas);

      // ストローク描画
      if (this.isStrokable()) {
        context.strokeStyle = this.stroke;
        context.lineWidth = this.strokeWidth;
        context.lineJoin = "round";
        context.shadowBlur = 0;
        this.renderStroke(canvas);
      }

      // 塗りつぶし描画
      if (this.fill) {
        context.fillStyle = this.fill;

        // shadow の on/off
        if (this.shadow) {
          context.shadowColor = this.shadow;
          context.shadowBlur = this.shadowBlur;
        }
        else {
          context.shadowBlur = 0;
        }

        this.renderFill(canvas);
      }

      // 描画後処理
      this.postrender(this.canvas);

      return this;
    },

    _static: {
      watchRenderProperty: function(key) {
        this.prototype.$watch(key, function(newVal, oldVal) {
          if (newVal !== oldVal) {
            this._dirtyDraw = true;
          }
        });
      },
      watchRenderProperties: function(keys) {
        var watchRenderProperty = this.watchRenderProperty || Shape.watchRenderProperty;
        keys.each(function(key) {
          watchRenderProperty.call(this, key);
        }, this);
      },
    },

    _defined: function() {
      this.watchRenderProperties([
        'width',
        'height',
        'radius',
        'padding',
        'backgroundColor',
        'fill',
        'stroke',
        'strokeWidth',
        'shadow',
        'shadowBlur',
      ]);
    },
  });

});

phina.namespace(function() {
  /**
   * @class phina.display.RectangleShape
   * @extends phina.display.Shape
   */
  phina.define('phina.display.RectangleShape', {
    superClass: 'phina.display.Shape',
    init: function(options) {
      options = ({}).$safe(options, {
        backgroundColor: 'transparent',
        fill: 'blue',
        stroke: '#aaa',
        strokeWidth: 4,

        cornerRadius: 0,
      });
      this.superInit(options);

      this.cornerRadius = options.cornerRadius;
    },

    prerender: function(canvas) {
      canvas.roundRect(-this.width/2, -this.height/2, this.width, this.height, this.cornerRadius);
    },

    _defined: function() {
      phina.display.Shape.watchRenderProperty.call(this, 'cornerRadius');
    },
  });
});

phina.namespace(function() {

  /**
   * @class phina.display.CircleShape
   * @extends phina.display.Shape
   */
  phina.define('phina.display.CircleShape', {
    superClass: 'phina.display.Shape',

    init: function(options) {
      options = ({}).$safe(options, {
        backgroundColor: 'transparent',
        fill: 'red',
        stroke: '#aaa',
        strokeWidth: 4,
        radius: 32,
      });
      this.superInit(options);

      this.setBoundingType('circle');
    },

    prerender: function(canvas) {
      canvas.circle(0, 0, this.radius);
    },
  });
});

phina.namespace(function() {
  /**
   * @class phina.display.TriangleShape
   * @extends phina.display.Shape
   */
  phina.define('phina.display.TriangleShape', {
    superClass: 'phina.display.Shape',

    init: function(options) {
      options = ({}).$safe(options, {
        backgroundColor: 'transparent',
        fill: 'green',
        stroke: '#aaa',
        strokeWidth: 4,

        radius: 32,
      });
      this.superInit(options);

      this.setBoundingType('circle');
    },

    prerender: function(canvas) {
      canvas.polygon(0, 0, this.radius, 3);
    },

  });

});

phina.namespace(function() {
  /**
   * @class phina.display.StarShape
   * @extends phina.display.Shape
   */
  phina.define('phina.display.StarShape', {
    superClass: 'phina.display.Shape',
    init: function(options) {
      options = ({}).$safe(options, {
        backgroundColor: 'transparent',
        fill: 'yellow',
        stroke: '#aaa',
        strokeWidth: 4,

        radius: 32,
        sides: 5,
        sideIndent: 0.38,
      });
      this.superInit(options);

      this.setBoundingType('circle');
      this.sides = options.sides;
      this.sideIndent = options.sideIndent;
    },

    prerender: function(canvas) {
      canvas.star(0, 0, this.radius, this.sides, this.sideIndent);
    },

    _defined: function() {
      phina.display.Shape.watchRenderProperty.call(this, 'sides');
      phina.display.Shape.watchRenderProperty.call(this, 'sideIndent');
    },
  });

});

phina.namespace(function() {
  /**
   * @class phina.display.PolygonShape
   * @extends phina.display.Shape
   */
  phina.define('phina.display.PolygonShape', {
    superClass: 'phina.display.Shape',
    init: function(options) {
      options = ({}).$safe(options, {
        backgroundColor: 'transparent',
        fill: 'cyan',
        stroke: '#aaa',
        strokeWidth: 4,

        radius: 32,
        sides: 5,
      });
      this.superInit(options);

      this.setBoundingType('circle');
      this.sides = options.sides;
    },

    prerender: function(canvas) {
      canvas.polygon(0, 0, this.radius, this.sides);
    },

    _defined: function() {
      phina.display.Shape.watchRenderProperty.call(this, 'sides');
    },
  });

});


phina.namespace(function() {
  /**
   * @class phina.display.HeartShape
   * @extends phina.display.Shape
   */
  phina.define('phina.display.HeartShape', {
    superClass: 'phina.display.Shape',
    init: function(options) {
      options = ({}).$safe(options, {
        backgroundColor: 'transparent',
        fill: 'pink',
        stroke: '#aaa',
        strokeWidth: 4,

        radius: 32,
        cornerAngle: 45,
      });
      this.superInit(options);

      this.setBoundingType('circle');
      this.cornerAngle = options.cornerAngle;
    },

    prerender: function(canvas) {
      canvas.heart(0, 0, this.radius, this.cornerAngle);
    },

    _defined: function() {
      phina.display.Shape.watchRenderProperty.call(this, 'cornerAngle');
    },
  });

});

phina.namespace(function () {
  /**
   * @class phina.display.PathShape
   * @extends phina.display.Shape
   */
  var PathShape = phina.define('phina.display.PathShape', {
    superClass: 'phina.display.Shape',
    paths: null,

    init: function (options) {
      options = ({}).$safe(options || {}, PathShape.defaults);

      this.superInit(options);
      this.paths = options.paths || [];
      this.lineJoin = options.lineJoin;
      this.lineCap = options.lineCap;
    },

    setPaths: function (paths) {
      this.paths = paths;
      this._dirtyDraw = true;
      return this;
    },

    clear: function () {
      this.paths.length = 0;
      this._dirtyDraw = true;
      return this;
    },

    addPaths: function (paths) {
      [].push.apply(this.paths, paths);
      this._dirtyDraw = true;
      return this;
    },

    addPath: function (x, y) {
      this.paths.push(phina.geom.Vector2(x, y));
      this._dirtyDraw = true;
      return this;
    },

    getPath: function (i) {
      return this.paths[i];
    },

    getPaths: function () {
      return this.paths;
    },

    changePath: function (i, x, y) {
      this.paths[i].set(x, y);
      this._dirtyDraw = true;
      return this;
    },

    calcCanvasSize: function () {
      var paths = this.paths;
      if (paths.length === 0) {
        return {
          width: this.padding * 2,
          height:this.padding * 2,
        };
      }
      var maxX = -Infinity;
      var maxY = -Infinity;
      var minX = Infinity;
      var minY = Infinity;

      for (var i = 0, len = paths.length; i < len; ++i) {
        var path = paths[i];
        if (maxX < path.x) { maxX = path.x; }
        if (minX > path.x) { minX = path.x; }
        if (maxY < path.y) { maxY = path.y; }
        if (minY > path.y) { minY = path.y; }
      }
      return {
        width: Math.max(Math.abs(maxX), Math.abs(minX)) * 2 + this.padding * 2,
        height: Math.max(Math.abs(maxY), Math.abs(minY)) * 2 + this.padding * 2,
      };
    },

    calcCanvasWidth: function () {
      return this.calcCanvasSize().width;
    },

    calcCanvasHeight: function () {
      return this.calcCanvasSize().height;
    },

    prerender: function (canvas) {
      canvas.lineCap = this.lineCap;
      canvas.lineJoin = this.lineJoin;
      var paths = this.paths;
      if (paths.length > 1) {
        var c = canvas.context;
        var p = paths[0];
        c.beginPath();
        c.moveTo(p.x, p.y);
        for (var i = 1, len = paths.length; i < len; ++i) {
          p = paths[i];
          c.lineTo(p.x, p.y);
        }
      }
    },

    _defined: function () {
      phina.display.Shape.watchRenderProperties.call(this, [
        'lineCap',
        'lineJoin'
      ]);
    },

    _static: {
      defaults: {
        fill: false,
        backgroundColor: 'transparent',
        lineCap: 'round',
        lineJoin:'round',
      },
    }

  });

});
