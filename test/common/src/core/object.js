
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

});
