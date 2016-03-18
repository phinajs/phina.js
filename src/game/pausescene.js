/*
 * PauseScene
 */


phina.namespace(function() {

  /**
   * @class phina.game.PauseScene
   *
   */
  phina.define('phina.game.PauseScene', {
    superClass: 'phina.display.DisplayScene',
    /**
     * @constructor
     */
    init: function(params) {
      this.superInit(params);

      params = ({}).$safe(params, phina.game.PauseScene.defaults);

      this.backgroundColor = params.backgroundColor;

      this.fromJSON({
        children: {
          text: {
            className: 'phina.display.Label',
            arguments: {
              text: 'Pause',
              fill: params.fontColor,
              stroke: null,
              fontSize: 48,
            },
            x: this.gridX.center(),
            y: this.gridY.center(),
          },
        }
      });

      if (params.exitType === 'touch') {
        this.on('pointend', function() {
          this.exit();
        });
      }
    },

    _static: {
      defaults: {
        width: 640,
        height: 960,

        fontColor: 'white',
        backgroundColor: 'hsla(0, 0%, 0%, 0.85)',

        exitType: 'touch',
      },
    },

  });

});
