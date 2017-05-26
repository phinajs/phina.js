
phina.namespace(function() {

  /**
   * @class phina.asset.Script
   * @extends phina.asset.Asset
   */
  phina.define('phina.asset.Script', {
    superClass: "phina.asset.Asset",

    /**
     * @constructor
     */
    init: function() {
      this.superInit();
    },

    _load: function(resolve) {
      var self = this;
      this.domElement = document.createElement('script');
      this.domElement.src = this.src;

      this.domElement.onload = function() {
        resolve(self);
      }.bind(this);

      document.body.appendChild(this.domElement);
    },

  });

});

