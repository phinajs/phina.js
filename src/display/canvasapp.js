
phina.namespace(function() {

  /**
   * @class phina.display.CanvasApp
   * 
   */
  phina.define('phina.display.CanvasApp', {
    superClass: 'phina.display.DomApp',

    /**
     * @constructor
     */
    init: function(params) {
      if (!params.query && !params.domElement) {
        params.domElement = document.createElement('canvas');
      }
      this.superInit(params);

      params.$safe({
        width: 640,
        height: 960,
        columns: 12,
      });

      this.gridX = phina.util.Grid({
        width: params.width,
        columns: params.columns,
      });
      this.gridY = phina.util.Grid({
        width: params.height,
        columns: params.columns,
      });

      this.canvas = phina.graphics.Canvas(this.domElement);
      this.canvas.setSize(params.width, params.height);

      this.backgroundColor = 'white';

      this.replaceScene(phina.display.CanvasScene({
        width: params.width,
        height: params.height,
      }));

      this.fitScreen();
    },

    _draw: function() {
      if (this.backgroundColor) {
        this.canvas.clearColor(this.backgroundColor);
      } else {
        this.canvas.clear();
      }

      if (this.currentScene.canvas) {
        this.currentScene._render();

        var c = this.currentScene.canvas;
        this.canvas.context.drawImage(c.domElement, 0, 0, c.width, c.height);
      }
    },

    fitScreen: function() {
      this.canvas.fitScreen();
    },

  });
});
