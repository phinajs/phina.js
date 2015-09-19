phina.namespace(function() {

  /**
   * @class phina.display.DomApp
   * @extends phina.app.BaseApp
   */
  phina.define('phina.display.DomApp', {
    superClass: 'phina.app.BaseApp',

    domElement: null,

    /**
     * @constructor
     */
    init: function(options) {
      this.superInit(options);

      if (options.domElement) {
        this.domElement = options.domElement;
      }
      else {
        if (options.query) {
          this.domElement = document.querySelector(options.query);
        }
        else {
          console.assert('error');
        }
      }

      this.mouse = phina.input.Mouse(this.domElement);
      this.touch = phina.input.Touch(this.domElement);
      this.touchList = phina.input.TouchList(this.domElement, 5);

      // ポインタをセット(PC では Mouse, Mobile では Touch)
      this.pointer = this.touch;
      this.pointers = this.touchList.touches;

      this.domElement.addEventListener("touchstart", function () {
        this.pointer = this.touch;
        this.pointers = this.touchList.touches;
      }.bind(this));
      this.domElement.addEventListener("mousedown", function () {
        this.pointer = this.mouse;
        this.pointers = [this.mouse];
      }.bind(this));

      // click 対応
      var eventName = phina.isMobile() ? 'touchend' : 'mouseup';
      this.domElement.addEventListener(eventName, this._checkClick.bind(this));

      // 決定時の処理をオフにする(iPhone 時のちらつき対策)
      this.domElement.addEventListener("touchstart", function(e) { e.stop(); });
      this.domElement.addEventListener("touchmove", function(e) { e.stop(); });
    },

    update: function() {
      this.mouse.update();
      this.touch.update();
      this.touchList.update();
    },

    _checkClick: function(e) {
      var _check = function(element) {
        if (element.children.length > 0) {
          element.children.each(function(child) {
            _check(child);
          });
        }
        if (element._clicked && element.has('click')) {
          element.flare('click');
        }
        element._clicked = false;
      };

      _check(this.currentScene);
    },

  });

  
});
