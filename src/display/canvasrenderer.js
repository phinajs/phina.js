

phina.namespace(function() {
  
  phina.define('phina.display.CanvasRenderer', {

    init: function(canvas) {
      this.canvas = canvas;
      this._context = this.canvas.context;
    },
    render: function(scene) {
      this.canvas.clear();
      
      this._context.save();
      this.renderObject(scene);
      this._context.restore();
    },
    renderObject: function(obj) {
      if (obj.visible === false) return ;

      obj._calcWorldMatrix && obj._calcWorldMatrix();

      var context = this.canvas.context;
      
      if (obj.draw) {
        // 行列をセット
        var m = obj._worldMatrix;
        context.setTransform( m.m11, m.m21, m.m12, m.m22, m.m13, m.m23 );

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
