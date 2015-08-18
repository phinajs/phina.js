phina.namespace(function() {


  phina.define('phina.app.BaseApp', {
    superClass: 'phina.event.EventDispatcher',

    awake: true,

    init: function(element) {
      this.superInit();

      this.domElement = element;
      this._scenes = [];

      this.updater = phina.app.Updater(this);
    },

    _update: function() {
      if (this.awake) {
        this.updater.update(this.currentScene);
      }
    },

    _accessor: {
      currentScene: {
        "get": function()   { return this._scenes[0]; },
        "set": function(v)  { this._scenes[0] = v; },
      },
    },

  });

  
});
