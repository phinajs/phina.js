
phina.namespace(function() {

  /**
   * @class phina.geom.Rect
   * # 矩形領域を表すクラス
   * キャンバス上の矩形領域を扱うクラスです。
   * 
   */
  phina.define('phina.geom.Rect', {

    /**
     * @property {Number} x
     * 矩形の左上頂点の x 座標
     */
    x: 0,
    /**
     * @property {Number} y
     * 矩形の左上頂点の y 座標
     */
    y: 0,
    /**
     * @property {Number} width
     * 矩形の幅
     */
    width: 32,
    /**
     * @property {Number} hight
     * 矩形の高さ
     */
    height: 32,

    /**
     * @method init
     * 矩形領域のコンストラクタです。
     *
     * ### Example
     *     rect = phina.geom.Rect(8, 16, 32, 64);
     *
     * @param {Number} x 矩形の左上頂点の x 座標
     * @param {Number} y 矩形の左上頂点の y 座標
     * @param {Number} width 幅
     * @param {Number} height 高さ
     * @return {phina.geom.Rect} 矩形領域オブジェクト
     */
    init: function(x, y, width, height) {
      this.set(x, y, width, height);
    },

    /**
     * @method set
     * @chainable
     * this の各値を再設定します。
     *
     * ### Example
     *     rect = phina.geom.Rect(8, 16, 32, 64);
     *     rect.set(0, 16, 32, 64);
     *
     * @param {Number} x 矩形の左上頂点の x 座標
     * @param {Number} y 矩形の左上頂点の y 座標
     * @param {Number} width 幅
     * @param {Number} height 高さ
     */
    set: function(x, y, width, height) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;

      return this;
    },

    /**
     * @method moveTo
     * @chainable
     * 矩形領域を座標 (x, y) に移動します。
     *
     * ### Example
     *     rect = phina.geom.Rect(8, 16, 32, 64);
     *     rect.centerX; // => 24
     *     rect.moveTo(0, 0);
     *     rect.centerX; // => 16
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
     * 矩形領域を (x, y) だけ移動します。
     *
     * ### Example
     *     rect = phina.geom.Rect(8, 16, 32, 64);
     *     rect.moveBy(10, -10);
     *     rect.x; // => 18
     *     rect.y; // => 6
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
     * @method setSizse
     * @chainable
     * 矩形領域の幅と高さを変更します。
     *
     * ### Example
     *     rect = phina.geom.Rect(8, 16, 32, 64);
     *     rect.setSize(10, 20);
     *     rect.width; // => 10
     *     rect.height; // => 20
     *
     * @param {Number} width 幅
     * @param {Number} height 高さ
     */
    setSize: function(w, h) {
      this.width = w;
      this.height = h;
      return this;
    },

    /**
     * @method padding
     * @chainable
     * 矩形領域の中にパディング領域を設定します。
     *
     * 矩形領域自体のサイズはパディング領域の分だけ小さくなります。  
     * 幅の指定方法は CSS の padding 指定と同じように時計回りです。  
     * 引数が1つの場合は上下左右の値、引数が2つの場合は上下と左右の値、引数が３つの場合は上、左右、下の値と解釈します。
     *
     * ### Example
     *     rect = phina.geom.Rect(50, 100, 150, 200);
     *     rect.padding(10);
     *     rect.x; // => 60
     *     rect.y; // => 110
     *     rect.width; // => 130
     *     rect.height; // => 180
     *
     * @param {Number} top 上辺のパディング幅
     * @param {Number} right 右辺のパディング幅
     * @param {Number} bottom 下辺のパディング幅
     * @param {Number} left 左辺のパディング幅
     */
    padding: function(top, right, bottom, left) {
      // css の padding に合わせて時計回りにパラメータ調整
      switch (arguments.length) {
        case 1:
          top = right = bottom = left = arguments[0];
          break;
        case 2:
          top     = bottom = arguments[0];
          right   = left   = arguments[1];
          break;
        case 3:
          top     = arguments[0];
          right   = left = arguments[1];
          bottom  = arguments[2];
          break;
      }
      
      this.x += left;
      this.y += top;
      this.width -= left+right;
      this.height-= top +bottom;
      
      return this;
    },

    /**
     * @method contains
     * 座標 (x, y) が 矩形領域の中に含まれるかどうかを返します。
     *
     * ### Example
     *     rect = phina.geom.Rect(50, 100, 150, 200);
     *     rect.contains(35, 68); // =>  true
     *     rect.contains(200, 68); // => false
     *
     * @param {Number} x 判定する対象の x 座標
     * @param {Number} y 判定する対象の y 座標
     * @return {Boolean} 指定した座標が矩形領域の中に含まれるかどうか
     */
    contains: function(x, y) {
      return this.left <= x && x <= this.right && this.top <= y && y <= this.bottom;
    },

    /**
     * @method clone
     * this のコピーを生成して返します。
     *
     * ### Example
     *     rect = phina.geom.Rect(50, 100, 150, 200);
     *     rect2 = rect.clone();
     *     rect2.x == rect.x; // => true
     *
     * @return {Object} 生成した矩形領域
     */
    clone: function() {
      return phina.geom.Rect(this.x, this.y, this.width, this.height);
    },

    /**
     * @method toCircle
     * 矩形領域内に収まる最大の円領域を生成して返します。
     *
     * ### Example
     *     rect = phina.geom.Rect(32, 64, 100, 200);
     *     circle = rect.toCircle();
     *     circle.x; // => 82
     *     circle.y; // => 164
     *     circle.radius; // => 50
     *
     * @return {Object} 生成した円領域
     */
    toCircle: function() {
      var radius = ((this.width < this.height) ? this.width : this.height)/2;
      return phina.geom.Circle(this.centerX, this.centerY, radius);
    },

    /**
     * @method toArray
     * this の各値を要素とする配列を生成して返します。
     *
     * ### Example
     *     rect = phina.geom.Rect(32, 64, 100, 200);
     *     rect.toArray(); // => [32, 64, 100, 200]
     *
     * @return {Number[]} 生成した配列
     */
    toArray: function() {
      return [this.x, this.y, this.width, this.height];
    },

    _accessor: {
      
      /**
       * @property {Number} left
       * キャンバス左端から矩形領域の左辺までの距離
       *
       * left を変更すると矩形領域の幅（width）が自動的に調整されます。
       *
       * ### Example
       *     rect = phina.geom.Rect(32, 64, 100, 200);
       *     rect.left; // => 32
       *     rect.width; // => 100
       *     rect.right; // => 132
       *     
       *     rect.left = 42;
       *     rect.width; // => 90
       */
      left: {
        "get": function()   { return this.x; },
        "set": function(v)  { this.width -= v-this.x; this.x = v; }
      },
      /**
       * @property {Number} top
       * キャンバス上端から矩形領域の上辺までの位置
       *
       * top を変更すると矩形領域の高さ（height）が自動的に調整されます。
       */
      top: {
        "get": function()   { return this.y; },
        "set": function(v)  { this.height -= v-this.y; this.y = v; }
      },
      /**
       * @property {Number} right
       * キャンバス左端から矩形領域の右辺までの距離
       *
       * right を変更すると矩形領域の幅（width）が自動的に調整されます。
       */
      right: {
        "get": function()   { return this.x + this.width; },
        "set": function(v)  { this.width += v-this.right; },
      },
      /**
       * @property {Number} bottom
       * キャンバス上端から矩形領域の下辺までの位置
       *
       * bottom を変更すると矩形領域の高さ（height）が自動的に調整されます。
       */
      bottom: {
        "get": function()   { return this.y + this.height; },
        "set": function(v)  { this.height += v-this.bottom; },
      },
      
      /**
       * @property {Number} centerX
       * 矩形領域の x 座標
       *
       * 現時点では読み取り専用です。
       */
      centerX: {
        "get": function()   { return this.x + this.width/2; },
        "set": function(v)  {
          // TODO: 検討中
        },
      },
      /**
       * @property {Number} centerY
       * 矩形領域の y 座標
       *
       * 現時点では読み取り専用です。
       */
      centerY: {
        "get": function()   { return this.y + this.height/2; },
        "set": function(v)  {
          // TODO: 検討中
        },
      },
    }

  });

});
