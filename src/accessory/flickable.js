


phina.namespace(function() {

  /**
   * @class phina.accessory.Flickable
   * Flickable
   */
  phina.define('phina.accessory.Flickable', {
    superClass: 'phina.accessory.Accessory',

    /**
     * @constructor
     */
    init: function(target) {
      this.superInit(target);

      this.initialPosition = phina.geom.Vector2(0, 0);
      var self = this;

      this.friction = 1.0;
      this.velocity = phina.geom.Vector2(0, 0);
      this.vertical = true;
      this.horizontal = true;

      this.on('attached', function() {
        this.target.setInteractive(true);

        this.target.on('pointstart', function(e) {
          self.initialPosition.set(this.x, this.y);
          self.velocity.set(0, 0);
        });
        this.target.on('pointmove', function(e) {
          if (self.horizontal) {
            this.x += e.pointer.dx;
          }
          if (self.vertical) {
            this.y += e.pointer.dy;
          }
        });

        this.target.on('pointend', function(e) {
          var dp = e.pointer.deltaPosition;

          if (dp.lengthSquared() > 10) {
            self.velocity.x = dp.x;
            self.velocity.y = dp.y;

            self.flare('flickstart', {
              direction: dp.clone().normalize(),
            });
          }
          else {
            self.cancel();
          }

          // self.flare('flick');
          // self.flare('flickend');
        });
      });
    },

    update: function() {
      if (!this.target) return ;

      this.velocity.x *= this.friction;
      this.velocity.y *= this.friction;

      if (this.horizontal) {
        this.target.position.x += this.velocity.x;
      }
      if (this.vertical) {
        this.target.position.y += this.velocity.y;
      }
    },

    cancel: function() {
      this.target.x = this.initialPosition.x;
      this.target.y = this.initialPosition.y;
      this.velocity.set(0, 0);

      // TODO: 
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

  phina.app.Element.prototype.getter('flickable', function() {
    if (!this._flickable) {
      this._flickable = phina.accessory.Flickable().attachTo(this);
    }
    return this._flickable;
  });
  
});