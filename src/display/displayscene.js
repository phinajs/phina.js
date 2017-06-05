
phina.namespace(function() {

  /**
   * @class phina.display.DisplayScene
   * @extends phina.app.Scene
   */
  phina.define('phina.display.DisplayScene', {
    superClass: 'phina.app.Scene',

    init: function(params) {
      this.superInit();

      params = ({}).$safe(params, phina.display.DisplayScene.defaults);

      this.canvas = phina.graphics.Canvas();
      this.canvas.setSize(params.width, params.height);
      this.renderer = phina.display.CanvasRenderer(this.canvas);
      this.backgroundColor = (params.backgroundColor) ? params.backgroundColor : null;
      
      this.width = params.width;
      this.height = params.height;
      this.gridX = phina.util.Grid(params.width, 16);
      this.gridY = phina.util.Grid(params.height, 16);

      // TODO: 一旦むりやり対応
      this.interactive = true;
      this.setInteractive = function(flag) {
        this.interactive = flag;
      };
      this._overFlags = {};
      this._touchFlags = {};
    },

    hitTest: function() {
      return true;
    },

    _update: function() {
      if (this.update) {
        this.update();
      }
    },

    _render: function() {
      this.renderer.render(this);
    },

    _static: {
      defaults: {
        width: 640,
        height: 960,
      },
    }

  });


});
