/*
 *
 */



/*
 * phina.js namespace
 */
var phina = phina || {};

;(function() {

  /**
   * @class phina
   * phina.js namespace
   */

  /**
   * バージョン
   */
  phina.VERSION = '<%= version %>';

  /**
   * @method isNode
   * @member phina
   * @static
   */
  phina.$method('isNode', function() {
    return (typeof module !== 'undefined');
  });

  /**
   * @method namespace
   * @member phina
   * @static
   */
  phina.$method('namespace', function(fn) {
    fn.call(this);
  });

  var ns = phina.isNode() ? global : window;

  /**
   * @method global
   * global
   */
  phina.accessor('global', {
    get: function() {
      return ns;
    },
  });

  
  /**
   * @method testUA
   * UAを正規表現テスト
   * @member phina
   * @static
   */
  phina.$method('testUA', function(regExp) {
    if (!phina.global.navigator) return false;
    var ua = phina.global.navigator.userAgent;
    return regExp.test(ua);
  });

  /**
   * @method isAndroid
   * Android かどうかをチェック
   * @member phina
   * @static
   */
  phina.$method('isAndroid', function() {
    return phina.testUA(/Android/);
  });
  
  /**
   * @method isIPhone
   * iPhone かどうかをチェック
   * @member phina
   * @static
   */
  phina.$method('isIPhone', function() {
    return phina.testUA(/iPhone/);
  });
  
  /**
   * @method isIPad
   * iPad かどうかをチェック
   * @member phina
   * @static
   */
  phina.$method('isIPad', function() {
    return phina.testUA(/iPad/);
  });
  
  /**
   * @method isIOS
   * iOS かどうかをチェック
   * @member phina
   * @static
   */
  phina.$method('isIOS', function() {
    return phina.testUA(/iPhone|iPad/);
  });

  /**
   * @method isMobile
   * mobile かどうかをチェック
   * @member phina
   * @static
   */
  phina.$method('isMobile', function() {
    return phina.testUA(/iPhone|iPad|Android/);
  });
  
  


  // support node.js
  if (phina.isNode()) {
    module.exports = phina;
  }

  ns.phina = phina;

})(this);


phina.namespace(function() {

  /**
   * @member phina
   * @static
   * @method createClass
   * クラスを生成
   */
  phina.$method('createClass', function(params) {
    var props = {};

    var _class = function() {
      var instance = new _class.prototype._creator();
      _class.prototype.init.apply(instance, arguments);
      return instance;
    };

    if (params.superClass) {
      _class.prototype = Object.create(params.superClass.prototype);
      params.init.owner = _class;
      _class.prototype.superInit = function() {
        this.__counter = this.__counter || 0;

        var superClass = this._hierarchies[this.__counter++];
        var superInit = superClass.prototype.init;
        superInit.apply(this, arguments);

        this.__counter = 0;
      };
      _class.prototype.superMethod = function() {
        var args = Array.prototype.slice.call(arguments, 0);
        var name = args.shift();
        this.__counters = this.__counters || {};
        this.__counters[name] = this.__counters[name] || 0;

        var superClass = this._hierarchies[ this.__counters[name]++ ];
        var superMethod = superClass.prototype[name];
        var rst = superMethod.apply(this, args);

        this.__counters[name] = 0;

        return rst;
      };
      _class.prototype.constructor = _class;
    }


    // // 
    // params.forIn(function(key, value) {
    //   if (typeof value === 'function') {
    //     _class.$method(key, value);
    //   }
    //   else {
    //     _class.prototype[key] = value;
    //   }
    // });
    // 継承
    _class.prototype.$extend(params);

    // 継承用
    _class.prototype._hierarchies = [];
    var _super = _class.prototype.superClass;
    while(_super) {
      _class.prototype._hierarchies.push(_super);
      _super = _super.prototype.superClass;
    }

    // accessor
    if (params._accessor) {
      params._accessor.forIn(function(key, value) {
        _class.prototype.accessor(key, value);
      });
      // _class.prototype = Object.create(_class.prototype, params._accessor);
    }

    _class.prototype._creator = function() { return this; };
    _class.prototype._creator.prototype = _class.prototype;

    // static property/method
    if (params._static) {
      _class.$extend(params._static);
    }

    if (params._defined) {
      params._defined.call(_class, _class);
    }

    return _class;
  });

  var chachedClasses = {};
  
  /**
   * @method using
   * @member phina
   * @static
   */
  phina.$method('using', function(path) {
    if (!path) {
      return phina.global;
    }
    
    var pathes = path.split(/[,.\/ ]|::/);
    var current = phina.global;

    pathes.forEach(function(p) {
      current = current[p] || (current[p]={});
    });

    return current;
  });
  
  /**
   * @method register
   * 
   * @member phina
   * @static
   */
  phina.$method('register', function(path, _class) {
    var pathes = path.split(/[,.\/ ]|::/);
    var className = pathes.last;
    var parentPath = path.substring(0, path.lastIndexOf('.'));
    var parent = phina.using(parentPath);

    parent[className] = _class;

    return _class;
  });
  
  var _classDefinedCallback = {};

  /**
   * @member phina
   * @static
   * @method define
   * クラスを定義
   */
  phina.$method('define', function(path, params) {
    if (params.superClass) {
      if (typeof params.superClass === 'string') {
        var _superClass = phina.using(params.superClass);
        if (typeof _superClass != 'function') {
          if (!_classDefinedCallback[params.superClass]) {
            _classDefinedCallback[params.superClass] = [];
          }
          _classDefinedCallback[params.superClass].push(function() {
            phina.define(path, params);
          });

          return ;
        }
        else {
          params.superClass = _superClass;
        }
      }
      else {
        params.superClass = params.superClass;
      }
    }

    var _class = phina.createClass(params);
    _class.prototype.accessor('className', {
      get: function() {
        return path;
      },
    });

    phina.register(path, _class);
    
    if (_classDefinedCallback[path]) {
      _classDefinedCallback[path].forEach(function(callback) {
        callback();
      });
      _classDefinedCallback[path] = null;
    }

    return _class;
  });

  /**
   * @method globalize
   * @member phina
   * @static
   */
  phina.$method('globalize', function() {
    phina.forIn(function(key, value) {
      var ns = key;

      if (typeof value !== 'object') return ;

      value.forIn(function(key, value) {
        // if (phina.global[key]) {
        //   console.log(ns, key);
        //   phina.global['_' + key] = value;
        // }
        // else {
        //   phina.global[key] = value;
        // }
        phina.global[key] = value;
      });
    });
  });

  phina._mainListeners = [];
  phina._mainLoaded = false;
  phina.$method('main', function(func) {
    if (phina._mainLoaded) {
      func();
    }
    else {
      phina._mainListeners.push(func);
    }
  });

  var doc = phina.global.document;
  if (phina.global.addEventListener && doc && doc.readyState !== 'complete') {
    phina.global.addEventListener('load', function() {
      var run = function() {
        var listeners = phina._mainListeners.clone();
        phina._mainListeners.clear();
        listeners.each(function(func) {
          func();
        });

        // main 内で main を追加している場合があるのでそのチェック
        if (phina._mainListeners.length > 0) {
          run(0);
        }
        else {
          phina._mainLoaded = true;
        }
      };
      // ちょっと遅延させる(画面サイズ問題)
      setTimeout(run);
    });
  }
  else {
    phina._mainLoaded = true;
  }



});







