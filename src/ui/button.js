


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
    prerender: function(canvas) {
      canvas.roundRect(-this.width/2, -this.height/2, this.width, this.height, this.cornerRadius);
    },

    postrender: function(canvas) {
      var context = canvas.context;
      // text
      var font = "{fontSize}px {fontFamily}".format(this);
      context.font = font;
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillStyle = this.fontColor;
      context.fillText(this.text, 0, 0);
    },

    _defined: function() {
      phina.display.Shape.watchRenderProperty.call(this, 'cornerRadius');
      phina.display.Shape.watchRenderProperty.call(this, 'text');
      phina.display.Shape.watchRenderProperty.call(this, 'fontColor');
      phina.display.Shape.watchRenderProperty.call(this, 'fontSize');
      phina.display.Shape.watchRenderProperty.call(this, 'fontFamily');
    },

  });

});
