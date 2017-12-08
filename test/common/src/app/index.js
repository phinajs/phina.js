
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

    it('stop_start', function(done) {

      var app = phina.app.BaseApp();

      app.run();
      app.stop();
      app.update = function() {
        assert(app.frame >= 29);
      };
      app._draw = function() {
        assert(app.frame >= 29);
        done();
        app.stop();
      };
      setTimeout(function() {
        app.start();
      }, 1000);
    });

  });
});
