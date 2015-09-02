phina.namespace(function() {

  phina.define('phina.app.Tweener', {
    superClass: 'phina.app.Element',

    init: function(target) {
      this.superInit();

      this.target = target;
      this._tasks = [];
      this._index = 0;
      this._update = this._updateTask;
      this.playing = true;
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

    _add: function(params) {
      this._tasks.push(params);
    },

    _updateTask: function(app) {
      if (!this.playing) return ;

      var task = this._tasks[this._index];
      if (!task) {
        this.playing = false;
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
  
});
