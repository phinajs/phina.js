phina.namespace(function() {


  phina.define('phina.app.Scene', {
    superClass: 'phina.app.Element',

    init: function() {
      this.superInit();
    },

    exit: function(params) {
      if (!this.app) return ;

      if (typeof params !== 'object') {
        var temp = {};
        temp.nextLabel = arguments[0];
        temp.nextArguments = arguments[1];
        params = temp;
      }
      else if (params) {
        this.nextArguments = params;
      }

      this.app.popScene();

      return this;
    },
  });
  
});
