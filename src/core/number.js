/*
 *
 */


;(function() {

  /**
   * @method  times
   * 数値分繰り返す
   */
  Number.prototype.method("times",  function(fn, self) {
    self = self || this;
    for (var i=0; i<this; ++i) {
      fn.call(self, i);
    }
    return this;
  });

})();

