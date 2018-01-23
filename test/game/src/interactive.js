th.describe("Interactive", function() {
  th.prepare(function() {
    var events = [
      'pointstart',
      'pointmove',
      'pointstay',
      'pointend',
      'pointover',
      'pointout',
      // 'click', // クリックは完全に対応していない
    ];
    this.addTitle = function(text) {
      phina.display.Label({
        text: text,
        x: this.gridX.center(),
        y: 50,
      }).addChildTo(this);
    }
    this.addLabels = function() {
      this.labelMap = {};
      events.forEach(function(eventName, i) {
        var label = phina.display.Label({
          x: this.gridX.span(1),
          y: 100 + i * 28,
          align: 'left',
          baseline: 'top',
          text: eventName + ' : テストしてください',
          fontSize: 20,
        }).addChildTo(this);

        label.done = function() {
          if (label._end) {
            return ;
          }
          label.text = eventName + ' : OK';
          label.fill = 'blue';
          label._end = true;
        };

        label.error = function() {
          if (label._end) {
            return ;
          }
          label.text = eventName + ' : ERROR';
          label.fill = 'red';
          label._end = true;
        };

        this.labelMap[eventName] = label;
      }, this);
    }
  });  
  th.it('propagation', function() {
    this.addTitle('イベントが親要素へ伝播するか');
    this.addLabels();
    phina.display.RectangleShape({
      fill: 'gray',
      width: 500,
      height: 500,
      x: this.gridX.center(),
      y: this.gridY.center(2),
    }).addChildTo(this);
    var testArea = phina.ui.LabelArea({
      text: 'この要素上で各テストを行ってください',
      fill: 'white',
      backgroundColor: 'blue',
      verticalAlign: 'center',
      baseline: 'middle',
      x: this.gridX.center(),
      y: this.gridY.center(2),
    }).addChildTo(this);

    testArea.setInteractive(true);
    events.forEach(function(eventName) {
      this.on(eventName, function(e) {
        if (e.target === testArea) {
          this.labelMap[eventName].done();
        }
      });
    }, this);
  });

  th.it('stop', function() {
    this.addTitle('イベントが親要素へ伝播するのを止める');
    this.addLabels();
    phina.display.RectangleShape({
      fill: 'gray',
      width: 500,
      height: 500,
      x: this.gridX.center(),
      y: this.gridY.center(2),
    }).addChildTo(this);
    var testArea = phina.ui.LabelArea({
      text: 'この要素上で各テストを行ってください',
      fill: 'white',
      backgroundColor: 'blue',
      verticalAlign: 'center',
      baseline: 'middle',
      x: this.gridX.center(),
      y: this.gridY.center(2),
    }).addChildTo(this);

    testArea.setInteractive(true);
    var self = this;
    events.forEach(function(eventName) {
      var label = self.labelMap[eventName];
      self.on(eventName, function(e) {
        if (e.target === testArea) {
          label.error();
        }
      });
      testArea.on(eventName, function(e) {
        e.stop = true;
        setTimeout(function() {
          label.done();
        }, 100);
      });
    });
  });

  th.it('path', function() {
    this.addTitle('発火した要素から親要素のpathが正しいか');
    this.addLabels();
    this.testName = 'ROOT';
    var dummyRect = phina.display.RectangleShape({
      fill: 'gray',
      width: 500, 
      height: 500,
      x: this.gridX.center(),
      y: this.gridY.center(2),
    }).addChildTo(this);
    dummyRect.testName = 'dummyRect';
    var testArea = phina.ui.LabelArea({
      text: 'この要素上でテストしてください',
      fill: 'white',
      backgroundColor: 'blue',
      verticalAlign: 'center',
      baseline: 'middle',
      x: this.gridX.center(),
      y: this.gridY.center(2),
    }).addChildTo(this);

    testArea.testName = 'testArea';

    dummyRect.setInteractive(true);
    testArea.setInteractive(true);

    var self = this;
    events.forEach(function(eventName) {
      var label = self.labelMap[eventName];
      self.on(eventName, function(e) {
        if (self === e.target) {
          return ;
        }
        
        var pathText = e.path.map(function(elm) {
          return elm.testName;
        }).join(',');

        if (pathText === e.target.testName + ',ROOT') {
          if (testArea === e.target) {
            label.done();
          }
        }
        else {
          label.error();
        }
        console.log(pathText);
      })
    });
  });

  th.it('cover', function() {
    this.addTitle('別階層の要素が重なっている時、\n上の要素のみがターゲットになるか');
    this.addLabels();
    var dummyRect = phina.display.RectangleShape({
      fill: 'red',
      x: this.gridX.center(),
      y: this.gridY.center(2),
    }).addChildTo(this);

    var testArea = phina.ui.LabelArea({
      text: '後ろの要素のイベントが発火しないことをテストしてください\n\n(ERRORにならなければOK)',
      fill: 'white',
      fontSize: 20,
      backgroundColor: 'blue',
      verticalAlign: 'center',
      baseline: 'middle',
      x: this.gridX.center(),
      y: this.gridY.center(2),
    }).addChildTo(this);

    dummyRect.width = testArea.width * 0.5;
    dummyRect.height = testArea.height * 0.5;

    dummyRect.setInteractive(true);
    testArea.setInteractive(true);
    testArea.alpha = 0.5;

    var self = this;
    events.forEach(function(eventName) {
      var label = self.labelMap[eventName];
      dummyRect.on(eventName, function(e) {
        label.error();
      });
    });
  });

  th.it('pass', function() {
    this.addTitle('発火しても処理を中断せずに、\nさらに別階層の要素のチェックを行う');
    this.addLabels();
    var t = ' 同じフレームで発火したらOK';
    this.labelMap.pointover.text += t;
    this.labelMap.pointout.text += t;

    var dummyRect = phina.display.RectangleShape({
      fill: 'red',
      x: this.gridX.center(),
      y: this.gridY.center(2),
    }).addChildTo(this);
    var testArea = phina.ui.LabelArea({
      text: '後ろの要素のイベントが発火するかテストしてください\n\n(pointover, pointout は素早く動かす必要があります)',
      fill: 'white',
      fontSize: 20,
      backgroundColor: 'blue',
      verticalAlign: 'center',
      baseline: 'middle',
      x: this.gridX.center(),
      y: this.gridY.center(2),
    }).addChildTo(this);

    dummyRect.width = testArea.width * 0.8;
    dummyRect.height = testArea.height * 0.8;

    dummyRect.setInteractive(true);
    testArea.setInteractive(true);
    testArea.alpha = 0.5;

    var self = this;
    events.forEach(function(eventName) {
      dummyRect.on(eventName, function(e) {
        self.labelMap[eventName].done();
      });
      testArea.on(eventName, function(e) {
        e.pass = true;
      });
    });
  });


  th.it('click', function() {
    this.addTitle('クリックができるか');

    var dummyRect = phina.display.RectangleShape({
      fill: 'gray',
      width: 500,
      height: 500,
      x: this.gridX.center(),
      y: this.gridY.center(2),
    }).addChildTo(this);
    var testArea = phina.ui.LabelArea({
      text: 'クリックをすると色が変わります',
      fill: 'white',
      fontSize: 20,
      backgroundColor: 'blue',
      verticalAlign: 'center',
      baseline: 'middle',
      x: this.gridX.center(),
      y: this.gridY.center(2),
    }).addChildTo(this);

    dummyRect.setInteractive(true);
    testArea.setInteractive(true);

    testArea.onclick = function(e) {
      this.backgroundColor = 'aqua';
    };
    dummyRect.onclick = function(e) {
      this.fill = 'blue';
    };

    this.onclick = function(e) {
      this.backgroundColor = 'gray';
    };
    // click は pointstart で e.pass = true にすると後ろの要素も発火する
    testArea.onpointstart = function(e) {
      e.pass = true;
    };

  });

});
