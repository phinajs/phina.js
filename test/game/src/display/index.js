th.describe("display.Label", function() {

  th.it('init', function() {
    var app = phina.display.CanvasApp({
      query:'#world',
    });
    var scene = app.currentScene;
    var label = phina.display.Label('hoge').addChildTo(scene);
    label.position.set(100, 100);
    app.run();
  });

});
