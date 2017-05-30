/*
 * LoadingScene
 */


phina.namespace(function() {

  /**
   * @class phina.game.LoadingScene
   * @extends phina.display.DisplayScene
   */
  phina.define('phina.game.LoadingScene', {
    superClass: 'phina.display.DisplayScene',

    /**
     * @constructor
     */
    init: function(options) {
      options = ({}).$safe(options, phina.game.LoadingScene.defaults);
      this.superInit(options);

      this.fromJSON({
        children: {
          gauge: {
            className: 'phina.ui.Gauge',
            arguments: {
              value: 0,
              width: this.width,
              height: 12,
              fill: '#aaa',
              stroke: false,
              gaugeColor: 'hsla(200, 100%, 80%, 0.8)',
              padding: 0,
            },
            x: this.gridX.center(),
            y: 0,
            originY: 0,
          }
        }
      });

      var loader = phina.asset.AssetLoader();

      if (options.lie) {
        this.gauge.animationTime = 10*1000;
        this.gauge.value = 90;

        loader.onload = function() {
          this.gauge.animationTime = 0;
          this.gauge.value = 100;
        }.bind(this);
      }
      else {
        this.gauge.animationTime = 100;
        loader.onprogress = function(e) {
          this.gauge.value = e.progress * 100;
        }.bind(this);
      }

      this.gauge.onfull = function() {
        if (options.exitType === 'auto') {
          this.app.popScene();
        }
        this.flare('loaded');
      }.bind(this);

      loader.load(options.assets);
    },

    _static: {
      defaults: {
        exitType: 'auto',

        lie: false,
      },
    },

  });

});
