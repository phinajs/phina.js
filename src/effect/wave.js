
phina.namespace(function() {

  /**
   * @class phina.effect.Wave
   * Button
   */
  phina.define('phina.effect.Wave', {
    superClass: 'phina.display.CircleShape',
    /**
     * @constructor
     */
    init: function(params) {
      this.superInit({
      	color: 'white',
      	color: 'red',
      	stroke: false,
      });
      this.clipping = true;
      this.width = 100;
      this.height = 100;
    },

    update: function() {
      this.style.radius += 2;
      this.alpha -= 0.05;
      if (this.alpha <= 0) {
        this.remove();
      }
    }
  });

});
