/*
 * tilemap.js
 */


phina.namespace(function() {

  phina.define('phina.accessory.TileMap', {
    superClass: 'phina.accessory.Accessory',

    /**
     * @constructor
     */
    init: function(mapsheet, texture) {
      this.superInit();

      this.mapsheet = mapsheet;
      this.texture = texture;

      this.chipWidth = 32;
      this.chipHeight = 32;

      this.width  = this.chipWidth * this.mapsheet.map.width;
      this.height = this.chipHeight * this.mapsheet.map.height;

      this.tileset = [];
      this.tilesetInfo = {};

      this.on('attached', function() {
        this._bind();
      }.bind(this));
    },

    /*
     * shape とmapsheet を関連付ける
     */
    _bind: function() {
      var self = this;
      var shape = this.target;

      this.mapsheet.tilesets.each(function(tileset, index) {
        self._bindTileset(tileset, index);
      });

      this.mapsheet.layers.each(function(layer, i) {
        if (layer.type == "objectgroup") {
          self._buildObject(layer);
        }
        else if (layer.type == "imagelayer") {
          self._buildImageLayer(layer);
        }
        else {
          // if (i !== 0) return ;
          self._bindLayer(layer);
        }
      });
    },

    _bindTileset: function(tileset, index) {
      var self      = this;
      var mapsheet  = this.mapsheet;
      // var texture   = phina.asset.Manager.get(tileset.image);
      var texture   = this.texture;
      var xIndexMax = (texture.domElement.width / mapsheet.map.tilewidth)|0;
      var yIndexMax = (texture.domElement.height / mapsheet.map.tileheight)|0;

      var info = {
        begin: self.tileset.length,
        end: self.tileset.length + xIndexMax * yIndexMax
      };

      self.tilesetInfo[index] = info;

      if (tileset.name !== undefined) {
        self.tilesetInfo[tileset.name] = info;
      }

      yIndexMax.times(function(my) {
        xIndexMax.times(function(mx) {
          var rect = phina.geom.Rect(
            mx * mapsheet.map.tilewidth,
            my * mapsheet.map.tileheight,
            mapsheet.map.tilewidth,
            mapsheet.map.tileheight
          );
          self.tileset.push({
            image: tileset.image,
            rect: rect
          });
        });
      });
    },

    _bindLayer: function(layer) {
      var self = this;
      var target = this.target;
      var mapsheet = this.mapsheet;
      var tileset  = [];
      var visible  = (layer.visible === 1) || (layer.visible === undefined);
      var opacity  = layer.opacity === undefined ? 1 : layer.opacity;

      var shape = phina.display.Shape({
        width: this.width,
        height: this.height,
        backgroundColor: 'transparent',
      }).addChildTo(target);

      shape.origin.set(0, 0);

      if (layer.tilesets !== undefined) {
        var tilesets = null;
        if (Array.isArray(layer.tilesets)) {
          tilesets = layer.tilesets;
        } else {
          tilesets = [layer.tilesets];
        }
        tilesets.each(function(n) {
          var info = self.tilesetInfo[n];
          tileset = tileset.concat(self.tileset.slice(info.begin, info.end));
        });
      }
      else {
        tileset = self.tileset;
      }

      layer.data.each(function(d, index) {
        var type = d;
        if (type == -1) {
            return ;
        }
        type = Math.abs(type);
        if (tileset[type] === undefined) {
          return ;
        }

        var xIndex = index%mapsheet.map.width;
        var yIndex = (index/mapsheet.map.width)|0;
        var dx = xIndex*self.chipWidth;
        var dy = yIndex*self.chipHeight;

        var tile = tileset[type];

        // var texture = phina.asset.Manager.get(self.texture);
        var texture = self.texture;
        var rect = tile.rect;

        shape.canvas.globalAlpha = opacity;
        shape.canvas.context.drawImage(texture.domElement,
          rect.x, rect.y, rect.width, rect.height,
          dx, dy, self.chipWidth, self.chipHeight
          );
      }.bind(this));
    }

  });

});