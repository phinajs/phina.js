


phina.namespace(function() {

  phina.define('phina.accessory.Draggable', {
    superClass: 'phina.accessory.Accessory',

    /**
     * @constructor
     */
    init: function(target) {
      this.superInit(target);


      this.on('attached', function() {
        this.target.setInteractive(true);
        this.target.on('pointmove', function(e) {
          this.x += e.pointer.dx;
          this.y += e.pointer.dy;
        });
      });
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