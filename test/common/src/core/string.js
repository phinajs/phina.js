
describe('#String', function() {
  
  it('format', function() {
    assert.equal("hsl({0}, {1}%, {2}%)".format(240, 50, 60), "hsl(240, 50%, 60%)");
    assert.equal("hsl({h}, {s}%, {l}%)".format({h:240, s:50, l:60}), "hsl(240, 50%, 60%)");
    assert.equal("hsl({h}, {s}%, {l}%)".format({}), "hsl(, %, %)");
    assert.equal("{hoge}".format(1, 2), ''); // undefined 対策
  });

  it('trim', function() {
    assert.equal("  aaaaaaaaaaaaaaaa   ".trim(), "aaaaaaaaaaaaaaaa");
    assert.equal(" Hello, world!       ".trim(), "Hello, world!");
  });
  
  it('capitalize', function() {
    assert.equal("abc def ghi".capitalize(), "Abc Def Ghi");
    assert.equal("i am a pen.".capitalize(), "I Am A Pen.");
  });
  
  it('capitalizeFirstLetter', function() {
    assert.equal("abc def ghi".capitalizeFirstLetter(), "Abc def ghi");
    assert.equal("i am a pen.".capitalizeFirstLetter(), "I am a pen.");
  });
  
  it('toDash', function() {
    assert.equal("dataFooHoge".toDash(), "data-foo-hoge");
  });

  it('toHash', function() {
    assert.equal("Hello, world!".toHash(), 0xebe6c6e6);
  });

  it('padding', function() {
    assert.equal("1234".padding(10, ' '), '      1234');
    assert.equal("1234".padding(10, '0'), '0000001234');
  });

  it('paddingLeft', function() {
    assert.equal("1234".paddingLeft(10, '0'), '0000001234');
    assert.equal("1234".paddingLeft(10, '??'), '??????1234');
  });

  it('paddingRight', function() {
    assert.equal("1234".paddingRight(10, '0'), '1234000000');
  });
  
  it('quotemeta', function() {
    assert.equal("Hello world. (can you hear me?)".quotemeta(), 'Hello\\ world\\.\\ \\(can\\ you\\ hear\\ me\\?\\)');
  });

  it('repeat', function() {
    assert.equal("1234".repeat(4), '1234123412341234');
  });

  it('count', function() {
    assert.equal("This is a string.".count("is"), 2);
  });

  it('include', function() {
    assert.equal("This is a string.".include("is"), true);
    assert.equal("This is a string.".include("was"), false);
  });

  it('each', function() {
    var str = 'abc';
    str.each(function(ch, i) {
      assert.equal(ch, str[i]);
    });
  });

  it('toArray', function() {
    assert("12345".toArray().equals(['1', '2', '3', '4', '5']));
    assert("あいうえお".toArray().equals(['あ', 'い', 'う', 'え', 'お']));
  });

  it('toObject', function() {
    var obj = "num=128.5&flag1=true&flag2=false&str=hoge".toObject();

    assert.equal(obj.num, 128.5);
    assert.equal(obj.flag1, true);
    assert.equal(obj.flag2, false);
    assert.equal(obj.str, "hoge");

    obj = "num:-64.5|flag1:false|flag2:true|str:foo".toObject('|', ':');
    assert.equal(obj.num, -64.5);
    assert.equal(obj.flag1, false);
    assert.equal(obj.flag2, true);
    assert.equal(obj.str, "foo");
  });
  
});