
th.describe('geom.Collision', function() {

  th.it('testCircleCircle', function() {
    var circle = phina.display.CircleShape({fill:'green'}).addChildTo(this);
    circle.setPosition(320, 480);
    circle.radius = 128;

    var player = phina.display.CircleShape().addChildTo(this);
    player.radius = 128;

    this.update = function(app) {
      var p = app.pointer;
      player.x = p.x;
      player.y = p.y;

      if (phina.geom.Collision.testCircleCircle(player, circle)) {
        player.fill = 'red';
      }
      else {
        player.fill = 'blue';
      }
    }
  });

  th.it('testRectRect', function() {
    var shape = phina.display.RectangleShape({fill:'green'}).addChildTo(this);
    shape.setPosition(320, 480);

    var player = phina.display.RectangleShape().addChildTo(this);

    this.update = function(app) {
      var p = app.pointer;
      player.x = p.x;
      player.y = p.y;

      if (phina.geom.Collision.testRectRect(player, shape)) {
        player.fill = 'red';
      }
      else {
        player.fill = 'blue';
      }
    }
  });

  th.it('testCircleRect', function() {
    var shape = phina.display.CircleShape({fill:'green'}).addChildTo(this);
    shape.setPosition(320, 480);
    shape.radius = 128;

    var player = phina.display.RectangleShape().addChildTo(this);

    this.update = function(app) {
      var p = app.pointer;
      player.x = p.x;
      player.y = p.y;

      if (phina.geom.Collision.testCircleRect(shape, player)) {
        player.fill = 'red';
      }
      else {
        player.fill = 'blue';
      }
    }
  });

});

