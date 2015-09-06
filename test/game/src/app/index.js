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

          },
          x: 100,
          y: 100,
        },
      },
    });
  });
});
