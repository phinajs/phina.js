


phina.namespace(function() {

  /**
   * @class phina.accessory.Tweener
   * Tweener
   */
  var Tweener = phina.define('phina.accessory.Tweener', {
    superClass: 'phina.accessory.Accessory',

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

    update: function(app) {
      this._update(app);
    },

    setUpdateType: function(type) {
      this.updateType = type;
      return this;
    },

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

    wait: function(time) {
      this._add({
        type: 'wait',
        data: {
          limit: time,
        },
      });
      return this;
    },

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
     * プロパティをセット
     * @param {Object} key
     * @param {Object} value
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

    moveTo: function(x, y, duration, easing) {
      return this.to({ x: x, y: y }, duration, easing);
    },
    moveBy: function(x, y, duration, easing) {
      return this.by({ x: x, y: y }, duration, easing);
    },

    rotateTo: function(rotation, duration, easing) {
      return this.to({ rotation: rotation }, duration, easing);
    },
    rotateBy: function(rotation, duration, easing) {
      return this.by({ rotation: rotation }, duration, easing);
    },

    scaleTo: function(scale, duration, easing) {
      return this.to({ scaleX: scale, scaleY: scale }, duration, easing);
    },
    scaleBy: function(scale, duration, easing) {
      return this.by({ scaleX: scale, scaleY: scale }, duration, easing);
    },

    fade: function(value, duration, easing) {
      return this.to({ alpha: value }, duration, easing);
    },

    fadeOut: function(duration, easing) {
      return this.fade(0.0, duration, easing);
    },

    fadeIn: function(duration, easing) {
      return this.fade(1.0, duration, easing);
    },

    /**
     * アニメーション開始
     */
    play: function() {
      this.playing = true;
      return this;
    },

    /**
     * アニメーションを一時停止
     */
    pause: function() {
      this.playing = false;
      return this;
    },

    stop: function() {
      this.playing = false;
      this.rewind();
      return this;
    },

    /**
     * アニメーションを巻き戻す
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
     */
    setLoop: function(flag) {
      this._loop = flag;
      return this;
    },

    /**
     * アニメーションをクリア
     */
    clear: function() {
      this._init();
      return this;
    },

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

  phina.app.Element.prototype.getter('tweener', function() {
    if (!this._tweener) {
      this._tweener = phina.accessory.Tweener().attachTo(this);
    }
    return this._tweener;
  });
  
});