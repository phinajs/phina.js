
describe('#Date', function() {
  
  it('format', function() {
    var a = new Date('1988/9/16 12:34:56');
    var b = new Date('2016/3/01 3:2:5');

    // yyyy
    assert.equal(a.format('yyyy'), '1988');
    assert.equal(b.format('yyyy'), '2016');
    // yy 
    assert.equal(a.format('yy'), '88');
    assert.equal(b.format('yy'), '16');
    // y 
    assert.equal(a.format('y'), '1988');
    assert.equal(b.format('y'), '2016');

    // MMMM
    assert.equal(a.format('MMMM'), 'September');
    assert.equal(b.format('MMMM'), 'March');
    // MMM
    assert.equal(a.format('MMM'), 'Sep');
    assert.equal(b.format('MMM'), 'Mar');
    // MM
    assert.equal(a.format('MM'), '09');
    assert.equal(b.format('MM'), '03');
    // M
    assert.equal(a.format('M'), '9');
    assert.equal(b.format('M'), '3');

    // dd
    assert.equal(a.format('dd'), '16');
    assert.equal(b.format('dd'), '01');
    // d
    assert.equal(a.format('d'), '16');
    assert.equal(b.format('d'), '1');

    // EEEE
    assert.equal(a.format('EEEE'), 'Friday');
    assert.equal(b.format('EEEE'), 'Tuesday');
    // EEE
    assert.equal(a.format('EEE'), 'Fri');
    assert.equal(b.format('EEE'), 'Tue');

    // HH
    assert.equal(a.format('HH'), '12');
    assert.equal(b.format('HH'), '03');
    // h
    assert.equal(a.format('H'), '12');
    assert.equal(b.format('H'), '3');

    // mm
    assert.equal(a.format('mm'), '34');
    assert.equal(b.format('mm'), '02');
    // m
    assert.equal(a.format('m'), '34');
    assert.equal(b.format('m'), '2');

    // ss
    assert.equal(a.format('ss'), '56');
    assert.equal(b.format('ss'), '05');
    // s
    assert.equal(a.format('s'), '56');
    assert.equal(b.format('s'), '5');

    // assert.equal(date.format('Y/m/d'), '2015/11/17');
  });

  it('calculateAge', function() {
    var age = Date.calculateAge('1988-9-16');
    assert.equal(Date.calculateAge('1988-9-16'), 27); // 27 歳
    assert.equal(Date.calculateAge('1988-9-16', '2000-1-1'), 11); // 11 歳
  });

});
