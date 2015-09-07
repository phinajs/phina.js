/*
 * ResultScene
 */


phina.namespace(function() {

  /**
   * @class phina.game.ResultScene
   * 
   */
  phina.define('phina.game.ResultScene', {
    superClass: 'phina.display.CanvasScene',
    /**
     * @constructor
     */
    init: function(params) {
      this.superInit(params);

      params = (params || {}).$safe(phina.game.ResultScene.default);

      this.backgroundColor = params.backgroundColor;

      this.fromJSON({
        children: {
          scoreText: {
            className: 'phina.display.Label',
            arguments: ['score', {
              color: params.fontColor,
              stroke: false,
              fontSize: 48,
            }],
            x: this.gridX.span(8),
            y: this.gridY.span(4),
          },
          scoreLabel: {
            className: 'phina.display.Label',
            arguments: [params.score+'', {
              color: params.fontColor,
              stroke: false,
              fontSize: 80,
            }],
            x: this.gridX.span(8),
            y: this.gridY.span(6),
          },

          messageLabel: {
            className: 'phina.display.Label',
            arguments: [params.message, {
              color: params.fontColor,
              stroke: false,
              fontSize: 32,
            }],
            x: this.gridX.span(8),
            y: this.gridY.span(8),
          },

          shareButton: {
            className: 'phina.ui.Button',
            arguments: [{
              text: '★',
              width: 128,
              height: 128,
              fontSize: 50,
              cornerRadius: 64,
            }],
            x: this.gridX.span(6),
            y: this.gridY.span(11),
          },
          playButton: {
            className: 'phina.ui.Button',
            arguments: [{
              text: '▶',
              width: 128,
              height: 128,
              fontSize: 50,
              cornerRadius: 64,
            }],
            x: this.gridX.span(10),
            y: this.gridY.span(11),

            interactive: true,
            onpointend: function() {
              this.exit();
            }.bind(this),
          },
        }
      });

      if (params.exitType === 'touch') {
        this.on('pointstart', function() {
          this.exit();
        });
      }
    },

    _static: {
      default: {
        score: 16,

        message: 'this is phina.js project.\nHello, world!',
        hashtags: 'phina game javascript',
        url: 'http://phinajs.com',

        width: 640,
        height: 960,

        fontColor: 'white',
        backgroundColor: 'hsl(200, 80%, 64%)',
        backgroundImage: '',
      },
    },

  });

});
