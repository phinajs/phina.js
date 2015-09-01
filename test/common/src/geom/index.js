


describe('#geom', function() {

  var indentity 

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

    it('invert', function() {
      var a = phina.geom.Matrix33(0, -1, 1, -1, 4, -2, 1, 1, 1);
      var b = a.clone().invert();
      var c = a.clone().multiply(b);

      assert.equal(c.toString(), phina.geom.Matrix33.IDENTITY.toString());
    });
  });


});

