
;(function() {

  /**
   * @class phina.input.Mouse
   * 
   */
  phina.define('phina.input.Mouse', {

    /** domElement */
    domElement: null,

    /**
     * @constructor
     */
    init: function(domElement) {
      this.domElement = domElement || window.document;

      this.button = 0;
      this.position = phina.geom.Vector2(0, 0);
      this.deltaPosition = phina.geom.Vector2(0, 0);
      this.prevPosition = phina.geom.Vector2(0, 0);
      this._tempPosition = phina.geom.Vector2(0, 0);

      var self = this;
      this.domElement.addEventListener('mousedown', function(e) {
        self._move(e)
        self.prevPosition.set(self._tempPosition._x, self._tempPosition._y);    // prevPostion をリセット
        self.button |= 1<<e.button;
      });

      this.domElement.addEventListener('mouseup', function(e) {
        self.button &= ~(1<<e.button);
      });
      this.domElement.addEventListener('mousemove', function(e) {
        self._move(e);
      });
    },

    update: function() {
      this.last = this.press;
      this.press = this.button;
      this.down = (this.press ^ this.last) & this.press;
      this.up   = (this.press ^ this.last) & this.last;

      // 変化値を更新
      this.deltaPosition.x = this._tempPosition.x - this.position.x;
      this.deltaPosition.y = this._tempPosition.y - this.position.y;

      // 前回の座標を更新
      this.prevPosition.set(this.position.x, this.position.y);

      // 現在の位置を更新
      this.position.set(this._tempPosition.x, this._tempPosition.y);
    },

    _move: function(e) {
      var rect = e.target.getBoundingClientRect();
      this._tempPosition.x = e.clientX - rect.left;
      this._tempPosition.y = e.clientY - rect.top;
    },

    // スケールを考慮
    _moveConsiderScale: function(e) {
      var rect = e.target.getBoundingClientRect();
      this._tempPosition.x = e.clientX - rect.left;
      this._tempPosition.y = e.clientY - rect.top;

      if (e.target.style.width) {
        this._tempPosition.x *= e.target.width / parseInt(e.target.style.width);
      }
      if (e.target.style.height) {
        this._tempPosition.y *= e.target.height / parseInt(e.target.style.height);
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
    },
  });

  // 
  phina.input.Mouse.prototype._move = phina.input.Mouse.prototype._moveConsiderScale;

})();