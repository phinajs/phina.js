/*
 * PauseScene
 */


phina.namespace(function() {

  /**
   * @class phina.game.PauseScene
   * @extends phina.display.DisplayScene
   */
  phina.define('phina.game.PauseScene', {
    superClass: 'phina.display.DisplayScene',
    /**
     * @constructor
     */
    init: function(params) {
      params = ({}).$safe(params, phina.game.PauseScene.defaults);
      this.superInit(params);

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
        fontColor: 'white',
        backgroundColor: 'hsla(0, 0%, 0%, 0.85)',

        exitType: 'touch',
      },
    },

  });

});
