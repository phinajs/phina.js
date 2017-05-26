/*
 *
 */


phina.namespace(function() {

  /**
   * @class phina.game.SplashScene
   * @extends phina.display.DisplayScene
   */
  phina.define('phina.game.SplashScene', {
    superClass: 'phina.display.DisplayScene',

    init: function(options) {
      var defaults = phina.game.SplashScene.defaults;
      this.superInit(options);

      var texture = phina.asset.Texture();
      texture.load(defaults.imageURL).then(function() {
        this._init();
      }.bind(this));
      this.texture = texture;
    },

    _init: function() {
      this.sprite = phina.display.Sprite(this.texture).addChildTo(this);

      this.sprite.setPosition(this.gridX.center(), this.gridY.center());
      this.sprite.alpha = 0;

      this.sprite.tweener
        .clear()
        .to({alpha:1}, 500, 'easeOutCubic')
        .wait(1000)
        .to({alpha:0}, 500, 'easeOutCubic')
        .wait(250)
        .call(function() {
          this.exit();
        }, this)
        ;
    },

    _static: {
      defaults: {
        imageURL: 'http://cdn.rawgit.com/phi-jp/phina.js/develop/logo.png',
      },
    },
  });

});
