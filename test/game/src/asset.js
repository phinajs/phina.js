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

    flow.then(function() {
      var elm = phina.display.Sprite('tomapiko').addChildTo(this);
      elm.x = 100;
      elm.y = 100;

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
  });

  th.it('sound', function() {
    var path = '../../assets/sounds/correct.mp3';
    var sound = phina.asset.Sound();
    var f = sound.load(path);
    f.then(function(s) {
      s.clone().play();
    });
  });


});