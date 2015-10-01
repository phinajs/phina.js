th.describe("ui.Button", function() {

  th.it('init', function() {
    var button = phina.ui.Button().addChildTo(this);
    button.position.set(320, 480);
    button.onpush = function() {
      console.log('pushed');
    };
  });

});

th.describe('ui.Gauge', function() {

  th.it('default', function() {
    var label = phina.display.Label('full').addChildTo(this);
    label.setPosition(this.gridX.center(), this.gridY.center(-2));

    var gauge = phina.ui.Gauge().addChildTo(this);
    gauge.position.set(this.gridX.center(), this.gridY.center());
    this.onpointstart = function() {
      gauge.value -= 10;
    };

    gauge.onchange = function() {
      label.text = 'change';
    };
    gauge.onchanged = function() {
      label.text = 'changed';
    };
    gauge.onempty = function() {
      label.text = 'empty';
    }
  });

  th.it('style', function() {
    var gauge1 = phina.ui.Gauge({
      backgroundColor: 'red',
      color: 'white',
      gaugeColor: 'blue',
    }).addChildTo(this);
    gauge1.position.set(this.gridX.center(), this.gridY.center(-2));
    gauge1.setValue(50);

    var gauge2 = phina.ui.Gauge({
      stroke: false,
      color: '#aaa',
      gaugeColor: 'green',
    }).addChildTo(this);
    gauge2.position.set(this.gridX.center(), this.gridY.center());
    gauge2.setValue(50);

    this.onpointstart = function() {
      gauge1.value -= 10;
      gauge2.value -= 10;
    };
  });

  th.it('timer', function() {
    var label = phina.display.Label('full').addChildTo(this);
    label.setPosition(this.gridX.center(), this.gridY.center(-2));

    var gauge = phina.ui.Gauge({
      value: 1000*4,
      maxValue: 1000*4,
    }).addChildTo(this);
    gauge.position.set(this.gridX.center(), this.gridY.center());

    this.update = function(app) {
      gauge.value -= app.deltaTime;
    };

    gauge.onempty = function() {
      label.text = 'empty';
    }
  });

});





