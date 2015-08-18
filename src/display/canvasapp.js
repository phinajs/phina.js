
phina.namespace(function() {

  /**
   * @class
   */
  phina.define('phina.display.CanvasApp', {
    superClass: 'phina.app.BaseApp',

    init: function(params) {
      this.domElement = document.querySelector(params.query);
      this.superInit(this.domElement);
      this.canvas = phina.graphics.Canvas(this.domElement);
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

    _draw: function() {
      this.canvas.clear();

      this.currentScene._render();

      var c = this.currentScene.canvas;
      this.canvas.context.drawImage(c.domElement, 0, 0, c.width, c.height);
    },

  });
});
