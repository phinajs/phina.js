/*
 *
 */


;(function() {
  /**
   * @class global.Number
   * Numberの拡張
   */

  /**
   * @method  round
   * 四捨五入
   * 桁数指定版
   */
  Number.prototype.$method("round", function(figure) {
    figure = figure || 0;
    var base = Math.pow(10, figure);
    var temp = this * base;
    temp = Math.round(temp);
    return temp/base;
  });
  
  /**
   * @method  ceil
   * 切り上げ.
   * 桁数指定版
   */
  Number.prototype.$method("ceil",  function(figure) {
    figure = figure || 0;
    var base = Math.pow(10, figure);
    var temp = this * base;
    temp = Math.ceil(temp);
    return temp/base;
  });
  /**
   * @method  floor
   * 切り捨て
   * 桁数指定版
   */
  Number.prototype.$method("floor",  function(figure) {
    figure = figure || 0;
    var base = Math.pow(10, figure);
    var temp = this * base;
    temp = Math.floor(temp);
    
    // ~~this
    // this|0
    
    return temp/base;
  });
  
  /**
   * @method  toInt
   * integer 型に変換する
   */
  Number.prototype.$method("toInt",  function() {
    return (this | 0);
  });
  
  /**
   * @method  toHex
   * 16進数化
   */
  Number.prototype.$method("toHex",  function() {
    return this.toString(16);
  });
  
  /**
   * @method  toBin
   * 2進数化
   */
  Number.prototype.$method("toBin",  function() {
    return this.toString(2);
  });
  
  
  /**
   * @method  toUnsigned
   * unsigned 型に変換する
   */
  Number.prototype.$method("toUnsigned",  function() {
    return this >>> 0;
  });
  
  /**
   * @method  padding
   * 文字埋め
   */
  Number.prototype.$method("padding",  function(n, ch) {
    var str = this+'';
    n  = n-str.length;
    ch = (ch || '0')[0];
    
    while(n-- > 0) { str = ch + str; }
    
    if (str.indexOf("-") >= 0) {
      str = "-" + str.replace("-", "");
    }

    return str;
  });


  /**
   * @method  times
   * 数値分繰り返す
   */
  Number.prototype.$method("times",  function(fn, self) {
    self = self || this;
    for (var i=0; i<this; ++i) {
      fn.call(self, i, this);
    }
    return this;
  });

  /**
   * @method  upto
   * インクリメント繰り返し
   */
  Number.prototype.$method("upto",  function(t, fn, self) {
    self = self || this;
    for (var i=+this; i<=t; ++i) {
      fn.call(self, i, this);
    }
    return this;
  });
  
  /**
   * @method  downto
   * デクリメント繰り返し
   */
  Number.prototype.$method("downto",  function(t, fn, self) {
    self = self || this;
    for (var i=+this; i>=t; --i) {
      fn.call(self, i, this);
    }
    return this;
  });

  /**
   * @method step
   * ステップ繰り返し(float対応)
   */
  Number.prototype.$method("step",  function(limit, step, fn, self) {
    self = self || this;
    if (this < limit && step > 0 || this > limit && step < 0) {
      for (var i=+this; i<=limit; i+=step) {
        fn.call(self, i, this);
      }
    }
    return this;
  });

  /**
   * @method  map
   * return で返された値の配列を作る
   */
  Number.prototype.$method("map",  function(fn, self) {
    self = self || this;

    var results = [];
    for (var i=0; i<this; ++i) {
      var r = fn.call(self, i);
      results.push(r);
    }
    return results;
  });

  /**
   * @method abs
   * 絶対値
   */
  Number.prototype.$method("abs", function() { return Math.abs(this) });

  /**
   * @method acos
   * アークコサイン
   */
  Number.prototype.$method("acos", function() { return Math.acos(this) });

  /**
   * @method asin
   * アークサイン
   */
  Number.prototype.$method("asin", function() { return Math.asin(this) });

  /**
   * @method atan
   * アークタンジェント
   */
  Number.prototype.$method("atan", function() { return Math.atan(this) });

  /**
   * @method cos
   * コサイン
   */
  Number.prototype.$method("cos", function() { return Math.cos(this) });

  /**
   * @method exp
   * E^num
   */
  Number.prototype.$method("exp", function() { return Math.exp(this) });

  /**
   * @method log
   * 自然対数
   */
  Number.prototype.$method("log", function() { return Math.log(this) });

  /**
   * @method max
   * max
   */
  Number.prototype.$method("max", function(value) { return Math.max(this, value) });

  /**
   * @method min
   * min
   */
  Number.prototype.$method("min", function(value) { return Math.min(this, value) });

  /**
   * @method clamp
   * clamp
   */
  Number.prototype.$method("clamp", function(min, max) { return Math.clamp(this, min, max) });

  /**
   * @method pow
   * 乗数
   */
  Number.prototype.$method("pow", function(exponent) { return Math.pow(this, exponent) });

  /**
   * @method sin
   * サイン
   */
  Number.prototype.$method("sin", function() { return Math.sin(this) });

  /**
   * @method sqrt
   * 平方根
   */
  Number.prototype.$method("sqrt", function() { return Math.sqrt(this) });

  /**
   * @method tan
   * タンジェント
   */
  Number.prototype.$method("tan", function() { return Math.tan(this) });

  /**
   * @method toDegree
   * to degree
   */
  Number.prototype.$method("toDegree", function() { return (this*Math.RAD_TO_DEG); });

  /**
   * @method toRadian
   * to degree
   */
  Number.prototype.$method("toRadian", function() { return this*Math.DEG_TO_RAD; });

})();

