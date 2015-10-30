


phina.namespace(function() {

  /**
   * @class phina.ui.Button
   * Button
   */
  phina.define('phina.ui.Button', {
    superClass: 'phina.display.Shape',
    /**
     * @constructor
     */
    init: function(options) {
      options = (options || {}).$safe({
        width: 200,
        height: 80,
        backgroundColor: 'transparent',
        fill: 'hsl(200, 80%, 60%)',
        stroke: null,

        cornerRadius: 8,
        text: 'Hello',
        fontColor: 'white',
        fontSize: 32,
        fontFamily: "'HiraKakuProN-W3'", // Hiragino or Helvetica,
      });
      this.superInit(options);

      this.cornerRadius = options.cornerRadius;
      this.text         = options.text;
      this.fontColor    = options.fontColor;
      this.fontSize     = options.fontSize;
      this.fontFamily   = options.fontFamily;

      this.setInteractive(true);
      this.on('pointend', function() {
        this.flare('push');
      });
    },
    _render: function() {
      var canvas = this.canvas;
      var context = canvas.context;

      this._renderBackground();

      canvas.transformCenter();

      // stroke
      if (this.stroke) {
        canvas.context.lineWidth = this.strokeWidth;
        canvas.strokeStyle = this.stroke;
        canvas.strokeRoundRect(-this.width/2, -this.height/2, this.width, this.height, this.cornerRadius);
      }

      // fill
      if (this.fill) {
        canvas.context.fillStyle = this.fill;
        canvas.fillRoundRect(-this.width/2, -this.height/2, this.width, this.height, this.cornerRadius);
      }

      // text
      var font = "{fontSize}px {fontFamily}".format(this);
      context.font = font;
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillStyle = this.fontColor;
      context.fillText(this.text, 0, 0);
    },

    _accessor: {
      cornerRadius: {
        get: function() { return this._cornerRadius; },
        set: function(v) { this._dirtyDraw = true; this._cornerRadius = v; },
      },
      text: {
        get: function() { return this._text; },
        set: function(v) { this._dirtyDraw = true; this._text = v; },
      },
      fontColor: {
        get: function() { return this._fontColor; },
        set: function(v) { this._dirtyDraw = true; this._fontColor = v; },
      },
      fontSize: {
        get: function() { return this._fontSize; },
        set: function(v) { this._dirtyDraw = true; this._fontSize = v; },
      },
      fontFamily: {
        get: function() { return this._fontFamily; },
        set: function(v) { this._dirtyDraw = true; this._fontFamily = v; },
      },

    },
  });

});
