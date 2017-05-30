
phina.namespace(function() {

  /**
   * @class phina.asset.Asset
   * @extends phina.util.EventDispatcher
   */
  phina.define('phina.asset.Asset', {
    superClass: "phina.util.EventDispatcher",

    serverError: false,
    notFound: false,
    loadError: false,

    /**
     * @constructor
     */
    init: function(src) {
      this.superInit();

      this.loaded = false;
    },

    load: function(src) {
      this.src = src;
      return phina.util.Flow(this._load.bind(this));
    },

    isLoaded: function() {
      return this.loaded;
    },

    _load: function(resolve) {
      var self = this;
      setTimeout(function() {
        self.loaded = true;
        resolve();
      }, 100);
    },

    // ロード失敗時にダミーをセットする
    loadDummy: function() { },

  });

});

