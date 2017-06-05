/*
 *
 */


phina.namespace(function() {

  /**
   * @class phina.accessory.Physical
   * 本物ではないので名前変えるかも
   * FakePhysical or MarioPhysical or LiePhysical
   * RetroPysical or PysicaLike
   * @extends phina.accessory.Accessory
   */
  phina.define('phina.accessory.Physical', {
    superClass: 'phina.accessory.Accessory',

    /**
     * @constructor
     */
    init: function(target) {
      this.superInit(target);

      this.velocity = phina.geom.Vector2(0, 0);
      this.gravity = phina.geom.Vector2(0, 0);

      this.friction = 1.0;
    },

    update: function() {
      var t = this.target;

      this.velocity.x *= this.friction;
      this.velocity.y *= this.friction;

      this.velocity.x += this.gravity.x;
      this.velocity.y += this.gravity.y;

      t.position.x += this.velocity.x;
      t.position.y += this.velocity.y;
    },

    force: function(x, y) {
      this.velocity.set(x, y);
      return this;
    },

    addForce: function(x, y) {
      this.velocity.x += x;
      this.velocity.y += y;
      return this;
    },

    setGravity: function(x, y) {
      this.gravity.set(x, y);
      return this;
    },

    setFriction: function(fr) {
      this.friction = fr;
      return this;
    },
  });

  phina.app.Element.prototype.getter('physical', function() {
    if (!this._physical) {
      this._physical = phina.accessory.Physical().attachTo(this);
    }
    return this._physical;
  });


});
