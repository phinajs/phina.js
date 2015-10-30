
;(function() {

  /**
   * @class global.Array
   * Array の拡張
   */


  /**
   * @property  first
   * 最初の要素
   */
  Array.prototype.accessor("first", {
      "get": function()   { return this[0]; },
      "set": function(v)  { this[0] = v; }
  });
  
  /**
   * @property    last
   * 最後の要素
   */
  Array.prototype.accessor("last", {
    "get": function()   { return this[this.length-1]; },
    "set": function(v)  { this[this.length-1] = v; }
  });

  /**
   * @method  equals
   * 渡された配列と等しいかどうかをチェック
   */
  Array.prototype.method("equals", function(arr) {
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
   * @method  deepEquals
   * ネストされている配列含め渡された配列と等しいかどうかをチェック
   * equalsDeep にするか検討. (Java では deepEquals なのでとりあえず合わせとく)
   */
  Array.prototype.method("deepEquals", function(arr) {
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
   * @method    contains
   * 要素が含まれいるかをチェック
   */
  Array.prototype.method("contains", function(item, fromIndex) {
    return this.indexOf(item, fromIndex) != -1;
  });
  
  /**
   * @method  at
   * ループ添字アクセス(Ruby っぽいやつ)
   */
  Array.prototype.method("at", function(i) {
    i%=this.length;
    i+=this.length;
    i%=this.length;
    return this[i];
  });


  Array.prototype.method("find", function(fn, self) {
    var target = null;

    this.some(function(elm, i) {
      if (fn.call(self, elm, i, this)) {
        target = elm;
        return true;
      }
    });

    return target;
  });

  Array.prototype.method("findIndex", function(fn, self) {
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
   * @method  swap
   * a番目 と b番目 を入れ替える
   */
  Array.prototype.method("swap", function(a, b) {
    var temp = this[a];
    this[a] = this[b];
    this[b] = temp;
    
    return this;
  });

  /**
   * @method  erase
   * elm と一致する要素を削除
   * イレース
   */
  Array.prototype.method("erase", function(elm) {
    var index  = this.indexOf(elm);
    if (index >= 0) {
      this.splice(index, 1);
    }
    return this;
  });
  
  /**
   * @method  eraseAll
   * elm と一致する要素を全て削除
   */
  Array.prototype.method("eraseAll", function(elm) {
    for (var i=0,len=this.length; i<len; ++i) {
      if (this[i] == elm) {
        this.splice(i--, 1);
      }
    }
    return this;
  });
  
  /**
   * @method  eraseIf
   * 条件にマッチした要素を削除
   */
  Array.prototype.method("eraseIf", function(fn) {
    for (var i=0,len=this.length; i<len; ++i) {
      if ( fn(this[i], i, this) ) {
        this.splice(i, 1);
        break;
      }
    }
    return this;
  });
  
  /**
   * @method  eraseIfAll
   * 条件にマッチした要素を削除
   */
  Array.prototype.method("eraseIfAll", function(fn) {
    for (var i=0,len=this.length; i<len; ++i) {
      if ( fn(this[i], i, this) ) {
        this.splice(i--, 1);
        len--;
      }
    }
    return this;
  });
  
  /**
   * @method  random
   * 要素の中からランダムで取り出す
   */
  Array.prototype.method("random", function(min, max) {
    min = min || 0;
    max = max || this.length-1;
    return this[ Math.randint(min, max) ];
  });
  
  /**
   * @method  pickup
   * 要素の中からランダムで取り出す
   */
  Array.prototype.method("pickup", function(min, max) {
    min = min || 0;
    max = max || this.length-1;
    return this[ Math.randint(min, max) ];
  });
  
  /**
   * @method  lot
   * 要素の中からランダムで取り出す
   */
  Array.prototype.method("lot", function(min, max) {
    min = min || 0;
    max = max || this.length-1;
    return this[ Math.randint(min, max) ];
  });
  
  /**
   * @method  uniq
   * 重複削除
   */
  Array.prototype.method("uniq", function(deep) {
    return this.filter(function(value, index, self) {
      return self.indexOf(value) === index;
    });
  });
  

  /**
   * @method  flatten
   * フラット.
   * Ruby のやつ.
   */
  Array.prototype.method("flatten", function(level) {
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
   * @method  clone
   * 配列をクローン
   */
  Array.prototype.method("clone", function(deep) {
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
   * @method  clear
   * クリア
   */
  Array.prototype.method("clear", function() {
    this.length = 0;
    return this;
  });
  
  /**
   * @method  fill
   * 特定の値で満たす
   */
  Array.prototype.method("fill", function(value, start, end) {
    start = start || 0;
    end   = end   || (this.length);
    
    for (var i=start; i<end; ++i) {
      this[i] = value;
    }
    
    return this;
  });
  

  /**
   * @method  range
   * python のやつ
   */
  Array.prototype.method("range", function(start, end, step) {
    this.clear();
    
    if (arguments.length == 1) {
      for (var i=0; i<start; ++i) this[i] = i;
    }
    else if (start < end){
      step  = step || 1;
      for (var i=start, index=0; i<end; i+=step, ++index) {
        this[index] = i;
      }
    }
    else {
      step  = step || -1;
      for (var i=start, index=0; i>end; i+=step, ++index) {
        this[index] = i;
      }
    }
    
    return this;
  });
  
  /**
   * @method  shuffle
   * シャッフル
   */
  Array.prototype.method("shuffle", function() {
    for (var i=0,len=this.length; i<len; ++i) {
      var j = Math.randint(0, len-1);
      
      if (i != j) {
        this.swap(i, j);
      }
    }
    
    return this;
  });

  /**
   * @method  sum
   * 合計
   */
  Array.prototype.method("sum", function() {
    var sum = 0;
    for (var i=0,len=this.length; i<len; ++i) {
      sum += this[i];
    }
    return sum;
  });

  /**
   * @method  average
   * 平均
   */
  Array.prototype.method("average", function() {
    var sum = 0;
    var len = this.length;
    for (var i=0; i<len; ++i) {
      sum += this[i];
    }
    return sum/len;
  });

  /**
   * @method  each
   * 繰り返し
   * チェーンメソッド対応
   */
  Array.prototype.method("each", function() {
    this.forEach.apply(this, arguments);
    return this;
  });

  
  /**
   * @method  toULElement
   * ULElement に変換
   */
  Array.prototype.method("toULElement", function(){
      // TODO: 
  });

  /**
   * @method  toOLElement
   * OLElement に変換
   */
  Array.prototype.method("toOLElement", function(){
      // TODO:
  });

  
  /**
   * @static
   * @method  range
   * range
   */
  Array.method("range", function(start, end, step) {
    return Array.prototype.range.apply([], arguments);
  });


  /**
   * @method of
   * of関数 可変長引数をとってArrayにして返す
   * ES6準拠
   */
  Array.method("of", function() {
    return Array.prototype.slice.call(arguments);
  });

  /**
   * @method from
   * from関数 Array like objectに対してArrayのメソッドを追加する
   *
   * ES6準拠
   */
  Array.method("from", function(arrayLike, callback, context) {
    if (!Object(arrayLike).length) return [];

    return Array.prototype.map.call(arrayLike, typeof callback == 'function' ? callback : function(item) {
      return item;
    }, context);
  });

})();
