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

      params = (params || {}).$safe(phina.game.ResultScene.defaults);

      var message = params.message.format(params);

      this.backgroundColor = params.backgroundColor;

      this.fromJSON({
        children: {
          scoreText: {
            className: 'phina.display.Label',
            arguments: {
              text: 'score',
              fill: params.fontColor,
              stroke: null,
              fontSize: 48,
            },
            x: this.gridX.span(8),
            y: this.gridY.span(4),
          },
          scoreLabel: {
            className: 'phina.display.Label',
            arguments: {
              text: params.score+'',
              fill: params.fontColor,
              stroke: null,
              fontSize: 72,
            },
            x: this.gridX.span(8),
            y: this.gridY.span(6),
          },

          messageLabel: {
            className: 'phina.display.Label',
            arguments: {
              text: message,
              fill: params.fontColor,
              stroke: null,
              fontSize: 32,
            },
            x: this.gridX.center(),
            y: this.gridY.span(9),
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
            y: this.gridY.span(12),
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
            y: this.gridY.span(12),

            interactive: true,
            onpush: function() {
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

      this.shareButton.onclick = function() {
        var url = phina.social.Twitter.createURL({
          text: message,
          hashtags: params.hashtags,
          url: params.url,
        });
        window.open(url, 'share window', 'width=480, height=320');
      };
    },

    _static: {
      defaults: {
        score: 16,

        message: 'this is phina.js project.\nscore: {score}\n',
        hashtags: 'phina_js,game,javascript',
        url: phina.global.location && phina.global.location.href,

        width: 640,
        height: 960,

        fontColor: 'white',
        backgroundColor: 'hsl(200, 80%, 64%)',
        backgroundImage: '',
      },
    },

  });

});
