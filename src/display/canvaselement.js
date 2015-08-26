
phina.namespace(function() {

  /**
   * @class phina.display.CanvasElement
   * 
   */
  phina.define('phina.display.CanvasElement', {
    superClass: 'phina.app.Object2D',

    init: function() {
      this.superInit();

      this.width = 64;
      this.height = 64;
    },
  });

});

