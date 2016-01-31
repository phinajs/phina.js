

phina.namespace(function() {


  phina.define('phina.display.CanvasElement', {
    superClass: 'phina.display.DisplayElement',

    init: function(options) {
      this.superInit(options);

      console.warn('[phina warn] CanvasElement は非推奨になりました. DisplayElement をお使いください.');
    }
  });


  phina.define('phina.display.CanvasScene', {
    superClass: 'phina.display.DisplayScene',

    init: function(options) {
      this.superInit(options);

      console.warn('[phina warn] CanvasScene は非推奨になりました. DisplayScene をお使いください.');
    }
  });


});

