th.describe("display.Label", function() {

  th.it('init', function() {
    var label = phina.display.Label('Hello, world!').addChildTo(this);
    label.position.set(640/2, 960/2);
  });

  th.it('hoge', function() {
    var label = phina.display.Label('hoge!').addChildTo(this);
    label.position.set(640/2, 960/2);
  });

});
