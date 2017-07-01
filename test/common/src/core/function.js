
describe('#Function', function() {

  it('interval', function(done) {
    var num = 0;
    var hello = function() {
      num++;

      assert(num <= 5, 'error');

      if (num >= 5) {
        assert.equal(num, 5);
        i.stop();
        done();
      }
    };
    var i = hello.interval(100);
    i.start();
  });

});
