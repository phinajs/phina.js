
;(function() {

  /**
   * @class phina.util.Grid
   * tick management class
   */
  phina.define('phina.util.Grid', {

    /** 幅 */
    width: 640,
    /** 列数 */
    columns: 12,
    /** ループ */
    loop: false,

    init: function() {
      if (typeof arguments[0] === 'object') {
        var param = arguments[0];
        width = param.width || 640;
        columns = param.columns || 12;
        loop = param.loop || false;
      }

      this.width = width;
      this.columns = columns;
      this.loop = loop;
      this.unitWidth = this.width/this.columns;
    },

    // スパン指定で値を取得(負数もok)
    span: function(index) {
      if (loop) {
        index += this.columns;
        index %= this.columns;
      }
      return this.unitWidth * index;
    },

    center: function() {
      return this.width/2;
    },

  });

})();