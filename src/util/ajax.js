
phina.namespace(function() {

  /**
   * @class phina.util.Ajax
   * 
   */
  phina.define('phina.util.Ajax', {
    _static: {
      defaults: {
        type: 'GET',
        contentType: 'application/x-www-form-urlencoded',
        responseType: 'json',
        data: null,
        url: '',
      },

      request: function(options) {
        var data = ({}).$safe(options, this.defaults);

        var xhr = new XMLHttpRequest();
        var flow = phina.util.Flow(function(resolve) {
          xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
              if ([200, 201, 0].indexOf(xhr.status) !== -1) {
                resolve(xhr.response);
              }
            }
          };

          xhr.open(data.type, data.url);
          xhr.responseType = data.responseType;
          xhr.send(null);
        });

        return flow;
      },
      get: function(url) {
        return this.request({
          type: 'GET',
          url: url,
        });
      },
      post: function(url) {
        return this.request({
          type: 'POST',
          url: url,
        });
      },
      put: function(url) {
        return this.request({
          type: 'PUT',
          url: url,
        });
      },
      del: function(url) {
        return this.request({
          type: 'DELETE',
          url: url,
        });
      },
    },
  });

});

