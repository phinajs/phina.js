
phina.namespace(function() {

  /**
   * @class phina.asset.Texture
   * 
   */
  phina.define('phina.asset.Texture', {
    superClass: "phina.asset.Asset",

    /**
     * @constructor
     */
    init: function() {
      this.superInit();
    },

    _load: function(resolve) {
      this.domElement = new Image();
      this.domElement.src = this.src;

      var self = this;
      this.domElement.onload = function(e) {
        self.loaded = true;
        resolve(self);
      };
      this.domElement.onerror = function(e) {
        console.error("[phina.js] not found `{0}`!".format(this.src));

        var key = self.src.split('/').last.replace('.png', '').split('?').first.split('#').first;
        e.target.src = "http://dummyimage.com/128x128/444444/eeeeee&text=" + key;
        e.target.onerror = null;
      };
    },

  });

});

