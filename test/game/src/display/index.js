th.describe("display.Shape", function() {

  th.it('CircleShape', function() {
    var shape = phina.display.CircleShape().addChildTo(this);
    shape.position.set(100, 100);
  });

  th.it('RectangleShape', function() {
    var shape = phina.display.RectangleShape().addChildTo(this);
    shape.position.set(100, 100);
  });
});

th.describe("display.Label", function() {

  th.it('init', function() {
    var label = phina.display.Label('Hello, world!').addChildTo(this);
    label.position.set(640/2, 960/2);
  });

  th.it('style', function() {
    var center = 640/2;
    var gridY = phina.util.Grid(960, 14);
    // 
    var label = phina.display.Label('color="red"').addChildTo(this);
    label.style.color = 'red';
    label.position.set(center, gridY.span(1));
    // 
    var label = phina.display.Label('stroke=false').addChildTo(this);
    label.style.stroke = false;
    label.position.set(center, gridY.span(2));
    // 
    var label = phina.display.Label('strokeColor="green"').addChildTo(this);
    label.style.color = 'white';
    label.style.strokeColor = 'green';
    label.position.set(center, gridY.span(3));
    // 
    var label = phina.display.Label('strokeWidth=8').addChildTo(this);
    label.style.color = 'white';
    label.style.strokeWidth = 8;
    label.position.set(center, gridY.span(4));
    // 
    var label = phina.display.Label('fontSize(16)').addChildTo(this);
    label.style.fontSize = 16;
    label.position.set(center, gridY.span(5));
    // 
    var label = phina.display.Label('fontWeight="bold"').addChildTo(this);
    label.style.fontWeight = 'bold';
    label.position.set(center, gridY.span(6));
    // 
    var label = phina.display.Label('fontFamily="ゴシック"').addChildTo(this);
    label.style.fontFamily = 'ゴシック';
    label.position.set(center, gridY.span(7));
    // 
    var label = phina.display.Label('shadowBlur=6').addChildTo(this);
    label.style.shadowBlur = 6;
    label.position.set(center, gridY.span(8));
    // 
    var label = phina.display.Label('shadowColor="blue"').addChildTo(this);
    label.style.shadowBlur = 6;
    label.style.shadowColor = "blue";
    label.position.set(center, gridY.span(9));
  });

  th.it('align', function() {
    // 
    var label = phina.display.Label('left').addChildTo(this);
    label.style.align = 'left';
    label.style.backgroundColor = '#aaa';
    label.position.set(640/2, 150);
    // 
    var label = phina.display.Label('center').addChildTo(this);
    label.style.align = 'center';
    label.style.backgroundColor = '#aaa';
    label.position.set(640/2, 250);
    // 
    var label = phina.display.Label('right').addChildTo(this);
    label.style.align = 'right';
    label.style.backgroundColor = '#aaa';
    label.position.set(640/2, 350);
  });

  th.it('baseline', function() {
    // 
    var label = phina.display.Label('top').addChildTo(this);
    label.style.baseline = 'top';
    label.style.backgroundColor = '#aaa';
    label.position.set(160, 960/2);
    // 
    var label = phina.display.Label('middle').addChildTo(this);
    label.style.baseline = 'middle';
    label.style.backgroundColor = '#aaa';
    label.position.set(320, 960/2);
    // 
    var label = phina.display.Label('bottom').addChildTo(this);
    label.style.baseline = 'bottom';
    label.style.backgroundColor = '#aaa';
    label.position.set(480, 960/2);
  });

});
