phina.namespace(function() {

  /**
   * @class phina.game.GameApp
   * 
   */
  phina.define('phina.game.GameApp', {
    superClass: 'phina.display.CanvasApp',

    init: function(options) {
      this.superInit(options);

      var startLabel = (options.assets) ? 'loading' : options.startLabel;

      var scene = ManagerScene({
        startLabel: startLabel,

        scenes: [
          {
            className: 'LoadingScene',
            arguments: {
              width: options.width,
              height: options.height,
              assets: options.assets,
            },
            label: 'loading',
            nextLabel: options.startLabel,
          },

          {
            className: 'SplashScene',
            arguments: {
              width: options.width,
              height: options.height,
            },
            label: 'splash',
            nextLabel: 'title',
          },

          {
            className: 'TitleScene',
            arguments: {
              width: options.width,
              height: options.height,
              title: options.title,
            },
            label: 'title',
            nextLabel: 'main',
          },
          {
            className: 'MainScene',
            arguments: {
              width: options.width,
              height: options.height,
            },
            label: 'main',
            nextLabel: 'result',
          },
          {
            className: 'ResultScene',
            arguments: {
              width: options.width,
              height: options.height,
            },
            label: 'result',
            nextLabel: 'title',
          },

          {
            className: 'PauseScene',
            arguments: {
              width: options.width,
              height: options.height,
            },
            label: 'pause',
          },

        ]
      });

      this.replaceScene(scene);
    },
  });

});