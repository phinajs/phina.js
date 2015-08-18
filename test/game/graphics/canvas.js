th.describe("graphics.Canvas", function() {

  th.it('setSize', function() {
    var canvas = phina.graphics.Canvas('#world');
    canvas.setSize(256, 256);
  });

  th.it('setSizeToScreen', function() {
    var canvas = phina.graphics.Canvas('#world');
    canvas.setSizeToScreen();
  });

  th.it('fitScreen', function() {
    var canvas = phina.graphics.Canvas('#world');
    canvas.fitScreen();
  });

  th.it('clear', function() {
    var canvas = phina.graphics.Canvas('#world');
    canvas.fillRect(0, 0, 200, 200);
    canvas.clear(50, 50, 50, 50);
  });

  th.it('clearColor', function() {
    var canvas = phina.graphics.Canvas('#world');
    canvas.clearColor('red');
  });

  th.it('fillRect', function() {
    var canvas = phina.graphics.Canvas('#world');
    canvas.fillRect(0, 0, 100, 100);
  });

  th.it('fillStar', function() {
    var canvas = phina.graphics.Canvas('#world');
    canvas.fillStyle = 'hsla(60, 90%, 50%, 1.0)';
    canvas.fillStar(100, 100);
    canvas.fillStar(200, 100, 32);
    canvas.fillStar(300, 100, 32, 10);
    canvas.fillStar(400, 100, 32, 5, 0.2);
    canvas.fillStar(500, 100, 32, 5, null, 90);
  });

  th.it('strokeStar', function() {
    var canvas = phina.graphics.Canvas('#world');
    canvas.strokeStyle = 'hsla(60, 90%, 0%, 1.0)';
    canvas.strokeStar(100, 100);
    canvas.strokeStar(200, 100, 32);
    canvas.strokeStar(300, 100, 32, 10);
    canvas.strokeStar(400, 100, 32, 5, 0.2);
    canvas.strokeStar(500, 100, 32, 5, null, 90);
  });

});

th.describe("bitmap", function() {

  th.it('hoge', function() {
    var canvas = phina.graphics.Canvas('#world');
    canvas.fillRect(0, 0, 100, 100);
  });

  th.it('foo', function() {
    var canvas = phina.graphics.Canvas('#world');
    canvas.fillStar(100, 100);
  });

});
