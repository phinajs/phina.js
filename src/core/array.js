/*
 * array.js
 */

;(function() {

  /**
   * @class global.Array
   * # 拡張した Array クラス
   * Array クラスを拡張しています。
   */


  /**
   * @property {Object} first
   * 最初の要素
   *
   * ### Example
   *     arr = [6, 5, 2, 3, 1, 4];
   *     arr.first; // => 6
   */
  Array.prototype.accessor("first", {
      "get": function()   { return this[0]; },
      "set": function(v)  { this[0] = v; }
  });
  
  /**
   * @property {Object} last
   * 最後の要素
   *
   * ### Example
   *     arr = [6, 5, 2, 3, 1, 4];
   *     arr.last; // => 4
   */
  Array.prototype.accessor("last", {
    "get": function()   { return this[this.length-1]; },
    "set": function(v)  { this[this.length-1] = v; }
  });

  /**
   * @method equals
   * 渡された配列と等しいかどうかをチェックします。
   *
   * 要素同士を === で比較します。要素に配列が含まれている場合は {@link #deepEquals} を使用してください。
   *
   * ### Example
   *     arr1 = [6, 5, 2, 3, 1, 4];
   *     arr1.equals([6, 5, 2, 3, 1, 4]);       // => true
   *     arr2 = [6, 5, 2, [3, 1], 4];
   *     arr2.equals([6, 5, 2, [3, 1], 4]);     // => false
   *     arr2.deepEquals([6, 5, 2, [3, 1], 4]); // => true
   *
   * @param {Array} arr 比較する対象の配列
   * @return {Boolean} チェックの結果
   */
  Array.prototype.$method("equals", function(arr) {
    // 長さチェック
    if (this.length !== arr.length) return false;
    
    for (var i=0,len=this.length; i<len; ++i) {
      if (this[i] !== arr[i]) {
        return false;
      }
    }

    return true;
  });

  /**
   * @method deepEquals
   * ネストされている配列を含め、渡された配列と等しいかどうかをチェックします。
   *
   * ※equalsDeep にするか検討. (Java では deepEquals なのでとりあえず合わせとく)
   *
   * ### Example
   *     arr = [6, 5, 2, [3, 1], 4];
   *     arr.equals([6, 5, 2, [3, 1], 4]);     // => false
   *     arr.deepEquals([6, 5, 2, [3, 1], 4]); // => true
   *
   * @param {Array} arr 比較する対象の配列
   * @return {Boolean} チェックの結果
   */
  Array.prototype.$method("deepEquals", function(arr) {
    // 長さチェック
    if (this.length !== arr.length) return false;
    
    for (var i=0,len=this.length; i<len; ++i) {
      var result = (this[i].deepEquals) ? this[i].deepEquals(arr[i]) : (this[i] === arr[i]);
      if (result === false) {
        return false;
      }
    }
    return true;
  });

  /**
   * @method contains
   * 指定した要素が配列に含まれているかをチェックします。
   *
   * 比較には厳密な同値（三重イコール演算子 === で使われるのと同じ方法）を用います。
   *
   * ### Example
   *     arr = [6, 5, 2, 3, 1, 4];
   *     arr.contains(3);     // => true
   *     arr.contains(3, 4);  // => false
   *     arr.contains(3, -4); // => true
   *     arr.contains("6");   // => false
   *
   * @param {Object} item チェックするオブジェクト
   * @param {Number} [fromIndex=0] 検索を始める位置。負数を指定した場合は末尾からのオフセットと見なします。
   * @return {Boolean} チェックの結果
   */
  Array.prototype.$method("contains", function(item, fromIndex) {
    return this.indexOf(item, fromIndex) != -1;
  });
  
  /**
   * @method at
   * 指定したインデックスの要素を返します（ループ・負数の指定可）。
   *
   * 添字が負数の場合は末尾からのオフセットとみなします。末尾の要素が -1 番目になります。  
   * 添字の絶対値が Array.length 以上の場合はループします。
   *
   * ### Example
   *     arr = ['a', 'b', 'c', 'd', 'e', 'f'];
   *     arr.at(0);  // => 'a'
   *     arr.at(6);  // => 'a'
   *     arr.at(13); // => 'b'
   *     arr.at(-1); // => 'f'
   *     arr.at(-8); // => 'e'
   *
   * @param {Number} index 添字
   * @return {Object} 添字で指定された要素
   */
  Array.prototype.$method("at", function(i) {
    i%=this.length;
    i+=this.length;
    i%=this.length;
    return this[i];
  });


  /**
   * @method find
   * 各要素を引数にして関数を実行し、その値が真となる（＝条件にマッチする）最初の要素を返します。
   *
   * どの要素もマッチしなければ undefined を返します。
   *
   * ### Example
   *     arr = ['foo', 'bar', 'hoge', 'fuga'];
   *     arr.find( function(elm) {
   *       return elm.indexOf('a') >= 0;
   *     });
   *     // => 'bar'
   *
   * @param {Function} callback 各要素に対して実行するコールバック関数
   * @param {Object} [self=this] callback 内で this として参照される値。デフォルトは呼び出し時の this。
   * @return {Object} 条件にマッチした最初の要素、または undefined
   */
  Array.prototype.$method("find", function(fn, self) {
    var target = null;

    this.some(function(elm, i) {
      if (fn.call(self, elm, i, this)) {
        target = elm;
        return true;
      }
    });

    return target;
  });

  /**
   * @method findIndex
   * 各要素を引数にして関数を実行し、その値が真となる（＝条件にマッチする）最初のインデックスを返します。
   *
   * どの要素もマッチしなければ -1 を返します。
   *
   * ### Example
   *     arr = ['foo', 'bar', 'hoge', 'fuga'];
   *     arr.findIndex( function(elm) {
   *       return elm.indexOf('a') >= 0;
   *     });
   *     // => 1
   *
   * @param {Function} callback 各要素に対して実行するコールバック関数
   * @param {Object} [self=this] callback 内で this として参照される値。デフォルトは呼び出し時の this。
   * @return {Object} 条件にマッチした最初のインデックス、または -1
   */
  Array.prototype.$method("findIndex", function(fn, self) {
    var target = null;

    this.some(function(elm, i) {
      if (fn.call(self, elm, i, this)) {
        target = i;
        return true;
      }
    });

    return target;
  });
  
  /**
   * @method swap
   * @chainable
   * a 番目の要素 と b 番目の要素を入れ替えます。
   *
   * ### Example
   *     arr1 = ['a', 'b', 'c', 'd'];
   *     arr2 = arr1.swap(0, 3); // => ['d', 'b', 'c', 'a']
   *     arr1 === arr2;          // => true
   *
   * @param {Number} a  インデックス
   * @param {Number} b  インデックス
   */
  Array.prototype.$method("swap", function(a, b) {
    var temp = this[a];
    this[a] = this[b];
    this[b] = temp;
    
    return this;
  });

  /**
   * @method erase
   * @chainable
   * 指定したオブジェクトと一致した最初の要素を削除します。
   *
   * ### Example
   *     arr1 = ['a', 'b', 'b', 'c'];
   *     arr2 = arr1.erase('b'); // => ['a', 'b', 'c']
   *     arr1 === arr2;          // => true
   *
   * @param {Object} elm 削除したいオブジェクト
   */
  Array.prototype.$method("erase", function(elm) {
    var index  = this.indexOf(elm);
    if (index >= 0) {
      this.splice(index, 1);
    }
    return this;
  });
  
  /**
   * @method eraseAll
   * @chainable
   * 指定したオブジェクトと一致したすべての要素を削除します。
   *
   * ### Example
   *     arr1 = ['a', 'b', 'b', 'c'];
   *     arr2 = arr1.eraseAll('b'); // => ['a', 'c']
   *     arr1 === arr2;             // => true
   *
   * @param {Object} elm 削除したいオブジェクト
   */
  Array.prototype.$method("eraseAll", function(elm) {
    for (var i=0,len=this.length; i<len; ++i) {
      if (this[i] == elm) {
        this.splice(i--, 1);
      }
    }
    return this;
  });
  
  /**
   * @method eraseIf
   * @chainable
   * 各要素を引数にして関数を実行し、その値が真となる（＝条件にマッチする）最初の要素を削除します。
   *
   * どの要素もマッチしなければ何も起きません。
   *
   * ### Example
   *     arr = ['foo', 'bar', 'hoge', 'fuga'];
   *     arr.eraseIf( function(elm) {
   *       return elm.indexOf('o') >= 0;
   *     });
   *     // => ['bar', 'hoge', 'fuga']
   *
   * @param {Function} callback 各要素に対して実行するコールバック関数
   */
  Array.prototype.$method("eraseIf", function(fn) {
    for (var i=0,len=this.length; i<len; ++i) {
      if ( fn(this[i], i, this) ) {
        this.splice(i, 1);
        break;
      }
    }
    return this;
  });
  
  /**
   * @method eraseIfAll
   * @chainable
   * 各要素を引数にして関数を実行し、その値が真となる（＝条件にマッチする）すべての要素を削除します。
   *
   * どの要素もマッチしなければ何も起きません。
   *
   * ### Example
   *     arr = ['foo', 'bar', 'hoge', 'fuga'];
   *     arr.eraseIfAll( function(elm) {
   *       return elm.indexOf('o') >= 0;
   *     });
   *     // => ['bar', 'fuga']
   *
   * @param {Function} callback 各要素に対して実行するコールバック関数
   */
  Array.prototype.$method("eraseIfAll", function(fn) {
    for (var i=0,len=this.length; i<len; ++i) {
      if ( fn(this[i], i, this) ) {
        this.splice(i--, 1);
        len--;
      }
    }
    return this;
  });
  
  /**
   * @method random
   * 配列からランダムに1つ取り出した要素を返します。
   *
   * 取り出す範囲をインデックスで指定することもできます。  
   * {@link #pickup}、{@link #lot} と同じです。  
   *
   * ### Example
   *     arr = ['foo', 'bar', 'hoge', 'fuga'];
   *     arr.random(2, 3);  // => 'hoge' または 'fuga'
   *
   * @param {Number} [min=0] インデックスの下限
   * @param {Number} [max=配列の最大インデックス] インデックスの上限
   * @return {Object} ランダムに1つ取り出した要素
   */
  Array.prototype.$method("random", function(min, max) {
    min = min || 0;
    max = max || this.length-1;
    return this[ Math.randint(min, max) ];
  });
  
  /**
   * @method pickup
   * 配列からランダムで1つ取り出した要素を返します。
   *
   * {@link #random}、{@link #lot} と同じです。
   * @inheritdoc #random
   */
  Array.prototype.$method("pickup", function(min, max) {
    min = min || 0;
    max = max || this.length-1;
    return this[ Math.randint(min, max) ];
  });
  
  /**
   * @method lot
   * 配列からランダムで1つ取り出した要素を返します。
   *
   * {@link #random}、{@link #pickup} と同じです。
   * @inheritdoc #random
   */
  Array.prototype.$method("lot", function(min, max) {
    min = min || 0;
    max = max || this.length-1;
    return this[ Math.randint(min, max) ];
  });
  
  /**
   * @method uniq
   * 要素の重複を取り除いた配列を生成して返します。
   *
   * 自分自身は破壊されません。
   *
   * ### Example
   *     arr = [1, 2, 3, 4, 3, 2];
   *     arr.uniq(); // => [1, 2, 3, 4]
   *
   * @param {Number} [deep] ※未使用
   * @return {Object} 新しい配列
   */
  Array.prototype.$method("uniq", function(deep) {
    return this.filter(function(value, index, self) {
      return self.indexOf(value) === index;
    });
  });
  

  /**
   * @method flatten
   * 自身を再帰的に平滑化した配列を生成して返します。
   *
   * level を指定しなければ深さの際限なく完全に平滑化します。
   *
   * ### Example
   *     arr = [1, 2, [3, [4, 5]]];
   *     arr.flatten();  // => [1, 2, 3, 4, 5]
   *     arr.flatten(1); // => [1, 2, 3, [4, 5]]
   *
   * @param {Number} [level=0]  平滑化の再帰の深さ
   * @return {Object} 平滑化した配列
   */
  Array.prototype.$method("flatten", function(level) {
    var arr = null;

    if (level) {
      arr = this;
      for (var i=0; i<level; ++i) {
        arr = Array.prototype.concat.apply([], arr);
      }
    }
    else {
      // 完全フラット
      arr = this.reduce(function (previousValue, curentValue) {
        return Array.isArray(curentValue) ?
          previousValue.concat(curentValue.flatten()) : previousValue.concat(curentValue);
      }, []);
    }

    return arr;
  });

  /**
   * @method clone
   * 自身のコピーを生成して返します。
   *
   * ### Example
   *     arr1 = [1, 2, [3, 4]];
   *     arr2 = arr1.clone();      // => [1, 2, [3, 4]]
   *     arr1[2] === arr2[2];      // => true
   *     arr1[2][0] = 9;
   *     arr2;                     // => [1, 2, [9, 4]]
   *     arr1 = [1, 2, [3, 4]];
   *     arr2 = arr1.clone(true);  // => [1, 2, [3, 4]]
   *     arr1[2] === arr2[2];      // => false
   *     arr1[2][0] = 9;
   *     arr2;                     // => [1, 2, [3, 4]]
   *
   * @param {Boolean} [deep=false] 配列のネストをたどって複製するかどうか
   * @return {Object} 新しい配列
   */
  Array.prototype.$method("clone", function(deep) {
    if (deep === true) {
      var a = Array(this.length);
      for (var i=0,len=this.length; i<len; ++i) {
        a[i] = (this[i].clone) ? this[i].clone(deep) : this[i];
      }
      return a;
    }
    else {
      return Array.prototype.slice.apply(this);
    }
  });


  /**
   * @method clear
   * @chainable
   * 自身を空の配列にします。
   *
   * ### Example
   *     arr = [1, 2, [3, 4]];
   *     arr.clear(); // => []
   */
  Array.prototype.$method("clear", function() {
    this.length = 0;
    return this;
  });
  
  /**
   * @method fill
   * @chainable
   * 自身の一部の要素を特定の値で埋めます。
   *
   * ### Example
   *     arr = [1, 2, 3, 4, 5];
   *     arr.fill("x");       // => ["x", "x", "x", "x", "x"]
   *     arr.fill("x", 2, 4); // => [1, 2, "x", "x", 5]
   *
   * @param {Object} value 埋める値
   * @param {Number} [start=0] 値を埋める最初のインデックス
   * @param {Number} [end=自身の配列の長さ] 値を埋める最後のインデックス+1
   */
  Array.prototype.$method("fill", function(value, start, end) {
    start = start || 0;
    end   = end   || (this.length);
    
    for (var i=start; i<end; ++i) {
      this[i] = value;
    }
    
    return this;
  });
  

  /**
   * @method range
   * @chainable
   * 自身を等差数列（一定間隔の整数値の列）とします。
   *
   * - 引数が1つの場合、0～end（end含まず）の整数の配列です。  
   * - 引数が2つの場合、start～end（end含まず）の整数の配列です。  
   * - 引数が3つの場合、start～end（end含まず）かつ start + n * step (nは整数)を満たす整数の配列です。
   *
   * ### Example
   *     arr = [];
   *     arr.range(4);        // => [0, 1, 2, 3]
   *     arr.range(2, 5);     // => [2, 3, 4]
   *     arr.range(2, 14, 5); // => [2, 7, 12]
   *     arr.range(2, -3);    // => [2, 1, 0, -1, -2]
   *
   * @param {Number} start 最初の値（デフォルトは 0）
   * @param {Number} end 最後の値（省略不可）
   * @param {Number} [step=1または-1] 間隔
   */
  Array.prototype.$method("range", function(start, end, step) {
    this.clear();
    
    if (arguments.length == 1) {
      for (var i=0; i<start; ++i) this[i] = i;
    }
    else if (start < end) {
      step = step || 1;
      if (step > 0) {
        for (var i=start, index=0; i<end; i+=step, ++index) {
          this[index] = i;
        }
      }
    }
    else {
      step = step || -1;
      if (step < 0) {
        for (var i=start, index=0; i>end; i+=step, ++index) {
          this[index] = i;
        }
      }
    }
    
    return this;
  });
  
  /**
   * @method shuffle
   * @chainable
   * 自身の要素をランダムにシャッフルします。
   *
   * ### Example
   *     arr = [1, 2, 3, 4, 5];
   *     arr.shuffle(); // => [5, 1, 4, 2, 3] など
   */
  Array.prototype.$method("shuffle", function() {
    for (var i=0,len=this.length; i<len; ++i) {
      var j = Math.randint(0, len-1);
      
      if (i != j) {
        this.swap(i, j);
      }
    }
    
    return this;
  });

  /**
   * @method sum
   * 要素の合計値を返します。
   *
   * 要素に数値以外が含まれる場合の挙動は不定です。
   *
   * ### Example
   *     arr = [1, 2, 3, 4, 5, 6];
   *     arr.sum(); // => 21
   *
   * @return {Number} 合計
   */
  Array.prototype.$method("sum", function() {
    var sum = 0;
    for (var i=0,len=this.length; i<len; ++i) {
      sum += this[i];
    }
    return sum;
  });

  /**
   * @method average
   * 要素の平均値を返します。
   *
   * 要素に数値以外が含まれる場合の挙動は不定です。
   *
   * ### Example
   *     arr = [1, 2, 3, 4, 5, 6]
   *     arr.average(); // => 3.5
   *
   * @return {Number} 平均値
   */
  Array.prototype.$method("average", function() {
    var sum = 0;
    var len = this.length;
    for (var i=0; i<len; ++i) {
      sum += this[i];
    }
    return sum/len;
  });

  /**
   * @method each
   * @chainable
   * 要素を順番に渡しながら関数を繰り返し実行します。
   *
   * メソッドチェーンに対応していますが、このメソッドによって自分自身は変化しません。
   *
   * ###Reference
   * - [Array.prototype.forEach() - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
   *
   * ### Example
   *     arr = [1, 2, 3];
   *     arr.each( function(elm) {
   *       console.log(elm * elm)
   *     });
   *     // => 1
   *     //    4
   *     //    9
   *
   * @param {Function} callback 各要素に対して実行するコールバック関数
   * @param {Object} [self=this] callback 内で this として参照される値
   */
  Array.prototype.$method("each", function() {
    this.forEach.apply(this, arguments);
    return this;
  });

  
  /**
   * @method toULElement
   * ULElement に変換します（未実装）
   */
  Array.prototype.$method("toULElement", function(){
      // TODO: 
  });

  /**
   * @method toOLElement
   * OLElement に変換します（未実装）
   */
  Array.prototype.$method("toOLElement", function(){
      // TODO:
  });

  
  /**
   * @method range
   * @static
   * インスタンスメソッドの {@link #range} と同じです。
   *
   * ### Example
   *     Array.range(2, 14, 5); // => [2, 7, 12]
   */
  Array.$method("range", function(start, end, step) {
    return Array.prototype.range.apply([], arguments);
  });


  /**
   * @method of
   * @static
   * ES6 準拠の of 関数です。可変長引数をとって Array オブジェクトにして返します。
   *
   * ### Example
   *     Array.of();        // => []
   *     Array.of(1, 2, 3); // => [1, 2, 3]
   *
   * @param {Object} elementN 生成する配列の要素
   * @return {Array} 生成した配列
   */
  Array.$method("of", function() {
    return Array.prototype.slice.call(arguments);
  });

  /**
   * @method from
   * @static
   * ES6 準拠の from 関数です。array-like オブジェクトかiterable オブジェクトから新しい配列を生成します。
   *
   * array-like オブジェクトとは、length プロパティを持ち、数字の添字でアクセス可能なオブジェクトのことです。
   * 通常の配列のほか、String、arguments、NodeList なども array-like オブジェクトです。
   *
   * iterable オブジェクトとは、Symbol.iterator プロパティを持つオブジェクトのことです。
   * 通常の配列のほか、String、arguments、NodeList なども iterable オブジェクトです。
   *
   * ### Example
   *     Array.from([1, 2, 3], function(elm){ return elm * elm} ); // => [1, 4, 9]
   *     Array.from("foo");                                        // => ["f", "o", "o"]
   *     Array.from( document.querySelectorAll("span"))            // => [Element, Element, Element,...]
   *
   * @param {Object} arrayLike 配列に変換する array-like オブジェクト
   * @param {Function} [callback] arrayLike のすべての要素に対して実行するマップ関数
   * @param {Object} [context] callback 内で this として参照される値
   * @return {Array} 生成した配列
   */
  Array.$method("from", function(arrayLike, callback, context) {
    if (!Object(arrayLike).length) return [];

    var result = [];
    if (Symbol && Symbol.iterator && arrayLike[Symbol.iterator]) {
        var iterator = arrayLike[Symbol.iterator]();
        while (true) {
            var iteratorResult = iterator.next();
            if (iteratorResult.done) break;

            var value = typeof callback === 'function' ? callback.bind(context || this)(iteratorResult.value) : iteratorResult.value;
            result.push(value);
        }
        return result;
    }

    for (var i = 0, len = arrayLike.length; i < len; i++) {
        result.push(arrayLike[i]);
    }
    return result.map(typeof callback == 'function' ? callback : function(item) {
      return item;
    }, context);
  });
  
  /**
   * @method most
   * 指定した関数の返り値が最小となる要素と最大となる要素をまとめて返します。
   *
   * 空の配列に対して実行すると {max: Infinity, min: -Infinity} を返します。
   *
   * ### Example
   *     [5,1,4,1,9,2,-10].most(); // => {max:9, min: -10}
   *
   *     points = [ {x:0, y:0}, {x:640, y:960}, {x:-80, y:100} ];
   *     points.most(function(e){return e.x;}).min; // => [x:-80, y:100]
   *     points.most(function(e){return e.y;}).max; // => [x:640, y:960]
   *
   * @param {Function} [callback] 各要素に対して実行するコールバック関数
   * @param {Object} [self=this] 関数内で this として参照される値。デフォルトは自分自身。
   * @return {Object} max と min をキーに持つオブジェクト
   * @return {Object} return.min 関数の返り値が最小となる要素
   * @return {Object} return.max 関数の返り値が最大となる要素
   */
  Array.prototype.$method("most", function(func, self) {
    if(this.length < 1){
      return {
        max: -Infinity,
        min: Infinity,
      };
    }
    if(func){
      var maxValue = -Infinity;
      var minValue = Infinity;
      var maxIndex = 0;
      var minIndex = 0;
      
      if(typeof self === 'undefined'){self = this;}
      
      for (var i = 0, len = this.length; i < len; ++i) {
        var v = func.call(self, this[i], i, this);
        if(maxValue < v){
          maxValue = v;
          maxIndex = i;
        }
        if(minValue > v){
          minValue = v;
          minIndex = i;
        }
      }
      return {
        max: this[maxIndex],
        min: this[minIndex],
      };
    }
    else{
      var max = -Infinity;
      var min = Infinity;
      for (var i = 0, len = this.length;i < len; ++i) {
        if(max<this[i]){max=this[i];}
        if(min>this[i]){min=this[i];}
      }
      return {
        max: max,
        min: min,
      };
    }
    
  });  

})();
