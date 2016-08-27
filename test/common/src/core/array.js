
describe('#Array', function() {
  
  it('first', function() {
    // 最初の要素を取得
    var arr = [1, 2, 3, 4, 5, 6];
    assert.equal(arr.first, 1);
  });
  
  it('last', function() {
    var arr = [1, 2, 3, 4, 5, 6];
    assert.equal(arr.last, 6);
  });

  it('equals', function() {
    var arr = [6, 5, 2, 3, 1, 4];
    assert(arr.equals([6, 5, 2, 3, 1, 4]));
  });
  
  it('deepEquals', function() {
    var arr = [6, 5, 2, 3, 1, 4];
    var arr2= [
      [5, 2, 1],
      5,
      [2, 2, 2, 3, 4, 5],
      66,
    ];
    
    assert(arr.deepEquals([6, 5, 2, 3, 1, 4]));
    assert(arr2.deepEquals([
      [5, 2, 1],
      5,
      [2, 2, 2, 3, 4, 5],
      66,
    ]));
  });

  it('contains', function() {
    var arr = [6, 5, 2, 3, 1, 4];
    assert.equal(arr.contains(2), true);
    assert.equal(arr.contains(2, 3), false);
    assert.equal(arr.contains(7), false);
  });
  
  it('at', function() {
    var arr = [1, 2, 3, 4, 5, 6];
    assert.equal(arr.at(0), 1);
    assert.equal(arr.at(20), 3);
    assert.equal(arr.at(100), 5);
    assert.equal(arr.at(-1), 6);
    assert.equal(arr.at(-10), 3);
  });

  it('find', function() {
    var arr = [1, 2, 3, 4, 5, 6];
    assert.equal(arr.find(function(elm) {
      return elm == 2;
    }), 2);
  });

  it('findIndex', function() {
    var arr = [2, 4, 8, 16, 32];
    assert.equal(arr.findIndex(function(elm) {
      return elm == 8;
    }), 2);
  });
  
  it('swap', function() {
    var arr = [1, 2, 3, 4, 5, 6];
    arr.swap(0, 5);
    assert(arr.equals([6, 2, 3, 4, 5, 1]));
  });
  
  it('erase', function() {
    var arr = [1, 2, 3, 4, 5, 6];
    arr.erase(4);
    assert(arr.equals([1, 2, 3, 5, 6]));
  });
  
  it('eraseAll', function() {
    var arr = [2, 4, 8, 16, 2, 4, 8, 16];
    arr.eraseAll(4);
    assert(arr.equals([2, 8, 16, 2, 8, 16]));
  });
  
  it('eraseIf', function() {
    var arr = [1, 2, 3, 4, 5, 6];
    arr.eraseIf(function(elm) {
      return (elm%2) == 0;
    });
    assert(arr.equals([1, 3, 4, 5, 6]));
  });
  
  it('eraseIfAll', function() {
    var arr = [1, 2, 3, 4, 5, 6];
    arr.eraseIfAll(function(elm) {
      return (elm%2) == 0;
    });
    assert(arr.equals([1, 3, 5]));

    var arr = [
      {value:5},
      {value:10},
      {value:15},
      {value:20},
    ];
    var temp = [
      {value:10},
      {value:15},
      {value:20},
    ];
    arr.eraseIfAll(function(elm) {
      return elm.value === 5;
    });

    assert(JSON.stringify(arr) === JSON.stringify(temp));
  });
  
  it('random', function() {
    var arr = [1, 2, 3, 4, 5, 6];
    for (var i=0; i<128; ++i) {
    var n = arr.random();
      assert(1 <= n && n <= 6);
    }
  });
  
  it('pickup', function() {
    var arr = [1, 2, 3, 4, 5, 6];
    for (var i=0; i<128; ++i) {
      var n = arr.random();
      assert(1 <= n && n <= 6);
    }
  });
  
  it('lot', function() {
    var arr = [1, 2, 3, 4, 5, 6];
    for (var i=0; i<128; ++i) {
      var n = arr.random();
      assert(1 <= n && n <= 6);
    }
  });
  
  it('range', function() {
    assert([].range(10).equals([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]));
    assert([].range(1, 11).equals([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
    assert([].range(0, 30, 5).equals([0, 5, 10, 15, 20, 25]));
    assert([].range(0, 10, 3).equals([0, 3, 6, 9]));
    assert([].range(0, -10).equals([0, -1, -2, -3, -4, -5, -6, -7, -8, -9]));
    assert([].range(0, -10, -2).equals([0, -2, -4, -6, -8]));
    assert([].range().equals([]));
    assert([].range(1, 0).equals([1]));
    assert([].range(1, 10, -1).equals([]));
  });

  it('flatten', function() {
    var arr = [1, 2, 3, [4, 5], [6, [7, 8]]];

    // default
    assert(arr.flatten().deepEquals([1, 2, 3, 4, 5, 6, 7, 8]));
    // level 1
    assert(arr.flatten(1).deepEquals([1, 2, 3, 4, 5, 6, [7, 8]]));
    // level 2
    assert(arr.flatten(2).deepEquals([1, 2, 3, 4, 5, 6, 7, 8]));
  });
  
  it('uniq', function() {
    var arr = [0, 1, 2, 3, 4, 5, 6, 6, 5, 4, 3, 2, 1, 100];
    assert(arr.uniq().equals([0, 1, 2, 3, 4, 5, 6, 100]));
  });

  it('of', function() {
    assert(Array.of(1, 2, 3).equals([1, 2, 3]));
  });

  it('from', function() {
    assert(Array.from("foo").equals(['f', 'o', 'o']));
    assert(Array.from("😉😉😉").equals(['😉', '😉', '😉']));
    assert(Array.from([1, 2, 3], function(v) {return v * v}).equals([1, 4, 9]));
    assert(Array.from({length: 3}, function(_, i) {return i}).equals([0, 1, 2]));
  });
  
  it('most', function() {
    assert.equal([].most().min, Infinity);
    assert.equal([].most().max, -Infinity);
    assert.equal([5,1,4,1,9,2,-10].most().min, -10);
    assert.equal([5,1,4,1,9,2,-10].most().max, 9);
    assert.equal([{x:10,y:101},{x:-10,y:-101},{x:0,y:10}].most(function(e){return e.x;}).max.x, 10);
    assert.equal([{x:10,y:101},{x:-10,y:-101},{x:0,y:10}].most(function(e){return e.x;}).min.x, -10);
    assert.equal([{x:10,y:101},{x:-10,y:-101},{x:0,y:10}].most(function(e){return e.y;}).max.y, 101);
    assert.equal([{x:10,y:101},{x:-10,y:-101},{x:0,y:10}].most(function(e){return e.y;}).min.y, -101);
    assert.equal([0,1,2,3].most(function(e){
      console.log(this);
      if(this==e){return Infinity;}
      return e;
    }, 0).min, 1);
  });
  
    
});
