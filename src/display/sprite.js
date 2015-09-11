
phina.namespace(function() {

  /**
   * @class phina.display.Sprite
   * 
   */
  phina.define('phina.display.Sprite', {
    superClass: 'phina.display.CanvasElement',

    init: function(image) {
      this.superInit();

      if (typeof image === 'string') {
        image = phina.asset.AssetManager.get('image', image);
      }
      
      this.image = image;
      this.width = this.image.domElement.width;
      this.height = this.image.domElement.height;

      this.srcRect = {
        x: 0,
        y: 0,
        width: this.width,
        height: this.height,
      };
    },

    draw: function(canvas) {
      var image = this.image.domElement;


      // canvas.context.drawImage(image,
      //   0, 0, image.width, image.height,
      //   -this.width*this.origin.x, -this.height*this.origin.y, this.width, this.height
      //   );

      var srcRect = this.srcRect;
      canvas.context.drawImage(image,
        srcRect.x, srcRect.y, srcRect.width, srcRect.height,
        -this.width*this.originX, -this.height*this.originY, this.width, this.height
        );
    },
  });

});

