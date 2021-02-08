/*
 * color.js
 */

phina.namespace(function() {

  /**
   * @class phina.util.Color
   * カラークラス
   */
  phina.define('phina.util.Color', {
    /** R値 */
    r: 255,
    /** G値 */
    g: 255,
    /** B値 */
    b: 255,
    /** A値 */
    a: 1.0,

    /**
     * 初期化
     */
    init: function(r, g, b, a) {
      this.set.apply(this, arguments);
    },

    /**
     * セッター.
     */
    set: function(r, g, b, a) {
      this.r = (r === 0) ? 0 : r || this.r;
      this.g = (g === 0) ? 0 : g || this.g;
      this.b = (b === 0) ? 0 : b || this.b;
      this.a = (a === 0) ? 0 : a || this.a;
      return this;
    },

    /**
     * 数値によるセッター.
     */
    setFromNumber: function(r, g, b, a) {
      this.r = (r === 0) ? 0 : r || this.r;
      this.g = (g === 0) ? 0 : g || this.g;
      this.b = (b === 0) ? 0 : b || this.b;
      this.a = (a === 0) ? 0 : a || this.a;
      return this;
    },

    /**
     * 配列によるセッター
     */
    setFromArray: function(arr) {
      return this.set.apply(this, arr);
    },

    /**
     * オブジェクトによるセッター
     */
    setFromObject: function(obj) {
      return this.set(obj.r, obj.g, obj.b, obj.a);
    },

    /**
     * 文字列によるセッター
     */
    setFromString: function(str) {
      var color = phina.util.Color.stringToNumber(str);
      return this.set(color[0], color[1], color[2], color[3] || 1);
    },

    /**
     * 賢いセッター
     */
    setSmart: function() {
      var arg = arguments[0];
      if (arguments.length >= 3) {
        this.set(arguments[0], arguments[1], arguments[2], arguments[3]);
      } else if (arg instanceof Array) {
        this.setFromArray(arg);
      } else if (arg instanceof Object) {
        this.setFromObject(arg);
      } else if (typeof(arg) === 'string') {
        this.setFromString(arg);
      }
      return this;
    },

    /**
     * CSS 用 16進数文字列に変換
     */
    toStyleAsHex: function() {
      return '#{0}{1}{2}'.format(
        this.r.toString(16).padding(2, '0'),
        this.g.toString(16).padding(2, '0'),
        this.b.toString(16).padding(2, '0')
      );
    },

    /**
     * CSS 用 RGB文字列に変換
     */
    toStyleAsRGB: function() {
      return 'rgb({r},{g},{b})'.format({
        r: ~~this.r,
        g: ~~this.g,
        b: ~~this.b
      });
    },


    /**
     * CSS 用 RGBA文字列に変換
     */
    toStyleAsRGBA: function() {
      return 'rgba({r},{g},{b},{a})'.format({
        r: ~~this.r,
        g: ~~this.g,
        b: ~~this.b,
        a: this.a
      });
    },

    /**
     * CSS 用 RGBA 文字列に変換
     */
    toStyle: function() {
      return 'rgba({r},{g},{b},{a})'.format({
        r: ~~this.r,
        g: ~~this.g,
        b: ~~this.b,
        a: this.a
      });
    },

    _static: {

      /**
       * @static
       * カラーリスト
       */
      COLOR_LIST: {
        /** @property aliceblue */
        'aliceblue': [0xf0, 0xf8, 0xff],
        /** @property antiquewhite */
        'antiquewhite': [0xfa, 0xeb, 0xd7],
        /** @property aqua */
        'aqua': [0x00, 0xff, 0xff],
        /** @property aquamarine */
        'aquamarine': [0x7f, 0xff, 0xd4],
        /** @property azure */
        'azure': [0xf0, 0xff, 0xff],
        /** @property beige */
        'beige': [0xf5, 0xf5, 0xdc],
        /** @property bisque */
        'bisque': [0xff, 0xe4, 0xc4],
        /** @property black */
        'black': [0x00, 0x00, 0x00],
        /** @property blanchedalmond */
        'blanchedalmond': [0xff, 0xeb, 0xcd],
        /** @property blue */
        'blue': [0x00, 0x00, 0xff],
        /** @property blueviolet */
        'blueviolet': [0x8a, 0x2b, 0xe2],
        /** @property brown */
        'brown': [0xa5, 0x2a, 0x2a],
        /** @property burlywood */
        'burlywood': [0xde, 0xb8, 0x87],
        /** @property cadetblue */
        'cadetblue': [0x5f, 0x9e, 0xa0],
        /** @property chartreuse */
        'chartreuse': [0x7f, 0xff, 0x00],
        /** @property chocolate */
        'chocolate': [0xd2, 0x69, 0x1e],
        /** @property coral */
        'coral': [0xff, 0x7f, 0x50],
        /** @property cornflowerblue */
        'cornflowerblue': [0x64, 0x95, 0xed],
        /** @property cornsilk */
        'cornsilk': [0xff, 0xf8, 0xdc],
        /** @property crimson */
        'crimson': [0xdc, 0x14, 0x3c],
        /** @property cyan */
        'cyan': [0x00, 0xff, 0xff],
        /** @property darkblue */
        'darkblue': [0x00, 0x00, 0x8b],
        /** @property darkcyan */
        'darkcyan': [0x00, 0x8b, 0x8b],
        /** @property darkgoldenrod */
        'darkgoldenrod': [0xb8, 0x86, 0x0b],
        /** @property darkgray */
        'darkgray': [0xa9, 0xa9, 0xa9],
        /** @property darkgreen */
        'darkgreen': [0x00, 0x64, 0x00],
        /** @property darkkhaki */
        'darkkhaki': [0xbd, 0xb7, 0x6b],
        /** @property darkmagenta */
        'darkmagenta': [0x8b, 0x00, 0x8b],
        /** @property darkorange */
        'darkolivegreen': [0x55, 0x6b, 0x2f],
        /** @property darkorange */
        'darkorange': [0xff, 0x8c, 0x00],
        /** @property darkorchid */
        'darkorchid': [0x99, 0x32, 0xcc],
        /** @property darkred */
        'darkred': [0x8b, 0x00, 0x00],
        /** @property darksalmon */
        'darksalmon': [0xe9, 0x96, 0x7a],
        /** @property darkseagreen */
        'darkseagreen': [0x8f, 0xbc, 0x8f],
        /** @property darkslateblue */
        'darkslateblue': [0x48, 0x3d, 0x8b],
        /** @property darkslategray */
        'darkslategray': [0x2f, 0x4f, 0x4f],
        /** @property darkturquoise */
        'darkturquoise': [0x00, 0xce, 0xd1],
        /** @property darkviolet */
        'darkviolet': [0x94, 0x00, 0xd3],
        /** @property deeppink */
        'deeppink': [0xff, 0x14, 0x93],
        /** @property deepskyblue */
        'deepskyblue': [0x00, 0xbf, 0xff],
        /** @property dimgray */
        'dimgray': [0x69, 0x69, 0x69],
        /** @property dodgerblue */
        'dodgerblue': [0x1e, 0x90, 0xff],
        /** @property firebrick */
        'firebrick': [0xb2, 0x22, 0x22],
        /** @property floralwhite */
        'floralwhite': [0xff, 0xfa, 0xf0],
        /** @property forestgreen */
        'forestgreen': [0x22, 0x8b, 0x22],
        /** @property fuchsia */
        'fuchsia': [0xff, 0x00, 0xff],
        /** @property gainsboro */
        'gainsboro': [0xdc, 0xdc, 0xdc],
        /** @property ghostwhite */
        'ghostwhite': [0xf8, 0xf8, 0xff],
        /** @property gold */
        'gold': [0xff, 0xd7, 0x00],
        /** @property goldenrod */
        'goldenrod': [0xda, 0xa5, 0x20],
        /** @property gray */
        'gray': [0x80, 0x80, 0x80],
        /** @property green */
        'green': [0x00, 0x80, 0x00],
        /** @property greenyellow */
        'greenyellow': [0xad, 0xff, 0x2f],
        /** @property honeydew */
        'honeydew': [0xf0, 0xff, 0xf0],
        /** @property hotpink */
        'hotpink': [0xff, 0x69, 0xb4],
        /** @property indianred */
        'indianred': [0xcd, 0x5c, 0x5c],
        /** @property indigo */
        'indigo': [0x4b, 0x00, 0x82],
        /** @property ivory */
        'ivory': [0xff, 0xff, 0xf0],
        /** @property khaki */
        'khaki': [0xf0, 0xe6, 0x8c],
        /** @property lavender */
        'lavender': [0xe6, 0xe6, 0xfa],
        /** @property lavenderblush */
        'lavenderblush': [0xff, 0xf0, 0xf5],
        /** @property lawngreen */
        'lawngreen': [0x7c, 0xfc, 0x00],
        /** @property lemonchiffon */
        'lemonchiffon': [0xff, 0xfa, 0xcd],
        /** @property lightblue */
        'lightblue': [0xad, 0xd8, 0xe6],
        /** @property lightcoral */
        'lightcoral': [0xf0, 0x80, 0x80],
        /** @property lightcyan */
        'lightcyan': [0xe0, 0xff, 0xff],
        /** @property lightgoldenrodyellow */
        'lightgoldenrodyellow': [0xfa, 0xfa, 0xd2],
        /** @property lightgray */
        'lightgray': [0xd3, 0xd3, 0xd3],
        /** @property lightgreen */
        'lightgreen': [0x90, 0xee, 0x90],
        /** @property lightpink */
        'lightpink': [0xff, 0xb6, 0xc1],
        /** @property lightsalmon */
        'lightsalmon': [0xff, 0xa0, 0x7a],
        /** @property lightseagreen */
        'lightseagreen': [0x20, 0xb2, 0xaa],
        /** @property lightskyblue */
        'lightskyblue': [0x87, 0xce, 0xfa],
        /** @property lightslategray */
        'lightslategray': [0x77, 0x88, 0x99],
        /** @property lightsteelblue */
        'lightsteelblue': [0xb0, 0xc4, 0xde],
        /** @property lightyellow */
        'lightyellow': [0xff, 0xff, 0xe0],
        /** @property lime */
        'lime': [0x00, 0xff, 0x00],
        /** @property limegreen */
        'limegreen': [0x32, 0xcd, 0x32],
        /** @property linen */
        'linen': [0xfa, 0xf0, 0xe6],
        /** @property magenta */
        'magenta': [0xff, 0x00, 0xff],
        /** @property maroon */
        'maroon': [0x80, 0x00, 0x00],
        /** @property mediumaquamarine */
        'mediumaquamarine': [0x66, 0xcd, 0xaa],
        /** @property mediumblue */
        'mediumblue': [0x00, 0x00, 0xcd],
        /** @property mediumorchid */
        'mediumorchid': [0xba, 0x55, 0xd3],
        /** @property mediumpurple */
        'mediumpurple': [0x93, 0x70, 0xdb],
        /** @property mediumseagreen */
        'mediumseagreen': [0x3c, 0xb3, 0x71],
        /** @property mediumslateblue */
        'mediumslateblue': [0x7b, 0x68, 0xee],
        /** @property mediumspringgreen */
        'mediumspringgreen': [0x00, 0xfa, 0x9a],
        /** @property mediumturquoise */
        'mediumturquoise': [0x48, 0xd1, 0xcc],
        /** @property mediumvioletred */
        'mediumvioletred': [0xc7, 0x15, 0x85],
        /** @property midnightblue */
        'midnightblue': [0x19, 0x19, 0x70],
        /** @property mintcream */
        'mintcream': [0xf5, 0xff, 0xfa],
        /** @property mistyrose */
        'mistyrose': [0xff, 0xe4, 0xe1],
        /** @property moccasin */
        'moccasin': [0xff, 0xe4, 0xb5],
        /** @property navajowhite */
        'navajowhite': [0xff, 0xde, 0xad],
        /** @property navy */
        'navy': [0x00, 0x00, 0x80],
        /** @property oldlace */
        'oldlace': [0xfd, 0xf5, 0xe6],
        /** @property olive */
        'olive': [0x80, 0x80, 0x00],
        /** @property olivedrab */
        'olivedrab': [0x6b, 0x8e, 0x23],
        /** @property orange */
        'orange': [0xff, 0xa5, 0x00],
        /** @property orangered */
        'orangered': [0xff, 0x45, 0x00],
        /** @property orchid */
        'orchid': [0xda, 0x70, 0xd6],
        /** @property palegoldenrod */
        'palegoldenrod': [0xee, 0xe8, 0xaa],
        /** @property palegreen */
        'palegreen': [0x98, 0xfb, 0x98],
        /** @property paleturquoise */
        'paleturquoise': [0xaf, 0xee, 0xee],
        /** @property palevioletred */
        'palevioletred': [0xdb, 0x70, 0x93],
        /** @property papayawhip */
        'papayawhip': [0xff, 0xef, 0xd5],
        /** @property peachpuff */
        'peachpuff': [0xff, 0xda, 0xb9],
        /** @property peru */
        'peru': [0xcd, 0x85, 0x3f],
        /** @property pink */
        'pink': [0xff, 0xc0, 0xcb],
        /** @property plum */
        'plum': [0xdd, 0xa0, 0xdd],
        /** @property powderblue */
        'powderblue': [0xb0, 0xe0, 0xe6],
        /** @property purple */
        'purple': [0x80, 0x00, 0x80],
        /** @property red */
        'red': [0xff, 0x00, 0x00],
        /** @property rosybrown */
        'rosybrown': [0xbc, 0x8f, 0x8f],
        /** @property royalblue */
        'royalblue': [0x41, 0x69, 0xe1],
        /** @property saddlebrown */
        'saddlebrown': [0x8b, 0x45, 0x13],
        /** @property salmon */
        'salmon': [0xfa, 0x80, 0x72],
        /** @property sandybrown */
        'sandybrown': [0xf4, 0xa4, 0x60],
        /** @property seagreen */
        'seagreen': [0x2e, 0x8b, 0x57],
        /** @property seashell */
        'seashell': [0xff, 0xf5, 0xee],
        /** @property sienna */
        'sienna': [0xa0, 0x52, 0x2d],
        /** @property silver */
        'silver': [0xc0, 0xc0, 0xc0],
        /** @property skyblue */
        'skyblue': [0x87, 0xce, 0xeb],
        /** @property slateblue */
        'slateblue': [0x6a, 0x5a, 0xcd],
        /** @property slategray */
        'slategray': [0x70, 0x80, 0x90],
        /** @property snow */
        'snow': [0xff, 0xfa, 0xfa],
        /** @property springgreen */
        'springgreen': [0x00, 0xff, 0x7f],
        /** @property steelblue */
        'steelblue': [0x46, 0x82, 0xb4],
        /** @property tan */
        'tan': [0xd2, 0xb4, 0x8c],
        /** @property teal */
        'teal': [0x00, 0x80, 0x80],
        /** @property thistle */
        'thistle': [0xd8, 0xbf, 0xd8],
        /** @property tomato */
        'tomato': [0xff, 0x63, 0x47],
        /** @property turquoise */
        'turquoise': [0x40, 0xe0, 0xd0],
        /** @property violet */
        'violet': [0xee, 0x82, 0xee],
        /** @property wheat */
        'wheat': [0xf5, 0xde, 0xb3],
        /** @property white */
        'white': [0xff, 0xff, 0xff],
        /** @property whitesmoke */
        'whitesmoke': [0xf5, 0xf5, 0xf5],
        /** @property yellow */
        'yellow': [0xff, 0xff, 0x00],
        /** @property yellowgreen */
        'yellowgreen': [0x9a, 0xcd, 0x32]
      },

      /**
       * @static
       * @member phina.util.Color
       * @method strToNum
       */
      strToNum: function(str) {
        return this.stringToNumber(str);
      },
      stringToNumber: function(str) {
        var value = null;
        var type = null;

        if (str[0] === '#') {
          type = (str.length === 4) ? 'hex111' : 'hex222';
        } else if (str[0] === 'r' && str[1] === 'g' && str[2] === 'b') {
          type = (str[3] === 'a') ? 'rgba' : 'rgb';
        } else if (str[0] === 'h' && str[1] === 's' && str[2] === 'l') {
          type = (str[3] === 'a') ? 'hsla' : 'hsl';
        }

        if (type) {
          var match_set = MATCH_SET_LIST[type];
          var m = str.match(match_set.reg);
          value = match_set.exec(m);
        } else if (phina.util.Color.COLOR_LIST[str]) {
          value = phina.util.Color.COLOR_LIST[str];
        }

        return value;
      },

      /**
       * @static
       * @method
       * hsl を rgb に変換
       */
      HSLtoRGB: function(h, s, l) {
        var r, g, b;

        h %= 360;
        h += 360;
        h %= 360;
        s *= 0.01;
        l *= 0.01;

        if (s === 0) {
          var n = Math.round(l * 255);
          return [n, n, n];
        }
        var m2 = (l < 0.5) ? l * (1 + s) : l + s - l * s;
        var m1 = l * 2 - m2;

        // red
        var temp = (h + 120) % 360;
        if (temp < 60) {
          r = m1 + (m2 - m1) * temp / 60;
        } else if (temp < 180) {
          r = m2;
        } else {
          r = m1;
        }

        // green
        temp = h;
        if (temp < 60) {
          g = m1 + (m2 - m1) * temp / 60;
        } else if (temp < 180) {
          g = m2;
        } else if (temp < 240) {
          g = m1 + (m2 - m1) * (240 - temp) / 60;
        } else {
          g = m1;
        }

        // blue
        temp = ((h - 120) + 360) % 360;
        if (temp < 60) {
          b = m1 + (m2 - m1) * temp / 60;
        } else if (temp < 180) {
          b = m2;
        } else if (temp < 240) {
          b = m1 + (m2 - m1) * (240 - temp) / 60;
        } else {
          b = m1;
        }

        return [
          parseInt(r * 255),
          parseInt(g * 255),
          parseInt(b * 255)
        ];
      },

      /**
       * @static
       * @method
       * hsla を rgba に変換
       */
      HSLAtoRGBA: function(h, s, l, a) {
        var temp = phina.util.Color.HSLtoRGB(h, s, l);
        temp[3] = a;
        return temp;
      },

      /**
       * @static
       * @method
       * rgb 値を作成
       */
      createStyleRGB: function(r, g, b) {
        return 'rgb(' + r + ',' + g + ',' + b + ')';
      },

      /**
       * @static
       * @method
       * rgba 値を作成
       */
      createStyleRGBA: function(r, g, b, a) {
        return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
      },

      /**
       * @static
       * @method
       * hsl 値を作成
       */
      createStyleHSL: function(h, s, l) {
        return 'hsl(' + h + ',' + s + '%,' + l + '%)';
      },

      /**
       * @static
       * @method
       * hsla 値を作成
       */
      createStyleHSLA: function(h, s, l, a) {
        return 'hsla(' + h + ',' + s + '%,' + l + '%,' + a + ')';
      },
    }
  });


  var MATCH_SET_LIST = {
    'hex111': {
      reg: /^#(\w{1})(\w{1})(\w{1})$/,
      exec: function(m) {
        return [
          parseInt(m[1] + m[1], 16),
          parseInt(m[2] + m[2], 16),
          parseInt(m[3] + m[3], 16)
        ];
      }
    },
    'hex222': {
      reg: /^#(\w{2})(\w{2})(\w{2})$/,
      exec: function(m) {
        return [
          parseInt(m[1], 16),
          parseInt(m[2], 16),
          parseInt(m[3], 16)
        ];
      }
    },
    'rgb': {
      reg: /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,
      exec: function(m) {
        return [
          parseInt(m[1]),
          parseInt(m[2]),
          parseInt(m[3])
        ];
      }
    },
    'rgba': {
      reg: /^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(\d{1}(\.{1}\d+)?)\)$/,
      exec: function(m) {
        return [
          parseInt(m[1]),
          parseInt(m[2]),
          parseInt(m[3]),
          parseFloat(m[4])
        ];
      }
    },
    'hsl': {
      reg: /^hsl\((\d{1,3}),\s*(\d{1,3})%,\s*(\d{1,3})%\)$/,
      exec: function(m) {
        return phina.util.Color.HSLtoRGB(m[1], m[2], m[3]);
      }
    },
    'hsla': {
      reg: /^hsla\((\d{1,3}),\s*(\d{1,3})%,\s*(\d{1,3})%,\s*(\d{1}(\.{1}\d+)?)\)$/,
      exec: function(m) {
        return phina.util.Color.HSLAtoRGBA(m[1], m[2], m[3], m[4]);
      },
    }
  };

});
