
phina.namespace(function() {

  /**
   * @class phina.geom.Collision
   * # 衝突判定用クラス
   * 衝突判定のためのクラスです。すべてのメソッドがスタティックメソッドです。
   * 
   */
  phina.define('phina.geom.Collision', {

    _static: {
      /**
       * @method testCircleCircle
       * @static
       * 2つの円領域が重なっているかどうかを判定します
       *
       * ### Example
       *     circle1 = phina.geom.Circle(100, 100, 30);
       *     circle2 = phina.geom.Circle(130, 140, 30);
       * phina.geom.Collision.testCircleCircle(circle1, circle2); // => true
       *
       * @param {phina.geom.Circle} circle1 円領域オブジェクト
       * @param {phina.geom.Circle} circle2 円領域オブジェクト
       * @return {Boolean} 領域が重なっているかどうか
       */
      testCircleCircle: function(circle0, circle1) {
        var distanceSquared = phina.geom.Vector2.distanceSquared(circle0, circle1);
        return distanceSquared <= Math.pow(circle0.radius + circle1.radius, 2);
      },
      /**
       * @method testRectRect
       * @static
       * 2つの矩形領域が重なっているかどうかを判定します
       *
       * ### Example
       *     rect1 = phina.geom.Rect(100, 100, 30, 40);
       *     rect2 = phina.geom.Rect(200, 200, 10, 10);
       *     phina.geom.Collision.testRectRect(rect1, rect2); // => false
       *
       * @param {phina.geom.Rect} rect1 矩形領域オブジェクト
       * @param {phina.geom.Rect} rect2 矩形領域オブジェクト
       * @return {Boolean} 領域が重なっているかどうか
       */
      testRectRect: function(rect0, rect1) {
        return (rect0.left < rect1.right) && (rect0.right > rect1.left) &&
          (rect0.top < rect1.bottom) && (rect0.bottom > rect1.top);
      },
      /**
       * @method testCircleRect
       * @static
       * 円領域と矩形領域が重なっているかどうかかを判定します
       *
       * ### Example
       *     circle = phina.geom.Circle(100, 100, 30);
       *     rect = phina.geom.Rect(100, 100, 30, 40);
       *     phina.geom.Collision.testCircleRect(circle, rect); // => true
       *
       * @param {phina.geom.Circle} circle 円領域オブジェクト
       * @param {phina.geom.Rect} rect 矩形領域オブジェクト
       * @return {Boolean} 領域が重なっているかどうか
       */
      testCircleRect: function(circle, rect) {
        // まずは大きな矩形で判定(高速化)
        var bigRect = phina.geom.Rect(rect.left-circle.radius, rect.top-circle.radius, rect.width+circle.radius*2, rect.height+circle.radius*2);
        if (bigRect.contains(circle.x, circle.y) === false) {
          return false;
        }
        
        // 2種類の矩形と衝突判定
        var r = phina.geom.Rect(rect.left-circle.radius, rect.top, rect.width+circle.radius*2, rect.height);
        if (r.contains(circle.x, circle.y)) {
          return true;
        }
        r.set(rect.left, rect.top-circle.radius, rect.width, rect.height+circle.radius*2);
        if (r.contains(circle.x, circle.y)) {
          return true;
        }
        
        // 円と矩形の４点の判定
        var c = phina.geom.Circle(circle.x, circle.y, circle.radius);
        // left top
        if (c.contains(rect.left, rect.top)) {
          return true;
        }
        // right top
        if (c.contains(rect.right, rect.top)) {
          return true;
        }
        // right bottom
        if (c.contains(rect.right, rect.bottom)) {
          return true;
        }
        // left bottom
        if (c.contains(rect.left, rect.bottom)) {
          return true;
        }
        
        return false;
      },
      /**
       * @method testCircleLine
       * @static
       * 円領域と線分が重なっているかどうかを判定します
       *
       * ### Example
       *     circle = phina.geom.Circle(100, 100, 20);
       *     p1 = phina.geom.Vector2(0, 0);
       *     p2 = phina.geom.Vector2(300, 400);
       *     phina.geom.Collision.testCircleLine(circle, p1, p2); // => true
       *
       * @param {phina.geom.Circle} circle 円領域オブジェクト
       * @param {phina.geom.Vector2} p1 線分の端の座標
       * @param {phina.geom.Vector2} p2 線分の端の座標
       * @return {Boolean} 円領域と線分が重なっているかどうか
       */
      testCircleLine : function(circle, p1, p2) {
        // 先に線分端との判定
        if (circle.contains(p1.x, p1.y) || circle.contains(p2.x, p2.y)) return true;
        // 半径の2乗
        var r2 = circle.radius * circle.radius;
        // 円の中心座標
        var p3 = phina.geom.Vector2(circle.x, circle.y);
        // 各ベクトル
        var p1p2 = phina.geom.Vector2.sub(p1, p2);
        var p1p3 = phina.geom.Vector2.sub(p1, p3);
        var p2p3 = phina.geom.Vector2.sub(p2, p3);
        // 外積
        var cross = phina.geom.Vector2.cross(p1p2, p1p3);
        // 外積の絶対値の2乗
        var cross2 = cross * cross;
        // p1p2の長さの2乗
        var length2 = p1p2.lengthSquared();
        // 円の中心から線分までの垂線の距離の2乗
        var d2 = cross2 / length2;
        // 円の半径の2乗より小さいなら重複
        if (d2 <= r2) {
          var dot1 = phina.geom.Vector2.dot(p1p3, p1p2);
          var dot2 = phina.geom.Vector2.dot(p2p3, p1p2);
          // 通常は内積の乗算
          if (dot1 * dot2 <= 0) return true;
        }
        return false;
      },
    }

  });

});
