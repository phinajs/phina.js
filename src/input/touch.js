
;(function() {

  /**
   * @class phina.input.Touch
   * @extends phina.input.Input
   */
  phina.define('phina.input.Touch', {

    superClass: 'phina.input.Input',

    /**
     * @constructor
     */
    init: function(domElement) {
      this.superInit(domElement);

      var self = this;
      this.domElement.addEventListener('touchstart', function(e) {
        self._move(e.pointX, e.pointY, true);
        self.touched = 1;
      });

      this.domElement.addEventListener('touchend', function(e) {
        self.touched = 0;
      });
      this.domElement.addEventListener('touchmove', function(e) {
        self._move(e.pointX, e.pointY);
      });
    },
  });

})();