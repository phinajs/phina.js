phina.namespace(function() {


  phina.define('phina.app.Interactive', {

    init: function(app) {
      this.app = app;
      this._enable = true;
      this.cursor = {
        normal: '',
        hover: 'pointer',
      };

      this.app.domElement.addEventListener('mouseover', function() {
        this.app.domElement.style.cursor = this.cursor.normal;
      }.bind(this), false);
    },

    enable: function() {
      this._enable = true;
      return this;
    },
    disable: function() {
      this._enable = false;
      return this;
    },

    check: function(root) {
      if (!this._enable) return ;
      this._checkElement(root)
    },

    _checkElement: function(element) {
      var app = this.app;

      // 更新するかを判定
      if (element.awake === false) return ;

      // 子供を更新
      var len = element.children.length;
      if (element.children.length > 0) {
        var tempChildren = element.children.slice();
        for (var i=0; i<len; ++i) {
          this._checkElement(tempChildren[i]);
        }
      }

      // タッチ判定
      this._checkPoint(element);
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
      var overFlag = obj.hitTest(p.x, p.y);
      obj._overFlags[p.id] = overFlag;

      if (!prevOverFlag && overFlag) {
        obj.flare('pointover', {
          pointer: p,
        });

        if (obj.boundingType && obj.boundingType !== 'none') {
          this.app.domElement.style.cursor = this.cursor.hover;
        }
      }
      if (prevOverFlag && !overFlag) {
        obj.flare('pointout');

        this.app.domElement.style.cursor = this.cursor.normal;
      }

      if (overFlag) {
        if (p.getPointingStart()) {
          obj._touchFlags[p.id] = true;
          obj.flare('pointstart', {
            pointer: p,
          });
          // クリックフラグを立てる
          obj._clicked = true;
        }
      }

      if (obj._touchFlags[p.id]) {
        obj.flare('pointstay', {
          pointer: p,
        });
        if (p._moveFlag) {
          obj.flare('pointmove', {
            pointer: p,
          });
        }
      }

      if (obj._touchFlags[p.id]===true && p.getPointingEnd()) {
        obj._touchFlags[p.id] = false;
        obj.flare('pointend', {
          pointer: p,
        });

        if (obj._overFlags[p.id]) {
          obj._overFlags[p.id] = false;
          obj.flare('pointout');
        }
      }
    },
  });

  
});
