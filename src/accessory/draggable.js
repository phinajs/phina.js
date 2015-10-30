


phina.namespace(function() {

  /**
   * @class phina.accessory.Draggable
   * Draggable
   */
  phina.define('phina.accessory.Draggable', {
    superClass: 'phina.accessory.Accessory',

    /**
     * @constructor
     */
    init: function(target) {
      this.superInit(target);

      this.initialPosition = phina.geom.Vector2(0, 0);
      var self = this;

      this.on('attached', function() {
        this.target.setInteractive(true);

        this.target.on('pointstart', function(e) {

          self.initialPosition.x = this.x;
          self.initialPosition.y = this.y;
          self.flare('dragstart');
        });
        this.target.on('pointmove', function(e) {
          this.x += e.pointer.dx;
          this.y += e.pointer.dy;
          self.flare('drag');
        });

        this.target.on('pointend', function(e) {
          self.flare('dragend');
        });
      });
    },

    back: function() {
      // TODO: 
      this.target.x = this.initialPosition.x;
      this.target.y = this.initialPosition.y;
      // this.setInteractive(false);
      // this.tweener.clear()
      //     .move(this.initialX, this.initialY, 500, "easeOutElastic")
      //     .call(function () {
      //         this.setInteractive(true);
      //         this.fire(tm.event.Event("backend"));
      //     }.bind(this));
    },

    enable: function() {
      this._enable = true;
    },

  });

  phina.app.Element.prototype.getter('draggable', function() {
    if (!this._draggable) {
      this._draggable = phina.accessory.Draggable().attachTo(this);
    }
    return this._draggable;
  });
  
});