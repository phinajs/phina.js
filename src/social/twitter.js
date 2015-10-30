
phina.namespace(function() {

  var BASE_URL = 'http://'

  /**
   * @class phina.social.Twitter
   * 
   */
  phina.define('phina.social.Twitter', {
    superClass: 'phina.display.CircleShape',
    /**
     * @constructor
     */
    init: function(params) {
      this.superInit({
        color: 'white',
        stroke: false,
      });

      var tweener = phina.accessory.Tweener().attachTo(this);
      tweener
        .to({scaleX:2, scaleY:2, alpha:0}, 500)
        .call(function() {
          this.remove();
        }, this);
    },

    _static: {
      baseURL: 'http://twitter.com/intent',
      defaults: {
        // type: 'tweet',
        text: 'Hello, world!',
        // screen_name: 'phi_jp',
        hashtags: 'javascript,phina',
        // url: 'http://github.com/phi-jp/phina.js',
        url: phina.global.location && phina.global.location.href,
        // via: 'phi_jp',
      },

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
      },
    }
  });

});
