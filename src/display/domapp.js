phina.namespace(function() {

  /**
   * @class phina.display.DomApp
   * @extends phina.app.BaseApp
   */
  phina.define('phina.display.DomApp', {
    superClass: 'phina.app.BaseApp',

    domElement: null,

    /**
     * @constructor
     */
    init: function(query) {
      this.superInit();

      this.domElement = document.querySelector(query);
      // this.domElement = domElement;

      this.pointer = phina.input.Mouse(this.domElement);
    },

    update: function() {
      this.pointer.update();
    },

  });

  
});
