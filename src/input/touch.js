
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

      this.id = null;

      var self = this;
      this.domElement.addEventListener('touchstart', function(e) {
        self._move(e.pointX, e.pointY, true);
        self.flags = 1;
      });

      this.domElement.addEventListener('touchend', function(e) {
        self.flags = 0;
      });
      this.domElement.addEventListener('touchmove', function(e) {
        self._move(e.pointX, e.pointY);
      });
    },
  });

})();


;(function() {

  phina.define('phina.input.TouchList', {
    domElement: null,

    init: function(domElement, length) {
      this.domElement = domElement;

      this.touches = [];

      (length).times(function() {
        var touch = phina.input.Touch(domElement);
        touch.id = null;
        this.touches.push(touch);
      }, this);

      var self = this;
      this.domElement.addEventListener('touchstart', function(e) {
        var touch = self.getTouch();
        var t = e.changedTouches[0];

        touch.id = e.changedTouches[0].identifier;
        touch._move(t.pointX, t.pointY, true);
        touch.flags = 1;
      });

      this.domElement.addEventListener('touchend', function(e) {
        var id = e.changedTouches[0].identifier;
        var touch = self.getTouch(id);
        touch.id = null;
        // self.flags = 0;
      });
      this.domElement.addEventListener('touchmove', function(e) {
        var changedTouches = e.changedTouches;
        Array.prototype.forEach.call(changedTouches, function(t) {
          var touch = self.getTouch(t.identifier);
          touch._move(t.pointX, t.pointY);
        });
      });
    },

    getTouch: function(id) {
      if (arguments.length === 0) id = null;

      return this.touches.filter(function(touch) {
        return touch.id === id;
      })[0];
    },

    update: function() {
      this.touches.forEach(function(touch) {
        if (touch.id !== null) {
          touch.update();
        }
      });
    }
  })

})();