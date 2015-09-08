
phina.namespace(function() {

  /**
   * @class phina.geom.Circle
   * 
   */
  phina.define('phina.geom.Circle', {

    /** x */
    x: 0,
    /** y */
    y: 0,
    /** 半径 */
    radius: 32,

    init: function(x, y, radius) {
      this.set(x, y, radius);
    },

    set: function(x, y, radius) {
      this.x = x;
      this.y = y;
      this.radius = radius;

      return this;
    },

    moveTo: function(x, y) {
      this.x = x;
      this.y = y;
      return this;
    },

    moveBy: function(x, y) {
      this.x += x;
      this.y += y;
      return this;
    },

    contains: function(x, y) {
      var lenX = this.x-x;
      var lenY = this.y-y;
      var lenSquared = (lenX*lenX)+(lenY*lenY);

      return lenSquared <= this.radius*this.radius;
    },

    clone: function() {
      return phina.geom.Circle(this.x, this.y, this.radius);
    },

    toRect: function() {
      var size = this.size;
      return phina.geom.Rect(this.x - this.radius, this.y - this.radius, size, size);
    },

    /**
     * 配列に変換
     */
    toArray: function() {
      return [this.x, this.y, this.radius];
    },

    _accessor: {
      
      /**
       * @property  left
       * left
       */
      left: {
        "get": function()   { return this.x - this.radius; },
        "set": function(v)  {
          // TODO: 
        }
      },
      /**
       * @property  top
       * top
       */
      top: {
        "get": function()   { return this.y - this.radius; },
        "set": function(v)  {
          // TODO: 
        }
      },
      /**
       * @property  right
       * right
       */
      right: {
        "get": function()   { return this.x + this.radius; },
        "set": function(v)  {
          // TODO: 
        }
      },
      /**
       * @property  bottom
       * bottom
       */
      bottom: {
        "get": function()   { return this.y + this.radius; },
        "set": function(v)  {
          // TODO: 
        }
      },
      
      /**
       * @property  size
       * size
       */
      size: {
        "get": function()   { return this.radius*2; },
        "set": function(v)  {
          // TODO: 検討中
        },
      },
    }

  });

});
