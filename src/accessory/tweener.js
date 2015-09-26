


phina.namespace(function() {

  phina.define('phina.accessory.Tweener', {
    superClass: 'phina.accessory.Accessory',

    /**
     * @constructor
     */
    init: function(target) {
      this.superInit(target);

      this._loop = false;
      this._init();
    },

    _init: function() {
      this._tasks = [];
      this._index = 0;
      this.playing = true;
      this._update = this._updateTask;
    },

    update: function(app) {
      this._update(app);
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
      return this.to({x:x,y:y}, duration, easing);
    },
    moveBy: function(x, y, duration, easing) {
      return this.by({x:x,y:y}, duration, easing);
    },

    fade: function(value, duration, easing) {
      return this.to({alpha:value}, duration, easing);
    },

    fadeOut: function(duration, easing) {
      return this.fade(0.0, duration, easing)
    },

    fadeIn: function(duration, easing) {
      return this.fade(1.0, duration, easing)
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
      this.play();
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
        var t = t.clone();
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

        if (task.mode === 'to') {
          this._tween.to(this.target, task.props, task.duration, task.easing);
        }
        else if (task.mode === 'by') {
          this._tween.by(this.target, task.props, task.duration, task.easing);
        }
        else {
          this._tween.from(this.target, task.props, task.duration, task.easing);
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
      var time = app.ticker.deltaTime;
      // var time = 1000/app.fps;

      if (tween.time >= tween.duration) {
        delete this._tween;
        this._tween = null;
        this._update = this._updateTask;
      }
      else {
        tween.forward(time);

        this.flare('tween');
      }
    },

    _updateWait: function(app) {
      var wait = this._wait;
      var time = app.ticker.deltaTime;
      wait.time += time;

      if (wait.time >= wait.limit) {
        delete this._wait;
        this._wait = null;
        this._update = this._updateTask;
      }
    },
  });

  phina.app.Element.prototype.getter('tweener', function() {
    if (!this._tweener) {
      this._tweener = phina.accessory.Tweener().attachTo(this);
    }
    return this._tweener;
  });
  
});