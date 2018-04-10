/*
 * phina.js namespace
 */
var phina = phina || {};

;(function() {

  /**
   * @class phina
   * # phina.js namespace
   * phina.js のネームスペースです。phina.js の提供する機能は（コア拡張以外）全てこのオブジェクトに入っています。
   * 
   * ## phina.js のクラス定義について
   * 
   * phina.js では独自のクラスシステムを実装しています。
   * phina.js のクラスの特徴としては new 構文を使用しないため、メソッドチェーンがしやすいことや、文字列でクラスを定義したり親クラスを指定したりできる点が挙げられます。
   * 文字列を使用できることで、クラスを定義する段階で親クラスが指定されていなくても、クラスを呼び出す段階で親クラスが定義されていればいいというメリットがあります。
   * 
   * クラスの定義には {@link #createClass}, {@link #define} を使用します。詳しい使い方はそれぞれの関数の項を参照してください。
   * 
   * ## クラスについての補足
   * 
   * phina.js のクラスでは superClass を指定すると以下のメソッドが自動で追加されます。
   * 
   * - superInit(): 親クラスのコンストラクタを呼び出す（初期化）
   * - superMethod(): 親クラスのメソッドを呼び出す
   * 
   * superInit は引数を変えることで親クラスのコンストラクタを呼ぶときの引数を変えられます。
   * superMethod は一つ目の引数に呼び出したい親クラスのメソッド名を文字列で、二つ目以降に呼び出したいメソッドの引数を渡します。
   * 
   * また phina.js のクラスでは以下の特別な役割をもったプロパティ、メソッドが存在します。
   * 
   * - _accessor: アクセッサー（ゲッターとセッター）を定義するためのプロパティ
   * - _static: static メンバを定義するためのプロパティ
   * - _defined(): クラスが定義されたときに呼ばれるメソッド
   * 
   * ### _accessor の使用例
   *     var Class = phina.createClass({
   *       init: function() {
   *         ...
   *       },
   * 
   *       _accessor: function() {
   *         value: {
   *           get: function() {
   *             return this._value;
   *           },
   * 
   *           set: function(v) {
   *             this._value = v;
   *             console.log('valueがセットされました！');
   *           }
   *         }
   *       }
   *     });
   * 
   * ### _static の使用例
   *     var Class = phina.createClass({
   *       init: function() {
   *         ...
   *       },
   *
   *       _static: {
   *
   *         staticProperty1: 1,
   *         staticProperty2: 2,
   *
   *         staticMethod1: function(){},
   *         staticMethod2: function(){}
   *
   *       }
   *     });
   *
   *     console.log(Class.staticProperty1); // => 1
   * 
   * ### _defined の使用例
   *     var Class = phina.createClass({
   *       init: function() {
   *       },
   *
   *       _defined: function() {
   *         console.log('defined!');
   *       }
   *     }); // => defined!
   */

  /**
   * @property {String} [VERSION = <%= version %>]
   * phina.js のバージョンです。
   * 
   * @member phina
   * @static
   */
  phina.VERSION = '<%= version %>';

  /**
   * @method isNode
   * Node.js の module かどうかをチェックします。
   * 
   * @member phina
   * @static
   */
  phina.$method('isNode', function() {
    return (typeof module !== 'undefined');
  });

  /**
   * @method namespace
   * 引数は関数で、その関数内での this は phina になります。
   * 
   * @param {Function} fn 関数
   * @member phina
   * @static
   */
  phina.$method('namespace', function(fn) {
    fn.call(this);
  });

  var ns = phina.isNode() ? global : window;

  /**
   * @property {Object} global
   * Node.js なら global ブラウザなら window を返します。
   * ゲッターのみ定義されています。
   * 
   * @member phina
   * @readonly
   * @static
   */
  phina.accessor('global', {
    get: function() {
      return ns;
    },
  });


  /**
   * @method testUA
   * 引数の RegExp オブジェクトとユーザーエージェントを比較して返します。
   * 
   * @param {RegExp} 
   * @return {Boolean}
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
   * Android かどうかを返します。
   * 
   * @return {Boolean} Android かどうか
   * @member phina
   * @static
   */
  phina.$method('isAndroid', function() {
    return phina.testUA(/Android/);
  });

  /**
   * @method isIPhone
   * iPhone かどうかを返します。
   * 
   * @return {Boolean} iPhone かどうか
   * @member phina
   * @static
   */
  phina.$method('isIPhone', function() {
    return phina.testUA(/iPhone/);
  });

  /**
   * @method isIPad
   * iPad かどうかを返します。
   * 
   * @return {Boolean} iPad かどうか
   * @member phina
   * @static
   */
  phina.$method('isIPad', function() {
    return phina.testUA(/iPad/);
  });

  /**
   * @method isIOS
   * iOS かどうかを返します。
   * 
   * @return {Boolean} iOS かどうか
   * @member phina
   * @static
   */
  phina.$method('isIOS', function() {
    return phina.testUA(/iPhone|iPad/);
  });

  /**
   * @method isMobile
   * モバイルかどうかを返します。具体的には Android, iPhone, iPad のいずれかだと true になります。
   * 
   * @return {Boolean} モバイルかどうか
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
   * @method createClass
   * クラスを作成する関数です。
   * 親クラスの指定は文字列でも可能です。
   * 何も継承しない場合 superClass の指定は不要です。また、親クラスを継承している場合、コンストラクタ内で this.superInit() を実行して親クラスを初期化することが必須です。
   *
   * ### Example
   *     var Class = phina.createClass({
   * 　　  superClass: 'namespace.Super',//親クラス継承
   *
   * 　　  //メンバ変数
   * 　　  member1: 100,
   * 　　  member2: 'test',
   * 　　  member3: null,  
   *
   *
   * 　　  //コンストラクタ
   * 　　  //Class()を呼び出したとき実行される
   * 　　  init: function(a, b){
   * 　　    //スーパークラス(継承したクラス)のinit
   * 　　    this.superInit(a, b);
   * 　　    this.a = a;
   * 　　    this.b = b;
   * 　　  },
   * 　　
   * 　　  //メソッド
   * 　　  method1: function(){},
   * 　　  method2: function(){},
   * 　　
   * 　　});
   *
   * @param {Object}
   * @return {Function} クラス
   * @member phina
   * @static
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
   * 文字列で定義したパスを使ってオブジェクトを取り出します。パスは , . / \ :: で区切ることができます。
   * {@link #phina.register} で登録したオブジェクトを取り出すときなどに使うと便利な関数です。
   * 
   * ### Example
   *     hoge = {
   *       foo: {
   *         bar: {
   *           num: 100
   *         }
   *       }
   *     };
   *     var bar = phina.using('hoge.foo.bar');
   *     console.log(bar.num); // => 100
   * 
   * @param {String} path オブジェクトへのパス
   * @return {Object} 取り出したオブジェクト
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
   * パス指定でオブジェクトを登録する関数です。パスは , . / \ :: で区切ることができます。
   * 
   * ### Example
   *     phina.register('hoge.foo.bar', {
   *       num: 100,
   *     });
   *     console.log(hoge.foo.bar.num); // => 100
   * 
   * @param {String} path 登録するオブジェクトのパス
   * @param {Object} _class 登録するオブジェクト
   * @return {Object} 登録したオブジェクト
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
   * @method define
   * クラスを定義する関数です。使い方は {@link #createClass} とほとんど同じです。
   * ただし、引数は2つあり、第一引数は定義するクラスのパスを文字列で渡します。第二引数のオブジェクトは {@link #createClass} の引数と同じようにします。
   * {@link #createClass} と違い、変数に代入する必用がなく、パス指定でクラスを定義できます。
   * 内部的には {@link #register}, {@link #using} を使用しているため、パスは , . / \ :: で区切ることができます。
   * 
   * ### Example
   *     phina.define('namespace.Class', {
   *       superClass: 'namespace.Super',//親クラス継承
   *     
   *       //メンバ変数
   *       member1: 100,
   *       member2: 'test',
   *       member3: null,  
   *     
   *     
   *       //コンストラクタ
   *       //Class()を呼び出したとき実行される
   *       init: function(a, b){
   *         //スーパークラス(継承したクラス)のinit
   *         this.superInit(a, b);
   *         this.a = a;
   *         this.b = b;
   *       },
   *     
   *       //メソッド
   *       method1: function(){},
   *       method2: function(){},
   *     
   *     });
   * 
   * @param {String} path パス
   * @param {Object} params オブジェクト
   * @return {Function} 定義したクラス
   * @member phina
   * @static
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
   * phina.js が用意している全てのクラスをグローバルに展開します。（具体的には phina が持つオブジェクトが一通りグローバルに展開されます。）
   * この関数を実行することで、いちいち global からたどっていかなくても phina.js の用意しているクラスをクラス名だけで呼び出すことができます。
   * 
   * ### Example
   *     phina.globalize();
   * 
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

  /**
   * @method main
   * phina.js でプログラミングする際、メインの処理を記述するための関数です。基本的に phina.js でのプログラミングではこの中にプログラムを書いていくことになります。
   * 
   * ### Example
   *     phina.main(function() {
   *       //ここにメインの処理を書く
   *     });
   * 
   * @param {Function} func メインの処理
   * @member phina
   * @static
   */
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
