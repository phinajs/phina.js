/*
 * math.js
 */

;(function() {
    
  /**
   * @class global.Math
   * # 拡張した Math クラス
   * 数学的な処理を扱う Math クラスを拡張しています。
   */

  
  /**
   * @property DEG_TO_RAD
   * 度をラジアンに変換するための定数です。
   */
  Math.DEG_TO_RAD = Math.PI/180;
  
  /**
   * @property RAD_TO_DEG
   * ラジアンを度に変換するための定数です。
   */
  Math.RAD_TO_DEG = 180/Math.PI;
  
  /**
   * @property PHI
   * 黄金比です。
   */
  Math.PHI = (1 + Math.sqrt(5)) / 2;
  
  /**
   * @static
   * @method degToRad
   * 度をラジアンに変換します。
   *
   * ### Example
   *     Math.degToRad(180); // => 3.141592653589793
   *
   * @param {Number} deg 度
   * @return {Number} ラジアン
   */
  Math.degToRad = function(deg) {
    return deg * Math.DEG_TO_RAD;
  };
  
  /**
   * @static
   * @method radToDeg
   * ラジアンを度に変換します。
   *
   * ### Example
   *     Math.radToDeg(Math.PI/4); // => 45
   *
   * @param {Number} rad ラジアン
   * @return {Number} 度
   */
  Math.radToDeg = function(rad) {
    return rad * Math.RAD_TO_DEG;
  };
  

  
  /**
   * @static
   * @method clamp
   * 指定した値を指定した範囲に収めた結果を返します。
   *
   * ### Example
   *     Math.clamp(120, 0, 640); // => 120
   *     Math.clamp(980, 0, 640); // => 640
   *     Math.clamp(-80, 0, 640); // => 0
   *
   * @param {Number} value 値
   * @param {Number} min  範囲の下限
   * @param {Number} max  範囲の上限
   * @return {Number} 丸めた結果の値
   */
  Math.$method("clamp", function(value, min, max) {
    return (value < min) ? min : ( (value > max) ? max : value );
  });
  
  /**
   * @static
   * @method inside
   * 指定した値が指定した値の範囲にあるかどうかを返します。
   *
   * ### Example
   *     Math.inside(980, 0, 640); // => false
   *     Math.inside(120, 0, 640); // => true
   *
   * @param {Number} value チェックする値
   * @param {Number} min  範囲の下限
   * @param {Number} max  範囲の上限
   * @return {Boolean} 範囲内に値があるかないか
   */
  Math.$method("inside", function(value, min, max) {
    return (value >= min) && (value) <= max;
  });
  
  /**
   * @static
   * @method randint
   * 指定された範囲内でランダムな整数値を生成します。
   *
   * ### Example
   *     Math.randint(-4, 4); // => -4、0、3、4 など
   *
   * @param {Number} min  範囲の最小値
   * @param {Number} max  範囲の最大値
   * @return {Number} ランダムな整数値
   */
  Math.$method("randint", function(min, max) {
    return Math.floor( Math.random()*(max-min+1) ) + min;
  });
  
  /**
   * @static
   * @method randfloat
   * 指定された範囲内でランダムな数値を生成します。
   *
   * ### Example
   *     Math.randfloat(-4, 4); // => -2.7489193824000937 など
   *
   * @param {Number} min  範囲の最小値
   * @param {Number} max  範囲の最大値
   * @return {Number} ランダムな数値
   */
  Math.$method("randfloat", function(min, max) {
    return Math.random()*(max-min)+min;
  });

  /**
   * @static
   * @method randbool
   * ランダムに真偽値を生成します。
   * 引数で百分率を指定する事もできます。
   *
   * ### Example
   *     Math.randbool();   // => true または false
   *     Math.randbool(80); // => 80% の確率で true
   *
   * @param {Number} percent  真になる百分率
   * @return {Boolean} ランダムな真偽値
   */
  Math.$method("randbool", function(perecent) {
    return Math.randint(0, 100) < (perecent || 50);
  });
    
})();