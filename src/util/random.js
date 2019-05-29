phina.namespace(function() {

  /**
   * @class phina.util.Random
   * # 乱数を扱うためのクラス
   * 乱数を扱うためのメソッドやプロパティを定義しているクラスです。
   */
  phina.define('phina.util.Random', {

    /**
     * @property {Number} [seed = 1]
     * 乱数のシードです。
     */
    seed: 1,

    /**
     * @constructor
     * コンストラクタです。引数で {@link #seed} を設定できます。
     * 
     * @param {Number} [seed = (Date.now()) || 1] シード
     */
    init: function(seed) {
      this.seed = seed || (Date.now()) || 1;
    },

    /**
     * @method random
     * 0~1の乱数を返します。実行すると {@link #seed} は変わってしまいます。
     * 
     * @return {Number} 0~1 の乱数
     */
    random: function() {
      var seed = this.seed;
      seed = seed ^ (seed << 13);
      seed = seed ^ (seed >>> 17);
      seed = (seed ^ (seed << 5));

      this.seed = seed;

      return (seed >>> 0) / phina.util.Random.MAX;
    },

    /**
     * @method randint
     * 指定された範囲内でランダムな整数値を返します。実行すると {@link #seed} は変わってしまいます。
     * 
     * @param {Number} min 範囲の最小値
     * @param {Number} max 範囲の最大値
     * @return {Number} ランダムな整数値
     */
    randint: function(min, max) {
      return Math.floor( this.random()*(max-min+1) ) + min;
    },

    /**
     * @method randfloat
     * 指定された範囲内でランダムな数値を返します。実行すると {@link #seed} は変わってしまいます。
     * 
     * @param {Number} min 範囲の最小値
     * @param {Number} max 範囲の最大値
     * @return {Number} ランダムな数値
     */
    randfloat: function(min, max) {
      return this.random()*(max-min)+min;
    },

    /**
     * @method randbool
     * ランダムな真偽値を返します。引数で百分率を指定できます。実行すると {@link #seed} は変わってしまいます。
     * 
     * @param {Number} [perecent = 50] 真になる百分率
     * @return {Boolean} ランダムな真偽値
     */
    randbool: function(percent) {
      return this.random() < (percent === undefined ? 50 : percent) / 100;
    },

    /**
     * @method randarray
     * 任意の範囲でランダムな整数値を格納した任意の長さの配列を返します。実行すると {@link #seed} は変わってしまいます。
     * 
     * @param {Number} [len = 100] 配列の長さ
     * @param {Number} [min = 0] 範囲の最小値
     * @param {Number} [max = 100] 範囲の最大値
     * @return {Number} ランダムな整数値の入った配列
     */
    randarray: function(len, min, max) {
      len = len || 100;
      min = min || 0;
      max = max || 100;

      return (len).map(function() {
        return this.randint(min, max);
      }, this);
    },

    _accessor: {
      seed: {
        get: function() { return this._seed; },
        set: function (v) { this._seed = (v >>> 0) || 1; },
      },
    },

    _static: {
      /**
       * @property {Number} MAX
       * 内部的に使用される定数です。
       * 
       * @static
       */
      MAX: 4294967295,

      /**
       * @property {Number} [seed = (Date.now())] シード
       * static メソッドの乱数のシードです。
       * 
       * @static
       */
      seed: (Date.now()),

      /**
       * @method getSeed 
       * {@link #seed} の値を取得します。
       * 
       * @return {Number} シード
       * @static
       */
      getSeed: function() {
        return this.seed;
      },

      /**
       * @method setSeed
       * {@link #seed} の値をセットします。
       * 
       * @param {Number} [seed = 1] シード
       * @static
       * @chainable
       */
      setSeed: function(seed) {
        this.seed = (seed >>> 0) || 1;
        return this;
      },

      /**
       * @method random
       * 0~1の乱数を返します。実行すると {@link #seed} は変わってしまいます。
       * インスタンスメソッドの {@link #random} と同じです。
       * 
       * @return {Number} 0~1 の乱数
       * @static
       */
      random: function() {
        this.seed = this.xor32(this.seed);
        return (this.seed >>> 0) / phina.util.Random.MAX;
      },

      /**
       * @method randint
       * 指定された範囲内でランダムな整数値を返します。実行すると {@link #seed} は変わってしまいます。
       * インスタンスメソッドの {@link #randint} と同じです。
       * 
       * @param {Number} min 範囲の最小値
       * @param {Number} max 範囲の最大値
       * @return {Number} ランダムな整数値
       * @static
       */
      randint: function(min, max) {
        return phina.global.Math.floor( this.random()*(max-min+1) ) + min;
      },

      /**
       * @method randfloat
       * 指定された範囲内でランダムな数値を返します。実行すると {@link #seed} は変わってしまいます。
       * インスタンスメソッドの {@link #randfloat} と同じです。
       * 
       * @param {Number} min 範囲の最小値
       * @param {Number} max 範囲の最大値
       * @return {Number} ランダムな数値
       * @static
       */
      randfloat: function(min, max) {
        return this.random()*(max-min)+min;
      },

      /**
       * @method randbool
       * ランダムな真偽値を返します。引数で百分率を指定できます。実行すると {@link #seed} は変わってしまいます。
       * インスタンスメソッドの {@link #randbool} と同じです。
       * 
       * @param {Number} [perecent = 50] 真になる百分率
       * @return {Number} ランダムな真偽値
       * @static
       */
      randbool: function(perecent) {
        return this.randint(0, 99) < (perecent || 50);
      },

      /**
       * @method randarray
       * 任意の範囲でランダムな整数値を格納した任意の長さの配列を返します。実行すると {@link #seed} は変わってしまいます。
       * インスタンスメソッドの {@link #randarray} と同じです。
       * 
       * @param {Number} [len = 100] 配列の長さ
       * @param {Number} [min = 0] 範囲の最小値
       * @param {Number} [max = 100] 範囲の最大値
       * @return {Number} ランダムな整数値の入った配列
       * @static
       */
      randarray: function(len, min, max) {
        len = len || 100;
        min = min || 0;
        max = max || 100;

        return (len).map(function() {
          return this.randint(min, max);
        }, this);
      },

      /**
       * @method xor32
       * xorshift を用いて疑似乱数列を生成します。
       * 
       * @param {Number} seed
       * @return {Number} 疑似乱数列
       * @static
       */
      xor32: function(seed) {
        seed = seed ^ (seed << 13);
        seed = seed ^ (seed >>> 17);
        seed = (seed ^ (seed << 5));

        return seed;
      },

      /**
       * @method uuid
       * uuid を生成して返します。
       * 
       * @return {String} uuid
       * @static
       */
      //http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
      uuid: function() {
        var d = new Date().getTime();
        if(phina.global.performance && typeof phina.global.performance.now === 'function'){
          d += performance.now(); //use high-precision timer if available
        }
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = (d + Math.random()*16)%16 | 0;
          d = Math.floor(d/16);
          return (c=='x' ? r : (r&0x3|0x8)).toString(16);
        });
        return uuid;
      },

    },
  });

  Math.$method("randint", function(min, max) {
    return phina.util.Random.randint(min, max);
  });
  Math.$method("randfloat", function(min, max) {
    return phina.util.Random.randfloat(min, max);
  });

});
