/*
 * th(test helper)
 */

;(function() {

  var th = window.th = {};

  var current = null;
  var suiteMap = {};

  var Suite = function(title, fn) {
    this.title = title;
    this.fn = fn;
    this.testMap = {};
  };
  Suite.prototype.run = function(key) {
    if (key) {
      var test = this.testMap[key];
    }
    else {
      for (var key in this.testMap) {
        var test = this.testMap[key];
        test.fn();
      }
    }
  };


  var Test = function(title, fn) {
    this.title = title;
    this.fn = fn;
  };
  Suite.prototype.run = function(key) {
    var test = this.testMap[key];
    test.fn();
  };


  th.describe = function(title, fn) {
    var suite = new Suite(title, fn);

    current = suite;
    var test = fn.call(suite);
    current = null;

    suiteMap[title] = suite;

    return suite;
  };
  th.it = function(title, fn) {
    var suite = current;
    
    // if (suite.pending) {
    //   fn = null;
    // };

    var test = new Test(title, fn);

    suite.testMap[title] = test;

    return test;
  };

  th.code = function(path) {
    var pathes = path.split('/');
    var test = suiteMap[pathes[0]].testMap[pathes[1]];

    return test.fn.toString();
  };

  th.run = function(path) {
    var pathes = path.split('/');
    var test = suiteMap[pathes[0]].testMap[pathes[1]];

    test.fn();
  };

  th.toJSON = function(link) {
    var json = [];

    for (var key in suiteMap) {
      var suite = suiteMap[key];
      var suiteJson = {
        name: key,
        items: [],
      };
      json.push(suiteJson);

      for (var testKey in suite.testMap) {
        var test = suite.testMap[testKey];
        var path = [key, testKey].join('/');
        suiteJson.items.push({
          name: testKey,
          path: path,
          link: link.replace('{link}', path)
        });
      }
    }

    return json;
  };


  // ファイルをロード
  th.load = function(path, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', path, true);
    xhr.onload = function(e) {
      if (xhr.readyState === 4) {
        if (xhr.status === 0 || xhr.status === 200) {
          callback && callback(JSON.parse(xhr.responseText));
        }
      }
    }

    xhr.onerror = function (e) {
      console.error(xhr.statusText);
    };
    xhr.send();
  };

  // スクリプトをロードする
  th.loadScripts = function(scripts, callback) {
    var index = 0;
    var loadScript = function() {
      var path = scripts[index++];
      var script = document.createElement('script');
      script.src = path + '?' + (new Date()-0);

      script.onload = function() {
        var next = scripts[index];
        if (next) {
          loadScript();
        }
        else {
          callback && callback();
        }
      };

      document.body.appendChild(script);
    };

    loadScript();
  };


})(this);
