


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

      this.setInteractive(true, 'rect');

      this.on('pointingend', function() {
        this.flare('push');
      });
    },
  });

});

phina.namespace(function() {

  /**
   * @class phina.geom.Button
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
      });

      this.setInteractive(true, 'rect');
      this.on('pointend', function() {
        this.flare('push');
      });

      this.bg = phina.display.RectangleShape({
        width: this.width,
        height: this.height,
        cornerRadius: 8,
        color: params.backgroundColor,
        stroke: false,
      }).addChildTo(this);
      this.label = phina.display.Label(params.text, {
        color: params.color,
        stroke: false,
      }).addChildTo(this);
    },
  });

});


phina.namespace(function() {

  /**
   * @class phina.geom.Button
   * Button
   */
  phina.define('phina.ui.FlatButton', {
    superClass: 'phina.display.CanvasElement',
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
      
      this.setInteractive(true, 'rect');
    },
  });

});

