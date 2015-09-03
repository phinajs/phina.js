
phina.namespace(function() {

  /**
   * @class phina.display.Sprite
   * 
   */
  phina.define('phina.display.Sprite', {
    superClass: 'phina.display.CanvasElement',

    init: function(image) {
      this.superInit();

      // this.image = image;
      this.image = phina.asset.AssetManager.get('image', image);
      this.width = this.image.domElement.width;
      this.height = this.image.domElement.height;
    },

    draw: function(canvas) {
      var image = this.image.domElement;
      // canvas.context.drawImage(this.image, 0, 0, this.image.width, this.image.height);
      canvas.context.drawImage(image,
        0, 0, image.width, image.height,
        -this.width*this.origin.x, -this.height*this.origin.y, this.width, this.height
        );
    },
  });

});

