/*
 * frameanimation.js
 */


phina.namespace(function() {

  /**
   * @class phina.accessory.FrameAnimation
   * FrameAnimation
   * @extends phina.accessory.Accessory
   */
  phina.define('phina.accessory.FrameAnimation', {
    superClass: 'phina.accessory.Accessory',

    /**
     * @constructor
     */
    init: function(ss) {
      this.superInit();

      this.ss = phina.asset.AssetManager.get('spritesheet', ss);
      this.paused = true;
      this.finished = false;
      this.fit = true;
    },

    update: function() {
      if (this.paused) return ;
      if (!this.currentAnimation) return ;

      if (this.finished) {
        this.finished = false;
        this.currentFrameIndex = 0;
        return ;
      }

      ++this.frame;
      if (this.frame%this.currentAnimation.frequency === 0) {
        ++this.currentFrameIndex;
        this._updateFrame();
      }
    },

    gotoAndPlay: function(name, keep) {
      keep = (keep !== undefined) ? keep : true;
      if (keep && name === this.currentAnimationName
               && this.currentFrameIndex < this.currentAnimation.frames.length) {
        return this;
      }
      this.frame = 0;
      this.currentFrameIndex = 0;
      this.currentAnimation = this.ss.getAnimation(name);
      this._updateFrame();

      this.paused = false;

      return this;
    },

    gotoAndStop: function(name) {
      this.frame = 0;
      this.currentFrameIndex = 0;
      this.currentAnimation = this.ss.getAnimation(name);
      this._updateFrame();

      this.paused = true;

      return this;
    },

    _updateFrame: function() {
      var anim = this.currentAnimation;
      if (anim) {
        if (this.currentFrameIndex >= anim.frames.length) {
          if (anim.next) {
            this.gotoAndPlay(anim.next);
            return ;
          }
          else {
            this.paused = true;
            this.finished = true;
            return ;
          }
        }
      }

      var index = anim.frames[this.currentFrameIndex];
      var frame = this.ss.getFrame(index);
      this.target.srcRect.set(frame.x, frame.y, frame.width, frame.height);

      if (this.fit) {
        this.target.width = frame.width;
        this.target.height = frame.height;
      }
    },
  });
});