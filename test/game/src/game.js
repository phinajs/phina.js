th.describe("game.PieTimer", function() {

  th.it('default', function() {
    var timer = phina.game.PieTimer().addChildTo(this);
    timer.position.set(320, 480);
  });

  th.it('fill', function() {
    var timer = phina.game.PieTimer(10*1000, {
      radius: 128,
      color: 'hsl(180, 70%, 60%)',
      stroke: false,
    }).addChildTo(this);
    timer.position.set(320, 480);
  });

  th.it('stroke', function() {
    var timer = phina.game.PieTimer(10*1000, {
      radius: 128,
      strokeWidth: 16,
      color: 'transparent',
    }).addChildTo(this);
    timer.position.set(320, 480);
  });

});