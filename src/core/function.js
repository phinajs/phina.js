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

})();
