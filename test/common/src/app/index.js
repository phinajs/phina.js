
describe('#app', function() {

  describe('Scene', function() {

  });


  describe('BaseApp', function() {

    it('init', function() {
      var app = phina.app.BaseApp();

      assert(app !== null);
    });

    it('run', function(done) {
      var app = phina.app.BaseApp();

      app.update = function() {
        if (this.ticker.frame===30) {
          done();
        }
      };
      app.run();
    });

  });
});
