
phina.namespace(function() {

  /**
   * @class phina.accessory.Accessory
   */
  phina.define('phina.accessory.Accessory', {
    superClass: 'phina.util.EventDispatcher',

    /**
     * @constructor
     */
    init: function(target) {
      this.superInit();

      if(target) this.attachTo(target);
    },
    getTarget: function() {
      return this.target;
    },
    isAttached: function() {
      return !!this.target;
    },
    attachTo: function(element) {
      element.attach(this);
      return this;
    },
    remove: function() {
      this.target.detach(this);
    },
  });

  phina.app.Element.prototype.$method('attach', function(accessory) {
    this.accessories.push(accessory);
    accessory.target = this;
    accessory.flare('attached');

    return this;
  });

  phina.app.Element.prototype.$method('detach', function(accessory) {
    this.accessories.erase(accessory);
    accessory.target = null;
    accessory.flare('detached');

    return this;
  });

});


