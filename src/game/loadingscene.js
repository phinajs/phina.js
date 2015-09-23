/*
 * LoadingScene
 */


phina.namespace(function() {

  /**
   * @class phina.game.LoadingScene
   * 
   */
  phina.define('phina.game.LoadingScene', {
    superClass: 'phina.display.CanvasScene',

    /**
     * @constructor
     */
    init: function(options) {
      options = (options || {}).$safe(phina.game.LoadingScene.defaults);
      this.superInit(options);

      this.fromJSON({
        children: {
          bar: {
            className: 'phina.display.Shape',
            arguments: {
              width: this.width,
              height: 6,
              backgroundColor: 'hsla(200, 100%, 80%, 0.8)',
            },
            originX: 0,
            originY: 0,
            x: 0,
            y: 0,
          },
        }
      });


      var loader = phina.asset.AssetLoader();
      
      this.bar.scaleX = 0;
      loader.onprogress = function(e) {
        this.bar.scaleX = e.progress;
      }.bind(this);
      
      loader.onload = function() {
        if (options.exitType === 'auto') {
          this.app.popScene();
        }
      }.bind(this);

      loader.load(options.assets);
    },

    _static: {
      defaults: {
        width: 640,
        height: 960,

        exitType: 'auto',
      },
    },

  });

});
