
phina.namespace(function() {

  /**
   * @class phina.asset.SpriteSheet
   * @extends phina.asset.Asset
   */
  phina.define('phina.asset.SpriteSheet', {
    superClass: "phina.asset.Asset",

    /**
     * @constructor
     */
    init: function() {
      this.superInit();
    },

    setup: function(params) {
      this._setupFrame(params.frame);
      this._setupAnim(params.animations);
      return this;
    },

    _load: function(resolve) {

      var self = this;

      if (typeof this.src === 'string') {
        var xml = new XMLHttpRequest();
        xml.open('GET', this.src);
        xml.onreadystatechange = function() {
          if (xml.readyState === 4) {
            if ([200, 201, 0].indexOf(xml.status) !== -1) {
              var data = xml.responseText;
              var json = JSON.parse(data);

              self.setup(json);

              resolve(self);
            }
          }
        };

        xml.send(null);
      }
      else {
        this.setup(this.src);
        resolve(self);
      }

    },

    _setupFrame: function(frame) {
      var frames = this.frames = [];
      var unitWidth = frame.width;
      var unitHeight = frame.height;

      var count = frame.rows * frame.cols;
      this.frame = count;

      (count).times(function(i) {
        var xIndex = i%frame.cols;
        var yIndex = (i/frame.cols)|0;

        frames.push({
          x: xIndex*unitWidth,
          y: yIndex*unitHeight,
          width: unitWidth,
          height: unitHeight,
        });
      });
    },

    _setupAnim: function(animations) {
      this.animations = {};

      // デフォルトアニメーション
      this.animations["default"] = {
          frames: [].range(0, this.frame),
          next: "default",
          frequency: 1,
      };

      animations.forIn(function(key, value) {
        var anim = value;

        if (anim instanceof Array) {
          this.animations[key] = {
            frames: [].range(anim[0], anim[1]),
            next: anim[2],
            frequency: anim[3] || 1,
          };
        }
        else {
          this.animations[key] = {
            frames: anim.frames,
            next: anim.next,
            frequency: anim.frequency || 1
          };
        }

      }, this);
    },

    /**
     * フレームを取得
     */
    getFrame: function(index) {
      return this.frames[index];
    },

    getAnimation: function(name) {
      name = (name !== undefined) ? name : "default";
      return this.animations[name];
    },

  });

});

