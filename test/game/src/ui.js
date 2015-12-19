th.describe("ui.Button", function() {

  th.it('init', function() {
    var button = phina.ui.Button().addChildTo(this);
    button.position.set(320, 480);
    button.onpush = function() {
      console.log('pushed');
    };
  });

  th.it('style', function() {
    var button = phina.ui.Button({
      text: 'Hello, world!',
      width: 440,
      height: 120,
      fill: 'red',
      fontColor: 'blue',
      fontSize: 64,
      fontFamily: 'Helvetica',
    }).addChildTo(this);
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
      stroke: 'black',
      color: '#aaa',
      gaugeColor: 'green',
      cornerRadius: 16,
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




th.describe('ui.CircleGauge', function() {

  th.it('default', function() {
    var label = phina.display.Label('full').addChildTo(this);
    label.setPosition(this.gridX.center(), this.gridY.center(-2));

    var g1 = phina.ui.CircleGauge({
      anticlockwise: true,
    }).addChildTo(this);
    g1.position.set(this.gridX.center(), this.gridY.center(-2));

    this.onpointstart = function() {
      g1.value -= 10;
    };

    // gauge.onchange = function() {
    //   label.text = 'change';
    // };
    // gauge.onchanged = function() {
    //   label.text = 'changed';
    // };
    // gauge.onempty = function() {
    //   label.text = 'empty';
    // }
  });
});


