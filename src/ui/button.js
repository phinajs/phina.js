
phina.namespace(function() {

  /**
   * @class phina.geom.Button
   * Button
   */
  phina.define('phina.ui.Button', {
    superClass: 'phina.display.CanvasElement',
    /**
     * @constructor
     */
    init: function(params) {
      this.superInit();

      params = params || {};
      params.$safe({
        width: 200,
        height: 80,
      });

      this.width = params.width;
      this.height = params.height;

      this.bg = phina.display.RectangleShape().addChildTo(this);
      this.bg.style.$extend({
        width: params.width,
        height: params.height,
      });
      this.label = phina.display.Label('hoge').addChildTo(this);
    },
  });

});

