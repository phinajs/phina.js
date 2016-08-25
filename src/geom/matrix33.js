
phina.namespace(function() {

  /**
   * @class phina.geom.Matrix33
   * # 行列クラス
   * 3x3の行列を表すクラスです。
   * 
   * <pre>
   * | m00 m01 m02 |
   * | m10 m11 m12 |
   * | m20 m21 m22 |
   * </pre>
   */
  phina.define('phina.geom.Matrix33', {

    /**
     * @method init
     * マトリックスクラスのコンストラクタです。
     *
     * 引数は m00, m01, m02, m10, m11, m12, m20, m21, m22 の順に指定します。
     * 引数が9個に満たない場合は単位行列を生成します。
     *
     * ### Example
     *     mat1 = phina.geom.Matrix33(1, 2, 3, 4, 5, 6, 7, 8, 9);
     *     mat2 = phina.geom.Matrix33();
     *     mat1.m00 + mat2.m00; // => 2
     *     mat1.m01 - mat2.m01; // => 2
     *
     * @param {Number...} m00, m01,... 各要素の値
     * @return {phina.geom.Matrix33} 行列オブジェクト
     */
    init: function() {
      if (arguments.length >= 9) {
          this.set.apply(this, arguments);
      }
      else {
          this.identity();
      }
    },

    /**
     * @method set
     * @chainable
     * this の各要素の値を再設定します。
     *
     * ### Example
     *     mat1 = phina.geom.Matrix33(1, 2, 3, 4, 5, 6, 7, 8, 9);
     *     mat2 = phina.geom.Matrix33();
     *     mat2.set(1, 2, 3, 4, 5, 6, 7, 8, 9);
     *     mat1.toString() == mat2.toString(); // => true
     *
     * @param {Number...} m00, m01,... 各要素の値
     * @return {phina.geom.Matrix33} 行列オブジェクト
     */
    set: function(m00, m01, m02, m10, m11, m12, m20, m21, m22) {
      this.m00 = m00; this.m01 = m01; this.m02 = m02;
      this.m10 = m10; this.m11 = m11; this.m12 = m12;
      this.m20 = m20; this.m21 = m21; this.m22 = m22;

      return this;
    },

    /**
     * @method identity
     * @chainable
     * this を単位行列にします。
     *
     * ### Example
     *     mat1 = phina.geom.Matrix33(1, 2, 3, 4, 5, 6, 7, 8, 9);
     *     mat2 = phina.geom.Matrix33();
     *     mat1.identity().toString() == mat2.toString(); // => true
     *
     * @return {phina.geom.Matrix33} 単位行列
     */
    identity: function() {
      this.m00 = 1; this.m01 = 0; this.m02 = 0;
      this.m10 = 0; this.m11 = 1; this.m12 = 0;
      this.m20 = 0; this.m21 = 0; this.m22 = 1;
      return this;
    },

    /**
     * @method clone
     * this のコピーを生成して返します。
     *
     * ### Example
     *     mat1 = phina.geom.Matrix33(1, 2, 3, 4, 5, 6, 7, 8, 9);
     *     mat2 = mat1.clone();
     *     mat1.toString() == mat2.toString(); // => true
     *     mat1 == mat2; // => false
     *
     * @return {phina.geom.Matrix33} 行列オブジェクト
     */
    clone: function() {
      return phina.geom.Matrix33(
        this.m00, this.m01, this.m02,
        this.m10, this.m11, this.m12,
        this.m20, this.m21, this.m22
      );
    },

    /**
     * @method determinant
     * 行列式を返します
     *
     * ### Example
     *     mat1 = phina.geom.Matrix33(0, -2, 0, -1, 3, 1, 4, 2, 1);
     *     mat1.determinant(); // => -10
     *     mat1.identity().determinant(); // => 1
     *
     * @return {Number} 行列式
     */
    determinant: function() {
      var m00 = this.m00; var m01 = this.m01; var m02 = this.m02;
      var m10 = this.m10; var m11 = this.m11; var m12 = this.m12;
      var m20 = this.m20; var m21 = this.m21; var m22 = this.m22;
      
      return m00*m11*m22 + m10*m21*m02 + m01*m12*m20 - m02*m11*m20 - m01*m10*m22 - m12*m21*m00;
    },

    /**
     * @method transpose
     * @chainable
     * 転置行列を返します。
     *
     * ### Example
     *     mat1 = phina.geom.Matrix33(1, 2, 3, 4, 5, 6, 7, 8, 9);
     *     mat2 = phina.geom.Matrix33(1, 4, 7, 2, 5, 8, 3, 6, 9);
     *     mat1.transpose().toString() == mat2.toString(); // => true
     *
     * @return {phina.geom.Matrix33} 転置行列
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
     * @method invert
     * @chainable
     * 逆行列を返します。
     *
     * ### Example
     *     mat1 = phina.geom.Matrix33(0, -1, 1, -1, 4, -2, 1, 1, 1);
     *     mat2 = mat1.clone().invert();
     *     mat3 = mat1.clone().multiply(mat2);
     *     mat3.toString() == phina.geom.Matrix33.IDENTITY.toString(); // => true
     *
     * @return {phina.geom.Matrix33} 逆行列
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
     * @method multiply
     * this に other を乗じます。
     *
     * ### Example
     *     mat1 = phina.geom.Matrix33(0, -1, 1, -1, 4, -2, 1, 1, 1);
     *     mat2 = mat1.clone().invert();
     *     mat3 = mat1.clone().multiply(mat2);
     *     mat3.toString() == phina.geom.Matrix33.IDENTITY.toString(); // => true
     *
     * @param {phina.geom.Matrix33} other 乗じる行列
     * @return {phina.geom.Matrix33} 乗算結果の行列
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
     * @method multiplyVector2
     * this に2次元ベクトル v を乗じます。
     * 2次元ベクトルは (x, y, 1) として乗算します。
     *
     * ### Example
     *     mat = phina.geom.Matrix33(0, -1, 1, -1, 4, -2, 1, 1, 1);
     *     v = phina.geom.Vector2(2, 4)
     *     mat.multiplyVector2(v) // => {x: -3, y: 12}
     *
     * @param {phina.geom.Vector2} v 乗じるベクトル
     * @return {phina.geom.Vector2} 乗算結果のベクトル
     */
    multiplyVector2: function(v) {
      var vx = this.m00*v.x + this.m01*v.y + this.m02;
      var vy = this.m10*v.x + this.m11*v.y + this.m12;
      
      return phina.geom.Vector2(vx, vy);
    },

    // 行
    /**
     * @method getRow
     * row 番目の行を配列で返します。row が 0、1、2 のいずれかでなければ null を返します。
     *
     * ### Example
     *     mat1 = phina.geom.Matrix33(1, 2, 3, 4, 5, 6, 7, 8, 9);
     *     mat1.getRow(0); // [1, 2, 3]
     *     mat1.getRow(1); // [4, 5, 6]
     *     mat1.getRow(9); // null
     *
     * @param {0/1/2} row 行番号
     * @return {Number[]} 行を表す配列
     */
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

    /**
     * @method getCol
     * col 番目の列を配列で返します。col が 0、1、2 のいずれかでなければ null を返します。
     *
     * ### Example
     *     mat1 = phina.geom.Matrix33(1, 2, 3, 4, 5, 6, 7, 8, 9);
     *     mat1.getCol(0); // [1, 4, 7]
     *     mat1.getCol(1); // [2, 5, 8]
     *     mat1.getRow(-1); // null
     *
     * @param {0/1/2} col 列番号
     * @return {Number[]} 列を表す配列
     */
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
     * @method toString
     * 行列を JSON 形式で表現した文字列を返します。
     *
     * ### Example
     *     v = phina.geom.Vector2(3, 4);
     *     v2 = v.clone();
     *     v2.x == v.x; // => true
     *
     * @return {String} JSON 文字列
     */
    toString: function() {
      return "|{m00}, {m01}, {m02}|\n|{m10}, {m11}, {m12}|\n|{m20}, {m21}, {m22}|".format(this);
    },

  });

  /**
   * @property {phina.geom.Matrix33} IDENTITY 単位行列
   * @readonly
   */
  phina.geom.Matrix33.IDENTITY = phina.geom.Matrix33().identity();

});
