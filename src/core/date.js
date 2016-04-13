/*
 * date.js
 */

(function() {
  
  /**
   * @class   global.Date
   * Date(日付)の拡張
   */
  
  var MONTH = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  var WEEK = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
  ];
  
  /**
   * @method  format
   * 日付フォーマットに合わせた文字列を返す
   */
  Date.prototype.$method('format', function(pattern) {
    var year    = this.getFullYear();
    var month   = this.getMonth();
    var date    = this.getDate();
    var day     = this.getDay();
    var hours   = this.getHours();
    var minutes = this.getMinutes();
    var seconds = this.getSeconds();
    var millseconds = this.getMilliseconds();
    
    var patterns = {
      'yyyy': String(year).padding(4, '0'),
      'yy': year.toString().substr(2, 2),
      'y': year,

      'MMMM': MONTH[month],
      'MMM': MONTH[month].substr(0, 3),
      'MM': String(month+1).padding(2, '0'),
      'M': (month+1),

      'dd': String(date).padding(2, '0'),
      'd': date,

      'EEEE': WEEK[day],
      'EEE': WEEK[day].substr(0, 3),

      'HH': String(hours).padding(2, '0'),
      'H': hours,

      'mm': String(minutes).padding(2, '0'),
      'm': minutes,

      'ss': String(seconds).padding(2, '0'),
      's': seconds,
      
      // // date
      // 'd': String('00' + date).slice(-2),
      // 'D': WEEK[day].substr(0, 3),
      // 'j': date,
      // 'l': WEEK[day],
      
      // // month
      // 'm': String('00' + (month+1)).slice(-2),
      // 'M': MONTH[month].substr(0, 3),
      // 'n': (month+1),
      // 'F': MONTH[month],
      
      // // year
      // 'y': year.toString().substr(2, 2),
      // 'Y': year,
      
      // // time
      // 'G': hours,
      // 'H': String('00' + hours).slice(-2),
      // 'i': String('00' + minutes).slice(-2),
      // 's': String('00' + seconds).slice(-2),
      // 'S': String('000' + millseconds).slice(-3),
    };

    var regstr = '(' + Object.keys(patterns).join('|') + ')';
    var re = new RegExp(regstr, 'g');

    return pattern.replace(re, function(str) {
      return patterns[str];
    });
  });


  /*
   * http://qiita.com/n0bisuke/items/dd537bd4cbe9ab501ce8
   */
  Date.$method('calculateAge', function(birthday, when) {
    // birthday
    if (typeof birthday === 'string') {
      birthday = new Date(birthday);
    }
    // when
    if (!when) {
      when = new Date();
    }
    else if (typeof when === 'string') {
      when = new Date(when);
    }

    var bn = new Date(birthday.getTime()).setFullYear(256);
    var wn = new Date(when.getTime()).setFullYear(256);
    var step = (wn < bn) ? 1 : 0;

    return (when.getFullYear() - birthday.getFullYear()) - step;
  });
  
})();
