
phina.namespace(function() {

  /**
   * @class phina.display.Shape
   * 
   */
  phina.define('phina.display.Shape', {
    superClass: 'phina.display.CanvasElement',

    init: function() {
      this.superInit();

      this.canvas = phina.graphics.Canvas();
    },

    observeStyle: function() {
      this._observe = function(changes) {
        this._render();
      }.bind(this);
      Object.observe(this.style, this._observe);
    },

    unobserveStyle: function() {
      Object.unobserve(this.style, this._observe);
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
  });

  /**
   * @class phina.display.Shape
   * 
   */
  phina.define('phina.display.RectangleShape', {
    superClass: 'phina.display.Shape',
    init: function() {
      this.superInit();
      this.style = {
        padding: 4,
        width: 64,
        height: 64,

        color: 'blue',

        strokeWidth: 4,
        strokeColor: '#aaa',

        backgroundColor: 'transparent',
      };
      this.observeStyle();
      this._render();
    },

    _render: function() {
      var style = this.style;
      this.canvas.width = style.width + style.padding*2;
      this.canvas.height= style.height + style.padding*2;
      this.canvas.clearColor(style.backgroundColor);

      this.canvas.transformCenter();
      this.canvas.context.fillStyle = style.color;
      this.canvas.fillRect(-style.width/2, -style.height/2, style.width, style.height);

      this.canvas.context.lineWidth = style.strokeWidth;
      this.canvas.strokeStyle = style.strokeColor;
      this.canvas.strokeRect(-style.width/2, -style.height/2, style.width, style.height);
    },
  });

  /**
   * @class phina.display.Shape
   * 
   */
  phina.define('phina.display.CircleShape', {
    superClass: 'phina.display.Shape',
    init: function() {
      this.superInit();

      this.style = {
        padding: 12,
        radius: 32,
        color: 'red',

        strokeWidth: 4,
        strokeColor: '#aaa',

        backgroundColor: 'transparent',
      };
      this.observeStyle();
      this._render();
    },

    _render: function() {
      var style = this.style;
      this.canvas.width = style.radius*2 + style.padding*2;
      this.canvas.height= style.radius*2 + style.padding*2;
      this.canvas.clearColor(style.backgroundColor);

      this.canvas.transformCenter();

      this.canvas.context.fillStyle = style.color;
      this.canvas.fillCircle(0, 0, style.radius);

      this.canvas.context.lineWidth = style.strokeWidth;
      this.canvas.strokeStyle = style.strokeColor;
      this.canvas.strokeCircle(0, 0, style.radius);

    },
  });

});

