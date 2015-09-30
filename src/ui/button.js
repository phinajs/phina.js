


phina.namespace(function() {

  /**
   * @class phina.ui.Button
   * Button
   */
  phina.define('phina.ui.BaseButton', {
    superClass: 'phina.display.CanvasElement',
    /**
     * @constructor
     */
    init: function(params) {
      this.superInit();

      params = (params || {}).$safe({
        width: 200,
        height: 80,
      });

      this.width = params.width;
      this.height = params.height;

      this.setInteractive(true);

      this.on('pointend', function() {
        this.flare('push');
      });
    },
  });

});

phina.namespace(function() {

  /**
   * @class phina.ui.Button
   * Button
   */
  phina.define('phina.ui.Button', {
    superClass: 'phina.ui.BaseButton',
    /**
     * @constructor
     */
    init: function(params) {
      this.superInit(params);

      params = (params || {}).$safe({
        text: 'Hello',
        color: 'white',
        backgroundColor: 'hsl(200, 80%, 60%)',
        cornerRadius: 8,
        fontSize: 32,
      });

      this.bg = phina.display.RectangleShape({
        width: this.width,
        height: this.height,
        cornerRadius: params.cornerRadius,
        color: params.backgroundColor,
        stroke: false,
      }).addChildTo(this);
      this.label = phina.display.Label(params.text, {
        color: params.color,
        stroke: false,
        fontSize: params.fontSize,
      }).addChildTo(this);
    },

    _accessor: {
      text: {
        "get": function()   { return this.label.text; },
        "set": function(v)  { this.label.text = v; },
      },

      textSize: {
        "set": function(v)  { this.label.style.fontSize = v; },
      },

      textColor: {
        "set": function (v) { this.label.style.color = v; },
      },

      bgColor: {
        "set": function (v) { this.bg.style.color = v; },
      },
    },
  });

});


phina.namespace(function() {

  /**
   * @class phina.ui.FlatButton
   * Button
   */
  phina.define('phina.ui.FlatButton', {
    superClass: 'phina.ui.BaseButton',
    /**
     * @constructor
     */
    init: function(params) {
      this.superInit();

      params = params || {};
      params.$safe({
        width: 200,
        height: 80,
      });

      this.width = params.width;
      this.height = params.height;

      this.bg = phina.display.RectangleShape().addChildTo(this);
      this.bg.style.$extend({
        width: params.width,
        height: params.height,
      });
      this.label = phina.display.Label('hoge').addChildTo(this);
    },
    _accessor: {
      text: {
        "get": function()   { return this.label.text; },
        "set": function(v)  { this.label.text = v; },
      },

      textSize: {
        "set": function(v)  { this.label.style.fontSize = v; },
      },

      textColor: {
        "set": function (v) { this.label.style.color = v; },
      },

      bgColor: {
        "set": function (v) { this.bg.style.color = v; },
      },
    },
  });

});
