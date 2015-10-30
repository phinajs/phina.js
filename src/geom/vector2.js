
phina.namespace(function() {

  /**
   * @class phina.geom.Vector2
   * ベクトルクラス
   */
  phina.define('phina.geom.Vector2', {

    init: function(x, y) {
      this.x = x;
      this.y = y;
    },

    clone: function() {
      return phina.geom.Vector2(this.x, this.y);
    },

    equals: function(v) {
      return (this.x === v.x && this.y === v.y);
    },

    set: function(x, y) {
      this.x = x;
      this.y = y;
      return this;
    },

    /**
     * 加算
     */
    add: function(v) {
      this.x += v.x;
      this.y += v.y;
      return this;
    },

    /**
     * 減算
     */
    sub: function(v) {
      this.x -= v.x;
      this.y -= v.y;
      return this;
    },

    /**
     * 乗算
     */
    mul: function(n) {
      this.x *= n;
      this.y *= n;
      return this;
    },

    /**
     * 除算
     */
    div: function(n) {
      //console.assert(n != 0, "0 division!!");
      n = n || 0.01;
      this.x /= n;
      this.y /= n;
      return this;
    },

    /**
     * 反転
     */
    negate: function() {
      this.x = -this.x;
      this.y = -this.y;
      
      return this;
    },

    /**
     * @method
     * 内積.
     * 投影ベクトルを求めたり, 類似度に使ったり.
     */
    dot: function(v) {
      return this.x * v.x + this.y * v.y;
    },

    /**
     * @method
     * 外積
     */
    cross: function(v) {
      return (this.x*v.y) - (this.y*v.x);
    },

    /**
     * 長さを取得
     * ### memo
     * magnitude って名前の方が良いかも. 検討中.
     */
    length: function() {
      return Math.sqrt(this.x*this.x + this.y*this.y);
    },
    
    /**
     * 2乗された長さを取得
     * C# の名前を引用
     * or lengthSquare or lengthSqrt
     */
    lengthSquared: function() {
      return this.x*this.x + this.y*this.y;
    },
    
    /**
     * ２点間の距離を返す
     */
    distance: function(v) {
      return Math.sqrt( Math.pow(this.x-v.x, 2) + Math.pow(this.y-v.y, 2) );
    },
    
    /**
     * ２点間の距離を返す
     */
    distanceSquared: function(v) {
      return Math.pow(this.x-v.x, 2) + Math.pow(this.y-v.y, 2);
    },

    /**
     * ランダムベクトルをセット
     */
    random: function(min, max) {
      var degree = phina.util.Random.randfloat(min || 0, max || 360);
      var rad = degree*Math.DEG_TO_RAD;

      this.x = Math.cos(rad);
      this.y = Math.sin(rad);

      return this;
    },
    
    /**
     * 正規化
     */
    normalize: function() {
      return this.div(this.length());
    },

    _accessor: {
    },

    _static: {
      distanceSquared: function(lhs, rhs) {
        return Math.pow(lhs.x-rhs.x, 2) + Math.pow(lhs.y-rhs.y, 2);
      },
    },

    _defined: function() {
      
    },

  });

});
