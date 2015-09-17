
phina.namespace(function() {

  /**
   * @class phina.asset.AssetManager
   * 
   */
  phina.define('phina.asset.AssetLoader', {
    superClass: "phina.util.EventDispatcher",

    /**
     * @constructor
     */
    init: function(params) {
      this.superInit();

      params = (params || {}).$safe({
        cache: true,
      });

      this.assets = {};
      this.cache = params.cache;
    },

    load: function(params) {
      var self = this;
      var flows = [];

      var counter = 0;

      params.forIn(function(type, assets) {
        assets.forIn(function(key, value) {
          var func = phina.asset.AssetLoader.assetLoadFunctions[type];
          var flow = func(key, value);
          flow.then(function(asset) {
            self.flare('progress', {
              key: key,
              asset: asset,
              progress: (++counter/flows.length),
            });
            if (self.cache) {
              phina.asset.AssetManager.set(type, key, asset);
            }
          });
          flows.push(flow);
        });
      });

      return phina.util.Flow.all(flows).then(function(args) {
        self.flare('load');
      });
    },

    _static: {
      assetLoadFunctions: {
        image: function(key, path) {
          var texture = phina.asset.Texture();
          var flow = texture.load(path);
          return flow;
        },
        sound: function(key, path) {
          var sound = phina.asset.Sound();
          var flow = sound.load(path);
          return flow;
        },
        spritesheet: function(key, path) {
          var ss = phina.asset.SpriteSheet();
          var flow = ss.load(path);
          return flow;
        },
        script: function(key, path) {
          var script = phina.asset.Script();
          return script.load(path);
        },
        font: function(key, path) {
          var font = phina.asset.Font();
          font.setFontName(key);
          return font.load(path);
        },
      }
    }

  });

});

