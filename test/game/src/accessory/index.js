th.describe("accessory.Tweener", function() {

  th.it('init', function() {
    var shape = phina.display.CircleShape().addChildTo(this);
    var tweener = phina.accessory.Tweener().attachTo(shape);
    tweener
      .to({x:320, y:480}, 1000)
  });

  th.it('to', function() {
    var shape = phina.display.RectangleShape().addChildTo(this);
    var tweener = phina.accessory.Tweener().attachTo(shape);
    tweener
      .to({x:320, y:480}, 1000)
      .to({scaleX:4,scaleY:4, rotation:360}, 1000)
  });

  th.it('from', function() {
    var shape = phina.display.RectangleShape().addChildTo(this);
    shape.position.set(320, 480);
    var tweener = phina.accessory.Tweener().attachTo(shape);
    tweener
      .from({scaleX:4,scaleY:4, rotation:360}, 1000)
  });

  th.it('wait', function() {
    var shape = phina.display.RectangleShape().addChildTo(this);
    var tweener = phina.accessory.Tweener().attachTo(shape);
    tweener
      .to({x:320, y:480}, 1000)
      .wait(1000)
      .to({scaleX:4,scaleY:4, rotation:360}, 1000)
  });

  th.it('call', function() {
    var shape = phina.display.RectangleShape().addChildTo(this);
    var tweener = phina.accessory.Tweener().attachTo(shape);
    tweener
      .to({x:320, y:480}, 1000)
      .call(function() {
        shape.style.color = 'red';
      })
      .to({scaleX:4,scaleY:4, rotation:360}, 1000)
      .call(function() {
        shape.style.color = 'blue';
      })
  });

  th.it('set', function() {
    var shape = phina.display.RectangleShape().addChildTo(this);
    var tweener = phina.accessory.Tweener().attachTo(shape);
    tweener
      .to({x:320, y:480}, 1000)
      .set('rotation', 90)
      .set({scaleX:4, scaleY:4})
      .call(function() {
        shape.style.color = 'green';
      })
  });

  th.it('play', function() {
    // TODO:
  });

  th.it('pause', function() {
    // TODO:
  });

  th.it('stop', function() {
    // TODO:
  });

  th.it('rewind', function() {
    var shape = phina.display.RectangleShape().addChildTo(this);
    var tweener = phina.accessory.Tweener().attachTo(shape);
    tweener
      .set({x:0, y:0})
      .to({x:320, y:480}, 1000)
      .call(function() {
        this.rewind();
      })
  });

  th.it('yoyo', function() {
    var shape = phina.display.RectangleShape().addChildTo(this);
    shape.position.set(320-150, 480);
    var tweener = phina.accessory.Tweener().attachTo(shape);
    tweener
      .to({x:320+150, y:480}, 1000)
      .call(function() {
        this.yoyo();
      })
  });

  th.it('loop', function() {
    var shape = phina.display.RectangleShape().addChildTo(this);
    var tweener = phina.accessory.Tweener().attachTo(shape);
    tweener.setLoop(true);
    tweener
      .set({x:0, y:0})
      .to({x:320, y:480}, 1000)
  });


});

th.describe("accessory.Draggable", function() {

  th.it('init', function() {
    var shape = phina.display.CircleShape().addChildTo(this);
    shape.x = 100;
    shape.y = 100;

    shape.draggable.enable();
  });

  th.it('back', function() {
    var shape = phina.display.CircleShape().addChildTo(this);
    shape.x = 100;
    shape.y = 100;

    shape.draggable.enable();

    shape.draggable.ondragend = function() {
      this.back();
    };
  });
});


th.describe("accessory.FrameAnimation", function() {

  th.it('init', function() {
    var fa = phina.accessory.FrameAnimation({
      frame: {
        width: 64,
        height: 64,
        rows: 3, // 行
        cols: 6, // 列
      },
      animations: {
        fly: {
          frames: [1, 2, 3],
          next: 'fly',
          frequency: 4,
        },
        front: {
          frames: [6, 7, 8, 7],
          next: 'front',
          frequency: 4,
        },
        back: {
          frames: [9, 10, 11, 10],
          next: 'back',
          frequency: 4,
        },
        left: {
          frames: [12, 13, 14, 13],
          next: 'left',
          frequency: 4,
        },
      },
    });

    var loader = phina.asset.AssetLoader();

    var flow = loader.load({
      image: {
        'ss': '../../assets/images/tomapiko_ss.png',
      },
      spritesheet: {
        'tomapiko': '../../assets/tmss/tomapiko.tmss',
      },
    });

    flow.then(function() {
      var sprite = phina.display.Sprite('ss').addChildTo(this);
      sprite.x = 320;
      sprite.y = 480;

      sprite.scale.set(2, 2);

      fa.attachTo(sprite);
      fa.gotoAndPlay('fly');
    }.bind(this));
  });

});
