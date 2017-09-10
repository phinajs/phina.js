/*
 * function.js
 */


;(function() {

  /**
   * @method interval
   */
  Function.prototype.$method('interval', function(time) {
    var id = null;
    var self = this;
    return {
      start: function() {
        id = setInterval(self, time);
      },
      stop: function() {
        if (id) {
          clearInterval(id);
          id = null;
        }
      },
    };
  });

  /**
   * @method timeout
   */
  Function.prototype.$method('timeout', function(time) {
  });

  /**
   * @method loop
   */
  Function.prototype.$method('loop', function(time) {
  });

  /**
   * @method throttle
   */
  Function.prototype.$method('throttle', function(time) {
  });

  /**
   * @method debounce
   */
  Function.prototype.$method('debounce', function(time) {
  });

})();


