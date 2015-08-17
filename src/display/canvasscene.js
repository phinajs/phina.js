
phina.namespace(function() {

  /**
   * @class
   */
  phina.define('phina.display.CanvasScene', {
    // superClass: 'phina.app.Scene',

    init: function() {
      // this.superInit();

      this.canvas = phina.graphics.Canvas();
      this.renderer = phina.graphics.CanvasRenderer(this.canvas);

      this.children = [];
    },

    _render: function() {
      this.renderer.render(this);
    },

  });


  phina.define('phina.graphics.CanvasRenderer', {

    init: function(canvas) {
      this.canvas = canvas;
      this._context = this.canvas.context;
    },
    render: function(scene) {
      this._context.save();
      this.renderObject(scene);
      this._context.restore();
    },
    renderObject: function(obj) {
      if (obj.visible === false) return ;

      if (obj.draw) {
        obj.draw(this.canvas);
      }
      // 子供たちも実行
      if (obj.children.length > 0) {
          var tempChildren = obj.children.slice();
          for (var i=0,len=tempChildren.length; i<len; ++i) {
              this.renderObject(tempChildren[i]);
          }
      }
    },
  });

});
