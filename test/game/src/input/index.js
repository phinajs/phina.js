th.describe("input.Touches", function() {

  th.it('init', function() {
    var button = phina.ui.Button().addChildTo(this);
    button.position.set(320-150, 480);
    button.onpointstart = function() {
      this.bg.style.color = 'red';
    };
    button.onpointend = function() {
      this.bg.style.color = 'hsl(200, 80%, 60%)';
    };

    var button = phina.ui.Button().addChildTo(this);
    button.position.set(320+150, 480);
    button.onpointstart = function() {
      this.bg.style.color = 'red';
    };
    button.onpointend = function() {
      this.bg.style.color = 'hsl(200, 80%, 60%)';
    };
  });

});