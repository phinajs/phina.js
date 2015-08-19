
phina.namespace(function() {

  /**
   * @class phina.geom.Matrix33
   * マトリックスクラス
   */
  phina.define('phina.geom.Matrix33', {

    init: function() {
      // 行列
      this.m11 = 1; this.m12 = 0; this.m13 = 0;
      this.m21 = 0; this.m22 = 1; this.m23 = 0;
      this.m31 = 0; this.m32 = 0; this.m33 = 1;
    },

    identity: function() {
      this.m11 = 1; this.m12 = 0; this.m13 = 0;
      this.m21 = 0; this.m22 = 1; this.m23 = 0;
      this.m31 = 0; this.m32 = 0; this.m33 = 1;
      return this;
    },

    _accessor: {
      /**
       * x
       */
      x: {
        "get": function()   { return this._x; },
        "set": function(v)  { this._x = v; }
      },
    }
    
  });


  phina.geom.Matrix33.IDENTITY = phina.geom.Matrix33().identity();

});
