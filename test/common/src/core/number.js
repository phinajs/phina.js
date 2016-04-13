describe('#Number', function() {
  
  it('round', function() {
    assert.equal((42.1947).round(), 42);
    assert.equal((42.1947).round(0), 42);
    assert.equal((42.1947).round(1), 42.2);
    assert.equal((42.1947).round(2), 42.19);
    assert.equal((42.1947).round(3), 42.195);
  });
  
  it('ceil', function() {
    assert.equal((42.1947).ceil(), 43);
    assert.equal((42.1947).ceil(0), 43);
    assert.equal((42.1947).ceil(1), 42.2);
    assert.equal((42.1947).ceil(2), 42.2);
    assert.equal((42.1947).ceil(3), 42.195);
  });
  
  it('floor', function() {
    assert.equal((42.1947).floor(), 42);
    assert.equal((42.1947).floor(0), 42);
    assert.equal((42.1947).floor(1), 42.1);
    assert.equal((42.1947).floor(2), 42.19);
    assert.equal((42.1947).floor(3), 42.194);
  });

  it('toInt', function() {
    assert.equal((42.195).toInt(), 42);
  });

  it('toHex', function() {
    assert.equal((64).toHex(), '40');
    assert.equal((100).toHex(), '64');
  });

  it('toBin', function() {
    assert.equal((64).toBin(), '1000000');
    assert.equal((100).toBin(), '1100100');
  });
  
  it('toUnsigned', function() {
    assert.equal((0xf0f0f0ff | 0xff000000).toUnsigned(), 0xfff0f0ff);
    assert.equal((0xf0f0f0ff & 0xff000000).toUnsigned(), 0xf0000000);
  });

  it('padding', function() {
    assert.equal((50).padding(10), "0000000050");
    assert.equal((-50).padding(4), "-050");
  });

  it('times', function() {
    var arr = [];
    (5).times(function(i) {
      arr.push(i);
    });
    assert(arr.equals([0, 1, 2, 3, 4]));
  });

  it('upto', function() {
    var arr = [];
    (6).upto(8, function(i) {
      arr.push(i);
    });
    assert(arr.equals([6, 7, 8]));
  });

  it('downto', function() {
    var arr = [];
    (8).downto(6, function(i) {
      arr.push(i);
    });
    assert(arr.equals([8, 7, 6]));
  });

  it('step', function() {
    var arr = [];
    (2.4).step(5.3, 0.8, function(n) {
      arr.push(n);
    });
    assert(arr.equals([2.4, 3.2, 4.0, 4.8]));
  });

  it('map', function() {
    var arr = [0, 2, 4, 6, 8];
    var result = (5).map(function(i) {
      return i*2;
    });
    console.log(result);
    assert(arr.equals(result));
  });


  it('abs', function() {
    assert.equal((-5).abs(), 5);
    assert.equal((+5).abs(), 5);
  });

  it('acos', function() {
    assert.equal((1).acos(), 0);
    assert.equal((0).acos(), Math.PI * 0.5);
  });

  it('asin', function() {
    assert.equal((0).asin(), 0);
    assert.equal((1).asin(), Math.PI * 0.5);
  });

  it('atan', function() {
    assert.equal((0).atan(), 0);
    assert.equal((1).atan(), Math.PI * 0.25);
  });

  it('cos', function() {
    assert.equal((0).cos(), 1);
    assert.equal((3).cos(), Math.cos(3));
  });

  it('exp', function() {
    assert.equal((0).exp(), 1);
    assert.equal((1).exp(), Math.E);
  });

  it('log', function() {
    assert.equal((1).log(), 0);
    assert.equal((Math.E).log(), 1);
  });

  it('max', function() {
    assert.equal((5).max(1000), 1000);
    assert.equal((1000).max(5), 1000);
  });

  it('min', function() {
    assert.equal((5).min(1000), 5);
    assert.equal((1000).min(5), 5);
  });

  it('pow', function() {
    assert.equal((2).pow(2), 4);
    assert.equal((2).pow(3), 8);
  });

  it('sin', function() {
    assert.equal((0).sin(), 0);
    assert.equal((3).sin(), Math.sin(3));
  });

  it('sqrt', function() {
    assert.equal((4).sqrt(), 2);
    assert.equal((100).sqrt(), 10);
  });

  it('tan', function() {
    assert.equal((3).tan(), Math.tan(3));
    assert.equal((5).tan(), Math.tan(5));
  });

});