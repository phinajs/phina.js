
phina.namespace(function() {

  /**
   * @class phina.geom.Circle
   * # 円領域を表すクラス
   * キャンバス上の円領域を扱うクラスです。
   * 
   */
  phina.define('phina.geom.Circle', {

    /**
     * @property {Number} x
     * 円の中心の x 座標
     */
    x: 0,
    /**
     * @property {Number} y
     * 円の中心の y 座標
     */
    y: 0,
    /**
     * @property {Number} radius
     * 円の半径
     */
    radius: 32,

    /**
     * @method init
     * 円領域のコンストラクタです。
     *
     * ### Example
     *     circle = phina.geom.Circle(32, 64, 128);
     *
     * @param {Number} x 円の中心の x 座標
     * @param {Number} y 円の中心の y 座標
     * @param {Number} radius 半径
     * @return {phina.geom.Rect} 円領域オブジェクト
     */
    init: function(x, y, radius) {
      this.set(x, y, radius);
    },

    /**
     * @method set
     * @chainable
     * this の各値を再設定します。
     *
     * ### Example
     *     circle = phina.geom.Circle(32, 64, 128);
     *     circle.set(100, 200, 32);
     *
     * @param {Number} x 円を囲う矩形の左上頂点の x 座標
     * @param {Number} y 円を囲う矩形の左上頂点の x 座標
     * @param {Number} radius 半径
     * @return {phina.geom.Circle} 円領域オブジェクト
     */
    set: function(x, y, radius) {
      this.x = x;
      this.y = y;
      this.radius = radius;

      return this;
    },

    /**
     * @method moveTo
     * @chainable
     * 円領域を座標 (x, y) に移動します。(x, y) は円の中心を表します。
     *
     * ### Example
     *     circle = phina.geom.Circle(300, 300, 40);
     *     circle.left; // => 260
     *     circle.moveTo(100, 100);
     *     circle.left; // => 60
     *
     * @param {Number} x 移動先の x 座標
     * @param {Number} y 移動先の y 座標
     */
    moveTo: function(x, y) {
      this.x = x;
      this.y = y;
      return this;
    },

    /**
     * @method moveBy
     * @chainable
     * 円領域を (x, y) だけ移動します。
     *
     * ### Example
     *     circle = phina.geom.Circle(300, 300, 40);
     *     circle.left; // => 260
     *     circle.moveBy(100, 100);
     *     circle.left; // => 460
     *
     * @param {Number} x 移動量の x 座標
     * @param {Number} y 移動量の y 座標
     */
    moveBy: function(x, y) {
      this.x += x;
      this.y += y;
      return this;
    },

    /**
     * @method contains
     * 座標 (x, y) が円領域の中に含まれるかどうかを返します。
     *
     * ### Example
     *     circle = phina.geom.Circle(300, 300, 100);
     *     circle.contains(350, 350); // =>  true
     *     circle.contains(350, 400); // => false
     *
     * @param {Number} x 判定する対象の x 座標
     * @param {Number} y 判定する対象の y 座標
     * @return {Boolean} 指定した座標が円領域の中に含まれるかどうか
     */
    contains: function(x, y) {
      var lenX = this.x-x;
      var lenY = this.y-y;
      var lenSquared = (lenX*lenX)+(lenY*lenY);

      return lenSquared <= this.radius*this.radius;
    },

    /**
     * @method clone
     * this のコピーを生成して返します。
     *
     * ### Example
     *     circle = phina.geom.Circle(50, 100, 40);
     *     circle2 = circle.clone();
     *     circle2.x == circle.x; // => true
     *
     * @return {Object} 生成した円領域
     */
    clone: function() {
      return phina.geom.Circle(this.x, this.y, this.radius);
    },

    /**
     * @method toRect
     * 円に外接する正方形を表す矩形領域を生成して返します。
     *
     * ### Example
     *     circle = phina.geom.Circle(50, 100, 40);
     *     rect = circle.toRect();
     *     rect.x; // => 10
     *     rect.y; // => 60
     *     rect.width; // => 80
     *
     * @return {Object} 生成した矩形領域
     */
    toRect: function() {
      var size = this.size;
      return phina.geom.Rect(this.x - this.radius, this.y - this.radius, size, size);
    },
    /**
     * @method toArray
     * this の各値を要素とする配列を生成して返します。
     *
     * ### Example
     *     circle = phina.geom.Circle(50, 100, 40);
     *     rect.toArray(); // => [50, 100, 40]
     *
     * @return {Number[]} 生成した配列
     */
    toArray: function() {
      return [this.x, this.y, this.radius];
    },

    _accessor: {
      
      /**
       * @property {Number} left
       * @readonly
       * キャンバス左端から円の左端までの距離
       *
       * 現時点では読み取り専用です。
       *
       * ### Example
       *     circle = phina.geom.Circle(200, 300, 100);
       *     circle.left; // => 100
       *     circle.top; // => 200
       *     circle.right; // => 300
       *     circle.bottom; // => 400
       */
      left: {
        "get": function()   { return this.x - this.radius; },
        "set": function(v)  {
          // TODO: 
        }
      },
      /**
       * @property {Number} top
       * @readonly
       * キャンバス上端から円の上端までの距離
       *
       * 現時点では読み取り専用です。
       */
      top: {
        "get": function()   { return this.y - this.radius; },
        "set": function(v)  {
          // TODO: 
        }
      },
      /**
       * @property {Number} right
       * @readonly
       * キャンバス右端から円の右端までの距離
       *
       * 現時点では読み取り専用です。
       */
      right: {
        "get": function()   { return this.x + this.radius; },
        "set": function(v)  {
          // TODO: 
        }
      },
      /**
       * @property {Number} bottom
       * @readonly
       * キャンバス下端から円の下端までの距離
       *
       * 現時点では読み取り専用です。
       */
      bottom: {
        "get": function()   { return this.y + this.radius; },
        "set": function(v)  {
          // TODO: 
        }
      },
      /**
       * @property {Number} size
       * @readonly
       * 円の直径
       *
       * 現時点では読み取り専用です。
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
