
phina.namespace(function() {


  phina.define('phina.display.CanvasElement', {
    superClass: 'phina.app.Object2D',

    init: function() {
      this.superInit();
    },
  });
});


phina.namespace(function() {

  /**
   * @class
   */
  phina.define('phina.display.Layer', {
    superClass: 'phina.display.CanvasElement',

    init: function(params) {
      
    },
  });
});
