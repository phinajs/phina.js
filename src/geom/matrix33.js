
phina.namespace(function() {

  /**
   * @class phina.geom.Matrix33
   * マトリックスクラス
   */
  phina.define('phina.geom.Matrix33', {

    /**
     * @constructor
     * m00 m01 m02
     * m10 m11 m12
     * m20 m21 m22
     */
    init: function() {
      if (arguments.length >= 9) {
          this.set.apply(this, arguments);
      }
      else {
          this.identity();
      }
    },

    set: function(m11, m12, m13, m21, m22, m23, m31, m32, m33) {
      this.m11 = m11; this.m12 = m12; this.m13 = m13;
      this.m21 = m21; this.m22 = m22; this.m23 = m23;
      this.m31 = m31; this.m32 = m32; this.m33 = m33;
      return this;
    },

    identity: function() {
      this.m11 = 1; this.m12 = 0; this.m13 = 0;
      this.m21 = 0; this.m22 = 1; this.m23 = 0;
      this.m31 = 0; this.m32 = 0; this.m33 = 1;
      return this;
    },

    /**
     * クローン
     */
    clone: function() {
      return phina.geom.Matrix33(
        this.m11, this.m12, this.m13,
        this.m21, this.m22, this.m23,
        this.m31, this.m32, this.m33
      );
    },

    /**
     * 逆行列
     */
    invert: function() {
      var m = this.m;
      var m11 = this.m11; var m12 = this.m12; var m13 = this.m13; 
      var m21 = this.m21; var m22 = this.m22; var m23 = this.m23; 
      var m31 = this.m31; var m32 = this.m32; var m33 = this.m33; 
      var det = this.determinant();
      
      // |m00, m01, m02|
      // |m10, m11, m12|
      // |m20, m21, m22|
      
      this.m11 = (m22*m33-m23*m32)/det;
      this.m12 = (m21*m33-m23*m31)/det*-1;
      this.m13 = (m21*m32-m22*m31)/det;
      
      this.m21 = (m12*m33-m13*m32)/det*-1;
      this.m22 = (m11*m33-m13*m31)/det;
      this.m23 = (m11*m32-m12*m31)/det*-1;
      
      this.m31 = (m12*m23-m13*m22)/det;
      this.m32 = (m11*m23-m13*m21)/det*-1;
      this.m33 = (m11*m22-m12*m21)/det;
      
      this.transpose();
      
      return this;

    },

    /**
     * 行列式
     */
    determinant: function() {
      var m11 = this.m11; var m12 = this.m12; var m13 = this.m13; 
      var m21 = this.m21; var m22 = this.m22; var m23 = this.m23; 
      var m31 = this.m31; var m32 = this.m32; var m33 = this.m33; 
      
      return m11*m22*m33 + m21*m32*m13 + m12*m23*m31 - m13*m22*m31 - m12*m21*m33 - m23*m32*m11;
    },

    /**
     * 転置
     */
    transpose: function() {
      var swap = function(a, b) {
        var temp = this[a];
        this[a] = this[b];
        this[b] = this[a];
      }.bind(this);

      swap('m12', 'm21');
      swap('m13', 'm31');
      swap('m23', 'm32');
      
      return this;
    },

    /**
     * ベクトルとの掛け算
     */
    multiplyVector2: function(v) {
      var vx = this.m11*v.x + this.m12*v.y + this.m13;
      var vy = this.m21*v.x + this.m22*v.y + this.m23;
      
      return phina.geom.Vector2(vx, vy);
    },

    // 行
    getRow: function() {
      // TODO:
    },

    // 列
    getCol: function() {
      // TODO:
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
