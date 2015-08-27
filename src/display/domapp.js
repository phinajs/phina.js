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

      this.mouse = phina.input.Mouse(this.domElement);
      this.touch = phina.input.Touch(this.domElement);
      this.touchList = phina.input.TouchList(this.domElement, 4);
      this.pointer = this.touch;
    },

    update: function() {
      this.mouse.update();
      this.touch.update();
      this.touchList.update();
    },

  });

  
});
