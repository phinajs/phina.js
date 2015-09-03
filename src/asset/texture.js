
phina.namespace(function() {

  /**
   * @class phina.asset.Texture
   * 
   */
  phina.define('phina.asset.Texture', {
    superClass: "phina.util.EventDispatcher",

    /**
     * @constructor
     */
    init: function(src) {
      this.superInit();

      this.domElement = new Image();
      this.domElement.src = src;

      var self = this;
      this.domElement.onload = function() {
        self.loaded = true;
        self.flare( 'load' );
      };
    },

  });

});

