
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
    init: function(domElement, isMulti) {
      this.superInit(domElement);

      this.id = null;

      if (isMulti === true) {
        return ;
      }

      var self = this;
      this.domElement.addEventListener('touchstart', function(e) {
        self._start(e.pointX, e.pointY, true);
      });

      this.domElement.addEventListener('touchend', function(e) {
        self._end();
      });
      this.domElement.addEventListener('touchmove', function(e) {
        self._move(e.pointX, e.pointY);
      });
    },

    /**
     * タッチしているかを判定
     */
    getTouch: function() {
      return this.now != 0;
    },
    
    /**
     * タッチ開始時に true
     */
    getTouchStart: function() {
      return this.start != 0;
    },
    
    /**
     * タッチ終了時に true
     */
    getTouchEnd: function() {
      return this.end != 0;
    },

  });

  /**
   * @method
   * ポインティング状態取得(mouse との差異対策)
   */
  phina.input.Touch.prototype.getPointing        = phina.input.Touch.prototype.getTouch;
  /**
   * @method
   * ポインティングを開始したかを取得(mouse との差異対策)
   */
  phina.input.Touch.prototype.getPointingStart   = phina.input.Touch.prototype.getTouchStart;
  /**
   * @method
   * ポインティングを終了したかを取得(mouse との差異対策)
   */
  phina.input.Touch.prototype.getPointingEnd     = phina.input.Touch.prototype.getTouchEnd;


})();



;(function() {

  phina.define('phina.input.TouchList', {
    superClass: Array,

    domElement: null,
    touchMap: null,
    init: function(domElement) {
      this.domElement = domElement;

      this.touches = this;

      var self = this;
      this.domElement.addEventListener('touchstart', function(e) {
        self.forEach.call(e.changedTouches, function(t) {
          var touch = self.getEmpty();
          touch.id = t.identifier;
          touch._start(t.pointX, t.pointY);
        });
      });

      this.domElement.addEventListener('touchend', function(e) {
        self.forEach.call(e.changedTouches, function(t) {
          self.getTouch(t.identifier).forEach(function(touch) {
            touch._end();
          });
        });
      });
      this.domElement.addEventListener('touchmove', function(e) {
        self.forEach.call(e.changedTouches, function(t) {
          self.getTouch(t.identifier).forEach(function(touch) {
            touch._move(t.pointX, t.pointY);
          });
        });
        e.stop();
      });
    },

    getEmpty: function() {
      var touch = phina.input.Touch(this.domElement, true);
      this.push(touch);
      return touch;
    },

    getTouch: function(id) {
      return this.filter(function(touch) {
        return touch.id === id && touch.flags !== 0;
      });
    },

    removeTouch: function(touch) {
      var i = this.indexOf(touch);
      this.splice(i, 1);
    },

    update: function() {
      this.forEach(function(touch) {
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

      }, this);
    }
  });

})();