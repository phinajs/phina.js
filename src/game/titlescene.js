/*
 * TitleScene
 */


phina.namespace(function() {

  /**
   * @class phina.game.TitleScene
   * @extends phina.display.DisplayScene
   */
  phina.define('phina.game.TitleScene', {
    superClass: 'phina.display.DisplayScene',
    /**
     * @constructor
     */
    init: function(params) {
      params = ({}).$safe(params, phina.game.TitleScene.defaults);
      this.superInit(params);

      if (params.backgroundImage) {
        var texture = phina.asset.Texture();

        texture.load(params.backgroundImage).then(function() {
          this.fromJSON({
            children: {
              backgroundImage: {
                className: 'phina.display.Sprite',
                arguments: texture,
                x: this.gridX.center(),
                y: this.gridY.center(),
              }
            }
          });
          this._init(params);
          
        }.bind(this));
      }
      else {
        this._init(params);
      }
    },
    
    _init: function(params) {
      this.backgroundColor = params.backgroundColor;
      
      this.fromJSON({
        children: {
          titleLabel: {
            className: 'phina.display.Label',
            arguments: {
              text: params.title,
              fill: params.fontColor,
              stroke: false,
              fontSize: params.fontSize,
            },
            x: this.gridX.center(),
            y: this.gridY.span(4),
          }
        }
      });

      if (params.exitType === 'touch') {
        this.fromJSON({
          children: {
            touchLabel: {
              className: 'phina.display.Label',
              arguments: {
                text: "TOUCH START",
                fill: params.fontColor,
                stroke: false,
                fontSize: params.fontSize / 2,
              },
              x: this.gridX.center(),
              y: this.gridY.span(12),
            },
          },
        });

        this.on('pointend', function() {
          this.exit();
        });
      }
    },

    _static: {
      defaults: {
        title: 'phina.js games',
        message: '',

        fontColor: 'white',
        fontSize: 64,
        backgroundColor: 'hsl(200, 80%, 64%)',
        backgroundImage: '',

        exitType: 'touch',
      },
    },

  });

});
