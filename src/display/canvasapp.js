
phina.namespace(function() {

  /**
   * @class phina.display.CanvasApp
   * @extends phina.display.DomApp
   */
  phina.define('phina.display.CanvasApp', {
    superClass: 'phina.display.DomApp',

    /**
     * @constructor
     */
    init: function(options) {
      options = (options || {}).$safe(phina.display.CanvasApp.defaults);

      if (!options.query && !options.domElement) {
        options.domElement = document.createElement('canvas');
        if (options.append) {
          document.body.appendChild(options.domElement);
        }
      }
      if(!options.runner && phina.isAndroid()) {
        options.runner = phina.global.requestAnimationFrame;
      }
      this.superInit(options);

      this.gridX = phina.util.Grid({
        width: this.width,
        columns: options.columns,
      });
      this.gridY = phina.util.Grid({
        width: this.height,
        columns: options.columns,
      });

      this.canvas = phina.graphics.Canvas(this.domElement);
      this.canvas.setSize(this.width, this.height);

      this.backgroundColor = (options.backgroundColor !== undefined) ? options.backgroundColor : 'white';

      this.replaceScene(phina.display.DisplayScene({
        width: this.width,
        height: this.height,
      }));

      if (options.fit) {
        this.fitScreen();
      }

      if (options.pixelated) {
        // チラつき防止
        // https://drafts.csswg.org/css-images/#the-image-rendering
        this.domElement.style.imageRendering = 'pixelated';
      }

      // pushScene, popScene 対策
      this.on('push', function() {
        // onenter 対策で描画しておく
        if (this.currentScene.canvas) {
          this._draw();
        }
      });
    },

    _draw: function() {
      if (this.backgroundColor) {
        this.canvas.clearColor(this.backgroundColor);
      } else {
        this.canvas.clear();
      }

      if (this.currentScene.canvas) {
        this.currentScene._render();

        this._scenes.each(function(scene) {
          var c = scene.canvas;
          if (c) {
            this.canvas.context.drawImage(c.domElement, 0, 0, this.canvas.domElement.width, this.canvas.domElement.height);
          }
        }, this);
      }
    },

    fitScreen: function() {
      this.canvas.fitScreen();
    },

    _static: {
      defaults: {
        columns: 12,
        fit: true,
        append: true,
      },
    },

  });
});
