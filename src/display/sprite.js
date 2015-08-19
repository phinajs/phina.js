
phina.namespace(function() {

  /**
   * @class phina.display.Sprite
   * 
   */
  phina.define('phina.display.Sprite', {
    superClass: 'phina.display.CanvasElement',

    init: function(image) {
      this.superInit();

      this.image = image;
      this.width = image.width;
      this.height = image.height;
    },

    draw: function(canvas) {

      // canvas.context.drawImage(this.image, 0, 0, this.image.width, this.image.height);
      canvas.context.drawImage(this.image,
        0, 0, this.image.width, this.image.height,
        -this.width*this.origin.x, -this.height*this.origin.y, this.width, this.height
        );
    },
  });

});

