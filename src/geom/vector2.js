
phina.namespace(function() {

  /**
   * @class phina.geom.Vector2
   * ベクトルクラス
   */
  phina.define('phina.geom.Vector2', {

    /** x座標 */
    x: 0,
    /** y座標 */
    y: 0,

    /**
     * @constructor
     */
    init: function(x, y) {
      this.x = x;
      this.y = y;
    },

    /**
     * 複製
     */
    clone: function() {
      return phina.geom.Vector2(this.x, this.y);
    },

    /**
     * 等しいかどうかをチェック
     * @return {Boolean}
     */
    equals: function(v) {
      return (this.x === v.x && this.y === v.y);
    },

    /**
     * セッター
     */
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
     * @return {Number}
     */
    length: function() {
      return Math.sqrt(this.x*this.x + this.y*this.y);
    },
    
    /**
     * 2乗された長さを取得
     * C# の名前を引用
     * or lengthSquare or lengthSqrt
     * @return {Number}
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
    random: function(min, max, len) {
      var degree = phina.util.Random.randfloat(min || 0, max || 360);
      var rad = degree*Math.DEG_TO_RAD;
      var len = len || 1;

      this.x = Math.cos(rad)*len;
      this.y = Math.sin(rad)*len;

      return this;
    },
    
    /**
     * 正規化
     */
    normalize: function() {
      this.div(this.length());
      return this;
    },

    /**
     * 文字列に変換
     * @return {String}
     */
    toString: function() {
      return "{x:{x}, y:{y}}".format(this);
    },

    /**
     * 大体の向きを文字列で取得
     * @return {String}
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
     * 角度に変換
     * @return {Number}
     */
    toAngle: function() {
      var rad = Math.atan2(this.y, this.x);
      return (rad + Math.PI*2)%(Math.PI*2);
    },
    
    /**
     * 角度(radian)と長さでベクトルをセット
     */
    fromAngle: function(rad, len) {
      len = len || 1;
      this.x = Math.cos(rad)*len;
      this.y = Math.sin(rad)*len;
      
      return this;
    },

    /**
     * 角度に変換(degree)
     * @return {Number}
     */
    toDegree: function() {
      return this.toAngle().toDegree();
    },
    
    /**
     * 角度(degree)と長さでベクトルをセット
     */
    fromDegree: function(deg, len) {
      return this.fromAngle(deg.toRadian(), len);
    },

    /**
     * 任意の角度(radian)で回転
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
       * @method
       * @static
       * min
       */
      min: function(a, b) {
        return phina.geom.Vector2(
          (a.x < b.x) ? a.x : b.x,
          (a.y < b.y) ? a.y : b.y
          );
      },

      /**
       * @method
       * @static
       * max
       */
      max: function(a, b) {
        return phina.geom.Vector2(
          (a.x > b.x) ? a.x : b.x,
          (a.y > b.y) ? a.y : b.y
          );
      },

      /**
       * @method
       * @static
       * 加算
       */
      add: function(lhs, rhs) {
        return phina.geom.Vector2(lhs.x+rhs.x, lhs.y+rhs.y);
      },
      
      /**
       * @method
       * @static
       * 減算
       */
      sub: function(lhs, rhs) {
        return phina.geom.Vector2(lhs.x-rhs.x, lhs.y-rhs.y);
      },
      
      /**
       * @method
       * @static
       * 乗算
       */
      mul: function(v, n) {
        return phina.geom.Vector2(v.x*n, v.y*n);
      },
      
      /**
       * @method
       * @static
       * 割算
       */
      div: function(v, n) {
        return phina.geom.Vector2(v.x/n, v.y/n);
      },
      
      /**
       * @method
       * @static
       * 反転
       */
      negate: function(v) {
        return phina.geom.Vector2(-v.x, -v.y);
      },
      
      /**
       * @method
       * @static
       * 内積.
       * 投影ベクトルを求めたり, 類似度に使ったり.
       */
      dot: function(lhs, rhs) {
        return lhs.x * rhs.x + lhs.y * rhs.y;
      },
      
      /**
       * @method
       * @static
       * 外積
       */
      cross: function(lhs, rhs) {
        return (lhs.x*rhs.y) - (lhs.y*rhs.x);
      },
      
      /**
       * @method
       * @static
       * ２点間の距離を返す
       */
      distance: function(lhs, rhs) {
        return Math.sqrt( Math.pow(lhs.x-rhs.x, 2) + Math.pow(lhs.y-rhs.y, 2) );
      },

      distanceSquared: function(lhs, rhs) {
        return Math.pow(lhs.x-rhs.x, 2) + Math.pow(lhs.y-rhs.y, 2);
      },


      /**
       * @method
       * @static
       * マンハッタン距離
       */
      manhattanDistance: function(lhs, rhs) {
        return Math.abs(lhs.x-rhs.x) + Math.abs(lhs.y-rhs.y);
      },
      
      /**
       * @method
       * @static
       * 法線ベクトル
       */
      normal: function(a, b) {
        var temp = phina.geom.Vector2.sub(a, b);

        return phina.geom.Vector2(-temp.y, temp.x);
      },

      /**
       * @method
       * @static
       * 反射ベクトル
       */
      reflect: function(v, normal) {
        var len = phina.geom.Vector2.dot(v, normal);
        var temp= phina.geom.Vector2.mul(normal, 2*len);
        
        return phina.geom.Vector2.sub(v, temp);
      },

      /**
       * @method
       * @static
       * 補間.
       * 0.5 で lhs と rhs の中間ベクトルを求めることができます.
       */
      lerp: function(lhs, rhs, t) {
        // TODO: 
        return phina.geom.Vector2(
          lhs.x + (rhs.x-lhs.x)*t,
          lhs.y + (rhs.y-lhs.y)*t
        );
      },
      
      
      /**
       * @method
       * @static
       * 補間
       */
      slerp: function(lhs, rhs, t) {
          // TODO:
          // cos...
      },

      random: function(min, max, len) {
        return phina.geom.Vector2().random(min, max).mul(len||1);
      },
    },

  });

  phina.geom.Vector2.ZERO = phina.geom.Vector2(0, 0);
  phina.geom.Vector2.LEFT = phina.geom.Vector2(-1, 0);
  phina.geom.Vector2.RIGHT= phina.geom.Vector2(1, 0);
  phina.geom.Vector2.UP   = phina.geom.Vector2(0, -1);
  phina.geom.Vector2.DOWN = phina.geom.Vector2(0, 1);

});
