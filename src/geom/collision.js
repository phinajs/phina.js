
phina.namespace(function() {

  /**
   * @class phina.geom.Collision
   * 
   */
  phina.define('phina.geom.Collision', {

    _static: {
      testCircleCircle: function(circle0, circle1) {
        var distanceSquared = phina.geom.Vector2.distanceSquared(circle0, circle1);
        return distanceSquared <= Math.pow(circle0.radius + circle1.radius, 2);
      },
      testRectRect: function(rect0, rect1) {
        return (rect0.left < rect1.right) && (rect0.right > rect1.left) &&
          (rect0.top < rect1.bottom) && (rect0.bottom > rect1.top);
      },
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
      // 円と2点を結ぶ線分の当たり判定
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
