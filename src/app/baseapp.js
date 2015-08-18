phina.namespace(function() {


  phina.define('phina.app.BaseApp', {
    superClass: 'phina.event.EventDispatcher',

    awake: true,

    init: function(element) {
      this.superInit();

      this.domElement = element;
      this._scenes = [];

      this.updater = phina.app.Updater(this);
    },

    run: function() {
      var self = this;

      this.startedTime = new Date();
      this.prevTime = new Date();
      this.deltaTime = 0;

      var fps = 1000/30;

      var _run = function() {
        // start
        var start = (new Date()).getTime();

        // run
        self._loop();

        // calculate progress time
        var progress = (new Date()).getTime() - start;
        // calculate next waiting time
        // var newDelay = self.timer.frameTime-progress;
        var newDelay = fps-progress;


        // set next running function
        setTimeout(_run, newDelay);
      };

      _run();

      return this;
    },

    _loop: function() {
      this._update();
      this._draw();

      var now = new Date();
      this.deltaTime = now - this.prevTime;
      this.prevTime = now;
    },


    _update: function() {
      if (this.awake) {
        this.updater.update(this.currentScene);
      }
    },

    /**
     * 描画用仮想関数
     * @private
     */
    _draw: function() {},

    _accessor: {
      currentScene: {
        "get": function()   { return this._scenes[0]; },
        "set": function(v)  { this._scenes[0] = v; },
      },
    },

  });

  
});
