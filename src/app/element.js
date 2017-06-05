
phina.namespace(function() {

  /**
   * @class phina.app.Element
   * @extends phina.util.EventDispatcher
   * # 主に要素の親子関係を扱うクラス
   * 主に親子関係等を定義するクラスです。
   */
  phina.define('phina.app.Element', {
    superClass: 'phina.util.EventDispatcher',

    /**
     * @property parent
     * 親要素
     */
    parent: null,

    /**
     * @property children
     * 子要素
     */
    children: null,

    /**
     * @property awake
     * 有効かどうか
     */
    awake: true,

    /**
     * @constructor
     */
    init: function() {
      this.superInit();
      this.children = [];
    },

    /**
     * @method addChild
     * 自身に子要素を追加します。
     *
     * 自身を子要素として引数で指定した要素に追加するには {@link #addChildTo} を使用してください。
     *
     * @param {Object} child 追加する子要素
     */
    addChild: function(child) {
      if (child.parent) child.remove();

      child.parent = this;
      this.children.push(child);

      child.has('added') && child.flare('added');

      return child;
    },
    /**
     * @method addChildTo
     * 自身を子要素として引数で指定した要素に追加します。
     *
     * 自身に子要素を追加するには {@link #addChild} を使用してください。
     *
     * @param {Object} parent 自身を子要素として追加する要素
     */
    addChildTo: function(parent) {
      parent.addChild(this);

      return this;
    },
    /**
     * @method addChildAt
     * 自身を、指定した要素の子要素の任意の配列インデックスに追加します。
     *
     * @param {Object} child 追加する子要素
     * @param {Number} index インデックス番号
     */
    addChildAt: function(child, index) {
      if (child.parent) child.remove();

      child.parent = this;
      this.children.splice(index, 0, child);

      child.has('added') && child.flare('added');

      return child;
    },
    /**
     * @method getChildAt
     * 指定したインデックスの子要素を返します。
     *
     * @param {Number} index インデックス番号
     * @return {Object} 指定したインデックスの子要素
     */
    getChildAt: function(index) {
      return this.children.at(index);
    },
    /**
     * @method getChildByName
     * 指定した名前の子要素を返します。（未実装）
     */
    getChildByName: function(name) {
      // TODO:
    },
    /**
     * @method getChildIndex
     * 指定した子要素のインデックス番号を返します。
     *
     * @param {Object} child 子要素
     * @return {Number} 指定した子要素のインデックス番号
     */
    getChildIndex: function(child) {
      return this.children.indexOf(child);
    },
    /**
     * @method getParent
     * 指定した要素の親要素を返します。
     *
     * @return {Object} 指定した要素の親要素
     */
    getParent: function() {
      return this.parent;
    },
    /**
     * @method getRoot
     * 指定した要素の階層ツリーのルートを返します。
     *
     * @return {Object} 指定した要素の階層ツリーのルート
     */
    getRoot: function() {
      var elm = this;
      for (elm=this.parent; elm.parent != null; elm = elm.parent) {

      }
      return elm;
    },
    /**
     * @method removeChild
     * @chainable
     * 指定した要素を自身の子要素から削除します。
     *
     * @param {Object} child 要素
     */
    removeChild: function(child) {
      var index = this.children.indexOf(child);
      if (index !== -1) {
        this.children.splice(index, 1);
        child.has('removed') && child.flare('removed');
      }
      return this;
    },
    /**
     * @method remove
     * 自身を親要素の子要素から削除します。
     */
    remove: function() {
      if (!this.parent) return ;

      this.parent.removeChild(this);
      this.parent = null;

      return this;
    },
    /**
     * @method isAwake
     * 自身が有効かどうかを返します。
     *
     * @return {Boolean} 有効かどうか
     */
    isAwake: function() {
      return this.awake;
    },
    /**
     * @method wakeUp
     * 自身を有効にします。
     */
    wakeUp: function() {
      this.awake = true;
      return this;
    },
    /**
     * @method sleep
     * 自身を無効にします。
     */
    sleep: function() {
      this.awake = false;
      return this;
    },
    /**
     * @method fromJSON
     * JSON 形式を使って自身に子要素を追加することができます。
     *
     * ### Example
     *      this.fromJSON({
     *        "children": {
     *          "label": {                  //キー名が追加する子要素の名前になる
     *            "className": "Label",     //クラス
     *            "arguments": ['hello!'],  //初期化時の引数
     *            "x":320,                  //その他プロパティ
     *            "y":480,
     *          },
     *        },
     *      });
     *
     * @param {JSON} json JSON 形式
     */
    fromJSON: function(json) {

      var createChildren = function(name, data) {
        //
        var args = data.arguments;
        args = (args instanceof Array) ? args : [args];
        //
        var _class = phina.using(data.className);
        //
        var element = _class.apply(null, args);

        element.name = name;
        this[name] = element;

        element.fromJSON(data);
        element.addChildTo(this)
      }.bind(this);

      json.forIn(function(key, value) {
        if (key === 'children') {
          value.forIn(function(name, data) {
            createChildren(name, data);
          });
        }
        else {
          if (key !== 'type' && key !== 'className') {
            this[key] = value;
          }
        }
      }, this);

      return this;
    },
    /**
     * @method toJSON
     * 自身の子要素を JSON 形式で返します。
     *
     * @return {JSON} JSON形式
     */
    toJSON: function() {
      var keys = Object.keys(phina.using(this.className).defaults || {});

      this._hierarchies.forEach(function(e) {
        var d = e.defaults;
        if (d) {
          Object.keys(d).forEach(function(k) {
            if (keys.indexOf(k) === -1) {
              keys.push(k);
            }
          });
        }
      });

      keys.push('name', 'className');

      var json = {};
      keys.each(function(key) {
        json[key] = this[key];
      }, this);

      var children = this.children.map(function(child) {
        return child.toJSON();
      });

      if (children.length) {
        json.children = {};
        children.each(function(child, i) {
          json.children[child.name || (child.className + '_' + i)] = child;
        });
      }

      return json;
    },
  });

});
