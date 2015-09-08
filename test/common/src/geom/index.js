


describe('#geom', function() {

  describe('Vector2', function() {
    it('init', function() {
      var a = phina.geom.Vector2(1, 2);
      assert.equal(a.x, 1);
      assert.equal(a.y, 2);
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

});

