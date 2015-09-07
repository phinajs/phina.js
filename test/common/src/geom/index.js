


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
    });
  });

});

