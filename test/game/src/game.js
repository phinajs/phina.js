th.describe('game.SplashScene', function() {

  th.it('default', function() {
    phina.display.Label('Hello').addChildTo(this).setPosition(320, 480);

    this.onenter = function() {
      this.app.pushScene(phina.game.SplashScene());
    };
  });
});


th.describe('game.TitleScene', function() {

  th.it('default', function() {
    phina.display.Label('Hello').addChildTo(this).setPosition(320, 480);

    this.onenter = function() {
      this.app.pushScene(phina.game.TitleScene());
    };
  });

  th.it('option', function() {
    phina.display.Label('Hello').addChildTo(this).setPosition(320, 480);

    this.onenter = function() {
      this.app.pushScene(phina.game.TitleScene({
        title: 'タイトルだよー♪',
        fontColor: 'black',
        backgroundColor: 'red',
      }));
    };
  });

});

th.describe('game.ResultScene', function() {

  th.it('default', function() {
    phina.display.Label('Hello').addChildTo(this).setPosition(320, 480);

    this.onenter = function() {
      this.app.pushScene(phina.game.ResultScene());
    };
  });

  th.it('option', function() {
    phina.display.Label('Hello').addChildTo(this).setPosition(320, 480);

    this.onenter = function() {
      this.app.pushScene(phina.game.TitleScene({
        title: 'タイトルだよー♪',
        fontColor: 'black',
        backgroundColor: 'red',
      }));
    };
  });

});


/*
 * LoadingScene
 */

th.describe('game.LoadingScene', function() {

  th.it('default', function() {
    phina.display.Label('Hello').addChildTo(this).setPosition(320, 480);

    this.onenter = function() {
      var scene = phina.game.LoadingScene({
        assets: {
          image: {
            a1: 'http://dummyimage.com/600x400/000/fff&text=1',
            a2: 'http://dummyimage.com/600x400/000/fff&text=2',
            a3: 'http://dummyimage.com/600x400/000/fff&text=3',
            a4: 'http://dummyimage.com/600x400/000/fff&text=4',
            a5: 'http://dummyimage.com/600x400/000/fff&text=5',
            a6: 'http://dummyimage.com/600x400/000/fff&text=6',
          },
        },
      });
      this.app.pushScene(scene);
    };
  });

});


/*
 * CountScene
 */

th.describe('game.CountScene', function() {

  th.it('default', function() {
    phina.display.Label('Hello').addChildTo(this).setPosition(320, 480);

    this.onenter = function() {
      this.app.pushScene(phina.game.CountScene());
    };
  });

  th.it('option', function() {
    phina.display.Label('Hello').addChildTo(this).setPosition(320, 480);

    this.onenter = function() {
      this.app.pushScene(phina.game.TitleScene({
        title: 'タイトルだよー♪',
        fontColor: 'black',
        backgroundColor: 'red',
      }));
    };
  });

});




th.describe('game.PieTimer', function() {

  th.it('default', function() {
    var timer = phina.game.PieTimer().addChildTo(this);
    timer.position.set(320, 480);
  });

  th.it('fill', function() {
    var timer = phina.game.PieTimer(10*1000, {
      radius: 128,
      color: 'hsl(180, 70%, 60%)',
      stroke: false,
    }).addChildTo(this);
    timer.position.set(320, 480);
  });

  th.it('stroke', function() {
    var timer = phina.game.PieTimer(10*1000, {
      radius: 128,
      strokeWidth: 16,
      color: 'transparent',
    }).addChildTo(this);
    timer.position.set(320, 480);
  });

});




th.describe('game.Gauge', function() {

  th.it('default', function() {
    var label = phina.display.Label('full').addChildTo(this);
    label.setPosition(this.gridX.center(), this.gridY.center(-2));

    var gauge = phina.game.Gauge().addChildTo(this);
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
    var gauge1 = phina.game.Gauge({
      backgroundColor: 'red',
      color: 'white',
      gaugeColor: 'blue',
    }).addChildTo(this);
    gauge1.position.set(this.gridX.center(), this.gridY.center(-2));
    gauge1.setValue(50);

    var gauge2 = phina.game.Gauge({
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

});





