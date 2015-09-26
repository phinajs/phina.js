
phina.namespace(function() {

  /**
   * @class phina.display.Shape
   * 
   */
  phina.define('phina.display.Shape', {
    superClass: 'phina.display.CanvasElement',

    init: function(style) {
      style = (style || {}).$safe({
        width: 64,
        height: 64,
        padding: 8,
        backgroundColor: '#aaa',
      });
      this.style = phina.util.ChangeDispatcher();
      this.style.register(style);

      this.superInit(style);

      this.canvas = phina.graphics.Canvas();
      this._dirtyDraw = true;
      this.style.onchange = function() {
        this._dirtyDraw = true;
      }.bind(this);

      this.on('enterframe', function() {
        if (this._dirtyDraw === true) {
          this._render();
          this._dirtyDraw = false;
        }
      });

      this._render();
    },

    _render: function() {
      var style = this.style;
      this.canvas.width = style.width + style.padding*2;
      this.canvas.height= style.height + style.padding*2;

      this.canvas.clearColor(style.backgroundColor);
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
          this._width = v;
          this.style.width = v;
        },
      },
      height: {
        get: function() {
          return this._height;
        },
        set: function(v) {
          this._height = v;
          this.style.height = v;
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
    init: function(style) {

      style = (style || {}).$safe({
        color: 'blue',

        stroke: true,
        strokeWidth: 4,
        strokeColor: '#aaa',

        cornerRadius: 0,

        backgroundColor: 'transparent',
      });

      this.superInit(style);
    },

    _render: function() {
      var style = this.style;
      this.canvas.width = style.width + style.padding*2;
      this.canvas.height= style.height + style.padding*2;
      this.canvas.clearColor(style.backgroundColor);

      this.canvas.transformCenter();

      if (style.stroke) {
        this.canvas.context.lineWidth = style.strokeWidth;
        this.canvas.strokeStyle = style.strokeColor;
        this.canvas.strokeRoundRect(-style.width/2, -style.height/2, style.width, style.height, style.cornerRadius);
      }

      this.canvas.context.fillStyle = style.color;
      this.canvas.fillRoundRect(-style.width/2, -style.height/2, style.width, style.height, style.cornerRadius);
    },
  });

  /**
   * @class phina.display.Shape
   * 
   */
  phina.define('phina.display.CircleShape', {
    superClass: 'phina.display.Shape',
    init: function(style) {
      style = (style || {}).$safe({
        color: 'red',
        radius: 32,

        stroke: true,
        strokeWidth: 4,
        strokeColor: '#aaa',

        cornerRadius: 0,

        backgroundColor: 'transparent',
      });

      this.superInit(style);
    },

    _render: function() {
      var style = this.style;
      this.canvas.width = style.radius*2 + style.padding*2;
      this.canvas.height= style.radius*2 + style.padding*2;
      this.canvas.clearColor(style.backgroundColor);

      this.canvas.transformCenter();

      if (style.stroke) {
        this.canvas.context.lineWidth = style.strokeWidth;
        this.canvas.strokeStyle = style.strokeColor;
        this.canvas.strokeCircle(0, 0, style.radius);
      }

      this.canvas.context.fillStyle = style.color;
      this.canvas.fillCircle(0, 0, style.radius);
    },

    _accessor: {
      radius: {
        get: function() {
          return this.style.radius;
        },
        set: function(v) {
          this.style.radius = v;
        },
      }
    },
  });

});

