


phina.namespace(function() {

  /**
   * @class phina.accessory.Tweener
   * # Tweener
   * Tweenerはオブジェクトのプロパティに対して、
   * Tweenアニメーションの効果を与えるクラスです。  
   * 主に {@link phina.app.Element} とそのサブクラスで使用されます。
   * @extends phina.accessory.Accessory
   */
  var Tweener = phina.define('phina.accessory.Tweener', {
    superClass: 'phina.accessory.Accessory',
    
    /**
     * アニメーションを更新する方法を指定します。  
     * 変更するとdurationによる時間の進み方が変わります。  
     * 詳しくは{@link #UPDATE_MAP}を参照してください。
     */
    updateType: 'delta',

    /**
     * @constructor
     */
    init: function(target) {
      this.superInit(target);

      this._init();
    },

    _init: function() {
      this._loop = false;
      this._tasks = [];
      this._index = 0;
      this.playing = true;
      this._update = this._updateTask;
    },

    /**
     * @param {phina.app.BaseApp} app
     */
    update: function(app) {
      this._update(app);
    },

    /**
     * {@link #updateType}を変更します。
     * @param {String} type 更新方法を表す文字列
     * @chainable
     */
    setUpdateType: function(type) {
      this.updateType = type;
      return this;
    },

    /**
     * propsで指定した値になるまで、durationで指定した時間をかけて、アニメーションさせます。
     * @param {Object} props 変更したいプロパティをkeyとしたオブジェクト
     * @param {Number} duration (optional) アニメーションにかける時間
     * @param {String} easing (optional) easing {@link phina.util.Tween#EASING}を参照してください。
     * @chainable
     * 
     */
    to: function(props, duration, easing) {
      this._add({
        type: 'tween',
        mode: 'to',
        props: props,
        duration: duration,
        easing: easing,
      });
      return this;
    },

    /**
     * アニメーション開始時の値とpropsで指定した値を加算した値になるまで、durationで指定した時間をかけて、アニメーションさせます。
     * @param {Object} props 変更したいプロパティをkeyとしたオブジェクト
     * @param {Number} duration (optional) アニメーションにかける時間
     * @param {String} easing (optional) easing {@link phina.util.Tween#EASING}を参照してください。
     * @chainable
     */
    by: function(props, duration, easing) {
      this._add({
        type: 'tween',
        mode: 'by',
        props: props,
        duration: duration,
        easing: easing,
      });

      return this;
    },

    /**
     * propsで指定した値からアニメーション開始時の値になるまで、durationで指定した時間をかけて、アニメーションさせます。
     * @param {Object} props 変更したいプロパティをkeyとしたオブジェクト
     * @param {Number} duration (optional) アニメーションにかける時間
     * @param {String} easing (optional) easing {@link phina.util.Tween#EASING}を参照してください。
     * @chainable
     */
    from: function(props, duration, easing) {
      this._add({
        type: 'tween',
        mode: 'from',
        props: props,
        duration: duration,
        easing: easing,
      });
      return this;
    },

    /**
     * 指定した時間が経過するまで待機します。
     * @param {Number} time waitする時間
     * @chainable
     */
    wait: function(time) {
      this._add({
        type: 'wait',
        data: {
          limit: time,
        },
      });
      return this;
    },

    /**
     * 現在設定されているアニメーションが終了した時に呼び出される関数をセットします。
     * @param {Function} func 呼び出される関数
     * @param {Object} self (optional) func内でthisにしたいオブジェクト。
     * @param {Object[]} args (optional) funcの引数にしたい値
     * @chainable
     */
    call: function(func, self, args) {
      this._add({
        type: 'call',
        data: {
          func: func,
          self: self || this,
          args: args,
        },
      });
      return this;
    },

    /**
     * 現在設定されているアニメーションが終了した時にプロパティをセットします。  
     * 第一引数にオブジェクトをセットすることもできます。
     * @param {String | Object} key valueをセットするプロパティ名か、変更したいプロパティをkeyとしたオブジェクト。
     * @param {Object} value (optional) セットする値
     * @chainable
     */
    set: function(key, value) {
      var values = null;
      if (arguments.length == 2) {
        values = {};
        values[key] = value;
      }
      else {
        values = key;
      }
      this._tasks.push({
        type: "set",
        data: {
          values: values
        }
      });

      return this;
    },

    /**
     * x, yに対して、 {@link #to} の処理を行います。
     * @param {Number} x
     * @param {Number} y
     * @param {Number} duration (optional) アニメーションにかける時間
     * @param {String} easing (optional) easing {@link phina.util.Tween#EASING}を参照してください。
     * @chainable
     */
    moveTo: function(x, y, duration, easing) {
      return this.to({ x: x, y: y }, duration, easing);
    },
    
    /**
     * x, yに対して、 {@link #by} の処理を行います。
     * @param {Number} x
     * @param {Number} y
     * @param {Number} duration (optional) アニメーションにかける時間
     * @param {String} easing (optional) easing {@link phina.util.Tween#EASING}を参照してください。
     * @chainable
     */
    moveBy: function(x, y, duration, easing) {
      return this.by({ x: x, y: y }, duration, easing);
    },

    /**
     * rotationに対して、 {@link #to} の処理を行います。
     * @param {Number} rotation
     * @param {Number} duration (optional) アニメーションにかける時間
     * @param {String} easing (optional) easing {@link phina.util.Tween#EASING}を参照してください。
     * @chainable
     */
    rotateTo: function(rotation, duration, easing) {
      return this.to({ rotation: rotation }, duration, easing);
    },
    
    /**
     * rotationに対して、 {@link #by} の処理を行います。
     * @param {Number} rotation
     * @param {Number} duration (optional) アニメーションにかける時間
     * @param {String} easing (optional) easing {@link phina.util.Tween#EASING}を参照してください。
     * @chainable
     */
    rotateBy: function(rotation, duration, easing) {
      return this.by({ rotation: rotation }, duration, easing);
    },

    /**
     * scaleX, scaleYに対して {@link #to} の処理を行います。
     * @param {Number} scale scaleXとscaleYに設定する値
     * @param {Number} duration (optional) アニメーションにかける時間
     * @param {String} easing (optional) easing {@link phina.util.Tween#EASING}を参照してください。
     * @chainable
     */
    scaleTo: function(scale, duration, easing) {
      return this.to({ scaleX: scale, scaleY: scale }, duration, easing);
    },
    /**
     * scaleX, scaleYに対して {@link #by} の処理を行います。
     * @param {Number} scale scaleXとscaleYに設定する値
     * @param {Number} duration (optional) アニメーションにかける時間
     * @param {String} easing (optional) easing {@link phina.util.Tween#EASING}を参照してください。
     * @chainable
     */
    scaleBy: function(scale, duration, easing) {
      return this.by({ scaleX: scale, scaleY: scale }, duration, easing);
    },

    /**
     * alphaに対して {@link #to} の処理を行います。
     * @param {Number} value alphaに設定する値
     * @param {Number} duration (optional) アニメーションにかける時間
     * @param {String} easing (optional) easing {@link phina.util.Tween#EASING}を参照してください。
     * @chainable
     */
    fade: function(value, duration, easing) {
      return this.to({ alpha: value }, duration, easing);
    },

    /**
     * alphaを0にするアニメーションを設定します。
     * @param {Number} duration (optional) アニメーションにかける時間
     * @param {String} easing (optional) easing {@link phina.util.Tween#EASING}を参照してください。
     * @chainable
     */
    fadeOut: function(duration, easing) {
      return this.fade(0.0, duration, easing);
    },

    /**
     * alphaを1にするアニメーションを設定します。
     * @param {Number} duration (optional) アニメーションにかける時間
     * @param {String} easing (optional) easing {@link phina.util.Tween#EASING}を参照してください。
     * @chainable
     */
    fadeIn: function(duration, easing) {
      return this.fade(1.0, duration, easing);
    },

    /**
     * アニメーション開始
     * @chainable
     */
    play: function() {
      this.playing = true;
      return this;
    },

    /**
     * アニメーションを一時停止
     * @chainable
     */
    pause: function() {
      this.playing = false;
      return this;
    },

    /**
     * アニメーションを停止し、最初まで巻き戻します。
     * @chainable
     */
    stop: function() {
      this.playing = false;
      this.rewind();
      return this;
    },

    /**
     * アニメーションを巻き戻す
     * @chainable
     */
    rewind: function() {
      this._update = this._updateTask;
      this._index = 0;
      return this;
    },

    yoyo: function() {
      // TODO: 最初の値が分からないので反転できない...
      this._update = this._updateTask;
      this._index = 0;
      this._tasks.each(function(task) {
        if (task.type === 'tween') {

        }
      });
      this.play();

      return this;
    },

    /**
     * アニメーションループ設定
     * @param {Boolean} flag
     * @chainable
     */
    setLoop: function(flag) {
      this._loop = flag;
      return this;
    },

    /**
     * アニメーションをクリア
     * @chainable
     */
    clear: function() {
      this._init();
      return this;
    },

    /**
     * JSON形式でアニメーションを設定します。
     * @chainable
     * @param {Object} json
     * @param {Boolean} json.loop (optional) ループする場合true
     * @param {Array[]} json.tweens 設定するアニメーション
     * 
     * ```
     * [
     *   [method, arg1, arg2,,,],
     *   ['to', {value: 100}, 1000, 'swing'],
     *   ['wait', 1000],
     *   ['set', 'text', 'END']
     * ]
     * ```
     */
    fromJSON: function(json) {
      if (json.loop !== undefined) {
        this.setLoop(json.loop);
      }

      json.tweens.each(function(t) {
        t = t.clone();
        var method = t.shift();
        this[method].apply(this, t);
      }, this);

      return this;
    },

    _add: function(params) {
      this._tasks.push(params);
    },

    _updateTask: function(app) {
      if (!this.playing) return ;

      var task = this._tasks[this._index];
      if (!task) {
        if (this._loop) {
          this.rewind();
          this._update(app);
        }
        else {
          this.playing = false;
        }
        return ;
      }
      else {
        ++this._index;
      }

      if (task.type === 'tween') {
        this._tween = phina.util.Tween();

        var duration = task.duration || this._getDefaultDuration();
        if (task.mode === 'to') {
          this._tween.to(this.target, task.props, duration, task.easing);
        }
        else if (task.mode === 'by') {
          this._tween.by(this.target, task.props, duration, task.easing);
        }
        else {
          this._tween.from(this.target, task.props, duration, task.easing);
        }
        this._update = this._updateTween;
        this._update(app);
      }
      else if (task.type === 'wait') {
        this._wait = {
          time: 0,
          limit: task.data.limit,
        };

        this._update = this._updateWait;
        this._update(app);
      }
      else if (task.type === 'call') {
        task.data.func.apply(task.data.self, task.data.args);
        // 1フレーム消費しないよう再帰
        this._update(app);
      }
      else if (task.type === 'set') {
        this.target.$extend(task.data.values);
        // 1フレーム消費しないよう再帰
        this._update(app);
      }
    },

    _updateTween: function(app) {
      var tween = this._tween;
      var time = this._getUnitTime(app);

      tween.forward(time);
      this.flare('tween');

      if (tween.time >= tween.duration) {
        delete this._tween;
        this._tween = null;
        this._update = this._updateTask;
      }
    },

    _updateWait: function(app) {
      var wait = this._wait;
      var time = this._getUnitTime(app);
      wait.time += time;

      if (wait.time >= wait.limit) {
        delete this._wait;
        this._wait = null;
        this._update = this._updateTask;
      }
    },

    _getUnitTime: function(app) {
      var obj = UPDATE_MAP[this.updateType];
      if (obj) {
        return obj.func(app);
      }
      else {
        return 1000 / app.fps;
      }
    },

    _getDefaultDuration: function() {
      var obj = UPDATE_MAP[this.updateType];
      return obj && obj.duration;
    },

    _static: {
      /**
       * @static
       * {@link #updateType}に設定する更新方法の定義です。
       * 下記の表に定義済みの更新方法を{@link #updateType}に設定することで、
       * アニメーションの更新方法を変更することができます。
       * 
       * | 更新方法 | 単位(デフォルト値) | 1フレームあたりのアニメーション速度 |
       * |-|-|-|
       * | normal | ミリ秒(1000) | app.fpsによって変化 |
       * | delta | ミリ秒(1000) | 経過時間によって変化 |
       * | fps | フレーム(30) | 必ず同じ速度で変化 |
       */
      UPDATE_MAP: {
        normal: {
          func: function(app) {
            return 1000 / app.fps;
          },
          duration: 1000,
        },

        delta: {
          func: function(app) {
            return app.ticker.deltaTime;
          },
          duration: 1000,
        },

        fps: {
          func: function(app) {
            return 1;
          },
          duration: 30,
        },

      }
    }
  });

  var UPDATE_MAP = Tweener.UPDATE_MAP;

  /**
   * @member phina.app.Element
   * @property tweener
   * 自身にアタッチ済みの{@link phina.accessory.Tweener}オブジェクト。
   */
  phina.app.Element.prototype.getter('tweener', function() {
    if (!this._tweener) {
      this._tweener = phina.accessory.Tweener().attachTo(this);
    }
    return this._tweener;
  });
  
});