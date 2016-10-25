
phina.namespace(function() {

  /**
   * @class phina.display.TextElement
   *
   */
  phina.define('phina.display.TextElement', {
    superClass: 'phina.display.DisplayElement',

    init: function(options) {
      if (typeof arguments[0] !== 'object') {
        options = { text: arguments[0], };
      } else {
        options = arguments[0];
      }
      this.superInit(options);

      if (options instanceof Array) {
        this.text = options[0] || '';
        this.fill = options[1] || '';
        this.stroke = options[2] || '';
      } else {
        this.text = options.text || '';
        this.fill = options.fill || '';
        this.stroke = options.stroke || '';
      }
    },

    doStroke: function(canvas, x, y) {
      var context = canvas.context;
      var defaultStroke = context.strokeStyle;
      if (this.stroke !== '') {
        context.strokeStyle = this.stroke;
      }
      context.strokeText(this.text, x, y);
      var width = context.measureText(this.text).width;
      context.strokeStyle = defaultStroke;

      return width;
    },

    doFill: function(canvas, x, y) {
      var context = canvas.context;
      var defaultFill = context.fillStyle;
      if (this.fill !== '') {
        context.fillStyle = this.fill;
      }
      context.fillText(this.text, x, y);
      var width = context.measureText(this.text).width;
      context.fillStyle = defaultFill;

      return width;
    },

    splitElement: function(separator) {
      var stroke = this.stroke;
      var fill = this.fill;
      return this.text.split(separator).map(function(text) {
        return TextElement({
          text: text,
          fill: fill,
          stroke: stroke,
        });
      });
    },

    interpret: function(rule) {
      // タグ解析
      rule = {}.$safe(rule, TextElement.interpretRule);

      var elements = [];
      var fillStack = [];
      var strokeStack = [];
      var colorStartReg = new RegExp('^' + rule.colorStartTag);
      var colorEndReg = new RegExp('^' + rule.colorEndTag);
      var fillStartReg = new RegExp('^' + rule.fillStartTag);
      var fillEndReg = new RegExp('^' + rule.fillEndTag);
      var strokeStartReg = new RegExp('^' + rule.strokeStartTag);
      var strokeEndReg = new RegExp('^' + rule.strokeEndTag);
      var text = this.text;
      var str = '';

      while(text !== '') {
        var fill = '';
        if (fillStack.length > 0) {
          fill = fillStack[0];
        }
        var stroke = '';
        if (strokeStack.length > 0) {
          stroke = strokeStack[0];
        }
        if (colorStartReg.test(text)) {
          var tag = colorStartReg.exec(text);
          elements.push({
            text: str,
            fill: fill,
            stroke: stroke,
          });
          fillStack.unshift(tag[1]);
          strokeStack.unshift(tag[1]);
          text = text.substr(tag[0].length);
          str = '';
        } else if (colorEndReg.test(text)) {
          var tag = colorEndReg.exec(text);
          elements.push({
            text: str,
            fill: fill,
            stroke: stroke,
          });
          fillStack.shift();
          strokeStack.shift();
          text = text.substr(tag[0].length);
          str = '';
        } else if (fillStartReg.test(text)) {
          var tag = fillStartReg.exec(text);
          elements.push({
            text: str,
            fill: fill,
            stroke: stroke,
          });
          fillStack.unshift(tag[1]);
          text = text.substr(tag[0].length);
          str = '';
        } else if (fillEndReg.test(text)) {
          var tag = fillEndReg.exec(text);
          elements.push({
            text: str,
            fill: fill,
            stroke: stroke,
          });
          fillStack.shift();
          text = text.substr(tag[0].length);
          str = '';
        } else if (strokeStartReg.test(text)) {
          var tag = strokeStartReg.exec(text);
          elements.push({
            text: str,
            fill: fill,
            stroke: stroke,
          });
          strokeStack.unshift(tag[1]);
          text = text.substr(tag[0].length);
          str = '';
        } else if (strokeEndReg.test(text)) {
          var tag = strokeEndReg.exec(text);
          elements.push({
            text: str,
            fill: fill,
            stroke: stroke,
          });
          strokeStack.shift();
          text = text.substr(tag[0].length);
          str = '';
        } else {
          str += text.substr(0, 1);
          text = text.substr(1);
        }
      }
      // 残りをプッシュ
      var fill = '';
      if (fillStack.length > 0) {
        fill = fillStack[0];
      }
      var stroke = '';
      if (strokeStack.length > 0) {
        stroke = strokeStack[0];
      }
      elements.push({
        text: str,
        fill: fill,
        stroke: stroke,
      });

      return elements;
    },

    _static: {
      interpretRule: {
        colorStartTag: '<color:(.*?)>',
        colorEndTag: '</color>',
        fillStartTag: '<fill:(.*?)>',
        fillEndTag: '</fill>',
        strokeStartTag: '<stroke:(.*?)>',
        strokeEndTag: '</stroke>',
      },
    }
  });

});
