phina.namespace(function() {

  /**
   * @class phina.app.Updater
   */
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

      // エンターフレームイベント
      if (element.has('enterframe')) {
        element.flare('enterframe', {
          app: this.app,
        });
      }

      // 更新
      if (element.update) element.update(app);

      // タッチ判定
      // this._checkPoint(element);

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

      this.app.pointers.forEach(function(p) {
        if (p.id !== null) {
          this.__checkPoint(obj, p);
        }
      }, this);
    },

    __checkPoint: function(obj, p) {
      if (!obj.interactive) return ;

      var prevOverFlag = obj._overFlags[p.id];
      var overFlag = obj.hitTest2(p.x, p.y);
      obj._overFlags[p.id] = overFlag;

      if (!prevOverFlag && overFlag) {
        obj.flare('pointover', {
          pointer: p,
        });
      }
      if (prevOverFlag && !overFlag) {
        obj.flare('pointout');
      }

      if (overFlag) {
        if (p.getPointingStart()) {
          obj._touchFlags[p.id] = true;
          obj.flare('pointstart');
        }
      }

      if (obj._touchFlags[p.id]) {
        obj.flare('pointstay');
        if (p._moveFlag) {
          obj.flare('pointmove');
        }
      }

      if (obj._touchFlags[p.id]===true && p.getPointingEnd()) {
        obj._touchFlags[p.id] = false;
        obj.flare('pointend');

        if (obj._overFlags[p.id]) {
          obj._overFlags[p.id] = false;
          obj.flare('pointout');
        }
      }
    },

  });

  
});
