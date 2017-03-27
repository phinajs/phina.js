th.describe('asset.File', function() {
  th.it('load(object)', function() {
    var file = phina.asset.File();
    file.load({
      path: '../../assets/tmss/tomapiko.tmss',
      dataType: 'json',
    }).then(function() {
      console.log(file);
    });
  });
});


th.describe('asset.Font', function() {
  th.it('init', function() {
    var font = phina.asset.Font();
    font.load('../../assets/fonts/kaushan-script/KaushanScript-Regular.otf').then(function() {
      var label = phina.display.Label({
        text: 'Hello, world!\nloaded',
        fontSize: 100,
        fontFamily: 'KaushanScript-Regular',
        padding: 24,
      }).addChildTo(this);
      label.x = this.gridX.center();
      label.y = this.gridY.center();
    }.bind(this));
  });
});

th.describe("asset.Sound", function() {
  th.it('init', function() {
    var sound = phina.asset.Sound();
    sound.loadFromBuffer();
    sound.play();

    this.onpointstart = function() {
      sound.play();
    }
  });
  th.it('play', function() {
    var path = '../../assets/sounds/correct.mp3';
    phina.asset.Sound().load(path).then(function(s) {
      s.play();

      this.onpointstart = function() {
        s.play();
      }
    }.bind(this));
  });
  th.it('stop', function() {
    var path = '../../assets/sounds/lo_002.mp3';
    phina.asset.Sound().load(path).then(function(s) {
      s.play();

      this.onpointstart = function() {
        s.stop();
      }
    }.bind(this));
  });

  th.it('volume', function() {
    var path = '../../assets/sounds/lo_002.mp3';
    var sound = phina.asset.Sound()
    sound.load(path).then(function(s) {
      s.play();
      sound.loop = true;
    }.bind(this));

    this.onenter = function() {
      this.app.enableDatGUI(function(gui) {
        gui.add(sound, 'volume', 0.0, 1.0);
      });
    };
  });

  th.it('loop', function() {
    var path = '../../assets/sounds/lo_002.mp3';
    var sound = phina.asset.Sound()
    sound.load(path).then(function(s) {
      s.loop = true;
      s.loopStart = 2.0;
      s.loopEnd = 5.0;
      s.play();
    }.bind(this));
  });

  th.it('oscillator', function() {
    var sound = phina.asset.Sound();
    sound._oscillator();
    sound.play();
  });

  th.it('fromAudio', function() {
    var path = 'https://mdn.github.io/media-source-buffer/viper.mp3';
    var path = '../../assets/sounds/lo_002.mp3';
    var sound = phina.asset.Sound();

    var audio = new Audio();
    audio.addEventListener('loadstart', function() {
      // var source = sound.context.createMediaElementSource(audio);
      // source.connect(sound.context.destination);
      // source.start(0);
      audio.play();
    });

    audio.src = path;
  })
});

th.describe("asset.SoundManager", function() {
  th.it('playMusic', function() {
    var loader = phina.asset.AssetLoader();
    var flow = loader.load({
      sound: {
        'bgm1': '../../assets/sounds/lo_002.mp3',
        'bgm2': '../../assets/sounds/lo_002.mp3',
      },
    });

    flow.then(function() {
      phina.asset.SoundManager.playMusic('bgm1');

      setTimeout(function() {
        phina.asset.SoundManager.playMusic('bgm2', 1000);
      }, 1000);
    });
  });

  th.it('mute_unmute', function() {
    var loader = phina.asset.AssetLoader();
    var flow = loader.load({
      sound: {
        'bgm': '../../assets/sounds/lo_002.mp3',
      },
    });

    flow.then(function() {
      phina.asset.SoundManager.playMusic('bgm');

      this.onpointstart = function() {
        if (phina.asset.SoundManager.isMute()) {
          phina.asset.SoundManager.unmute();
        }
        else {
          phina.asset.SoundManager.mute();
        }
      };
    }.bind(this));
  });
});


th.describe("asset.AssetLoader", function() {

  th.it('load', function() {
    var loader = phina.asset.AssetLoader();
    var flow = loader.load({
      image: {
        'tomapiko': '../../assets/images/tomapiko.png',
        'tomapiko_min': '../../assets/images/tomapiko_min.png',
      },
      sound: {
        'correct': '../../assets/sounds/correct.mp3',
      },
    });

    var logLabel = phina.display.Label({
      text: '# Loaded\n',
      align: 'left',
    }).addChildTo(this);
    logLabel.x = 100;
    logLabel.y = 200;

    flow.then(function() {
      var elm = phina.display.Sprite('tomapiko').addChildTo(this);
      elm.x = 320;
      elm.y = 480;

      var sound = phina.asset.AssetManager.get('sound', 'correct');
      sound.play();

      this.onpointstart = function(app) {
        sound.play();
        elm.x = app.pointer.x;
        elm.y = app.pointer.y;
      };
    }.bind(this));

    loader.onprogress = function(e) {
      logLabel.text += '- ' + e.key + '\n';
      console.log(e);
    };
  });
  th.it('local_spritesheet', function() {
    var loader = phina.asset.AssetLoader();
    var flow = loader.load({
      image: {
        'tomapiko': '../../assets/images/character/tomapiyo.png',
      },
      spritesheet: {
        ss: {
         "frame": {
           "width": 64,
           "height": 64,
           "cols": 6,
           "rows": 3,
         },
         // アニメーション
         "animations" : {
           "down": {
             "frames": [6,7,8,7],
             "next": "down",
             "frequency": 5,
           },
         },
        
        },
      },
    });

    var logLabel = phina.display.Label({
      text: '# Loaded\n',
      align: 'left',
    }).addChildTo(this);
    logLabel.x = 100;
    logLabel.y = 200;

    flow.then(function() {
      var elm = phina.display.Sprite('tomapiko').addChildTo(this);
      elm.x = 320;
      elm.y = 480;
      var anim = phina.accessory.FrameAnimation('ss');
      anim.attachTo(elm);
      anim.gotoAndPlay('down');
      
      this.onpointstart = function(app) {
        elm.x = app.pointer.x;
        elm.y = app.pointer.y;
      };
    }.bind(this));

    loader.onprogress = function(e) {
      logLabel.text += '- ' + e.key + '\n';
      console.log(e);
    };
  });
});