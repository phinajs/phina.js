phina.namespace(function() {


  phina.define('phina.app.Interactive', {

    init: function(app) {
      this.app = app;
    },

    check: function(root) {
      this._checkElement()
    },

    _checkElement: function(obj) {
      this.app.pointers.forEach(function(p) {
        if (p.id !== null) {
          this.__checkElement(obj, p);
        }
      }, this);
    },

    __checkElement: function(obj, p) {
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
