
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

    set: function(m00, m01, m02, m10, m11, m12, m20, m21, m22) {
      this.m00 = m00; this.m01 = m01; this.m02 = m02;
      this.m10 = m10; this.m11 = m11; this.m12 = m12;
      this.m20 = m20; this.m21 = m21; this.m22 = m22;

      return this;
    },

    identity: function() {
      this.m00 = 1; this.m01 = 0; this.m02 = 0;
      this.m10 = 0; this.m11 = 1; this.m12 = 0;
      this.m20 = 0; this.m21 = 0; this.m22 = 1;
      return this;
    },

    /**
     * クローン
     */
    clone: function() {
      return phina.geom.Matrix33(
        this.m00, this.m01, this.m02,
        this.m10, this.m11, this.m12,
        this.m20, this.m21, this.m22
      );
    },

    /**
     * 行列式
     */
    determinant: function() {
      var m00 = this.m00; var m01 = this.m01; var m02 = this.m02;
      var m10 = this.m10; var m11 = this.m11; var m12 = this.m12;
      var m20 = this.m20; var m21 = this.m21; var m22 = this.m22;
      
      return m00*m11*m22 + m10*m21*m02 + m01*m12*m20 - m02*m11*m20 - m01*m10*m22 - m12*m21*m00;
    },

    /**
     * 転置
     */
    transpose: function() {
      var swap = function(a, b) {
        var temp = this[a];
        this[a] = this[b];
        this[b] = temp;
      }.bind(this);

      swap('m01', 'm10');
      swap('m02', 'm20');
      swap('m12', 'm21');
      
      return this;
    },

    /**
     * 逆行列
     */
    invert: function() {
      var m00 = this.m00; var m01 = this.m01; var m02 = this.m02;
      var m10 = this.m10; var m11 = this.m11; var m12 = this.m12;
      var m20 = this.m20; var m21 = this.m21; var m22 = this.m22;

      var det = this.determinant();

      // |m00, m01, m02|
      // |m10, m11, m12|
      // |m20, m21, m22|
      this.m00 = (m11*m22-m12*m21)/det;
      this.m01 = (m10*m22-m12*m20)/det*-1;
      this.m02 = (m10*m21-m11*m20)/det;
      
      this.m10 = (m01*m22-m02*m21)/det*-1;
      this.m11 = (m00*m22-m02*m20)/det;
      this.m12 = (m00*m21-m01*m20)/det*-1;
      
      this.m20 = (m01*m12-m02*m11)/det;
      this.m21 = (m00*m12-m02*m10)/det*-1;
      this.m22 = (m00*m11-m01*m10)/det;
      
      this.transpose();
      
      return this;

    },

    /**
     * 掛け算
     */
    multiply: function(mat) {
        var tm = this.m;
        var om = mat.m;

        var a00 = this.m00, a01 = this.m01, a02 = this.m02;
        var a10 = this.m10, a11 = this.m11, a12 = this.m12;
        var a20 = this.m20, a21 = this.m21, a22 = this.m22;
        var b00 = mat.m00, b01 = mat.m01, b02 = mat.m02;
        var b10 = mat.m10, b11 = mat.m11, b12 = mat.m12;
        var b20 = mat.m20, b21 = mat.m21, b22 = mat.m22;

        this.m00 = a00*b00 + a01*b10 + a02*b20;
        this.m01 = a00*b01 + a01*b11 + a02*b21;
        this.m02 = a00*b02 + a01*b12 + a02*b22;

        this.m10 = a10*b00 + a11*b10 + a12*b20;
        this.m11 = a10*b01 + a11*b11 + a12*b21;
        this.m12 = a10*b02 + a11*b12 + a12*b22;

        this.m20 = a20*b00 + a21*b10 + a22*b20;
        this.m21 = a20*b01 + a21*b11 + a22*b21;
        this.m22 = a20*b02 + a21*b12 + a22*b22;
        
        return this;
    },

    /**
     * ベクトルとの掛け算
     */
    multiplyVector2: function(v) {
      var vx = this.m00*v.x + this.m01*v.y + this.m02;
      var vy = this.m10*v.x + this.m11*v.y + this.m12;
      
      return phina.geom.Vector2(vx, vy);
    },

    // 行
    getRow: function(row) {
      if ( row === 0 ) {
        return [ this.m00, this.m01, this.m02 ];
      }
      else if ( row === 1 ) {
        return [ this.m10, this.m11, this.m12 ];
      }
      else if ( row === 2 ) {
        return [ this.m20, this.m21, this.m22 ];
      }
      else {
        return null;
      }
    },

    // 列
    getCol: function(col) {
      if ( col === 0 ) {
        return [ this.m00, this.m10, this.m20 ];
      }
      else if ( col === 1 ) {
        return [ this.m01, this.m11, this.m21 ];
      }
      else if ( col === 2 ) {
        return [ this.m02, this.m12, this.m22 ];
      }
      else {
        return null;
      }
    },
    /**
     * 文字列化
     */
    toString: function() {
      return "|{m00}, {m01}, {m02}|\n|{m10}, {m11}, {m12}|\n|{m20}, {m21}, {m22}|".format(this);
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
