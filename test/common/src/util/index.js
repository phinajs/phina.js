
describe('#util', function() {

  describe('Color', function() {
    it('init', function() {
      var color = phina.util.Color(255, 0, 0);

      console.log(color.toString());

      assert(color.toString())
    });
  });

  describe('Grid', function() {
    it('init', function() {
      var grid = phina.util.Grid(960, 12);

      assert.equal(grid.unit(), 80);
      assert.equal(grid.span(1), 80);
      assert.equal(grid.span(6), 480);
      assert.equal(grid.center(), 480);
    });
  });

  describe('QueryString', function() {
    it('parse', function() {
      var obj = phina.util.QueryString.parse('hoge=100&foo=bar');
      assert.equal(+obj.hoge, 100);
      assert.equal(obj.foo, 'bar');
      var obj = phina.util.QueryString.parse('2*4|4*2', '|', '*');
      assert.equal(+obj[2], 4);
      assert.equal(+obj[4], 2);
    });

    it('stringify', function() {
      var str = phina.util.QueryString.stringify({"hoge":"100", "foo":"bar"});
      assert.equal(str, 'hoge=100&foo=bar');
      var str = phina.util.QueryString.stringify({"2":"4","4":"2"}, '|', '*'); 
      assert.equal(str, '2*4|4*2');
      var str = phina.util.QueryString.stringify({"名前":"ファイ"}, null, null, true); 
      assert.equal(str, '名前=%E3%83%95%E3%82%A1%E3%82%A4');
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
  describe('Random', function() {
    it('random', function() {
      var answer = [0, 0.12, 0.64, 0.55, 0.04];
      var random = phina.util.Random(8);
      (5).times(function(i) {
        assert.equal(random.random().floor(2), answer[i]);
      });
    });

    it('randint', function() {
      var answer = [0, 1, 7, 6, 0];
      var random = phina.util.Random(8);
      (5).times(function(i) {
        assert.equal(random.randint(0, 10), answer[i]);
      });
    });

    it('randfloat', function() {
      var answer = [false, false, true, true, false];
      var random = phina.util.Random(8);
      (5).times(function(i) {
        assert.equal(random.randbool(), answer[i]);
      });
    });

    it('randarray', function() {
      var answer = [0, 2, 8, 0, 7, 4, 10, 8, 2, 5];

      var random = phina.util.Random(16);
      var arr = random.randarray(10, 0, 10);

      assert(arr.deepEquals(answer));
    });

    it('static.random', function() {
      var answer = [0, 0.12, 0.64, 0.55, 0.04];
      phina.util.Random.setSeed(8);
      (5).times(function(i) {
        assert.equal(phina.util.Random.random().floor(2), answer[i]);
      });
    });

    it('static.randint', function() {
      var answer = [0, 1, 7, 6, 0];
      phina.util.Random.setSeed(8);
      (5).times(function(i) {
        assert.equal(phina.util.Random.randint(0, 10), answer[i]);
      });
    });

    it('static.randfloat', function() {
      var answer = [false, false, true, true, false];
      phina.util.Random.setSeed(8);
      (5).times(function(i) {
        assert.equal(phina.util.Random.randbool(), answer[i]);
      });
    });
    it('static.randarray', function() {
      var answer = [0, 2, 8, 0, 7, 4, 10, 8, 2, 5];

      phina.util.Random.setSeed(16);
      var arr = phina.util.Random.randarray(10, 0, 10);

      assert(arr.deepEquals(answer));
    });
  });

  describe('Support', function() {
    it('test', function() {
      assert(phina.util.Support.canvas);
      assert(phina.util.Support.webGL);
      assert(phina.util.Support.webAudio);
    });
  });


});
