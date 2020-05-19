phina.namespace(function() {

  /**
   * @class phina.app.Interactive
   */
  phina.define('phina.app.Interactive', {

    init: function(app) {
      this.app = app;
      this._enable = true;
      this.multiTouch = true;
      this.events = {};
      this.cursor = {
        normal: '',
        hover: 'pointer',
      };
      this.hover = false;
    },

    enable: function() {
      this._enable = true;
      return this;
    },
    disable: function() {
      this._enable = false;
      return this;
    },

    check: function(root) {
      // カーソルのスタイルを反映
      if (this.app.domElement) {
        if (this.hover) {
          this.app.domElement.style.cursor = this.cursor.hover;
        }
        else {
          this.app.domElement.style.cursor = this.cursor.normal;
        }
      }
      this.hover = false;
      if (!this._enable || !this.app.pointers) return ;

      if (this.multiTouch) {
        this.app.pointers.forEach(function(p) {
          if (p.id !== null) {
            this._initEvents(p);
            this._checkElement(root, p);
          }
        }, this);
      }
      else {
        this._initEvents(this.app.pointer);
        this._checkElement(root, this.app.pointer);
      }
    },

    _initEvents: function(pointer) {
      var self = this;
      [
        'pointstart',
        'pointmove',
        'pointend',
        'pointover',
        'pointout',
        'pointstay',
      ].forEach(function(eventName) {
        self._initEvent(eventName, pointer, []);
      });
    },

    _initEvent: function(eventName, pointer, path) {
      this.events[eventName] = {
        type: eventName,
        target: null,
        path: path,
        pointer: pointer,
        interactive: this,
        // 親要素へイベントを伝播するか
        stop: false,
        // 一度イベントが発火しても、続行して背面の要素までイベントを発火させるか
        pass: false,
        _end: false,
      };
    },

    _checkElement: function(element, p) {
      var app = this.app;

      // 更新するかを判定
      if (element.awake === false) return ;

      var events = this.events;
      var allEnded = true;

      for (var k in events) {
        var e = events[k];
        if (!e._end) {
          allEnded = false;
          e.path.unshift(element);
        }
      }
      if (allEnded) {
        return;
      }
      // 子供を更新
      var len = element.children.length;
      if (len > 0) {
        var tempChildren = element.children.slice();
        for (var i = len - 1; i >= 0; --i) {
          this._checkElement(tempChildren[i], p);
        }
      }

      // タッチ判定
      if (element.interactive) {
        // イベント発火対象のイベントの配列を取得
        var targetEvents = this._checkPoint(element, p);
        
        if (element._overFlags[p.id]) {
          // 後ろに要素が重なってる場合に pointover, pointout が発火しないようにする
          events.pointover._end = true;
          events.pointout._end = true;

          // 一つでも overFlag が立っている有効な要素があれば、hoverにする
          if (element.boundingType && element.boundingType !== 'none') {
            this.hover = true;
          }
        }

        targetEvents.forEach(function(event) {
          // targetを発火元の要素に設定
          event.target = element;
          // 発火元から root 要素まで発火
          event.path.some(function(capturedElement) {
            capturedElement.fire(event);
            // イベント内で stop が true になった場合は、親要素へ伝播するのを止める
            return event.stop;
          });

          // イベント終了フラグを立てて、これ以上イベントを発火しないようにする
          event._end = true;

          // イベント通過設定が true なら、イベントが終了せずに後ろの要素へ行く
          if (event.pass) {
            this._initEvent(event.type, p, event.path.slice(0));
          }
        }, this);
      }

      for (var k in events) {
        var e = events[k];
        if (!e._end) {
          e.path.shift();
        }
      }
    },

    _checkPoint: function(obj, p) {
      var events = this.events;
      var prevOverFlag = obj._overFlags[p.id];
      var overFlag = obj.hitTest(p.x, p.y);
      obj._overFlags[p.id] = overFlag;
      var targetEvents = [];

      if (!prevOverFlag && overFlag && !events.pointover._end) {
        targetEvents.push(events.pointover);
      }
      if (prevOverFlag && !overFlag && !events.pointout._end) {
        targetEvents.push(events.pointout);
      }

      if (overFlag && !events.pointstart._end && p.getPointingStart()) {
        obj._touchFlags[p.id] = true;
        targetEvents.push(events.pointstart);
        // クリックフラグを立てる
        obj._clicked = true;
      }

      if (obj._touchFlags[p.id]) {
        if (!events.pointstay._end) {
          targetEvents.push(events.pointstay);
        }
        if (!events.pointmove._end && p._moveFlag) {
          targetEvents.push(events.pointmove);
        }
        if (!events.pointend._end && p.getPointingEnd()) {
          obj._touchFlags[p.id] = false;
          targetEvents.push(events.pointend);

          if (!events.pointout._end && overFlag && phina.isMobile()) {
            obj._overFlags[p.id] = false;
            targetEvents.push(events.pointout);
          }
        }
      }

      return targetEvents;
    },
  });


});
