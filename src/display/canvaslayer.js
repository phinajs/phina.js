
phina.namespace(function() {

  /**
   * @class phina.display.Layer
   * @extends phina.display.DisplayElement
   */
  phina.define('phina.display.Layer', {
    superClass: 'phina.display.DisplayElement',

    /** 子供を 自分の CanvasRenderer で描画するか */
    renderChildBySelf: true,

    init: function(options) {
      options = ({}).$safe(options, {
        width: 640,
        height: 960,
      });
      this.superInit(options);
      this.width = options.width;
      this.height = options.height;
      this.gridX = phina.util.Grid(options.width, 16);
      this.gridY = phina.util.Grid(options.height, 16);
    },

    draw: function(canvas) {
      if (!this.domElement) return ;

      var image = this.domElement;
      canvas.context.drawImage(image,
        0, 0, image.width, image.height,
        -this.width*this.originX, -this.height*this.originY, this.width, this.height
        );
    },
  });
});


phina.namespace(function() {

  /**
   * @class phina.display.CanvasLayer
   * @extends phina.display.Layer
   */
  phina.define('phina.display.CanvasLayer', {
    superClass: 'phina.display.Layer',

    init: function(options) {
      this.superInit(options);
      this.canvas = phina.graphics.Canvas();
      this.canvas.width  = this.width;
      this.canvas.height = this.height;

      this.renderer = phina.display.CanvasRenderer(this.canvas);
      this.domElement = this.canvas.domElement;

      this.on('enterframe', function() {
        var temp = this._worldMatrix;
        this._worldMatrix = null;
        this.renderer.render(this);
        this._worldMatrix = temp;
      });
    },

    draw: function(canvas) {
      var image = this.domElement;
      canvas.context.drawImage(image,
        0, 0, image.width, image.height,
        -this.width*this.originX, -this.height*this.originY, this.width, this.height
        );
    },
  });
});

phina.namespace(function() {

  /**
   * @class phina.display.ThreeLayer
   * @extends phina.display.Layer
   */
  phina.define('phina.display.ThreeLayer', {
    superClass: 'phina.display.Layer',

    scene: null,
    camera: null,
    light: null,
    renderer: null,

    init: function(options) {
      this.superInit(options);

      this.scene = new THREE.Scene();

      this.camera = new THREE.PerspectiveCamera( 75, options.width / options.height, 1, 10000 );
      this.camera.position.z = 1000;

      this.light = new THREE.DirectionalLight( 0xffffff, 1 );
      this.light.position.set( 1, 1, 1 ).normalize();
      this.scene.add( this.light );

      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setClearColor( 0xf0f0f0 );
      this.renderer.setSize( options.width, options.height );

      this.on('enterframe', function() {
        this.renderer.render( this.scene, this.camera );
      });

      this.domElement = this.renderer.domElement;
    },
  });
});

