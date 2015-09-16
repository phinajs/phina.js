
phina.namespace(function() {

  /**
   * @class
   */
  phina.define('phina.display.Layer', {
    superClass: 'phina.display.CanvasElement',


    init: function(params) {
      this.superInit();
      this.canvas = phina.graphics.Canvas();
      params = (params || {}).$safe({
        width: 640,
        height: 960,
      });
      this.canvas.width  = params.width;
      this.canvas.height = params.height;

      this.renderer = phina.display.CanvasRenderer(this.canvas);
    },

    draw: function(canvas) {
      this.renderer.render(this);

      var image = this.canvas.domElement;
      canvas.context.drawImage(image,
        0, 0, image.width, image.height,
        -this.width*this.originX, -this.height*this.originY, this.width, this.height
        );
    },
  });
});

phina.namespace(function() {

  /**
   * @class
   */
  phina.define('phina.display.ThreeLayer', {
    superClass: 'phina.display.CanvasElement',

    scene: null,
    camera: null,
    light: null,
    renderer: null,

    init: function(params) {
      this.superInit();

      this.scene = new THREE.Scene();

      this.camera = new THREE.PerspectiveCamera( 75, params.width / params.height, 1, 10000 );
      this.camera.position.z = 1000;

      this.light = new THREE.DirectionalLight( 0xffffff, 1 );
      this.light.position.set( 1, 1, 1 ).normalize();
      this.scene.add( this.light );

      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setClearColor( 0xf0f0f0 );
      this.renderer.setSize( params.width, params.height );

      this.on('enterframe', function() {
        this.renderer.render( this.scene, this.camera );
      });
    },

    draw: function(canvas) {
      var domElement = this.renderer.domElement;
      canvas.context.drawImage(domElement, 0, 0, domElement.width, domElement.height);
    },
  });
});

