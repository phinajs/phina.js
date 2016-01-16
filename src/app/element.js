
phina.namespace(function() {

  /**
   * @class phina.app.Element
   * @extends phina.util.EventDispatcher
   */
  phina.define('phina.app.Element', {
    superClass: 'phina.util.EventDispatcher',

    /// 親
    parent: null,

    /// 子供
    children: null,

    /// 有効化どうか
    awake: true,

    /**
     * @constructor
     */
    init: function() {
      this.superInit();
      this.children = [];
    },

    addChild: function(child) {
      if (child.parent) child.remove();

      child.parent = this;
      this.children.push(child);

      child.has('added') && child.flare('added');

      return child;
    },

    addChildTo: function(parent) {
      parent.addChild(this);

      return this;
    },

    addChildAt: function(child, index) {
      if (child.parent) child.remove();

      child.parent = this;
      this.children.splice(index, 0, child);

      child.has('added') && child.flare('added');

      return child;
    },

    getChildAt: function(index) {
      return this.children.at(index);
    },

    getChildByName: function(name) {
      // TODO: 
    },

    getChildIndex: function(child) {
      return this.children.indexOf(child);
    },

    getParent: function() {
      return this.parent;
    },

    getRoot: function() {
      var elm = this;
      for (elm=this.parent; elm.parent != null; elm = elm.parent) {

      }
      return elm;
    },

    removeChild: function(child) {
      var index = this.children.indexOf(child);
      if (index !== -1) {
        this.children.splice(index, 1);
        child.has('removed') && child.flare('removed');
      }
      return this;
    },

    remove: function() {
      if (!this.parent) return ;

      this.parent.removeChild(this);
      this.parent = null;
      
      return this;
    },

    isAwake: function() {
      return this.awake;
    },

    wakeUp: function() {
      this.awake = true;
      return this;
    },

    sleep: function() {
      this.awake = false;
      return this;
    },

    fromJSON: function(json) {

      var createChildren = function(name, data) {
        // 
        var args = data.arguments;
        args = (args instanceof Array) ? args : [args];
        // 
        var _class = phina.using(data.className);
        // 
        var element = _class.apply(null, args);
        
        element.name = name;
        this[name] = element;

        element.fromJSON(data);
        element.addChildTo(this)
      }.bind(this);

      json.forIn(function(key, value) {
        if (key === 'children') {
          value.forIn(function(name, data) {
            createChildren(name, data);
          });
        }
        else {
          if (key !== 'type') {
            this[key] = value;
          }
        }
      }, this);

      return this;
    },

    toJSON: function() {
      var json = {};

      // this.forIn(function(key, value) {
      //   if (key[0] === '_') return ;
      //   json[key] = value;
      // });

      var keys = [
        'x', 'y',
        'rotation',
        'scaleX', 'scaleY',
        'originX', 'originY',
        'className',
        'name',
      ];

      keys.each(function(key) {
        json[key] = this[key];
      }, this);

      var children = this.children.map(function(child) {
        return child.toJSON();
      });

      if (children.length) {
        json.children = {};
        children.each(function(child) {
          json.children[child.name] = child;
        });
      }

      return json;
    },
  });
  
});
