
phina.namespace(function() {

  /**
   * @class phina.geom.Vector2
   * # 2次元ベクトルクラス
   * 2次元のベクトルや座標を表すクラスです。
   */
  phina.define('phina.geom.Vector2', {

    /** x座標 */
    x: 0,
    /** y座標 */
    y: 0,

    /**
     * @method init
     * 2次元ベクトルのコンストラクタです。
     *
     * ### Example
     *     v = phina.geom.Vector2(3, 4);
     *
     * @param {Number} x ベクトルの x 座標
     * @param {Number} y ベクトルの y 座標
     * @return {phina.geom.Vector2} 2次元ベクトルオブジェクト
     */
    init: function(x, y) {
      this.x = x;
      this.y = y;
    },

    /**
     * @method clone
     * this のコピーを生成して返します。
     *
     * ### Example
     *     v = phina.geom.Vector2(3, 4);
     *     v2 = v.clone();
     *     v2.x == v.x; // => true
     *
     * @return {Object} 生成したベクトル
     */
    clone: function() {
      return phina.geom.Vector2(this.x, this.y);
    },

    /**
     * @method equals
     * this の各要素がすべて other と等しいかどうかを返します。
     *
     * ### Example
     *     v1 = phina.geom.Vector2(3, 4);
     *     v2 = phina.geom.Vector2(5, 6);
     *     v1.equals(v2); // => false
     *
     * @param {phina.geom.Vector2} other 比較する対象のベクトル
     * @return {Boolean} 等しいかどうか
     */
    equals: function(v) {
      return (this.x === v.x && this.y === v.y);
    },

    /**
     * @method set
     * @chainable
     * this の各要素の値を再設定します。
     *
     * ### Example
     *     v = phina.geom.Vector2(3, 4);
     *     v.set(5, 6);
     *
     * @param {Number} x ベクトルの x 座標
     * @param {Number} y ベクトルの y 座標
     * @return {phina.geom.Vector2} 再設定後のベクトル
     */
    set: function(x, y) {
      this.x = x;
      this.y = y;
      return this;
    },

    /**
     * @method add
     * @chainable
     * this に other を加えます。
     *
     * ### Example
     *     v1 = phina.geom.Vector2(3, 4);
     *     v2 = phina.geom.Vector2(5, 6);
     *     v1.add(v2); // => phina.geom.Vector(8, 10)
     *
     * @param {phina.geom.Vector2} other ベクトル
     * @return {phina.geom.Vector2} 加算した結果のベクトル
     */
    add: function(v) {
      this.x += v.x;
      this.y += v.y;
      return this;
    },

    /**
     * @method sub
     * @chainable
     * this から other を減じます。
     *
     * ベクトルが座標を表す場合は、指定した座標から自分自身へと向かうベクトルが得られます。
     * 
     * ### Example
     *     v1 = phina.geom.Vector2(3, 4);
     *     v2 = phina.geom.Vector2(1, 5);
     *     v1.sub(v2); // => phina.geom.Vector(2, -1)
     *
     * @param {phina.geom.Vector2} other ベクトル
     * @return {phina.geom.Vector2} 減算した結果のベクトル
     */
    sub: function(v) {
      this.x -= v.x;
      this.y -= v.y;
      return this;
    },

    /**
     * @method mul
     * @chainable
     * this の各要素に数値 n を乗じます。
     *
     * ### Example
     *     v1 = phina.geom.Vector2(3, 4);
     *     v1.mul(3) // => phina.geom.Vector(9, 12)
     *
     * @param {Number} n 乗じる値
     * @return {phina.geom.Vector2} 乗算した結果のベクトル
     */
    mul: function(n) {
      this.x *= n;
      this.y *= n;
      return this;
    },

    /**
     * @method div
     * @chainable
     * this の各要素を数値 n で割ります。
     *
     * ### Example
     *     v1 = phina.geom.Vector2(8, 16);
     *     v1.div(2) // => phina.geom.Vector(4, 8)
     *
     * @param {Number} n 割る値
     * @return {phina.geom.Vector2} 除算した結果のベクトル
     */
    div: function(n) {
      //console.assert(n != 0, "0 division!!");
      n = n || 0.01;
      this.x /= n;
      this.y /= n;
      return this;
    },

    /**
     * @method negate
     * @chainable
     * this の各要素の正負を反転します。
     *
     * this と同じ大きさで方向が逆のベクトルが得られます。
     *
     * ### Example
     *     v1 = phina.geom.Vector2(3, -4);
     *     v1.negate() // => phina.geom.Vector(-3, 4)
     *
     * @return {phina.geom.Vector2} 反転後のベクトル
     */
    negate: function() {
      this.x = -this.x;
      this.y = -this.y;
      
      return this;
    },

    /**
     * @method dot
     * other との内積を返します。
     *
     * 投影ベクトルを求めたり、類似度の計算に利用することができます。
     *
     * ### Example
     *     v1 = phina.geom.Vector2(3, 4);
     *     v2 = phina.geom.Vector2(-2, 2);
     *     v1.dot(v2) // => 2
     *
     * @param {phina.geom.Vector2} other ベクトル
     * @return {Number} 内積
     */
    dot: function(v) {
      return this.x * v.x + this.y * v.y;
    },

    /**
     * @method cross
     * other との外積（クロス積）を返します。
     *
     * 2次元ベクトルでの外積はベクトルでなく数値を返すことに注意してください。
     * other より this 時計回りにあるときは正の値になり、反時計回りにあるときは負の値になります。
     *
     * ### Example
     *     v1 = phina.geom.Vector2(3, 4);
     *     v2 = phina.geom.Vector2(3, 1);
     *     v1.cross(v2) // => -8
     *
     * @param {phina.geom.Vector2} other ベクトル
     * @return {Number} 外積
     */
    cross: function(v) {
      return (this.x*v.y) - (this.y*v.x);
    },

    /**
     * @method length
     * this の大きさを返します。
     *
     * (memo) magnitude って名前の方が良いかも. 検討中.
     *
     * ### Example
     *     v1 = phina.geom.Vector2(3, 4);
     *     v1.length(); // => 5
     *
     * @return {Number} ベクトルの大きさ
     */
    length: function() {
      return Math.sqrt(this.x*this.x + this.y*this.y);
    },
    
    /**
     * @method lengthSquared
     * this の大きさの自乗を返します。
     *
     * C# の名前を引用（or lengthSquare or lengthSqrt）
     *
     * ### Example
     *     v1 = phina.geom.Vector2(3, 4);
     *     v1.lengthSquared(); // => 25
     *
     * @return {Number} ベクトルの大きさの自乗
     */
    lengthSquared: function() {
      return this.x*this.x + this.y*this.y;
    },
    
    /**
     * @method distance
     * this と other を座標とみなしたときの2点間の距離を返します。
     *
     * ### Example
     *     v1 = phina.geom.Vector2(1, 2);
     *     v2 = phina.geom.Vector2(4, 6);
     *     v1.distance(v2); // => 5
     *
     * @param {phina.geom.Vector2} other 座標を表すベクトル
     * @return {Number} 2点間の距離
     */
    distance: function(v) {
      return Math.sqrt( Math.pow(this.x-v.x, 2) + Math.pow(this.y-v.y, 2) );
    },
    
    /**
     * @method distanceSquared
     * this と other を座標とみなしたときの2点間の距離の自乗を返します。
     *
     * ### Example
     *     v1 = phina.geom.Vector2(1, 2);
     *     v2 = phina.geom.Vector2(4, 6);
     *     v1.distanceSquared(v2); // => 25
     *
     * @param {phina.geom.Vector2} other 座標を表すベクトル
     * @return {Number} 2点間の距離の自乗
     */
    distanceSquared: function(v) {
      return Math.pow(this.x-v.x, 2) + Math.pow(this.y-v.y, 2);
    },

    /**
     * @method random
     * @chainable
     * 角度が min から max の範囲（度単位）で大きさが len のランダムなベクトルを返します。
     *
     * ### Example
     *     phina.geom.Vector2().random(90, 180, 1); // => phina.geom.Vector2(-0.5, 0.866) など
     *
     * @param {Number} [min=0] 角度（度単位）の下限値
     * @param {Number} [max=360] 角度（度単位）の上限値
     * @param {Number} [len=1] 大きさ
     * @return {phina.geom.Vector2} ランダム化したベクトル
     */
    random: function(min, max, len) {
      var degree = phina.util.Random.randfloat(min || 0, max || 360);
      var rad = degree*Math.DEG_TO_RAD;
      var len = len || 1;

      this.x = Math.cos(rad)*len;
      this.y = Math.sin(rad)*len;

      return this;
    },
    
    /**
     * @method normalize
     * @chainable
     * this を正規化します。すなわち、this と同じ方向で大きさが1のベクトルを返します。
     *
     * ### Example
     *     v1 = phina.geom.Vector2(3, 4);
     *     v1.normalize(); // => phina.geom.Vector2(0.6, 0.8)
     *
     * @return {phina.geom.Vector2} 正規化したベクトル
     */
    normalize: function() {
      this.div(this.length());
      return this;
    },

    /**
     * @method toString
     * this を JSON 形式で表現した文字列を返します。
     *
     * ### Example
     *     v1 = phina.geom.Vector2(3, 4);
     *     v1.toString(); // => "{x:3, y:4}"
     *
     * @return {String} JSON 文字列
     */
    toString: function() {
      return "{x:{x}, y:{y}}".format(this);
    },

    /**
     * @method getDirection
     * this のおおよその方向を示した文字列を返します。
     *
     * ### Example
     *     v1 = phina.geom.Vector2(3, 4);
     *     v1.getDirection(); // => "up"
     *
     * @return {String} 方向を表す文字列（"up", "right", "down", "left"）
     */
    getDirection: function() {
      var angle = this.toDegree();
      if (angle < 45) {
        return "right";
      } else if (angle < 135) {
        return "down";
      } else if (angle < 225) {
        return "left"
      } else if (angle < 315) {
        return "up";
      } else {
        return "right";
      }
    },

    /**
     * @method toAngle
     * this と x 軸との角度（ラジアン単位）を返します。
     *
     * ### Example
     *     v1 = phina.geom.Vector2(-2, 0);
     *     v1.toAngle(); // => 3.14159
     *
     * @return {Number} ベクトルの角度（ラジアン単位）
     */
    toAngle: function() {
      var rad = Math.atan2(this.y, this.x);
      return (rad + Math.PI*2)%(Math.PI*2);
    },
    
    /**
     * @method fromAngle
     * @chainable
     * 角度（ラジアン単位）と大きさを指定してベクトルを設定します。
     *
     * ### Example
     *     phina.geom.Vector2().fromAngle(Math.PI/4, 2); // => phina.geom.Vector2(1.4142, 1.4142)
     *
     * @param {Number} rad 角度（ラジアン単位）
     * @param {Number} [len=1] 大きさ
     * @return {phina.geom.Vector2} ベクトル
     */
    fromAngle: function(rad, len) {
      len = len || 1;
      this.x = Math.cos(rad)*len;
      this.y = Math.sin(rad)*len;
      
      return this;
    },

    /**
     * @method toDegree
     * this と x 軸との角度（度単位）を返します。
     *
     * ### Example
     *     v1 = phina.geom.Vector2(-2, 2);
     *     v1.toAngle(); // => 135
     *
     * @return {Number} ベクトルの角度（度単位）
     */
    toDegree: function() {
      return this.toAngle().toDegree();
    },
    
    /**
     * @method fromDegree
     * @chainable
     * 角度（度単位）と大きさを指定してベクトルを設定します。
     *
     * ### Example
     *     phina.geom.Vector2().fromDegree(60, 2); // => phina.geom.Vector2(1, 1.732)
     *
     * @param {Number} deg 角度（度単位）
     * @param {Number} [len=1] 大きさ
     * @return {phina.geom.Vector2} ベクトル
     */
    fromDegree: function(deg, len) {
      return this.fromAngle(deg.toRadian(), len);
    },

    /**
     * @method rotate
     * @chainable
     * this を回転します。
     *
     * ### Example
     *     v1 = phina.geom.Vector2(3, 1);
     *     v1.rotate(Math.PI/2); // => phina.geom.Vector2(-1, 3);
     *
     * @param {Number} rad 角度（ラジアン単位）
     * @param {Number} [center=(0, 0)] 回転の中心座標
     * @return {Number} 回転後のベクトル
     */
    rotate: function(rad, center) {
      center = center || phina.geom.Vector2(0, 0);

      var x1 = this.x - center.x;
      var y1 = this.y - center.y;
      var x2 = x1 * Math.cos(rad) - y1 * Math.sin(rad);
      var y2 = x1 * Math.sin(rad) + y1 * Math.cos(rad);
      this.set( center.x + x2, center.y + y2 );

      return this;
    },

    _accessor: {
    },

    _static: {
      /**
       * @method min
       * @static
       * v1 と v2 の各要素に対し、より小さい方を要素とする新しいベクトルを生成して返します。
       *
       * ### Example
       *     v1 = phina.geom.Vector2(3, 1);
       *     v2 = phina.geom.Vector2(-3, 2);
       *     phina.geom.Vector2.min(v1, v2); // phina.geom.Vector2(-3, 1);
       *
       * @param {phina.geom.Vector2} v1 ベクトル
       * @param {phina.geom.Vector2} v2 ベクトル
       * @return {phina.geom.Vector2} 生成したベクトル
       */
      min: function(a, b) {
        return phina.geom.Vector2(
          (a.x < b.x) ? a.x : b.x,
          (a.y < b.y) ? a.y : b.y
          );
      },

      /**
       * @method max
       * @static
       * 2次元ベクトル v1 と v2 の各要素に対し、より大きい方を要素とする新しいベクトルを生成して返します。
       *
       * ### Example
       *     v1 = phina.geom.Vector2(3, 1);
       *     v2 = phina.geom.Vector2(-3, 2);
       *     phina.geom.Vector2.max(v1, v2); // phina.geom.Vector2(3, 2);
       *
       * @param {phina.geom.Vector2} v1 ベクトル
       * @param {phina.geom.Vector2} v2 ベクトル
       * @return {phina.geom.Vector2} 生成したベクトル
       */
      max: function(a, b) {
        return phina.geom.Vector2(
          (a.x > b.x) ? a.x : b.x,
          (a.y > b.y) ? a.y : b.y
          );
      },

      /**
       * @method add
       * @static
       * v1 に v2 を加算した新しいベクトルを生成して返します。
       *
       * ### Example
       *     v1 = phina.geom.Vector2(3, 1);
       *     v2 = phina.geom.Vector2(-3, 2);
       *     phina.geom.Vector2.add(v1, v2); // phina.geom.Vector2(0, 3);
       *
       * @param {phina.geom.Vector2} v1 ベクトル
       * @param {phina.geom.Vector2} v2 ベクトル
       * @return {phina.geom.Vector2} 加算した結果
       */
      add: function(lhs, rhs) {
        return phina.geom.Vector2(lhs.x+rhs.x, lhs.y+rhs.y);
      },
      
      /**
       * @method sub
       * @static
       * 2次元ベクトル v1 から v2 を減じた新しいベクトルを生成して返します。
       *
       * ベクトルが座標を表す場合、2つ目の座標から1つ目の座標へと向かうベクトルが得られます。
       *
       * ### Example
       *     v1 = phina.geom.Vector2(3, 1);
       *     v2 = phina.geom.Vector2(-3, 2);
       *     phina.geom.Vector2.sub(v1, v2); // phina.geom.Vector2(6, -1);
       *
       * @param {phina.geom.Vector2} v1 ベクトル
       * @param {phina.geom.Vector2} v2 ベクトル
       * @return {phina.geom.Vector2} 減算した結果
       */
      sub: function(lhs, rhs) {
        return phina.geom.Vector2(lhs.x-rhs.x, lhs.y-rhs.y);
      },
      
      /**
       * @method mul
       * @static
       * 2次元ベクトル v の各要素に n を乗じた新しいベクトルを生成して返します。
       *
       * ### Example
       *     v1 = phina.geom.Vector2(3, 1);
       *     phina.geom.Vector2.mul(v1, 2); // phina.geom.Vector2(6, 2)
       *
       * @param {phina.geom.Vector2} v ベクトル
       * @param {phina.geom.Vector2} n 乗じる値
       * @return {phina.geom.Vector2} 乗算した結果
       */
      mul: function(v, n) {
        return phina.geom.Vector2(v.x*n, v.y*n);
      },
      
      /**
       * @method div
       * @static
       * 2次元ベクトル v の各要素を n で割った新しいベクトルを生成して返します。
       *
       * ### Example
       *     v1 = phina.geom.Vector2(3, 1);
       *     phina.geom.Vector2.div(v1, 2); // phina.geom.Vector2(1.5, 0.5)
       *
       * @param {phina.geom.Vector2} v ベクトル
       * @param {phina.geom.Vector2} n 割る値
       * @return {phina.geom.Vector2} 除算した結果
       */
      div: function(v, n) {
        return phina.geom.Vector2(v.x/n, v.y/n);
      },
      
      /**
       * @method negate
       * @static
       * 2次元ベクトル v を反転した新しいベクトルを生成して返します。
       *
       * ### Example
       *     v1 = phina.geom.Vector2(3, 1);
       *     phina.geom.Vector2.negate(); // phina.geom.Vector2(-3, -1)
       *
       * @param {phina.geom.Vector2} v ベクトル
       * @return {phina.geom.Vector2} 反転したベクトル
       */
      negate: function(v) {
        return phina.geom.Vector2(-v.x, -v.y);
      },
      
      /**
       * @method dot
       * @static
       * 2次元ベクトル v1 と v2 の内積を返します。
       *
       * ### Example
       *     v1 = phina.geom.Vector2(3, 4);
       *     v2 = phina.geom.Vector2(-2, 2);
       *     phina.geom.Vector2.dot(v1, v2) // => 2
       *
       * @param {phina.geom.Vector2} v1 ベクトル
       * @param {phina.geom.Vector2} v2 ベクトル
       * @return {phina.geom.Vector2} 内積
       */
      dot: function(lhs, rhs) {
        return lhs.x * rhs.x + lhs.y * rhs.y;
      },
      
      /**
       * @method cross
       * @static
       * 2次元ベクトル v1 と v2 の外積（クロス積）を返します。
       *
       * 2次元ベクトルでの外積はベクトルでなく数値を返すことに注意してください。
       * 1つ目のベクトルが2つ目のベクトルより時計回りにあるときは正の値になり、反時計回りにあるときは負の値になります。
       *
       * ### Example
       *     v1 = phina.geom.Vector2(3, 4);
       *     v2 = phina.geom.Vector2(3, 1);
       *     phina.geom.Vector2.cross(v1, v2); // => -8
       *
       * @param {phina.geom.Vector2} v1 ベクトル
       * @param {phina.geom.Vector2} v2 ベクトル
       * @return {Number} 外積
       */
      cross: function(lhs, rhs) {
        return (lhs.x*rhs.y) - (lhs.y*rhs.x);
      },
      
      /**
       * @method distance
       * @static
       * v1 と v2 を座標とみなしたときの2点間の距離を返します。
       *
       * ### Example
       *     v1 = phina.geom.Vector2(1, 2);
       *     v2 = phina.geom.Vector2(4, 6);
       *     phina.geom.Vector2.distance(v1, v2); // => 5
       *
       * @param {phina.geom.Vector2} v1 座標を表すベクトル
       * @param {phina.geom.Vector2} v2 座標を表すベクトル
       * @return {Number} 2点間の距離
       */
      distance: function(lhs, rhs) {
        return Math.sqrt( Math.pow(lhs.x-rhs.x, 2) + Math.pow(lhs.y-rhs.y, 2) );
      },

      /**
       * @method distanceSquared
       * @static
       * v1 と v2 を座標とみなしたときの2点間の距離の自乗を返します。
       *
       * ### Example
       *     v1 = phina.geom.Vector2(1, 2);
       *     v2 = phina.geom.Vector2(4, 6);
       *     phina.geom.Vector2.distanceSquared(v1, v2); // => 25
       *
       * @param {phina.geom.Vector2} v1 座標を表すベクトル
       * @param {phina.geom.Vector2} v2 座標を表すベクトル
       * @return {Number} 2点間の距離の自乗
       */
      distanceSquared: function(lhs, rhs) {
        return Math.pow(lhs.x-rhs.x, 2) + Math.pow(lhs.y-rhs.y, 2);
      },

      /**
       * @method manhattanDistance
       * @static
       * v1 と v2 を座標とみなしたときの2点間のマンハッタン距離（軸に平行に進むときの最短距離）を返します。
       *
       * ### Example
       *     v1 = phina.geom.Vector2(1, 2);
       *     v2 = phina.geom.Vector2(4, 6);
       *     phina.geom.Vector2.manhattanDistance(v1, v2); // => 7
       *
       * @param {phina.geom.Vector2} v1 座標を表すベクトル
       * @param {phina.geom.Vector2} v2 座標を表すベクトル
       * @return {Number} 2点間のマンハッタン距離
       */
      manhattanDistance: function(lhs, rhs) {
        return Math.abs(lhs.x-rhs.x) + Math.abs(lhs.y-rhs.y);
      },
      
      /**
       * @method normal
       * @static
       * v1 と v2 を座標とみなしたときの、v2 から v1 に向かうベクトルに対する法線ベクトルを返します。
       *
       * ### Example
       *     v1 = phina.geom.Vector2(1, 2);
       *     v2 = phina.geom.Vector2(4, 6);
       *     phina.geom.Vector2.normal(v1, v2); // => phina.geom.Vector2(4, -3)
       *
       * @param {phina.geom.Vector2} v1 座標を表すベクトル
       * @param {phina.geom.Vector2} v2 座標を表すベクトル
       * @return {phina.geom.Vector2} 法線ベクトル
       */
      normal: function(a, b) {
        var temp = phina.geom.Vector2.sub(a, b);

        return phina.geom.Vector2(-temp.y, temp.x);
      },

      /**
       * @method reflect
       * @static
       * 2次元ベクトル v を壁への入射ベクトルとして、壁に反射した際のベクトル（反射ベクトル）を返します。
       *
       * 壁の向きは法線ベクトル normal によって表します。
       *
       * ### Example
       *     v1 = phina.geom.Vector2(4, 3);
       *     normal = phina.geom.Vector2(-1, 1);
       *     phina.geom.Vector2.reflect(v1, normal); // => phina.geom.Vector2(2, 5)
       *
       * @param {phina.geom.Vector2} v 入射ベクトル
       * @param {phina.geom.Vector2} normal 壁の法線ベクトル
       * @return {phina.geom.Vector2} 反射ベクトル
       */
      reflect: function(v, normal) {
        var len = phina.geom.Vector2.dot(v, normal);
        var temp= phina.geom.Vector2.mul(normal, 2*len);
        
        return phina.geom.Vector2.sub(v, temp);
      },
      
      /**
       * @method wall
       * @static
       * 2次元ベクトル v を壁への入射ベクトルとして、壁に沿ったベクトル（壁ずりクトル）を返します。
       *
       * 壁の向きは法線ベクトル normal によって表します。
       *
       * ### Example
       *     v1 = phina.geom.Vector2(4, 3);
       *     normal = phina.geom.Vector2(-1, 1);
       *     phina.geom.Vector2.wall(v1, normal); // => phina.geom.Vector2(3, 4)
       *
       * @param {phina.geom.Vector2} v 入射ベクトル
       * @param {phina.geom.Vector2} normal 壁の法線ベクトル
       * @return {phina.geom.Vector2} 壁ずりベクトル
       */
      wall: function(v, normal) {
        var len = phina.geom.Vector2.dot(v, normal);
        var temp= phina.geom.Vector2.mul(normal, len);
        
        return phina.geom.Vector2.sub(v, temp);
      },
      
      /**
       * @method lerp
       * @static
       * v1 と v2 を媒介変数 t で線形補間します。
       * t=0.5 で v1 と v2 の中間ベクトルを求めることができます。
       *
       * ### Example
       *     v1 = phina.geom.Vector2(1, 2);
       *     v2 = phina.geom.Vector2(4, 6);
       *     phina.geom.Vector2.lerp(v1, v2, 0.5); // => (2.5, 4)
       *     phina.geom.Vector2.lerp(v1, v2, 0); // => (1, 2)
       *     phina.geom.Vector2.lerp(v1, v2, 1); // => (4, 6)
       * 
       * @param {phina.geom.Vector2} v1 ベクトル
       * @param {phina.geom.Vector2} v2 ベクトル
       * @param {Number} t 媒介変数
       * @return {phina.geom.Vector2} 線形補間の結果
       */
      lerp: function(a, b, t) {
        return phina.geom.Vector2(
          a.x + (b.x-a.x)*t,
          a.y + (b.y-a.y)*t
        );
      },
      
      
      /**
       * @method slerp
       * @static
       * 補間（未実装）
       */
      slerp: function(lhs, rhs, t) {
          // TODO:
          // cos...
      },

      /**
       * @method random
       * @static
       * 角度が min から max の範囲（度単位）で大きさが len のランダムなベクトルを生成して返します。
       *
       * ### Example
       *     phina.geom.Vector2.random(90, 180, 1); // => phina.geom.Vector2(-0.5, 0.866) など
       *
       * @param {Number} [min=0] 角度（度単位）の下限値
       * @param {Number} [max=360] 角度（度単位）の上限値
       * @param {Number} [len=1] 大きさ
       * @return {phina.geom.Vector2} 生成したベクトル
       */
      random: function(min, max, len) {
        return phina.geom.Vector2().random(min, max).mul(len||1);
      },
    },

  });

  /**
   * @property {phina.geom.Vector2} ZERO ゼロベクトル
   * @readonly
   */
  phina.geom.Vector2.ZERO = phina.geom.Vector2(0, 0);
  /**
   * @property {phina.geom.Vector2} LEFT 左方向の単位ベクトル
   * @readonly
   */
  phina.geom.Vector2.LEFT = phina.geom.Vector2(-1, 0);
  /**
   * @property {phina.geom.Vector2} RIGHT 右方向の単位ベクトル
   * @readonly
   */
  phina.geom.Vector2.RIGHT= phina.geom.Vector2(1, 0);
  /**
   * @property {phina.geom.Vector2} UP 上方向の単位ベクトル
   * @readonly
   */
  phina.geom.Vector2.UP   = phina.geom.Vector2(0, -1);
  /**
   * @property {phina.geom.Vector2} DOWN 下方向の単位ベクトル
   * @readonly
   */
  phina.geom.Vector2.DOWN = phina.geom.Vector2(0, 1);

});
