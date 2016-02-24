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
        shape.fill = 'green';
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

    shape.ondragend = function() {
      this.draggable.back(500);
    };
  });

  th.it('lock_unlock', function() {

    (32).times(function(i) {
      var shape = phina.display.CircleShape().addChildTo(this);
      shape.x = 100 + i*10;
      shape.y = 100 + i*10;
      shape.draggable.enable();

      shape.ondragstart = function() {
        phina.accessory.Draggable.lock();
      };

      shape.draggable.ondragend = function() {
        phina.accessory.Draggable.unlock();
        // this.back();
      };
    }, this);
  });
});

th.describe("accessory.Flickable", function() {

  th.it('init', function() {
    var shape = phina.display.CircleShape().addChildTo(this);
    shape.setPosition(320, 480);
    shape.flickable.enable();

    shape.flickable.friction = 0.9;

    shape.update = function() {
      if (this.x < 0) {
        this.x = 0;
        this.flickable.velocity.x *= -1;
      }
      if (this.x > 640) {
        this.x = 640;
        this.flickable.velocity.x *= -1;
      }
      if (this.y < 0) {
        this.y = 0;
        this.flickable.velocity.y *= -1;
      }
      if (this.y > 960) {
        this.y = 960;
        this.flickable.velocity.y *= -1;
      }
    };
  });

  th.it('horizontal', function() {
    var shape = phina.display.CircleShape().addChildTo(this);
    shape.setPosition(320, 480);
    shape.flickable.enable();

    shape.flickable.horizontal = true;
    shape.flickable.vertical = false;
  });
  th.it('vertical', function() {
    var shape = phina.display.CircleShape().addChildTo(this);
    shape.setPosition(320, 480);
    shape.flickable.enable();

    shape.flickable.horizontal = false;
    shape.flickable.vertical = true;
  });

  th.it('cancel', function() {
    var shape = phina.display.CircleShape().addChildTo(this);
    shape.x = 320;
    shape.y = 480;

    shape.flickable.enable();

    shape.flickable.onflickstart = function(e) {
      var angle = e.direction.toAngle();
      console.log(angle.toDegree());
      this.cancel();
    };
  });

  th.it('interface', function() {
    var flickable = phina.accessory.Flickable().attachTo(this);
    flickable.vertical = false;
    flickable.horizontal = false;

    var label = phina.display.Label('フリックしてね').addChildTo(this);
    label.x = this.gridX.center();
    label.y = this.gridY.center();

    flickable.onflickstart = function(e) {
      var angle = e.direction.toAngle().toDegree();
      label.text = angle;
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
