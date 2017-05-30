
phina.namespace(function() {

  /**
   * @class phina.effect.Wave
   * Button
   * @extends phina.display.CircleShape
   */
  phina.define('phina.effect.Wave', {
    superClass: 'phina.display.CircleShape',
    /**
     * @constructor
     */
    init: function(options) {
      options = (options || {}).$safe({
        fill: 'white',
        stroke: false,
      });

      this.superInit(options);

      var tweener = phina.accessory.Tweener().attachTo(this);
      tweener
        .to({scaleX:2, scaleY:2, alpha:0}, 500)
        .call(function() {
          this.remove();
        }, this);
    },
  });

});
