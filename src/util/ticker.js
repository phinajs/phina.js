
;(function() {

  /**
   * @class phina.util.Ticker
   * tick management class
   * @extends phina.util.EventDispatcher
   */
  phina.define('phina.util.Ticker', {
    superClass: 'phina.util.EventDispatcher',

    /** 経過フレーム数 */
    frame: null,
    /** 1フレームの経過時間 */
    deltaTime: null,
    /** 全体の経過時間 */
    elapsedTime: null,

    /**
     * @constructor
     */
    init: function() {
      this.superInit();

      this.fps = 30;
      this.frame = 0;
      this.deltaTime = 0;
      this.elapsedTime = 0;
      this.runner = phina.util.Ticker.runner;
    },

    tick: function(func) {
      this.on('tick', func);
    },

    run: function() {
      var now = (new Date()).getTime();
      // 1フレームに掛かった時間
      this.deltaTime = now - this.currentTime;
      // 全体の経過時間
      this.elapsedTime = now - this.startTime;

      var start = this.currentTime = now;
      this.flare('tick');
      var end = (new Date()).getTime();

      // フレームを更新
      this.frame += 1;

      // calculate elapsed time
      var elapsed = end-start;

      // calculate next waiting time
      var delay = Math.max(this.frameTime-elapsed, 0);

      return delay;
    },

    start: function() {
      var self = this;

      this.startTime = this.currentTime = (new Date()).getTime();
      var runner = self.runner;
      var fn = function() {
        var delay = self.run();
        runner(fn, delay);
      };
      fn();

      return this;
    },

    resume: function() {
      // TODO: 
    },

    stop: function() {
      // TODO: 
    },

    rewind: function() {
      // TODO: 
    },

    _accessor: {
      fps: {
        "get": function()   { return this._fps; },
        "set": function(v)  {
          this._fps = v;
          this.frameTime = 1000/this._fps;
        },
      },
    },
    
    _static: {
      runner: function(run, delay) {
        setTimeout(run, delay);
      },
    },
    
  });

})();