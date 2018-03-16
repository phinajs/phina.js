phina.namespace(function() {

  /**
   * @class phina.social.Twitter
   * # Twitter の共有リンクを生成するクラス
   * Twitter の共有リンクの URL を生成してくれるクラスです。
   */
  phina.define('phina.social.Twitter', {
    /**
     * @constructor
     * 
     * コンストラクタは存在しますがインスタンスメンバはありません。
     */
    init: function() {
    },

    _static: {
      /**
       * @property {String} [phina.social.Twitter.baseURL = 'https://twitter.com/intent']
       * Twitter の共有リンクのベースとなる URL です。
       * 
       * @static
       */
      baseURL: 'https://twitter.com/intent',

      /**
       * @property {Object} phina.social.Twitter.defaults
       * デフォルト値を格納しているオブジェクトです。{@link #phina.social.Twitter.defaults.text}, {@link #phina.social.Twitter.defaults.hashtags}, {@link #phina.social.Twitter.defaults.url} を内包しています。
       * 
       * @static
       */
      defaults: {
        // type: 'tweet',
        /**
         * @property {String} [phina.social.Twitter.defaults.text = 'Hello, World']
         * デフォルトでツイートに含まれる文字列です。
         * 
         * @static
         */
        text: 'Hello, world!',

        // screen_name: 'phi_jp',

        /**
         * @property {String} [phina.social.Twitter.defaults.hashtags = 'javascript, phina_js']
         * デフォルトでツイートに含まれるハッシュタグです。
         * 
         * @static
         */
        hashtags: 'javascript,phina_js',

        // url: 'http://github.com/phi-jp/phina.js',

        /**
         * @property {String} [phina.social.Twitter.defaults.url = phina.global.location && phina.global.location.href]
         * デフォルトでツイートに含まれる URL です。
         * 
         * @static
         */
        url: phina.global.location && phina.global.location.href

        // via: 'phi_jp',
      },

      /**
       * @method phina.social.Twitter.createURL
       * Twitterの共有リンクを生成します。引数にオブジェクトを渡すことで様々なパラメーターを設定出来ます。引数のオブジェクトは {@link #phina.social.Twitter.defaults} で安全拡張されます。
       * 
       * ### Example
       *     phina.social.Twitter.createURL(); // => http://twitter.com/intent/tweet?text=Hello%2C%20world!&hashtags=javascript%2Cphina&url={現在のURL}
       * 
       *     phina.social.Twitter.createURL({
       *       text: 'This is text',
       *       hashtags: 'hashtag1,hashtag2',
       *       url: 'http://phinajs.com'
       *     }); // => http://twitter.com/intent/tweet?text=This%20is%20text&hashtags=hashtag1%2Chashtag2&url=http%3A%2F%2Fphinajs.com
       * 
       *     phina.social.Twitter.createURL({
       *       text: 'This is text',
       *       hashtags: 'hashtag1,hashtag2',
       *       url: 'http://phinajs.com',
       *       other: 'This is other'//設定項目は適当に増やせる
       *     }); // => http://twitter.com/intent/tweet?text=This%20is%20text&hashtags=hashtag1%2Chashtag2&url=http%3A%2F%2Fphinajs.com&other=This%20is%20other
       * 
       *     phina.social.Twitter.createURL({
       *       url: 'http://phinajs.com'
       *     }); // => http://twitter.com/intent/tweet?url=http%3A%2F%2Fphinajs.com&text=Hello%2C%20world!&hashtags=javascript%2Cphina
       * 
       * @param {Object}
       * @return {String} Twitter の共有リンク
       * @static
       */
      createURL: function(options) {
        options = (options || {}).$safe(this.defaults);

        var queries = [];
        var euc = encodeURIComponent;
        options.forIn(function(key, value) {
          var str = key + '=' + euc(value);
          queries.push(str);
        });

        var url = '{baseURL}/{type}?{query}'.format({
          baseURL: this.baseURL,
          // type: options.type,
          type: 'tweet',
          query: queries.join('&'),
        });

        return url;
      }
    }
  });
});
