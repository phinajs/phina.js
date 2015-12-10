phina.namespace(function() {


  phina.define('phina.app.Scene', {
    superClass: 'phina.app.Element',

    init: function() {
      this.superInit();
    },

    exit: function(params) {
      if (!this.app) return ;

      if (typeof params !== 'object') {
        this.nextLabel = arguments[0];
        this.nextArguments = arguments[1];
      }
      else if (params) {
        this.nextArguments = params;
      }

      this.app.popScene();

      return this;
    },
  });
  
});
