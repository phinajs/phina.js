
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
      this.app.pushScene(phina.game.ResultScene({
        title: 'タイトルだよー♪',
        fontColor: 'black',
        backgroundColor: 'white',
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
      this.app.pushScene(phina.game.CountScene({
        count: ['Ready'],
        backgroundColor: 'red',
        fontColor: 'green',
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


