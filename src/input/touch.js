
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

      return ;

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
      this.stockes = [];

      (length).times(function() {
        var touch = phina.input.Touch(domElement);
        touch.id = null;
        this.stockes.push(touch);
      }, this);

      var self = this;
      this.domElement.addEventListener('touchstart', function(e) {
        Array.prototype.forEach.call(e.changedTouches, function(t) {
          var touch = self.getEmpty();

          touch.id = t.identifier;
          touch._move(t.pointX, t.pointY, true);
          touch.flags = 1;
        });
      });

      this.domElement.addEventListener('touchend', function(e) {
        Array.prototype.forEach.call(e.changedTouches, function(t) {
          var touch = self.getTouch(t.identifier);
          touch.flags = 0;
        });
      });
      this.domElement.addEventListener('touchmove', function(e) {
        Array.prototype.forEach.call(e.changedTouches, function(t) {
          var touch = self.getTouch(t.identifier);
          touch._move(t.pointX, t.pointY);
        });
        e.stop();
      });
    },

    getEmpty: function() {
      var touch = this.stockes.pop();
      this.touches.push(touch);

      return touch;
    },

    getTouch: function(id) {
      return this.touches.filter(function(touch) {
        return touch.id === id;
      })[0];
    },

    removeTouch: function(touch) {
      var i = this.touches.indexOf(touch);
      this.touches.splice(i, 1);
      this.stockes.push(touch);
    },

    update: function() {
      this.touches.forEach(function(touch) {
        if (touch.id !== null) {
          if (!touch.released) {
            touch.update();

            if (touch.flags === 0) {
              touch.released = true;
            }
          }
          else {
            touch.released = false;
            this.removeTouch(touch);
          }
        }
      }, this);
    }
  })

})();