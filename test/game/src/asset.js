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
  });
  th.it('sound', function() {
    var path = '../../assets/sounds/correct.mp3';
    phina.asset.Sound().load(path).then(function(s) {
      s.clone().play();
    });
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

    var logLabel = phina.display.Label('# Loaded\n', {
      align: 'left',
    }).addChildTo(this);
    logLabel.x = 100;
    logLabel.y = 200;

    flow.then(function() {
      var elm = phina.display.Sprite('tomapiko').addChildTo(this);
      elm.x = 320;
      elm.y = 480;

      var sound = phina.asset.AssetManager.get('sound', 'correct');
      var temp = sound.clone();
      temp.play();

      this.onpointstart = function(app) {
        var temp = sound.clone();
        temp.play();
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