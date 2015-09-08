/*
 *
 */


phina.namespace(function() {

  /**
   * @class phina.graphics.CanvasRecorder
   * 
   */
  phina.define('phina.graphics.CanvasRecorder', {

    superClass: 'phina.util.EventDispatcher',

    init: function(canvas) {
      this.superInit();

      this.canvas = canvas;

      this.gif = new GIF({
        workers: 4,
        quality: 10,
        width: canvas.width,
        height: canvas.height,
      });
    },

    start: function() {
      var frameTime = 33;
      var time = 0;
      var id = setInterval(function() {
        time+=frameTime;

        console.log(time);

        if (time > 3000) {
          clearInterval(id);
        }
      }, frameTime);

      return this;
    },

    stop: function() {

    },

    open: function() {

    },
  });

});
