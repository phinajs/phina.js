
phina.namespace(function() {

  /**
   * @class phina.display.Sprite
   * @extends phina.display.DisplayElement
   */
  phina.define('phina.display.Sprite', {
    superClass: 'phina.display.DisplayElement',

    init: function(image, width, height) {
      this.superInit();

      this.srcRect = phina.geom.Rect();
      this.setImage(image, width, height);
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
        -this._width*this.originX, -this._height*this.originY, this._width, this._height
        );
    },

    setImage: function(image, width, height) {
      if (typeof image === 'string') {
        image = phina.asset.AssetManager.get('image', image);
      }
      this._image = image;
      this.width = this._image.domElement.width;
      this.height = this._image.domElement.height;

      if (width) { this.width = width; }
      if (height) { this.height = height; }

      this.frameIndex = 0;

      return this;
    },

    setFrameIndex: function(index, width, height) {
      var tw  = width || this._width;      // tw
      var th  = height || this._height;    // th
      var row = ~~(this.image.domElement.width / tw);
      var col = ~~(this.image.domElement.height / th);
      var maxIndex = row*col;
      index = index%maxIndex;
      
      var x = index%row;
      var y = ~~(index/row);
      this.srcRect.x = x*tw;
      this.srcRect.y = y*th;
      this.srcRect.width  = tw;
      this.srcRect.height = th;

      this._frameIndex = index;

      return this;
    },

    _accessor: {
      image: {
        get: function() {return this._image;},
        set: function(v) {
          this.setImage(v);
          return this;
        }
      },
      frameIndex: {
        get: function() {return this._frameIndex;},
        set: function(idx) {
          this.setFrameIndex(idx);
          return this;
        }
      },
    },
  });

});

