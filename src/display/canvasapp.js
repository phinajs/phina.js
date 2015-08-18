
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

    _draw: function() {
      this.canvas.clear();

      this.currentScene._render();

      var c = this.currentScene.canvas;
      this.canvas.context.drawImage(c.domElement, 0, 0, c.width, c.height);
    },

  });
});
