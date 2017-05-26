
;(function() {
  /**
   * @class phina.input.Input
   * @extends phina.util.EventDispatcher
   */
  phina.define('phina.input.Input', {

    superClass: 'phina.util.EventDispatcher',

    /** domElement */
    domElement: null,

    /**
     * @constructor
     */
    init: function(domElement) {
      this.superInit();
      
      this.domElement = domElement || window.document;

      this.position = phina.geom.Vector2(0, 0);
      this.startPosition = phina.geom.Vector2(0, 0);
      this.deltaPosition = phina.geom.Vector2(0, 0);
      this.prevPosition = phina.geom.Vector2(0, 0);
      this._tempPosition = phina.geom.Vector2(0, 0);

      this.maxCacheNum = phina.input.Input.defaults.maxCacheNum;
      this.minDistance = phina.input.Input.defaults.minDistance;
      this.maxDistance = phina.input.Input.defaults.maxDistance;
      this.cachePositions = [];
      this.flickVelocity = phina.geom.Vector2(0, 0);

      this.flags = 0;
    },

    update: function() {
      this.last = this.now;
      this.now = this.flags;
      this.start = (this.now ^ this.last) & this.now;
      this.end   = (this.now ^ this.last) & this.last;

      // 変化値を更新
      this.deltaPosition.x = this._tempPosition.x - this.position.x;
      this.deltaPosition.y = this._tempPosition.y - this.position.y;

      if (this.deltaPosition.x === 0 && this.deltaPosition.y === 0) {
        this._moveFlag = false;
      }
      else {
        this._moveFlag = true;
      }

      if (this.start) {
        this.startPosition.set(this.position.x, this.position.y);
      }

      // 前回の座標を更新
      this.prevPosition.set(this.position.x, this.position.y);

      // 現在の位置を更新
      this.position.set(this._tempPosition.x, this._tempPosition.y);

      if (this.cachePositions.length > this.maxCacheNum) {
        this.cachePositions.shift();
      }
      this.cachePositions.push(this.position.clone());
    },

    _start: function(x, y, flag) {
      flag = (flag !== undefined) ? flag : 1;
      this._move(x, y);

      this.flags |= flag;

      var x = this._tempPosition.x;
      var y = this._tempPosition.y;
      this.position.set(x, y);
      this.prevPosition.set(x, y);

      this.flickVelocity.set(0, 0);
      this.cachePositions.clear();
    },

    _end: function(flag) {
      flag = (flag !== undefined) ? flag : 1;
      this.flags &= ~(flag);

      if (this.cachePositions.length < 2) return;

      var first = this.cachePositions.first;
      var last = this.cachePositions.last;

      var v = phina.geom.Vector2.sub(last, first);

      var len = v.length();

      if (len > this.minDistance) {
        var normalLen = len.clamp(this.minDistance, this.maxDistance);
        v.div(len).mul(normalLen);
        this.flickVelocity.set(v.x, v.y);
      }

      this.cachePositions.clear();
    },

    // スケールを考慮
    _move: function(x, y) {
      this._tempPosition.x = x;
      this._tempPosition.y = y;

      // adjust scale
      var elm = this.domElement;
      if (elm.style.width) {
        this._tempPosition.x *= elm.width / parseInt(elm.style.width);
      }
      if (elm.style.height) {
        this._tempPosition.y *= elm.height / parseInt(elm.style.height);
      }
    },

    _accessor: {
      /**
       * @property    x
       * x座標値
       */
      x: {
        "get": function()   { return this.position.x; },
        "set": function(v)  { this.position.x = v; }
      },
      /**
       * @property    y
       * y座標値
       */
      y: {
        "get": function()   { return this.position.y; },
        "set": function(v)  { this.position.y = v; }
      },
      /**
       * @property    dx
       * dx値
       */
      dx: {
        "get": function()   { return this.deltaPosition.x; },
        "set": function(v)  { this.deltaPosition.x = v; }
      },
      /**
       * @property    dy
       * dy値
       */
      dy: {
        "get": function()   { return this.deltaPosition.y; },
        "set": function(v)  { this.deltaPosition.y = v; }
      },

      /**
       * @property    fx
       * fx値
       */
      fx: {
        "get": function()   { return this.flickVelocity.x; },
        "set": function(v)  { this.flickVelocity.x = v; }
      },
      /**
       * @property    fy
       * fy値
       */
      fy: {
        "get": function()   { return this.flickVelocity.y; },
        "set": function(v)  { this.flickVelocity.y = v; }
      },

    },

    _static: {
      defaults: {
        maxCacheNum: 3,
        minDistance: 10,
        maxDistance: 100,
      },
    },
  });


})();