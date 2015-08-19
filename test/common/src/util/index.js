
describe('#util', function() {

  describe('Ticker', function() {
    it('init', function() {
      var timer = phina.util.Ticker();
      assert(timer !== null);
    });

    it('tick', function() {
      var timer = phina.util.Ticker();

      timer.tick(function() {
        console.log('hoge');
      });

      assert(timer.has('tick'));
    });

    it('start', function(done) {
      var timer = phina.util.Ticker();

      timer.tick(function() {
        if (this.elapsedTime >= 1000) {
          done();
        }
      });

      timer.start();
    });

    it('frame', function(done) {
      var timer = phina.util.Ticker();

      var i = 0;
      timer.tick(function() {
        assert(i++ === this.frame);
        if (this.elapsedTime >= 1000) {
          done();
        }
      });

      timer.start();
    });
  });

});
