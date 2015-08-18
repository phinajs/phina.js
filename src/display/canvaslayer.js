
phina.namespace(function() {

  /**
   * @class
   */
  phina.define('phina.display.Layer', {
    superClass: 'phina.display.CanvasElement',

    init: function(params) {
      this.canvas = phina.graphics.Canvas();
    },

    draw: function(canvas) {
      var c = this.currentScene.canvas;
      this.canvas.context.drawImage(c.domElement, 0, 0, c.width, c.height);
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
