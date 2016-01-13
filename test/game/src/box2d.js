


th.describe("box2d.Box2dLayer", function() {
  th.it('sample', function() {
    var SCREEN_WIDTH = 640;
    var SCREEN_HEIGHT = 960;
    var layer = phina.box2d.Box2dLayer({
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
    }).addChildTo(this);


    var createFloor = function(x, y, width, height) {
      var shape = phina.display.RectangleShape().addChildTo(this);
      shape.x = x;
      shape.y = y;
      shape.width = shape.width = width;
      shape.height = shape.height = height;
      shape.alpha = 0.5;
      layer.createBody({
        width: shape.width,
        height: shape.height,
        type: 'static', // or kinematic or static 
        shape: 'box', // or box or polygon
        // shape: 'box',
      }).attachTo(shape);
    }.bind(this);

    createFloor(320, 800, 320, 10);
    createFloor(160, 640, 10, 320);
    createFloor(480, 640, 10, 320);

    var createBall = function(x, y) {
      var shape = phina.display.CircleShape().addChildTo(this);
      shape.radius = shape.radius = 32;
      shape.alpha = 0.5;
      shape.position.set(x, y);
      layer.createBody({
        type: 'dynamic', // or kinematic or static 
        shape: 'circle', // or box or polygon
        // shape: 'box',
      }).attachTo(shape);
    }.bind(this);

    createBall(100, 100);
    createBall(200, 200);
    createBall(300, 300);


    this.on('pointstart', function(e) {
      var x = e.pointer.x;
      var y = e.pointer.y;
      createBall(x, y);
    });
  });

});
