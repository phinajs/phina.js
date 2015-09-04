phina.namespace(function() {

  /**
   * @class phina.game.GameApp
   * 
   */
  phina.define('phina.game.GameApp', {
    superClass: 'phina.display.CanvasApp',

    init: function(params) {
      this.superInit(params);

      var scene = ManagerScene({
        startLabel: params.startLabel,

        scenes: [
          {
            className: "SplashScene",
            arguments: {
              width: param.width,
              height: param.height,
            },
            label: "splash",
            nextLabel: "title",
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

          {
            className: "PauseScene",
            label: "pause",
          },

        ]
      });

      this.replaceScene(scene);
    },
  });

});