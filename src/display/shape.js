
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
      this.style = phina.util.ChangeDispatcher();

      this.style.onchange = function() {
        this._render();
      }.bind(this);

      this.style.register('backgroundColor', '#aaa');
      this.style.register('width', 64);
      this.style.register('height', 64);
      this.style.register('padding', 8);
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
   * @class phina.display.RectangleShape
   * 
   */
  phina.define('phina.display.RectangleShape', {
    superClass: 'phina.display.Shape',
    init: function() {
      this.superInit();

      this.style.register('color', 'blue');

      this.style.register('strokeWidth', 4);
      this.style.register('strokeColor', '#aaa');

      this.style.register('cornerRadius', 0);

      this.style.register('backgroundColor', 'transparent');

      this._render();
    },

    _render: function() {
      var style = this.style;
      this.canvas.width = style.width + style.padding*2;
      this.canvas.height= style.height + style.padding*2;
      this.canvas.clearColor(style.backgroundColor);

      this.canvas.transformCenter();
      this.canvas.context.fillStyle = style.color;
      this.canvas.context.lineWidth = style.strokeWidth;
      this.canvas.strokeStyle = style.strokeColor;

      if (style.cornerRadius > 0) {
        this.canvas.strokeRoundRect(-style.width/2, -style.height/2, style.width, style.height, style.cornerRadius);
        this.canvas.fillRoundRect(-style.width/2, -style.height/2, style.width, style.height, style.cornerRadius);
      }
      else {
        this.canvas.strokeRect(-style.width/2, -style.height/2, style.width, style.height);
        this.canvas.fillRect(-style.width/2, -style.height/2, style.width, style.height);
      }
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

      this.style.register('color', 'red');
      this.style.register('radius', 32);

      this.style.register('strokeWidth', 4);
      this.style.register('strokeColor', '#aaa');

      this.style.register('backgroundColor', 'transparent');
      
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

