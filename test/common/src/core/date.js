
describe('#Date', function() {
  
  it('format', function() {
    var date = new Date('2015-11-17');

    assert(date.format('Y/m/d'), '2015/11/17');
  });
  
});
