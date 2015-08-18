phina.namespace(function() {

  phina.define('phina.event.EventDispatcher', {

    init: function() {
      this._listeners = {};
    },

    on: function(type, listener) {
      if (this._listeners[type] === undefined) {
        this._listeners[type] = [];
      }

      this._listeners[type].push(listener);
      return this;
    },

    off: function(type, listener) {

    },

    fire: function(e) {
      e.target = this;
      var oldEventName = 'on' + e.type;
      if (this[oldEventName]) this[oldEventName](e);
      
      var listeners = this._listeners[e.type];
      if (listeners) {
        var temp = listeners.clone();
        for (var i=0,len=temp.length; i<len; ++i) {
            temp[i].call(this, e);
        }
      }
      
      return this;
    },

    flare: function(type, param) {

    },

    one: function(type, listener) {

    },

    has: function(type) {
      if (this._listeners[type] === undefined && !this["on" + type]) return false;
      return true;
    },

    clear: function(type) {
      var oldEventName = 'on' + type;
      if (this[oldEventName]) delete this[oldEventName];
      this._listeners[type] = [];
      return this;
    },
  });

});
