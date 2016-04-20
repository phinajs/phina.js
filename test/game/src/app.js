th.describe("app.Element", function() {

  th.it('hitTest', function() {
    var group = phina.display.DisplayElement().addChildTo(this);
    group.x = 100;
    group.y = 100;
    group.rotation = 10;

    var shape = phina.display.CircleShape({
      fill: 'blue',
      radius: 64,
    }).addChildTo(group);
    shape.setPosition(320, 280);
    shape.setInteractive(true, 'circle');
    shape.onpointover = function() {
      this.fill = 'red';
    };
    shape.onpointout = function() {
      this.fill = 'blue';
    };

    var shape = phina.display.RectangleShape({
      width: 128,
      height: 64,
    }).addChildTo(group);
    shape.setPosition(320, 480);
    shape.setInteractive(true, 'rect');
    shape.onpointover = function() {
      this.fill = 'red';
    };
    shape.onpointout = function() {
      this.fill = 'blue';
    };
  });

  th.it('fromJSON', function() {
    var elm = phina.display.Shape().addChildTo(this);
    elm.fromJSON({
      x: 100,
      y: 100,
      children: {
        shape: {
          className: 'phina.display.Shape',
          arguments: {
            backgroundColor: 'red',
          },
          x: 100,
          y: 100,
        },
      },
    });
  });

  th.it('toJSON', function() {
    var elm = phina.display.Shape().addChildTo(this);
    elm.fromJSON({
      x: 100,
      y: 100,
      children: {
        shape: {
          className: 'phina.display.Shape',
          arguments: {
            backgroundColor: 'red',
          },
          x: 100,
          y: 100,
        },
      },
    });
    phina.display.CircleShape().addChildTo(elm.shape);
    console.log(elm.toJSON());
    console.log(JSON.stringify(elm.toJSON(), null, '  '));
  });
});
