phina.namespace(function() {


  phina.define('phina.app.Scene', {
    superClass: 'phina.app.Element',

    init: function() {
      this.superInit();
    },

    exit: function(param) {
      if (!this.app) return ;

      if (typeof param !== 'object') {
        var temp = {};
        temp.nextLabel = arguments[0];
        temp.nextArguments = arguments[1];
        param = temp;
      }

      if (param.nextLabel) {
        this.nextLabel = param.nextLabel;
      }
      if (param.nextArguments) {
        this.nextArguments = param.nextArguments;
      }

      this.app.popScene();

      return this;
    },
  });
  
});
