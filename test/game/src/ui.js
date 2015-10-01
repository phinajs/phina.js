th.describe("ui.Button", function() {

  th.it('init', function() {
    var button = phina.ui.Button().addChildTo(this);
    button.position.set(320, 480);
    button.onpush = function() {
      console.log('pushed');
    };
  });

});