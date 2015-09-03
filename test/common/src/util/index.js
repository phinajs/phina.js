
describe('#util', function() {

  describe('Grid', function() {
    it('init', function() {
      var grid = phina.util.Grid(960, 12);

      assert(grid.unit(), 80);
      assert(grid.span(1), 80);
      assert(grid.span(6), 480);
      assert(grid.center(), 480);
    });
  });

  describe('Tween', function() {
    it('init', function() {
      var obj = { x: 100, y: 100, };
      var tween = phina.util.Tween();
      tween.to(obj, { x: 200, }, 1000);


      var arr = Array.range(100, 210, 10);
      (10+1).times(function(i) {
        assert.equal(obj.x, arr[i]);
        tween.gain(100);
      });

    });

    it('from', function() {
      var obj = { x: 100, y: 100, };
      var tween = phina.util.Tween();
      tween.from(obj, { x: 200, }, 1000);

      var arr = Array.range(100, 210, 10).reverse();
      (10+1).times(function(i) {
        assert.equal(obj.x, arr[i]);
        tween.gain(100);
      });
    });

    it('yoyo', function() {
      var obj = { x: 100, y: 100, };
      var tween = phina.util.Tween();
      tween.to(obj, { x: 200, }, 1000);
      tween.yoyo();

      var arr = Array.range(100, 210, 10).reverse();
      (10+1).times(function(i) {
        assert.equal(obj.x, arr[i]);
        console.log(obj.x);
        tween.gain(100);
      });
    });

  });

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


  describe('Flow', function() {
    it('init', function(done) {
      var flow = phina.util.Flow(function(resolve, reject) {
        setTimeout(function() {
          resolve('hello');
        }, 100);
      });

      flow.then(function(message) {
        assert.equal(message, 'hello');
        done();
      });

      phina.util.Flow.all([flow]).then(function(d) {
      });
    });

    it('all', function(done) {
      var f1 = phina.util.Flow(function(resolve, reject) {
        setTimeout(function() {
          resolve('flow1');
        }, 100);
      });
      var f2 = phina.util.Flow(function(resolve, reject) {
        setTimeout(function() {
          resolve('flow2');
        }, 200);
      });

      phina.util.Flow.all([f1, f2]).then(function(data) {
        assert.equal(data[0], 'flow1');
        assert.equal(data[1], 'flow2');
        done();
      });
    });

    it('delay', function(done) {
      // phina.util.Flow.resolve(123).then(alert);
      // phina.util.Flow.resolve(phina.util.Flow.resolve(123)).then(alert);
      // return ;
      function delay(time) {
        var p = phina.util.Flow(function (resolve) {
          setTimeout(resolve, time, time)
        })
        return p  // 「s秒後に数値sをもって解決するpromise」を返す
      }

      function log(time) {
        console.log(time+' ミリ秒経過した')
        return time  // 「数値sをもって解決されたpromise」にキャストされる
      }
      delay(500).then(log).then(delay).then(log).then(delay).then(log).then(function() {
        done()
      })
    });
  });

});
