phina.namespace(function() {

  /**
   * @class phina.game.GameApp
   * 
   */
  phina.define('phina.game.GameApp', {
    superClass: 'phina.display.CanvasApp',

    init: function(params) {
      this.superInit(params);

      var startLabel = (params.assets) ? 'loading' : params.startLabel;

      var scene = ManagerScene({
        startLabel: startLabel,

        scenes: [
          {
            className: 'LoadingScene',
            arguments: {
              width: params.width,
              height: params.height,
              assets: params.assets,
            },
            label: 'loading',
            nextLabel: params.startLabel,
          },

          {
            className: 'SplashScene',
            arguments: {
              width: params.width,
              height: params.height,
            },
            label: 'splash',
            nextLabel: 'title',
          },

          {
            className: 'TitleScene',
            arguments: {
              width: params.width,
              height: params.height,
            },
            label: 'title',
            nextLabel: 'main',
          },
          {
            className: 'MainScene',
            arguments: {
              width: params.width,
              height: params.height,
            },
            label: 'main',
            nextLabel: 'result',
          },
          {
            className: 'ResultScene',
            arguments: {
              width: params.width,
              height: params.height,
            },
            label: 'result',
            nextLabel: 'title',
          },

          {
            className: 'PauseScene',
            arguments: {
              width: params.width,
              height: params.height,
            },
            label: 'pause',
          },

        ]
      });

      this.replaceScene(scene);
    },
  });

});