th.describe("canvas", function() {

  th.it('fillRect', function() {
    var canvas = phina.graphics.Canvas('#world');
    canvas.fillRect(0, 0, 100, 100);
  });

  th.it('fillStar', function() {
    var canvas = phina.graphics.Canvas('#world');
    canvas.fillStar(100, 100);
  });

});
