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
  Date.prototype.method('format', function(pattern) {
    /*
    var str = '{y}/{m}/{d}'.format({
      y: this.getYear()+1900,
      m: this.getMonth()+1,
      d: this.getDate(),
    });
    
    return str;
    */
    
    var year    = this.getFullYear();
    var month   = this.getMonth();
    var date    = this.getDate();
    var day     = this.getDay();
    var hours   = this.getHours();
    var minutes = this.getMinutes();
    var seconds = this.getSeconds();
    var millseconds = this.getMilliseconds();
    var str = '';
    
    for (var i=0,len=pattern.length; i<len; ++i) {
      var ch = pattern.charAt(i);
      var temp = '';
      switch(ch) {
        // 日
        case 'd': temp = date.padding(2, '0'); break;
        case 'D': temp = WEEK[day].substr(0, 3); break;
        case 'j': temp = date; break;
        case 'l': temp = WEEK[day]; break;
        // case 'N': temp = ; break;
        // case 'S': temp = ; break;
        // case 'w': temp = ; break;
        // case 'z': temp = ; break;
        
        // 月
        case 'F': temp = MONTH[month]; break;
        case 'm': temp = (month+1).padding(2, '0'); break;
        case 'M': temp = MONTH[month].substr(0, 3); break;
        case 'n': temp = (month+1); break;
        // case 't': temp = (month+1); break;
        
        // 年
        // case 'L': temp = ; break;
        // case 'o': temp = ; break;
        case 'Y': temp = year; break;
        case 'y': temp = year.toString().substr(2, 2); break;
        
        
        // 時間
        // case "a": temp = ; break;
        // case "A": temp = ; break;
        // case "B": temp = ; break;
        // case "g": temp = ; break;
        case "G": temp = hours; break;
        // case "h": temp = ; break;
        case "H": temp = hours.padding(2, '0'); break;
        case "i": temp = minutes.padding(2, '0'); break;
        case "s": temp = seconds.padding(2, '0'); break;
        case "S": temp = millseconds.padding(3, '0'); break;
        
        default : temp = ch; break;
      }
      str += temp;
    }
    return str;
  });


  Date.prototype.method('calculateAge', function(birthday, when) {
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
