
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
      this.superInit(params.query);

      params.$safe({
        width: 640,
        height: 960,
        columns: 12,
      });

      this.width = params.width;
      this.height = params.height;

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
      this.ratio = 1.0;

      this.replaceScene(phina.display.CanvasScene({
        width: params.width,
        height: params.height,
      }));

      this.fitScreen();
    },

    retina: function(flag) {
      if (flag) {
        this.ratio = 2.0;
      }
      else {
        this.ratio = 1.0;
      }

      this.canvas.domElement.width  = this.width*this.ratio;
      this.canvas.domElement.height = this.height*this.ratio;
    },

    _draw: function() {
      this.canvas.clearColor(this.backgroundColor);
      this.canvas.setTransform(this.ratio, 0, 0, this.ratio, 0, 0);
      
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
