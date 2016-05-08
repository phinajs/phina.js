
phina.namespace(function() {

  /**
   * @class phina.graphics.Canvas
   * キャンバス拡張クラス
   */
  phina.define('phina.graphics.Canvas', {
    domElement: null,
    canvas: null,
    context: null,

    /**
     * 初期化
     */
    init: function(canvas) {
      if (typeof canvas === 'string') {
        this.canvas = document.querySelector(canvas);
      }
      else {
        this.canvas = canvas || document.createElement('canvas');
      }

      this.domElement = this.canvas;
      this.context = this.canvas.getContext('2d');
      this.context.lineCap = 'round';
      this.context.lineJoin = 'round';
    },

    /**
     * サイズをセット
     */
    setSize: function(width, height) {
      this.canvas.width   = width;
      this.canvas.height  = height;
      return this;
    },

    setSizeToScreen: function() {
      this.canvas.style.position  = "fixed";
      this.canvas.style.margin    = "0px";
      this.canvas.style.padding   = "0px";
      this.canvas.style.left      = "0px";
      this.canvas.style.top       = "0px";
      return this.setSize(window.innerWidth, window.innerHeight);
    },

    fitScreen: function(isEver) {
      isEver = isEver === undefined ? true : isEver;

      var _fitFunc = function() {
        var e = this.domElement;
        var s = e.style;
        
        s.position = "absolute";
        s.margin = "auto";
        s.left = "0px";
        s.top  = "0px";
        s.bottom = "0px";
        s.right = "0px";

        var rateWidth = e.width/window.innerWidth;
        var rateHeight= e.height/window.innerHeight;
        var rate = e.height/e.width;
        
        if (rateWidth > rateHeight) {
          s.width  = Math.floor(innerWidth)+"px";
          s.height = Math.floor(innerWidth*rate)+"px";
        }
        else {
          s.width  = Math.floor(innerHeight/rate)+"px";
          s.height = Math.floor(innerHeight)+"px";
        }
      }.bind(this);
      
      // 一度実行しておく
      _fitFunc();

      // リサイズ時のリスナとして登録しておく
      if (isEver) {
        phina.global.addEventListener("resize", _fitFunc, false);
      }
    },

    /**
     * クリア
     */
    clear: function(x, y, width, height) {
      x = x || 0;
      y = y || 0;
      width = width || this.width;
      height= height|| this.height;
      this.context.clearRect(x, y, width, height);
      return this;
    },

    clearColor: function(fillStyle, x, y, width, height) {
      x = x || 0;
      y = y || 0;
      width = width || this.width;
      height= height|| this.height;

      var context = this.context;

      context.save();
      context.setTransform(1.0, 0.0, 0.0, 1.0, 0.0, 0.0); // 行列初期化
      context.fillStyle = fillStyle;     // 塗りつぶしスタイルセット
      context.fillRect(x, y, width, height);
      context.restore();

      return this;
    },


    /**
     * パスを開始(リセット)
     */
    beginPath: function() {
      this.context.beginPath();
      return this;
    },

    /**
     *  パスを閉じる
     */
    closePath: function() {
      this.context.closePath();
      return this;
    },


    /**
     *  新規パス生成
     */
    moveTo: function(x, y) {
      this.context.moveTo(x, y);
      return this;
    },

    /**
     * パスに追加
     */
    lineTo: function(x, y) {
      this.context.lineTo(x, y);
      return this;
    },

    quadraticCurveTo: function() {
      this.context.quadraticCurveTo.apply(this.context, arguments);
      return this;
    },

    bezierCurveTo: function() {
      this.context.bezierCurveTo.apply(this.context, arguments);
      return this;
    },

    /**
     * パス内を塗りつぶす
     */
    fill: function() {
      this.context.fill();
      return this;
    },

    /**
     * パス上にラインを引く
     */
    stroke: function() {
      this.context.stroke();
      return this;
    },

    /**
     * クリップ
     */
    clip: function() {
      this.context.clip();
      return this;
    },

        
    /**
     * 点描画
     */
    drawPoint: function(x, y) {
      return this.strokeRect(x, y, 1, 1);
    },

    /**
     * ラインパスを作成
     */
    line: function(x0, y0, x1, y1) {
      return this.moveTo(x0, y0).lineTo(x1, y1);
    },
    
    /**
     * ラインを描画
     */
    drawLine: function(x0, y0, x1, y1) {
      return this.beginPath().line(x0, y0, x1, y1).stroke();
    },

    /**
     * ダッシュラインを描画
     */
    drawDashLine: function(x0, y0, x1, y1, pattern) {
      var patternTable = null;
      if (typeof(pattern) == "string") {
        patternTable = pattern;
      }
      else {
        pattern = pattern || 0xf0f0;
        patternTable = pattern.toString(2);
      }
      patternTable = patternTable.padding(16, '1');
      
      var vx = x1-x0;
      var vy = y1-y0;
      var len = Math.sqrt(vx*vx + vy*vy);
      vx/=len; vy/=len;
      
      var x = x0;
      var y = y0;
      for (var i=0; i<len; ++i) {
        if (patternTable[i%16] == '1') {
          this.drawPoint(x, y);
          // this.fillRect(x, y, this.context.lineWidth, this.context.lineWidth);
        }
        x += vx;
        y += vy;
      }
      
      return this;
    },

    /**
     * v0(x0, y0), v1(x1, y1) から角度を求めて矢印を描画
     * http://hakuhin.jp/as/rotation.html
     */
    drawArrow: function(x0, y0, x1, y1, arrowRadius) {
      var vx = x1-x0;
      var vy = y1-y0;
      var angle = Math.atan2(vy, vx)*180/Math.PI;
      
      this.drawLine(x0, y0, x1, y1);
      this.fillPolygon(x1, y1, arrowRadius || 5, 3, angle);
      
      return this;
    },


    /**
     * lines
     */
    lines: function() {
      this.moveTo(arguments[0], arguments[1]);
      for (var i=1,len=arguments.length/2; i<len; ++i) {
        this.lineTo(arguments[i*2], arguments[i*2+1]);
      }
      return this;
    },

    /**
     * ラインストローク描画
     */
    strokeLines: function() {
      this.beginPath();
      this.lines.apply(this, arguments);
      this.stroke();
      return this;
    },

    /**
     * ライン塗りつぶし描画
     */
    fillLines: function() {
      this.beginPath();
      this.lines.apply(this, arguments);
      this.fill();
      return this;
    },
    
    /**
     * 四角形パスを作成する
     */
    rect: function(x, y, width, height) {
      this.context.rect.apply(this.context, arguments);
      return this;
    },
    
    /**
     * 四角形塗りつぶし描画
     */
    fillRect: function() {
      this.context.fillRect.apply(this.context, arguments);
      return this;
    },
    
    /**
     * 四角形ライン描画
     */
    strokeRect: function() {
      this.context.strokeRect.apply(this.context, arguments);
      return this;
    },
    
    /**
     * 角丸四角形パス
     */
    roundRect: function(x, y, width, height, radius) {
      var l = x + radius;
      var r = x + width - radius;
      var t = y + radius;
      var b = y + height - radius;
      
      /*
      var ctx = this.context;
      ctx.moveTo(l, y);
      ctx.lineTo(r, y);
      ctx.quadraticCurveTo(x+width, y, x+width, t);
      ctx.lineTo(x+width, b);
      ctx.quadraticCurveTo(x+width, y+height, r, y+height);
      ctx.lineTo(l, y+height);
      ctx.quadraticCurveTo(x, y+height, x, b);
      ctx.lineTo(x, t);
      ctx.quadraticCurveTo(x, y, l, y);
      /**/
      
      this.context.arc(l, t, radius,     -Math.PI, -Math.PI*0.5, false);  // 左上
      this.context.arc(r, t, radius, -Math.PI*0.5,            0, false);  // 右上
      this.context.arc(r, b, radius,            0,  Math.PI*0.5, false);  // 右下
      this.context.arc(l, b, radius,  Math.PI*0.5,      Math.PI, false);  // 左下
      this.closePath();
      
      return this;
    },

    /**
     * 角丸四角形塗りつぶし
     */
    fillRoundRect: function(x, y, width, height, radius) {
      return this.beginPath().roundRect(x, y, width, height, radius).fill();
    },

    /**
     * 角丸四角形ストローク描画
     */
    strokeRoundRect: function(x, y, width, height, radius) {
      return this.beginPath().roundRect(x, y, width, height, radius).stroke();
    },

    /**
     * 円のパスを設定
     */
    circle: function(x, y, radius) {
      this.context.arc(x, y, radius, 0, Math.PI*2, false);
      return this;
    },
    
    /**
     * 塗りつぶし円を描画
     */
    fillCircle: function(x, y, radius) {
      var c = this.context;
      c.beginPath();
      c.arc(x, y, radius, 0, Math.PI*2, false);
      c.closePath();
      c.fill();
      return this;
    },
    
    /**
     * ストローク円を描画
     */
    strokeCircle: function(x, y, radius) {
      var c = this.context;
      c.beginPath();
      c.arc(x, y, radius, 0, Math.PI*2, false);
      c.closePath();
      c.stroke();
      return this;
    },

    /**
     * 円弧のパスを設定
     */
    arc: function(x, y, radius, startAngle, endAngle, anticlockwise) {
      this.context.arc(x, y, radius, startAngle, endAngle, anticlockwise);
      return this;
    },
    
    /**
     * 塗りつぶし円弧を描画
     */
    fillArc: function(x, y, radius, startAngle, endAngle, anticlockwise) {
      return this.beginPath().arc(x, y, radius, startAngle, endAngle, anticlockwise).fill();
    },
    
    /**
     * ストローク円弧を描画
     */
    strokeArc: function(x, y, radius, startAngle, endAngle, anticlockwise) {
      return this.beginPath().arc(x, y, radius, startAngle, endAngle, anticlockwise).stroke();
    },


    pie: function(x, y, radius, startAngle, endAngle, anticlockwise) {
      var context = this.context;
      context.beginPath();
      context.moveTo(0, 0);
      context.arc(x, y, radius, startAngle, endAngle, anticlockwise);
      context.closePath();
      return this;
    },
    fillPie: function(x, y, radius, startAngle, endAngle, anticlockwise) {
      return this.beginPath().pie(x, y, radius, startAngle, endAngle, anticlockwise).fill();
    },
    strokePie: function(x, y, radius, startAngle, endAngle, anticlockwise) {
      return this.beginPath().pie(x, y, radius, startAngle, endAngle, anticlockwise).stroke();
    },

    
    /**
     * ポリゴンパス
     */
    polygon: function(x, y, size, sides, offsetAngle) {
      var radDiv = (Math.PI*2)/sides;
      var radOffset = (offsetAngle!==undefined) ? offsetAngle*Math.PI/180 : -Math.PI/2;
      
      this.moveTo(x + Math.cos(radOffset)*size, y + Math.sin(radOffset)*size);
      for (var i=1; i<sides; ++i) {
        var rad = radDiv*i+radOffset;
        this.lineTo(
          x + Math.cos(rad)*size,
          y + Math.sin(rad)*size
        );
      }
      this.closePath();
      return this;
    },
    /**
     * ポリゴン塗りつぶし
     */
    fillPolygon: function(x, y, radius, sides, offsetAngle) {
      return this.beginPath().polygon(x, y, radius, sides, offsetAngle).fill();
    },
    /**
     * ポリゴンストローク描画
     */
    strokePolygon: function(x, y, radius, sides, offsetAngle) {
      return this.beginPath().polygon(x, y, radius, sides, offsetAngle).stroke();
    },
    
    /**
     * star
     */
    star: function(x, y, radius, sides, sideIndent, offsetAngle) {
      var x = x || 0;
      var y = y || 0;
      var radius = radius || 64;
      var sides = sides || 5;
      var sideIndentRadius = radius * (sideIndent || 0.38);
      var radOffset = (offsetAngle) ? offsetAngle*Math.PI/180 : -Math.PI/2;
      var radDiv = (Math.PI*2)/sides/2;

      this.moveTo(
        x + Math.cos(radOffset)*radius,
        y + Math.sin(radOffset)*radius
      );
      for (var i=1; i<sides*2; ++i) {
        var rad = radDiv*i + radOffset;
        var len = (i%2) ? sideIndentRadius : radius;
        this.lineTo(
          x + Math.cos(rad)*len,
          y + Math.sin(rad)*len
        );
      }
      this.closePath();

      return this;
    },

    /**
     * 星を塗りつぶし描画
     */
    fillStar: function(x, y, radius, sides, sideIndent, offsetAngle) {
      this.beginPath().star(x, y, radius, sides, sideIndent, offsetAngle).fill();
      return this;
    },

    /**
     * 星をストローク描画
     */
    strokeStar: function(x, y, radius, sides, sideIndent, offsetAngle) {
      this.beginPath().star(x, y, radius, sides, sideIndent, offsetAngle).stroke();
      return this;
    },

    /*
     * heart
     */
    heart: function(x, y, radius, angle) {
      var half_radius = radius*0.5;
      var rad = (angle === undefined) ? Math.PI/4 : Math.degToRad(angle);

      // 半径 half_radius の角度 angle 上の点との接線を求める
      var p = Math.cos(rad)*half_radius;
      var q = Math.sin(rad)*half_radius;

      // 円の接線の方程式 px + qy = r^2 より y = (r^2-px)/q
      var x2 = -half_radius;
      var y2 = (half_radius*half_radius-p*x2)/q;

      // 中心位置調整
      var height = y2 + half_radius;
      var offsetY = half_radius-height/2;

      // パスをセット
      this.moveTo(0+x, y2+y+offsetY);

      this.arc(-half_radius+x, 0+y+offsetY, half_radius, Math.PI-rad, Math.PI*2);
      this.arc(half_radius+x, 0+y+offsetY, half_radius, Math.PI, rad);
      this.closePath();

      return this;
    },

    /*
     * fill heart
     */
    fillHeart: function(x, y, radius, angle) {
      return this.beginPath().heart(x, y, radius, angle).fill();
    },

    /*
     * stroke heart
     */
    strokeHeart: function(x, y, radius, angle) {
      return this.beginPath().heart(x, y, radius, angle).stroke();
    },

    /*
     * http://stackoverflow.com/questions/14169234/the-relation-of-the-bezier-curve-and-ellipse
     */
    ellipse: function(x, y, w, h) {
      var ctx = this.context;
      var kappa = 0.5522848;

      var ox = (w / 2) * kappa; // control point offset horizontal
      var oy = (h / 2) * kappa; // control point offset vertical
      var xe = x + w;           // x-end
      var ye = y + h;           // y-end
      var xm = x + w / 2;       // x-middle
      var ym = y + h / 2;       // y-middle

      ctx.moveTo(x, ym);
      ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
      ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
      ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
      ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
      // ctx.closePath();

      return this;
    },

    fillEllipse: function(x, y, width, height) {
      return this.beginPath().ellipse(x, y, width, height).fill();
    },
    strokeEllipse: function(x, y, width, height) {
      return this.beginPath().ellipse(x, y, width, height).stroke();
    },

    fillText: function() {
      this._context.fillText.apply(this._context, arguments);
      return this;
    },

    strokeText: function() {
      this._context.strokeText.apply(this._context, arguments);
      return this;
    },

    /*
     * 画像を描画
     */
    drawImage: function() {
      this.context.drawImage.apply(this.context, arguments);
    },

    /**
     * 行列をセット
     */
    setTransform: function(m11, m12, m21, m22, dx, dy) {
      this.context.setTransform(m11, m12, m21, m22, dx, dy);
      return this;
    },

    /**
     * 行列をリセット
     */
    resetTransform: function() {
      this.setTransform(1.0, 0.0, 0.0, 1.0, 0.0, 0.0);
      return this;
    },
    /**
     * 中心に移動
     */
    transformCenter: function() {
      this.context.setTransform(1, 0, 0, 1, this.width/2, this.height/2);
      return this;
    },

    /**
     * 移動
     */
    translate: function(x, y) {
      this.context.translate(x, y);
      return this;
    },
    
    /**
     * 回転
     */
    rotate: function(rotation) {
      this.context.rotate(rotation);
      return this;
    },
    
    /**
     * スケール
     */
    scale: function(scaleX, scaleY) {
      this.context.scale(scaleX, scaleY);
      return this;
    },

    /**
     * 状態を保存
     */
    save: function() {
      this.context.save();
      return this;
    },

    /**
     * 状態を復元
     */
    restore: function() {
      this.context.restore();
      return this;
    },

    /**
     * 画像として保存
     */
    saveAsImage: function(mime_type) {
      mime_type = mime_type || "image/png";
      var data_url = this.canvas.toDataURL(mime_type);
      // data_url = data_url.replace(mime_type, "image/octet-stream");
      window.open(data_url, "save");
      
      // toDataURL を使えば下記のようなツールが作れるかも!!
      // TODO: プログラムで絵をかいて保存できるツール
    },


    _accessor: {
      /**
       * 幅
       */
      width: {
        "get": function()   { return this.canvas.width; },
        "set": function(v)  { this.canvas.width = v; }
      },

      /**
       * 高さ
       */
      height: {
        "get": function()   { return this.canvas.height; },
        "set": function(v)  { this.canvas.height = v; }
      },

      fillStyle: {
        "get": function()   { return this.context.fillStyle; },
        "set": function(v)  { this.context.fillStyle = v; }
      },

      strokeStyle: {
        "get": function()   { return this.context.strokeStyle; },
        "set": function(v)  { this.context.strokeStyle = v; }
      },

      globalAlpha: {
        "get": function()   { return this.context.globalAlpha; },
        "set": function(v)  { this.context.globalAlpha = v; }
      },

      globalCompositeOperation: {
        "get": function()   { return this.context.globalCompositeOperation; },
        "set": function(v)  { this.context.globalCompositeOperation = v; }
      },

      shadowBlur: {
        "get": function()   { return this.context.shadowBlur; },
        "set": function(v)  { this.context.shadowBlur = v; }
      },

      shadowColor: {
        "get": function()   { return this.context.shadowColor; },
        "set": function(v)  { this.context.shadowColor = v; }
      },

      shadowOffsetX: {
        "get": function()   { return this.context.shadowOffsetX; },
        "set": function(v)  { this.context.shadowOffsetX = v; }
      },

      shadowOffsetY: {
        "get": function()   { return this.context.shadowOffsetY; },
        "set": function(v)  { this.context.shadowOffsetY = v; }
      },

      lineCap: {
        "get": function()   { return this.context.lineCap; },
        "set": function(v)  { this.context.lineCap = v; }
      },

      lineJoin: {
        "get": function()   { return this.context.lineJoin; },
        "set": function(v)  { this.context.lineJoin = v; }
      },

      miterLimit: {
        "get": function()   { return this.context.miterLimit; },
        "set": function(v)  { this.context.miterLimit = v; }
      },

      lineWidth: {
        "get": function()   { return this.context.lineWidth; },
        "set": function(v)  { this.context.lineWidth = v; }
      },

      font: {
        "get": function()   { return this.context.font; },
        "set": function(v)  { this.context.font = v; }
      },

      textAlign: {
        "get": function()   { return this.context.textAlign; },
        "set": function(v)  { this.context.textAlign = v; }
      },

      textBaseline: {
        "get": function()   { return this.context.textBaseline; },
        "set": function(v)  { this.context.textBaseline = v; }
      },

      imageSmoothingEnabled: {
        "get": function()   { return this.context.imageSmoothingEnabled; },
        "set": function(v)  {
          this.context.imageSmoothingEnabled = v;
          this.context.webkitImageSmoothingEnabled = v;
          this.context.mozImageSmoothingEnabled = v;
        }
      },
    },

    _static: {
      _context: (function() {
        if (phina.util.Support.canvas) {
          return document.createElement('canvas').getContext('2d');
        }
        else {
          return null;
        }
      })(),

      measureText: function(font, text) {
        this._context.font = font;
        return this._context.measureText(text);
      },

      createLinearGradient: function() {
        return this._context.createLinearGradient.apply(this._context, arguments);
      },

      createRadialGradient: function() {
        return this._context.createRadialGradient.apply(this._context, arguments);
      },
    },
  });
});
