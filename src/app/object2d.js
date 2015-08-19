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

      this._matrix = phina.geom.Matrix33().identity();
      this._worldMatrix = phina.geom.Matrix33().identity();
    },

    _calcWorldMatrix: function() {
      if (!this.parent) return ;

      // cache check
      if (this.rotation != this._cachedRotation) {
        this._cachedRotation = this.rotation;

        var r = this.rotation*(Math.PI/180);
        this._sr = Math.sin(r);
        this._cr = Math.cos(r);
      }

      var local = this._matrix;
      var parent = this.parent._worldMatrix || phina.geom.Matrix33.IDENTITY;
      var world = this._worldMatrix;

      // ローカルの行列を計算
      local.m11 = this._cr * this.scale.x;
      local.m12 =-this._sr * this.scale.y
      local.m21 = this._sr * this.scale.x;
      local.m22 = this._cr * this.scale.y;
      local.m13 = this.position.x;
      local.m23 = this.position.y;

      // cache
      var a11 = local.m11; var a12 = local.m12; var a13 = local.m13;
      var a21 = local.m21; var a22 = local.m22; var a23 = local.m23;
      var b11 = parent.m11; var b12 = parent.m12; var b13 = parent.m13;
      var b21 = parent.m21; var b22 = parent.m22; var b23 = parent.m23;

      // 親の行列と掛け合わせる
      world.m11 = b11 * a11 + b12 * a21;
      world.m12 = b11 * a12 + b12 * a22;
      world.m13 = b11 * a13 + b12 * a23 + b13;

      world.m21 = b21 * a11 + b22 * a21;
      world.m22 = b21 * a12 + b22 * a22;
      world.m23 = b21 * a13 + b22 * a23 + b23;

      return this;
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
