
phina.namespace(function() {

  /**
   * @class
   */
  phina.define('phina.display.CanvasScene', {
    superClass: 'phina.app.Scene',

    init: function(params) {
      this.superInit();

      this.canvas = phina.graphics.Canvas();
      this.canvas.setSize(params.width, params.height);
      this.renderer = phina.display.CanvasRenderer(this.canvas);
    },

    _update: function() {
      if (this.update) {
        this.update();
      }
    },

    _render: function() {
      this.renderer.render(this);
    },

  });


});
