phina.namespace(function() {

  /**
   * @class phina.game.ResultScene
   * @extends phina.display.DisplayScene
   * # GameApp で使われるリザルトシーン
   * {@link phina.app.GameApp} で MainScene を exit した後に遷移するリザルトシーンです。
   * 
   * - スコア
   * - メッセージ
   * - Twitter の共有リンク
   * - リプレイボタン
   * 
   * が表示されます。
   * 
   * MainScene で {@link phina.app.Scene#exit} を呼ぶと、このシーンに遷移します。
   * リプレイボタンを押すと {@link phina.game.TitleScene} に遷移します。
   * これらの動作は {@link phina.game.GameApp} のオプションで変更することができます。
   * 
   * このシーンに渡す引数を変えることで、表示内容を変えることができます。
   */
  phina.define('phina.game.ResultScene', {
    superClass: 'phina.display.DisplayScene',
    /**
     * @constructor
     * 
     * オプションのオブジェクトの中身については {@link #defaults} を参照して下さい。
     * 
     * @param {Object} オプション
     */
    init: function(options) {
      options = ({}).$safe(options || {}, phina.game.ResultScene.defaults);
      this.superInit(options);
      var message = options.message.format(options);

      this.backgroundColor = options.backgroundColor;

      this.fromJSON({
        children: {
          scoreText: {
            className: 'phina.display.Label',
            arguments: {
              text: 'score',
              fill: options.fontColor,
              stroke: null,
              fontSize: 48,
            },
            x: this.gridX.span(8),
            y: this.gridY.span(4),
          },
          scoreLabel: {
            className: 'phina.display.Label',
            arguments: {
              text: options.score,
              fill: options.fontColor,
              stroke: null,
              fontSize: 72,
            },
            x: this.gridX.span(8),
            y: this.gridY.span(6),
          },

          messageLabel: {
            className: 'phina.display.Label',
            arguments: {
              text: message,
              fill: options.fontColor,
              stroke: null,
              fontSize: 32,
            },
            x: this.gridX.center(),
            y: this.gridY.span(9),
          },

          shareButton: {
            className: 'phina.display.CircleShape',
            arguments: [{
              radius: 64,
              stroke: null,
              fill: 'rgba(240, 240, 240, 0.5)',
            }],
            x: this.gridX.center(-3),
            y: this.gridY.span(12),
            children: {
              star: {
                className: 'phina.display.StarShape',
                arguments: [{
                  radius: 32,
                  stroke: null,
                  fill: options.fontColor
                }]
              }
            },
            interactive: true,
          },
          playButton: {
            className: 'phina.display.CircleShape',
            arguments: [{
              radius: 64,
              stroke: null,
              fill: 'rgba(240, 240, 240, 0.5)',
            }],
            x: this.gridX.center(3),
            y: this.gridY.span(12),
            children: {
              triangle:{
                className: 'phina.display.PolygonShape',
                arguments: [{
                  radius: 26,
                  stroke: null,
                  fill: options.fontColor,
                  sides: 3,
                  rotation: 90
                }],
                x: -2
              }
            },
            interactive: true,
            onclick: function() {
              this.exit();
            }.bind(this),
          }
        }
      });

      this.shareButton.onclick = function() {
        var text = 'Score: {0}\n{1}'.format(options.score, message);
        var url = phina.social.Twitter.createURL({
          text: text,
          hashtags: options.hashtags,
          url: options.url,
        });
        window.open(url, 'share window', 'width=480, height=320');
      };
    },

    _static: {
      /**
       * @property defaults
       * @static
       *
       * @property {Number} [defaults.score = 16]
       * スコア
       *
       * @property {String} [defaults.message = 'This is a phina.js project.']
       * メッセージ: このメッセージは他のオプションを引数に {@link global.String.format} でフォーマットされて表示されます。Twitter の共有リンクにも反映されます。
       *
       * @property {String} [defaults.hashtags = 'phina_js,game,javascript']
       * 共有ハッシュタグ
       *
       * @property {String} [defaults.url = phina.global.location.href]
       * 共有 URL
       *
       * @property {String} [defaults.fontColor = 'white'] 
       * 文字色
       *
       * @property {String} [defaults.backgroundColor =  'hsl(200, 80%, 64%)']
       * 背景色
       */
      defaults: {
        score: 16,
        message: 'This is a phina.js project.',
        hashtags: 'phina_js,game,javascript',
        url: phina.global.location && phina.global.location.href,
        fontColor: 'white',
        backgroundColor: 'hsl(200, 80%, 64%)'
      }
    }

  });

});


