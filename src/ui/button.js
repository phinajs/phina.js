


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
        fontColor: 'white',
        backgroundColor: 'hsl(200, 80%, 60%)',
        cornerRadius: 8,
        fontSize: 32,
      });

      this.bg = phina.display.RectangleShape({
        width: this.width,
        height: this.height,
        cornerRadius: params.cornerRadius,
        fill: params.backgroundColor,
        stroke: false,
      }).addChildTo(this);
      this.label = phina.display.Label({
        text: params.text,
        fill: params.fontColor,
        stroke: false,
        fontSize: params.fontSize,
      }).addChildTo(this);
    },

    _accessor: {
      text: {
        "get": function()   { return this.label.text; },
        "set": function(v)  { this.label.text = v; },
      },

      fontSize: {
        "set": function(v)  { this.label.fontSize = v; },
      },

      fontColor: {
        "set": function (v) { this.label.color = v; },
      },

      backgroundColor: {
        "set": function (v) { this.bg.color = v; },
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
      this.bg.$extend({
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

      fontSize: {
        "set": function(v)  { this.label.fontSize = v; },
      },

      fontColor: {
        "set": function (v) { this.label.color = v; },
      },

      backgroundColor: {
        "set": function (v) { this.bg.color = v; },
      },
    },
  });

});
