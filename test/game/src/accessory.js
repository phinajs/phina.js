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

  th.it('by', function() {
    var shape = phina.display.RectangleShape().addChildTo(this);
    var tweener = phina.accessory.Tweener().attachTo(shape);
    tweener
      .to({x:320, y:480}, 1000)
      .by({x:100, y:100}, 1000)
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
    var label = phina.display.Label('Hello, runstant!').addChildTo(this);
    label.setPosition(320, 480);

    var tweener = phina.accessory.Tweener().attachTo(label);
    tweener
      .setLoop(true)
      .set({rotation: 0})
      .to({rotation: 360}, 1000)
      ;
  });

  th.it('fromJSON', function() {
    var shape = phina.display.RectangleShape().addChildTo(this);
    var tweener = phina.accessory.Tweener().attachTo(shape);
    tweener.fromJSON({
      loop: true,
      tweens: [
        ['set', {x:100, y:100}],
        ['to', {x:200, y:200}],
      ]
    });
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
    var loader = phina.asset.AssetLoader();
    var flow = loader.load({
      image: {
        'tomapiko': '../../assets/images/tomapiko_ss.png',
      },
      spritesheet: {
        'tomapiko': '../../assets/tmss/tomapiko.tmss',
        // 'tomapiko': {
        //   "frame": {
        //     "width": 64,
        //     "height": 65,
        //     "rows": 3,
        //     "cols": 6
        //   },
        //   "animations": {
        //     "fly": {
        //       "frames": [1, 2, 3],
        //       "next": "fly",
        //       "frequency": 4
        //     },
        //   },
        // },
      },
    });

    flow.then(function() {
      // 
      var sprite = phina.display.Sprite('tomapiko').addChildTo(this);
      sprite.setPosition(this.gridX.span(3), this.gridY.span(4)).setScale(4);
      var fa = phina.accessory.FrameAnimation('tomapiko').attachTo(sprite);
      fa.gotoAndPlay('stand');
      // 
      var sprite = phina.display.Sprite('tomapiko').addChildTo(this);
      sprite.setPosition(this.gridX.span(8), this.gridY.span(4)).setScale(4);
      var fa = phina.accessory.FrameAnimation('tomapiko').attachTo(sprite);
      fa.gotoAndPlay('fly');
      // 
      var sprite = phina.display.Sprite('tomapiko').addChildTo(this);
      sprite.setPosition(this.gridX.span(13), this.gridY.span(4)).setScale(4);
      var fa = phina.accessory.FrameAnimation('tomapiko').attachTo(sprite);
      fa.gotoAndPlay('front');
      // 
      var sprite = phina.display.Sprite('tomapiko').addChildTo(this);
      sprite.setPosition(this.gridX.span(3), this.gridY.span(11)).setScale(4);
      var fa = phina.accessory.FrameAnimation('tomapiko').attachTo(sprite);
      fa.gotoAndPlay('back');
      // 
      var sprite = phina.display.Sprite('tomapiko').addChildTo(this);
      sprite.setPosition(this.gridX.span(8), this.gridY.span(11)).setScale(4);
      var fa = phina.accessory.FrameAnimation('tomapiko').attachTo(sprite);
      fa.gotoAndPlay('left');
      // 
      var sprite = phina.display.Sprite('tomapiko').addChildTo(this);
      sprite.setPosition(this.gridX.span(13), this.gridY.span(11)).setScale(4);
      var fa = phina.accessory.FrameAnimation('tomapiko').attachTo(sprite);
      fa.gotoAndPlay('right');
    }.bind(this));
  });

});
