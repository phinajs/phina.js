phina.namespace(function() {

  /**
   * @class phina.util.EventDispatcher
   * # イベントを扱うためのクラス
   * イベントを扱うためのメソッドやプロパティを定義しているクラスです。
   * phina.js が提供するクラスの多くはこの EventDispatcher クラスの子孫となっているため、
   * ほとんどのオブジェクトで容易にイベントを扱うことができます。
   *
   * # 少し説明
   * this.onxxx = function(){}; でもイベントリスナを設定できるが、あまり推奨しない。
   * 呼び出される順序は、まず this.onxxxx が呼び出され、あとは on() で登録した順番。
   */
  phina.define('phina.util.EventDispatcher', {

    init: function() {
      this._listeners = {};
    },

    /**
     * @method on
     * @chainable
     * イベントリスナを登録します。
     *
     * １つのイベントに対するイベントリスナはいくつでも登録することができます。
     *
     * 標準のイベントを検知するには、オブジェクトの {@link Object2D#interactive} プロパティが true である必要があります。
     * {@link Object2D#interactive} プロパティを設定するには {@link Object2D#setInteractive} メソッドを呼び出してください。
     *
     * また、{@link #flare} や {@link #fire} によって定義したカスタムイベントに対するイベントリスナも登録することが
     * できます。カスタムイベントのイベントリスナは {@link Object2D#interactive} プロパティによらず呼び出されます。
     * なおカスタムイベントのオブジェクトは Event オブジェクトとは異なります。
     *
     * ###Reference
     * 標準のイベントの種類は以下を参照してください。  
     * - [Event reference | MDN]( https://developer.mozilla.org/en-US/docs/Web/Events )
     *
     * ### Example
     *     var shape = CircleShape().addChildTo(this).setInteractive(true).setPosition(50, 50);
     *     shape.on("touchstart", function(e){
     *       this.color = "blue";
     *     });
     *
     * @param {String} type イベントの種類
     * @param {Function} listener イベントリスナとなる関数
     * @param {Object} listener.event Event オブジェクト、またはカスタムイベントのオブジェクト
     */
    on: function(type, listener) {
      if (this._listeners[type] === undefined) {
        this._listeners[type] = [];
      }

      this._listeners[type].push(listener);
      return this;
    },

    /**
     * @method off
     * @chainable
     * イベントリスナを削除します。
     *
     * ある種類のイベントに対するイベントリスナをすべて削除するには {@link #clear} を使用してください。
     *
     * @param {String} type イベントの種類
     * @param {Function} listener イベントリスナ関数
     */
    off: function(type, listener) {
      var listeners = this._listeners[type];
      var index = listeners.indexOf(listener);
      if (index != -1) {
        listeners.splice(index,1);
      }
      return this;
    },

    /**
     * @method fire
     * @chainable
     * カスタムイベントを表すオブジェクトを指定してカスタムイベントを発火します。
     *
     * @param {Object} event カスタムイベントを表すオブジェクト
     * @param {String} event.type カスタムイベントの名前
     */
     fire: function(e) {
      e.target = this;
      var oldEventName = 'on' + e.type;
      if (this[oldEventName]) this[oldEventName](e);
      
      var listeners = this._listeners[e.type];
      if (listeners) {
        var temp = listeners.clone();
        for (var i=0,len=temp.length; i<len; ++i) {
            temp[i].call(this, e);
        }
      }
      
      return this;
    },

    /**
     * @method flare
     * @chainable
     * イベント名を指定してカスタムイベントを発火します。
     *
     * param 引数を指定することによりカスタムイベントに任意のプロパティを設定することができます。  
     * これにより、呼び出し元がイベントリスナに任意の値を渡すことができます。  
     * （ただし target プロパティには必ず自分自身が格納されます。）
     *
     * ### Example
     *     //
     *
     * @param {String} type カスタムイベントの名前
     * @param {Object} [param] カスタムイベントにプロパティを設定するためのオブジェクト
    */
    flare: function(type, param) {
      var e = {type:type};
      if (param) {
        param.forIn(function(key, val) {
          e[key] = val;
        });
      }
      this.fire(e);

      return this;
    },

    /**
     * @method one
     * @chainable
     * 一度だけ実行されるイベントリスナを登録します。
     *
     * 指定したイベントリスナが一度実行されると、そのイベントリスナは削除されます。それ以外の挙動は {@link #on} と同じです。
     *
     * @param {String} type イベントの種類
     * @param {Function} listener イベントリスナとなる関数
     * @param {Object} listener.event Event オブジェクト、またはカスタムイベントのオブジェクト
     */
    one: function(type, listener) {
      var self = this;
      
      var func = function() {
        var result = listener.apply(self, arguments);
        self.off(type, func);
        return result;
      };
      
      this.on(type, func);
      
      return this;
    },

    /**
     * @method has
     * イベントリスナが登録されているかどうかを調べます。
     *
     * 指定したイベントの種類に対するイベントリスナが登録されている場合は true、そうでない場合は false を返します。
     *
     * @param {String} type イベントの種類
     * @return {Boolean} 指定したイベントのイベントリスナが登録されているかどうか
     */
    has: function(type) {
      return (this._listeners[type] !== undefined && this._listeners[type].length !== 0) || !!this['on' + type];
    },

    /**
     * @method clear
     * @chainable
     * ある種類のイベントに対するイベントリスナをすべて削除します。
     *
     * 特定のイベントリスナのみを削除するには {@link #off} を使用してください。
     *
     * @param {String} type イベントの種類
     */
    clear: function(type) {
      var oldEventName = 'on' + type;
      if (this[oldEventName]) delete this[oldEventName];
      this._listeners[type] = [];
      return this;
    },
  });

  /**
   * @method addEventListener
   * {@link #on} のエイリアスです。
   */
  /**
   * @method removeEventListener
   * {@link #off} のエイリアスです。
   */
  /**
   * @method clearEventListener
   * {@link #clear} のエイリアスです。
   */
  /**
   * @method hasEventListener
   * {@link #has} のエイリアスです。
   */
  /**
   * @method dispatchEvent
   * {@link #fire} のエイリアスです。
   */
  /**
   * @method dispatchEventByType
   * {@link #flare} のエイリアスです。
   */
  (function() {
    var methodMap = {
      addEventListener: 'on',
      removeEventListener: 'off',
      clearEventListener: 'clear',
      hasEventListener: 'has',
      dispatchEvent: 'fire',
      dispatchEventByType: 'flare',
    };
    methodMap.forIn(function(old, name) {
      phina.util.EventDispatcher.prototype.$method(old, phina.util.EventDispatcher.prototype[name]);
    });
  })();

});
