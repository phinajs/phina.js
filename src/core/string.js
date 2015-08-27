/*
 *
 */


;(function() {
  /**
   * @class global.String
   * Stringの拡張
   */

  /**
   * @method  format
   * フォーマット
   * ## example
   *      document.write("{0} + {1} = {2}".format(5, 10, 5+10));   // "5 + 10 = 15"
   *      document.write("rgb({r}, {g}, {b})".format({             // "rgb(128, 0, 255)"
   *          r: 128,
   *          g: 0,
   *          b: 255
   *      }));
   */
  String.prototype.method("format", function(arg) {
    // 置換ファンク
    var rep_fn = undefined;
    
    // オブジェクトの場合
    if (typeof arg == "object") {
      /** @ignore */
      rep_fn = function(m, k) {
        if (arg[k] === undefined) {
          return '';
        }
        else {
          return arg[k];
        }
      }
    }
    // 複数引数だった場合
    else {
      var args = arguments;
      /** @ignore */
      rep_fn = function(m, k) { return args[ parseInt(k) ]; }
    }
    
    return this.replace( /\{(\w+)\}/g, rep_fn );
  });

})();

