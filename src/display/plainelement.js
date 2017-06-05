
phina.namespace(function() {

  /**
   * @class phina.display.PlainElement
   * @extends phina.display.DisplayElement
   */
  phina.define('phina.display.PlainElement', {
    superClass: 'phina.display.DisplayElement',

    init: function(options) {
      this.superInit(options);
      this.canvas = phina.graphics.Canvas();
      this.canvas.setSize(this.width, this.height);
    },

    draw: function(canvas) {
      var image = this.canvas.domElement;
      var w = image.width;
      var h = image.height;

      var x = -w*this.origin.x;
      var y = -h*this.origin.y;

      canvas.context.drawImage(image,
        0, 0, w, h,
        x, y, w, h
        );
    },
  });

});
