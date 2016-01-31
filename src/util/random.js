/*
 * random.js
 */

phina.namespace(function() {

  /**
   * @class phina.util.Random
   * ランダムクラス
   */
  phina.define("phina.util.Random", {

    seed: 1,

    init: function(seed) {
      this.seed = seed || (Date.now()) || 1;
    },

    random: function() {
      var seed = this.seed;
      seed = seed ^ (seed << 13);
      seed = seed ^ (seed >>> 17);
      seed = (seed ^ (seed << 5));

      this.seed = seed;

      return (seed >>> 0) / phina.util.Random.MAX;
    },

    randint: function(min, max) {
      return Math.floor( this.random()*(max-min+1) ) + min;
    },
    randfloat: function(min, max) {
      return this.random()*(max-min)+min;
    },
    randbool: function() {
      return this.randint(0, 1) === 1;
    },
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
      MAX: 4294967295,

      seed: (Date.now()),

      getSeed: function() {
        return this.seed;
      },
      setSeed: function(seed) {
        this.seed = (seed >>> 0) || 1;
        return this;
      },

      random: function() {
        this.seed = this.xor32(this.seed);
        return (this.seed >>> 0) / phina.util.Random.MAX;
      },

      randint: function(min, max) {
        return phina.global.Math.floor( this.random()*(max-min+1) ) + min;
      },
      randfloat: function(min, max) {
        return this.random()*(max-min)+min;
      },
      randbool: function() {
        return this.randint(0, 1) === 1;
      },
      randarray: function(len, min, max) {
        len = len || 100;
        min = min || 0;
        max = max || 100;

        return (len).map(function() {
          return this.randint(min, max);
        }, this);
      },

      xor32: function(seed) {
        seed = seed ^ (seed << 13);
        seed = seed ^ (seed >>> 17);
        seed = (seed ^ (seed << 5));

        return seed;
      },

      /*
       * http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
       */
      uuid: function() {
        var d = new Date().getTime();
        if(phina.global.performance && typeof phina.global.performance.now === "function"){
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
