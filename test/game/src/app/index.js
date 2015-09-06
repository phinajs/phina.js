th.describe("app.Element", function() {

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

    console.log(elm.toJSON());
    console.log(JSON.stringify(elm.toJSON(), null, '  '));
  });
});
