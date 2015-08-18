
phina.namespace(function() {

  /**
   * @class
   */
  phina.define('phina.display.CanvasScene', {
    superClass: 'phina.app.Scene',

    init: function() {
      this.superInit();

      this.canvas = phina.graphics.Canvas();
      this.renderer = phina.graphics.CanvasRenderer(this.canvas);
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
