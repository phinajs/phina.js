


describe('#geom', function() {

  describe('Vector2', function() {
    it('init', function() {
      var a = phina.geom.Vector2(1, 2);
      assert.equal(a.x, 1);
      assert.equal(a.y, 2);
    });

    it('toAngle/fromAngle', function() {
      (360).times(function(n) {
        var v = phina.geom.Vector2();
        v.fromAngle(n.toRadian(), 1);
        var degree = v.toAngle().toDegree().floor();
        assert(Math.abs(n-degree) <= 1);
      });
    });

    it('toDegree/fromDegree', function() {
      (360).times(function(n) {
        var v = phina.geom.Vector2();
        v.fromDegree(n);
        var degree = v.toDegree().floor();
        assert(Math.abs(n-degree) <= 1);
      });
    });

    it('rotate', function() {
      (-180).step(+180, 1, function(n) {
        var v = phina.geom.Vector2().fromAngle((n - 1).toRadian());
        v.rotate((+1).toRadian());

        var deg = Math.abs(n - v.toAngle().toDegree());
        if (359 < deg) { deg = (deg - 360).abs(); }

        assert(deg < 0.0001);
      });

      (-180).step(+180, 1, function(n) {
        var v = phina.geom.Vector2().fromAngle((n + 1).toRadian());
        v.rotate((-1).toRadian());

        var deg = Math.abs(n - v.toAngle().toDegree());
        if (359 < deg) { deg = (deg - 360).abs(); }

        assert(deg < 0.0001);
      });

      var center = phina.geom.Vector2(1, 2);
      (-180).step(+180, 1, function(n) {
        var v1 = phina.geom.Vector2().fromAngle((n + 1).toRadian()).add(center);
        var v2 = phina.geom.Vector2().fromAngle((n).toRadian()).add(center);

        v2.rotate((1).toRadian(), center);

        assert(phina.geom.Vector2.distance(v1, v2) < 0.0001);
      });
    });

    it('random', function() {
      var v = phina.geom.Vector2(0, 180).random();
      console.log(v);
    });

    it('static.random', function() {
      var v = phina.geom.Vector2.random();
      console.log(v);
    });
  });

  describe('Matrix33', function() {
    it('init', function() {
      var a = phina.geom.Matrix33();

      assert.equal(a.toString(), phina.geom.Matrix33.IDENTITY.toString());
    });

    it('set', function() {
      var a = phina.geom.Matrix33(1, 2, 3, 4, 5, 6, 7, 8, 9);
      var b = phina.geom.Matrix33().set(1, 2, 3, 4, 5, 6, 7, 8, 9);

      assert.equal(a.toString(), b.toString());
    });

    it('identity', function() {
      var a = phina.geom.Matrix33(1, 2, 3, 4, 5, 6, 7, 8, 9);
      a.identity();

      assert.equal(a.toString(), phina.geom.Matrix33.IDENTITY.toString());
    });

    it('determinant', function() {
      var a = phina.geom.Matrix33(0, -2, 0, -1, 3, 1, 4, 2, 1);
      var d = a.determinant();

      assert.equal(d, -10);
    });

    it('transpose', function() {
      var a = phina.geom.Matrix33(1, 2, 3, 4, 5, 6, 7, 8, 9);
      a.transpose();
      var b = phina.geom.Matrix33(1, 4, 7, 2, 5, 8, 3, 6, 9);

      assert.equal(a.toString(), b.toString());
    });

    it('clone', function() {
      var a = phina.geom.Matrix33(1, 2, 3, 4, 5, 6, 7, 8, 9);
      var b = a.clone();

      assert.equal(a.toString(), b.toString());
    });

    it('invert', function() {
      var a = phina.geom.Matrix33(0, -1, 1, -1, 4, -2, 1, 1, 1);
      var b = a.clone().invert();
      var c = a.clone().multiply(b);

      assert.equal(c.toString(), phina.geom.Matrix33.IDENTITY.toString());
    });

    it('getRow', function() {
      var a = phina.geom.Matrix33(
        1, 2, 3,
        4, 5, 6,
        7, 8, 9);
      assert(a.getRow(0).equals([1, 2, 3]));
      assert(a.getRow(1).equals([4, 5, 6]));
      assert(a.getRow(2).equals([7, 8, 9]));
      assert.equal(a.getRow(-1), null);
      assert.equal(a.getRow(3), null)
    });

    it('getCol', function() {
      var a = phina.geom.Matrix33(
        1, 2, 3,
        4, 5, 6,
        7, 8, 9);
      assert(a.getCol(0).equals([1, 4, 7]));
      assert(a.getCol(1).equals([2, 5, 8]));
      assert(a.getCol(2).equals([3, 6, 9]));
      assert.equal(a.getCol(-1), null);
      assert.equal(a.getCol(3), null);
    });
  });


  describe('Rect', function() {
    it('init', function() {
      var r = phina.geom.Rect(8, 16, 32, 64);

      assert.equal(r.x, 8);
      assert.equal(r.y, 16);
      assert.equal(r.width, 32);
      assert.equal(r.height, 64);
    });

    it('set', function() {
      var rect  = phina.geom.Rect(1, 2, 3, 4);
      rect.set(32, 64, 100, 200);

      assert(rect.x === 32);
      assert(rect.y === 64);
      assert(rect.width  === 100);
      assert(rect.height === 200);
    });
    
    it('moveTo', function() {
      var rect  = phina.geom.Rect(32, 64, 100, 200);
      rect.moveTo(50, 100);

      assert(rect.x === 50);
      assert(rect.y === 100);
      assert(rect.width  === 100);
      assert(rect.height === 200);
    });
    
    it('moveBy', function() {
      var rect  = phina.geom.Rect(32, 64, 100, 200);
      rect.moveBy(100, 200);

      assert(rect.x === 132);
      assert(rect.y === 264);
      assert(rect.width  === 100);
      assert(rect.height === 200);
    });
    
    it('setSize', function() {
      var rect  = phina.geom.Rect(32, 64, 100, 200);
      rect.setSize(50, 100);

      assert(rect.x === 32);
      assert(rect.y === 64);
      assert(rect.width  === 50);
      assert(rect.height === 100);
    });
    
    it('padding', function() {
      var rect  = phina.geom.Rect(50, 100, 150, 200);

      rect.set(50, 100, 150, 200);
      rect.padding(10);
      assert(rect.x === 60);
      assert(rect.y ===110);
      assert(rect.width  === 130);
      assert(rect.height === 180);

      rect.set(50, 100, 150, 200);
      rect.padding(10, 20);
      assert(rect.x === 70);
      assert(rect.y ===110);
      assert(rect.width  === 110);
      assert(rect.height === 180);

      rect.set(50, 100, 150, 200);
      rect.padding(10, 20, 30);
      assert(rect.x === 70);
      assert(rect.y ===110);
      assert(rect.width  === 110);
      assert(rect.height === 160);

      rect.set(50, 100, 150, 200);
      rect.padding(10, 20, 30, 40);
      assert(rect.x === 90);
      assert(rect.y ===110);
      assert(rect.width  === 90);
      assert(rect.height === 160);
    });
    
    it('contains', function() {
      var rect  = phina.geom.Rect(32, 64, 128, 128);

      assert.equal(rect.contains(35, 68), true);
      assert.equal(rect.contains(200, 68), false);
    });
    
    it('clone', function() {
      var rect  = phina.geom.Rect(32, 64, 100, 200);
      var rect2 = rect.clone();

      assert(rect2.x === 32);
      assert(rect2.y === 64);
      assert(rect2.width  === 100);
      assert(rect2.height === 200);
    });

    it('toCircle', function() {
      var rect  = phina.geom.Rect(32, 64, 100, 200);
      var circle = rect.toCircle();

      assert(circle.x === 82);
      assert(circle.y === 164);
      assert(circle.radius  === 50);
    });
    
    it('toArray', function() {
      var rect  = phina.geom.Rect(32, 64, 100, 200);
      var arr   = rect.toArray();

      assert(arr.equals([32, 64, 100, 200]));
    });

    it('accessor', function() {
      var rect = phina.geom.Rect(8, 16, 32, 64);

      assert.equal(rect.left, 8);
      assert.equal(rect.right, 40);
      assert.equal(rect.top, 16);
      assert.equal(rect.bottom, 80);

      rect.left = 16;
      assert.equal(rect.left, 16);
      assert.equal(rect.right, 40);
      assert.equal(rect.width, 24);

      rect.right = 64;
      assert.equal(rect.left, 16);
      assert.equal(rect.right, 64);
      assert.equal(rect.width, 48);

      rect.top = 2;
      assert.equal(rect.top, 2);
      assert.equal(rect.bottom, 80);
      assert.equal(rect.height, 78);

      rect.bottom = 256;
      assert.equal(rect.top, 2);
      assert.equal(rect.bottom, 256);
      assert.equal(rect.height, 254);
    });
  });


  /*
   *
   */
  describe('Circle', function() {

    it('init', function() {
      var circle  = phina.geom.Circle(32, 64, 128);
      assert(circle.x === 32);
      assert(circle.y === 64);
      assert(circle.radius ===128);
    });
    
    it('set', function() {
      var circle  = phina.geom.Circle();
      circle.set(32, 64, 128);

      assert(circle.x === 32);
      assert(circle.y === 64);
      assert(circle.radius ===128);
    });
    
    it('moveTo', function() {
      var circle  = phina.geom.Circle(32, 64, 128);
      circle.moveTo(100, 200);

      assert(circle.x === 100);
      assert(circle.y === 200);
      assert(circle.radius ===128);
    });
    
    it('moveBy', function() {
      var circle  = phina.geom.Circle(32, 64, 128);
      circle.moveBy(100, 200);

      assert(circle.x === 132);
      assert(circle.y === 264);
      assert(circle.radius ===128);
    });
    
    it('clone', function() {
      var circle  = phina.geom.Circle(32, 64, 128);
      var circle2 = circle.clone();

      assert(circle2.x === 32);
      assert(circle2.y === 64);
      assert(circle2.radius ===128);
    });
    
    it('toRect', function() {
      var circle  = phina.geom.Circle(100, 200, 100);
      var rect = circle.toRect();

      assert(rect.x === 0);
      assert(rect.y === 100);
      assert(rect.width  === 200);
      assert(rect.height === 200);
    });
    
    it('toArray', function() {
      var circle  = phina.geom.Circle(32, 64, 128);
      var arr = circle.toArray();

      assert(arr.equals([32, 64, 128]));
    });

  });

});

