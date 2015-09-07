
phina.namespace(function() {

  /**
   * @class phina.geom.Rect
   * ベクトルクラス
   */
  phina.define('phina.geom.Rect', {

    /** x */
    x: 0,
    /** y */
    y: 0,
    /** 幅 */
    width: 32,
    /** 高さ */
    height: 32,

    init: function(x, y, width, height) {
      this.set(x, y, width, height);
    },

    set: function(x, y, width, height) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;

      return this;
    },

    clone: function() {
      return phina.geom.Rect(this.x, this.y, this.width, this.height);
    },

    toCircle: function() {
      return phina.geom.Circle()
    },

    _accessor: {
      
      /**
       * @property  width
       * width
       */
      width: {
          "get": function()   { return this._width; },
          "set": function(v)  { this._width = v; }
      },
      
      /**
       * @property  height
       * height
       */
      height: {
          "get": function()   { return this._height; },
          "set": function(v)  { this._height = v; }
      },
    }

  });

});
