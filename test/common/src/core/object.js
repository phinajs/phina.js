
describe('#Object', function() {

  it('setter', function() {
    var phi = {};

    phi.setter('bloodType', function(v) {
      this._bloodType = v;
    });
    phi.bloodType = 'O';

    assert.equal(phi._bloodType, 'O');
  });

  it('getter', function() {
    var phi = {};

    phi.getter('age', function() {
      return 26;
    });

    assert.equal(phi.age, 26);
  });

  it('accessor', function() {
    var phi = {};

    phi.accessor('name', {
      'set': function(v) { this._name = v; },
      'get': function() { return this._name; },
    });

    assert.equal(phi.name, undefined);
    phi.name = 'phi';
    assert.equal(phi.name, 'phi');
    assert.equal(phi._name, 'phi');
  });

  it('$get', function() {
    var obj = {
      a: {
        b: {
          c: '1234',
        },
      },
      hoge: 'Hello, world!',
    };
    
    assert.equal(obj.$get('hoge'), 'Hello, world!');
    assert.equal(obj.$get('a.b.c'), '1234');
  });

  it('$set', function() {
    var obj = {
      a: {
        b: {
          c: '1234',
        },
      },
      hoge: 'Hello, world!',
    };

    obj.$set('hoge', 'foo');
    obj.$set('a.b.c', '4321');
    
    assert.equal(obj.$get('hoge'), 'foo');
    assert.equal(obj.$get('a.b.c'), '4321');
  });

  it('forIn', function() {
    var obj = { name: 'phi', age: 25, bloodType: 'O' };
    var temp = {};

    obj.forIn(function(key, value) {
      temp[key] = value;
    });

    assert.equal(temp['name'], 'phi');
    assert.equal(temp['age'], 25);
    assert.equal(temp['bloodType'], 'O');
  });
  
  it('$has', function() {
    var obj = { name: 'phi', age: 24 };
    assert(obj.$has("name"));
    assert(!obj.$has("bloodType"));
  });
  
  it('$extend', function() {
    var obj = { name: 'phi' };
    obj.$extend({age:24});
    assert.equal(JSON.stringify(obj), '{"name":"phi","age":24}');
    obj.$extend({bloodType:'O'}, {birthday:'1988/a/bb'});
    assert.equal(JSON.stringify(obj), '{"name":"phi","age":24,"bloodType":"O","birthday":"1988/a/bb"}');
    assert.equal(JSON.stringify({}.$extend(obj)), '{"name":"phi","age":24,"bloodType":"O","birthday":"1988/a/bb"}');
  });
  
  it('$safe', function() {
    var obj = { name: 'phi' };
    obj.$safe({age:24});
    assert.equal(JSON.stringify(obj), '{"name":"phi","age":24}');
    obj.$safe({bloodType:'O'}, {birthday:'1988/a/bb'});
    assert.equal(JSON.stringify(obj), '{"name":"phi","age":24,"bloodType":"O","birthday":"1988/a/bb"}');
    obj.$safe({name: 'hoge'});
    assert.equal(JSON.stringify(obj), '{"name":"phi","age":24,"bloodType":"O","birthday":"1988/a/bb"}');
  });
  
  it('$strict', function() {
    var obj = { name: 'phi' };
    obj.$strict({age:24});
    assert.equal(JSON.stringify(obj), '{"name":"phi","age":24}');
    obj.$strict({bloodType:'O'}, {birthday:'1988/a/bb'});
    assert.equal(JSON.stringify(obj), '{"name":"phi","age":24,"bloodType":"O","birthday":"1988/a/bb"}');
//        obj.$strict({name: 'hoge'});
//        assert.equal(JSON.stringify(obj), '{"name":"phi","age":24,"bloodType":"O","birthday":"1988/a/bb"}');
  });
  
  it('$pick', function() {
    var obj = { name: 'phi', age: 24 };
    assert.equal(JSON.stringify(obj.$pick("name")), '{"name":"phi"}');
    assert.equal(JSON.stringify(obj.$pick("name", "age")), '{"name":"phi","age":24}');
  });
  
  it('$omit', function() {
    var obj = { name: 'phi', age: 24 };
    assert.equal(JSON.stringify(obj.$omit("name")), '{"age":24}');
    assert.equal(JSON.stringify(obj.$omit("name", "age")), '{}');
  });


});
