phina.namespace(function() {


  phina.define('phina.app.Updater', {

    init: function(app) {
      this.app = app;
    },

    update: function(root) {
      this._updateElement(root);
    },

    _updateElement: function(element) {
      var app = this.app;

      // 更新するかを判定
      if (element.awake === false) return ;

      // 更新
      if (element.update) element.update(app);

      // タッチ判定
      this._checkPoint(element);

      // エンターフレームイベント
      if (element.has('enterframe')) {
        element.flare('enterframe', {
          app: this.app,
        });
      }

      // 子供を更新
      var len = element.children.length;
      if (element.children.length > 0) {
        var tempChildren = element.children.slice();
        for (var i=0; i<len; ++i) {
          this._updateElement(tempChildren[i]);
        }
      }
    },

    _checkPoint: function(obj) {
      var p = this.app.pointer;

      if (p.flags !== 1) return ;

      if (obj.hitTest2 && obj.hitTest2(p.x, p.y)) {
        obj.flare('pointstay');
      }
      else {
        obj.flare('pointend');
      }
    },

  });

  
});
