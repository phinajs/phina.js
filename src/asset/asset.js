
phina.namespace(function() {

  /**
   * @class phina.asset.Asset
   * 
   */
  phina.define('phina.asset.Asset', {
    superClass: "phina.util.EventDispatcher",

    /**
     * @constructor
     */
    init: function(src) {
      this.superInit();
    },

    load: function(src) {
      this.src = src;
      return phina.util.Flow(this._load.bind(this));
    },

    _load: function(resolve) {
      setTimeout(function() {
        resolve();
      }, 100);
    },

  });

});

