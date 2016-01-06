
phina.namespace(function() {

  /**
   * @class phina.util.QueryString
   * 
   */
  phina.define('phina.util.QueryString', {
    _static: {
      parse: function(text, sep, eq, isDecode) {
        text = text || location.search.substr(1);
        sep = sep || '&';
        eq = eq || '=';
        var decode = (isDecode) ? decodeURIComponent : function(a) { return a; };
        return text.split(sep).reduce(function(obj, v) {
          var pair = v.split(eq);
          obj[pair[0]] = decode(pair[1]);
          return obj;
        }, {});
      },
      stringify: function(value, sep, eq, isEncode) {
        sep = sep || '&';
        eq = eq || '=';
        var encode = (isEncode) ? encodeURIComponent : function(a) { return a; };
        return Object.keys(value).map(function(key) {
          return key + eq + encode(value[key]);
        }).join(sep);
      },
    },
  });

});

