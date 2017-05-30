phina.namespace(function() {

  /**
   * @class phina.game.GameApp
   * @extends phina.display.CanvasApp
   */
  phina.define('phina.game.GameApp', {
    superClass: 'phina.display.CanvasApp',

    init: function(options) {

      options = (options || {}).$safe({
        startLabel: 'title',
      });
      this.superInit(options);

      var startLabel = options.startLabel || 'title';

      var scenes = options.scenes || [
        {
          className: 'SplashScene',
          label: 'splash',
          nextLabel: 'title',
        },

        {
          className: 'TitleScene',
          label: 'title',
          nextLabel: 'main',
        },
        {
          className: 'MainScene',
          label: 'main',
          nextLabel: 'result',
        },
        {
          className: 'ResultScene',
          label: 'result',
          nextLabel: 'title',
        },
      ];

      scenes = scenes.each(function(s) {
        s.arguments = s.arguments || options;
      });

      var scene = phina.game.ManagerScene({
        startLabel: startLabel,
        scenes: scenes,
      });

      if (options.assets) {
        var loadingOptions = ({}).$extend(options, {
          exitType: '',
        });
        var loadingClass = phina.global.LoadingScene || phina.game.LoadingScene;
        var loading = loadingClass(loadingOptions);
        this.replaceScene(loading);

        loading.onloaded = function() {
          this.replaceScene(scene);
          if (options.debug) {
            this._enableDebugger();
          }
        }.bind(this);

      }
      else {
        this.replaceScene(scene);
        if (options.debug) {
          this._enableDebugger();
        }
      }

      // 自動でポーズする
      if (options.autoPause) {
        this.on('blur', function() {
          var pauseScene = phina.game.PauseScene();
          this.pushScene(pauseScene);
        });
      }
    },

    _enableDebugger: function() {
      if (this.gui) return ;

      this.enableDatGUI(function(gui) {
        var f = gui.addFolder('scenes');
        var funcs = {};
        this.rootScene.scenes.each(function(scene) {
          funcs[scene.label] = function() {
            this.rootScene.replaceScene(scene.label);
            console.log(this._scenes.length);
          }.bind(this);
          return scene;
        }, this);

        funcs.forIn(function(key, value) {
          f.add(funcs, key);
        });
        f.open();

        this.gui = gui;
      }.bind(this));
    },
  });

});
