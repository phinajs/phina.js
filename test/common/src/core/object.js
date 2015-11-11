
describe('#Object', function() {

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

});
