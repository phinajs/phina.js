
phina.namespace(function() {

  /**
   * @class phina.util.Support
   * 
   */
  phina.define('phina.util.Support', {
    _static: {
      canvas: !!phina.global.CanvasRenderingContext2D,
      webGL: (function() {
        return !!phina.global.CanvasRenderingContext2D && !!document.createElement('canvas').getContext('webgl');
      })(),
      webAudio: !!phina.global.AudioContext || !!phina.global.webkitAudioContext || !!phina.global.mozAudioContext,
    },
  });

});

