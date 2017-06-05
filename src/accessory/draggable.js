


phina.namespace(function() {

  /**
   * @class phina.accessory.Draggable
   * Draggable
   * @extends phina.accessory.Accessory
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

        this._dragging = false;

        this.target.on('pointstart', function(e) {
          if (phina.accessory.Draggable._lock) return ;

          this._dragging = true;
          self.initialPosition.x = this.x;
          self.initialPosition.y = this.y;
          self.flare('dragstart');
          this.flare('dragstart');
        });
        this.target.on('pointmove', function(e) {
          if (!this._dragging) return ;

          this.x += e.pointer.dx;
          this.y += e.pointer.dy;
          self.flare('drag');
          this.flare('drag');
        });

        this.target.on('pointend', function(e) {
          if (!this._dragging) return ;

          this._dragging = false;
          self.flare('dragend');
          this.flare('dragend');
        });
      });
    },

    back: function(time, easing) {
      if (time) {
        var t = this.target;
        t.setInteractive(false);
        var tweener = phina.accessory.Tweener().attachTo(t);
        tweener
          .to({
            x: this.initialPosition.x,
            y: this.initialPosition.y,
          }, time, easing || 'easeOutElastic')
          .call(function() {
            tweener.remove();

            t.setInteractive(true);
            this.flare('backend');
          }, this);
      }
      else {
        this.target.x = this.initialPosition.x;
        this.target.y = this.initialPosition.y;
        this.flare('backend');
      }
    },

    enable: function() {
      this._enable = true;
    },

    _static: {
      _lock: false,
      lock: function() {
        this._lock = true;
      },
      unlock: function() {
        this._lock = false;
      },
    }

  });

  phina.app.Element.prototype.getter('draggable', function() {
    if (!this._draggable) {
      this._draggable = phina.accessory.Draggable().attachTo(this);
    }
    return this._draggable;
  });
  
});