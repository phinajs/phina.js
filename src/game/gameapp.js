phina.namespace(function() {

  /**
   * @class phina.game.GameApp
   * 
   */
  phina.define('phina.game.GameApp', {
    superClass: 'phina.display.CanvasApp',

    init: function(options) {

      options = (options || {}).$safe({
        startLabel: 'title',
      });
      this.superInit(options);

      var startLabel = (options.assets) ? 'loading' : options.startLabel;

      var scene = phina.game.ManagerScene({
        startLabel: startLabel,

        scenes: [
          {
            className: 'phina.game.LoadingScene',
            arguments: options,
            label: 'loading',
            nextLabel: options.startLabel,
          },

          {
            className: 'phina.game.SplashScene',
            arguments: options,
            label: 'splash',
            nextLabel: 'title',
          },

          {
            className: 'phina.game.TitleScene',
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
            className: 'phina.game.ResultScene',
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