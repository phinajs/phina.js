
phina.namespace(function() {

  /**
   * @class phina.asset.MapSheet
   * 
   */
  phina.define('phina.asset.MapSheet', {
    superClass: "phina.asset.Asset",

    /**
     * @constructor
     */
    init: function() {
      this.superInit();
    },

    _load: function(resolve) {
      var self = this;

      var xhr = new XMLHttpRequest();
      xhr.open('GET', this.src);
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if ([200, 201, 0].indexOf(xhr.status) !== -1) {
            var text = xhr.responseText;
            var parser = new DOMParser();
            var xml = parser.parseFromString(text, 'text/xml');
            self._parseXML(xml);

            resolve(self);
          }
        }
      };

      xhr.send(null);
    },

    _parseXML: function(xml) {
      var map = this._attrToJSON(xml.getElementsByTagName('map')[0]);
      this.map = map;

      // tilesets(image)
      this.tilesets = this._parseTilesets(xml);
      // layer
      this.layers = this._parseLayers(xml);
    },

    _parseTilesets: function(xml) {
      var each = Array.prototype.forEach;
      var self = this;
      var data = [];
      var tilesets = xml.getElementsByTagName('tileset');

      each.call(tilesets, function(tileset) {
        var t = {};
        var props = self._propertiesToJson(tileset);

        if (props.src) {
          t.image = props.src;
        }
        else {
          t.image = tileset.getElementsByTagName('image')[0].getAttribute('source');
        }
        data.push(t);
      });

      return data;
    },

    _parseLayers: function(xml) {
      var each = Array.prototype.forEach;
      var data = [];

      var map = xml.getElementsByTagName("map")[0];
      var layers = [];
      each.call(map.childNodes, function(elm) {
        if (elm.tagName == "layer" || elm.tagName == "objectgroup" || elm.tagName == "imagelayer") {
          layers.push(elm);
        }
      });

      layers.each(function(layer) {
        if (layer.tagName == "layer") {
          var d = layer.getElementsByTagName('data')[0];
          var encoding = d.getAttribute("encoding");
          var l = {
            type: "layer",
            name: layer.getAttribute("name"),
          };

          if (encoding == "csv") {
            l.data = this._parseCSV(d.textContent);
          }
          else if (encoding == "base64") {
            l.data = this._parseBase64(d.textContent);
          }

          var attr = this._attrToJSON(layer);
          l.$extend(attr);

          data.push(l);
        }
      }.bind(this));

      return data;

      /*
      layers.each(function(layer) {
          if (layer.tagName == "layer") {
              var d = layer.getElementsByTagName('data')[0];
              var encoding = d.getAttribute("encoding");
              var l = {
                  type: "layer",
                  name: layer.getAttribute("name"),
              };

              if (encoding == "csv") {
                  l.data = this._parseCSV(d.textContent);
              }
              else if (encoding == "base64") {
                  l.data = this._parseBase64(d.textContent);
              }

              var attr = this._attrToJSON(layer);
              l.$extend(attr);

              data.push(l);
          }
          else if (layer.tagName == "objectgroup") {
              var l = {
                  type: "objectgroup",
                  objects: [],
                  name: layer.getAttribute("name"),
              };
              each.call(layer.childNodes, function(elm) {
                  if (elm.nodeType == 3) return ;

                  var d = this._attrToJSON(elm);
                  d.properties = this._propertiesToJson(elm);

                  l.objects.push(d);
              }.bind(this));

              data.push(l);
          }
          else if (layer.tagName == "imagelayer") {
              var l = {
                  type: "imagelayer",
                  name: layer.getAttribute("name"),
                  x: layer.getAttribute("x") || 0,
                  y: layer.getAttribute("y") || 0,
                  alpha: layer.getAttribute("opacity") || 1,
                  visible: (layer.getAttribute("visible") === undefined || layer.getAttribute("visible") != 0),
              };
              var imageElm = layer.getElementsByTagName("image")[0];
              l.image = {
                  source: imageElm.getAttribute("source")
              };

              data.push(l);
          }
      }.bind(this));

*/

      return data;
    },

    /**
     * @private
     */
    _propertiesToJson: function(elm) {
      var properties = elm.getElementsByTagName("properties")[0];
      var obj = {};
      if (properties === undefined) {
        return obj;
      }
      for (var k = 0;k < properties.childNodes.length;k++) {
        var p = properties.childNodes[k];
        if (p.tagName === "property") {
          obj[p.getAttribute('name')] = p.getAttribute('value');
        }
      }

      return obj;
    },

    _attrToJSON: function(source) {
      var obj = {};
      for (var i=0; i<source.attributes.length; ++i) {
        var val = source.attributes[i].value;
        val = isNaN(parseFloat(val))? val: parseFloat(val);
        obj[source.attributes[i].name] = val;
      }
      return obj;
    },

    /**
     * @private
     */
    _parseCSV: function(data) {
      var dataList = data.split(',');
      var layer = [];

      dataList.each(function(elm, i) {
        var num = parseInt(elm, 10) - 1;
        layer.push(num);
      });

      return layer;
    },

  });

});

