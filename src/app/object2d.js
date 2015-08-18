phina.namespace(function() {

  /**
   * @class phina.app.Object2D
   * Object2D
   * @extends phina.app.Element
   */
  phina.define('phina.app.Object2D', {
    superClass: 'phina.app.Element',

    /** 位置 */
    position: null,
    /** 回転 */
    rotation: 0,
    /** スケール */
    scale: null,
    /** 基準位置 */
    origin: null,


    init: function() {
      this.superInit();
      this.position = phina.geom.Vector2(0, 0);
      this.scale    = phina.geom.Vector2(1, 1);
      this.origin   = phina.geom.Vector2(0.5, 0.5);
    },

    _accessor: {
      /**
       * @property    x
       * x座標値
       */
      x: {
          "get": function()   { return this.position.x; },
          "set": function(v)  { this.position.x = v; }
      },
      /**
       * @property    y
       * y座標値
       */
      y: {
          "get": function()   { return this.position.y; },
          "set": function(v)  { this.position.y = v; }
      },

      /**
       * @property    originX
       * x座標値
       */
      originX: {
          "get": function()   { return this.origin.x; },
          "set": function(v)  { this.origin.x = v; }
      },
      
      /**
       * @property    originY
       * y座標値
       */
      originY: {
          "get": function()   { return this.origin.y; },
          "set": function(v)  { this.origin.y = v; }
      },
      
      /**
       * @property    scaleX
       * スケールX値
       */
      scaleX: {
          "get": function()   { return this.scale.x; },
          "set": function(v)  { this.scale.x = v; }
      },
      
      /**
       * @property    scaleY
       * スケールY値
       */
      scaleY: {
          "get": function()   { return this.scale.y; },
          "set": function(v)  { this.scale.y = v; }
      },
      
      /**
       * @property    width
       * width
       */
      width: {
          "get": function()   { return this._width; },
          "set": function(v)  { this._width = v; }
      },
      /**
       * @property    height
       * height
       */
      height: {
          "get": function()   { return this._height; },
          "set": function(v)  { this._height = v; }
      },

      /**
       * @property    radius
       * 半径
       */
      radius: {
          "get": function()   {
              return (this._radius !== undefined) ? this._radius : (this.width+this.height)/4;
          },
          "set": function(v)  { this._radius = v; }
      },
      
      /**
       * @property    top
       * 左
       */
      top: {
          "get": function()   { return this.y - this.height*this.originY; },
          "set": function(v)  { this.y = v + this.height*this.originY; },
      },
   
      /**
       * @property    right
       * 左
       */
      right: {
          "get": function()   { return this.x + this.width*(1-this.originX); },
          "set": function(v)  { this.x = v - this.width*(1-this.originX); },
      },
   
      /**
       * @property    bottom
       * 左
       */
      bottom: {
          "get": function()   { return this.y + this.height*(1-this.originY); },
          "set": function(v)  { this.y = v - this.height*(1-this.originY); },
      },
   
      /**
       * @property    left
       * 左
       */
      left: {
        "get": function()   { return this.x - this.width*this.originX; },
        "set": function(v)  { this.x = v + this.width*this.originX; },
      },

      /**
       * @property    centerX
       * centerX
       */
      centerX: {
        "get": function()   { return this.x + this.width/2 - this.width*this.originX; },
        "set": function(v)  {
          // TODO: どうしようかな??
        }
      },
   
      /**
       * @property    centerY
       * centerY
       */
      centerY: {
        "get": function()   { return this.y + this.height/2 - this.height*this.originY; },
        "set": function(v)  {
          // TODO: どうしようかな??
        }
      },
    }
  });

  
});
