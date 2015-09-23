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
            arguments: options,
            label: 'loading',
            nextLabel: options.startLabel,
          },

          {
            className: 'SplashScene',
            arguments: options,
            label: 'splash',
            nextLabel: 'title',
          },

          {
            className: 'TitleScene',
            arguments: options,
            label: 'title',
            nextLabel: 'main',
          },
          {
            className: 'MainScene',
            arguments: options,
            label: 'main',
            nextLabel: 'result',
          },
          {
            className: 'ResultScene',
            arguments: options,
            label: 'result',
            nextLabel: 'title',
          },

          {
            className: 'PauseScene',
            arguments: options,
            label: 'pause',
          },

        ]
      });

      this.replaceScene(scene);
    },
  });

});