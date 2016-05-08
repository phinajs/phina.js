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
      fontWeight: 'bold',
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
      setTimeout(function() {
        gauge.value = 100;
      }, 1000);
    };
    gauge.onfull = function() {
      label.text = 'full';
    };
  });

  th.it('style', function() {
    var gauge1 = phina.ui.Gauge({
      // backgroundColor: 'red',
      fill: 'red',
      stroke: 'green',
      gaugeColor: 'blue',
      strokeWidth: 8,
    }).addChildTo(this);
    gauge1.position.set(this.gridX.center(), this.gridY.center(-2));
    gauge1.setValue(50);

    var gauge2 = phina.ui.Gauge({
      stroke: 'black',
      fill: 'white',
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

    var g1 = phina.ui.CircleGauge({
      anticlockwise: true,
    }).addChildTo(this);
    g1.position.set(this.gridX.center(), this.gridY.center(-2));
    var label = phina.display.Label('full').addChildTo(this);
    label.setPosition(this.gridX.center(), this.gridY.center(-2));

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


th.describe('ui.LabelArea', function() {

  
  th.it('default', function() {
    phina.ui.LabelArea()
    .addChildTo(this)
    .setPosition(this.gridX.center(), this.gridY.center());
  });
  
  th.it('auto_new_line', function () {
    var label = phina.ui.LabelArea().addChildTo(this);
    label.backgroundColor = '#aaa';
    label.position.set(this.gridX.center(), this.gridY.center());
    label.text = 'あいうえおかきくけこさしすせそ\n';
    label.text += 'Hello, world!\n';
    label.text += ('LabelArea TestString\n').repeat(10);
  });
  
  th.it('scroll', function(){
    var label = phina.ui.LabelArea().addChildTo(this);
    label.backgroundColor = '#aaa';
    label.position.set(this.gridX.center(), this.gridY.center());
    label.text = ('LabelArea test string.\n').repeat(10);

    label.tweener
      .to({
        scrollY: 600,
      },1000,'easeInBack')
      .to({
        scrollY:0,
      }, 1000,'easeInBack')
      .setLoop(true);
  });

  th.it('align', function() {
    // 
    var label = phina.ui.LabelArea().addChildTo(this);
    label.align = 'left';
    label.text = 'left';
    label.backgroundColor = '#aaa';
    label.position.set(640 / 2, this.gridY.span(4));
    label.setSize(200,200);
    // 
    var label = phina.ui.LabelArea('center').addChildTo(this);
    label.align = 'center';
    label.text = 'center';
    label.backgroundColor = '#aaa';
    label.position.set(640 / 2, this.gridY.center());
    label.setSize(200,200);
    // 
    var label = phina.ui.LabelArea('right').addChildTo(this);
    label.align = 'right';
    label.text = 'right';
    label.backgroundColor = '#aaa';
    label.position.set(640 / 2, this.gridY.span(12));
    label.setSize(200,200);
  });

  th.it('verticalAlign', function() {
    // 
    var label = phina.ui.LabelArea().addChildTo(this);
    label.verticalAlign = 'top';
    label.text = 'top';
    label.backgroundColor = '#aaa';
    label.position.set(this.gridX.span(4), this.gridY.span(3));
    label.setSize(200, 200);
    label.padding = 30;
    // 
    var label = phina.ui.LabelArea().addChildTo(this);
    label.verticalAlign = 'middle';
    label.text = 'middle';
    label.backgroundColor = '#aaa';
    label.position.set(this.gridX.span(4), this.gridY.span(13));
    label.setSize(200, 200);
    label.padding = 30;
    // 
    var label = phina.ui.LabelArea().addChildTo(this);
    label.verticalAlign = 0;
    label.text = '0';
    label.backgroundColor = '#aaa';
    label.position.set(this.gridX.span(12), this.gridY.center());
    label.setSize(200, 200);
    label.padding = 30;
    // 
    var label = phina.ui.LabelArea().addChildTo(this);
    label.verticalAlign = -0.3;
    label.text = '-0.3';
    label.backgroundColor = '#aaa';
    label.position.set(this.gridX.span(4), this.gridY.center());
    label.setSize(200, 200);
    label.padding = 30;
    // 
    var label = phina.ui.LabelArea().addChildTo(this);
    label.verticalAlign = 'bottom';
    label.text = 'bottom';
    label.backgroundColor = '#aaa';
    label.position.set(this.gridX.span(12), this.gridY.span(3));
    label.setSize(200, 200);
    label.padding = 30;
    // 
    var label = phina.ui.LabelArea().addChildTo(this);
    label.verticalAlign = 0.2;
    label.text = '0.2';
    label.backgroundColor = '#aaa';
    label.position.set(this.gridX.span(12), this.gridY.span(13));
    label.setSize(200, 200);
    label.padding = 30;
  });

  th.it('lineHeight', function() {
    var text = '\nhoge\nfoo\nbar test test test test';
    var label = phina.ui.LabelArea().addChildTo(this);
    label.backgroundColor = '#aaa';
    label.position.set(this.gridX.span(4), this.gridX.span(6));
    label.setSize(200,200);
    label.text = 'lineHeight = ' + label.lineHeight + text;
    // 
    var label = phina.ui.LabelArea().addChildTo(this);
    label.backgroundColor = '#aaa';
    label.position.set(this.gridX.span(12), this.gridX.span(6));
    label.setSize(200,200);
    label.lineHeight = 1;
    label.text = 'lineHeight = ' + label.lineHeight + text;
    
    var label = phina.ui.LabelArea().addChildTo(this);
    label.backgroundColor = '#aaa';
    label.position.set(this.gridX.span(4), this.gridX.span(12));
    label.setSize(200,200);
    label.lineHeight = 1.5;
    label.text = 'lineHeight = ' + label.lineHeight + text;
    
    // 
    var label = phina.ui.LabelArea().addChildTo(this);
    label.backgroundColor = '#aaa';
    label.position.set(this.gridX.span(12), this.gridX.span(12));
    label.setSize(200,200);
    label.lineHeight = 2;
    label.text = 'lineHeight = ' + label.lineHeight + text;
  });



});

