
phina.namespace(function() {

  /**
   * @class phina.asset.File
   * 
   */
  phina.define('phina.asset.File', {
    superClass: "phina.asset.Asset",

    /**
     * @constructor
     */
    init: function() {
      this.superInit();
    },

    _load: function(resolve) {
      // this.domElement = new Image();
      // this.domElement.src = this.src;

      // var self = this;
      // this.domElement.onload = function() {
      //   self.loaded = true;
      //   resolve(self);
      // };
    },

  });

});

