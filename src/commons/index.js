/**
 * html转换转义字符
 */
export function HtmlEncode(str){
  let reg=new RegExp(" ",'g');//g代表全部
  str = str.replace(reg, "&nbsp;");
  reg=new RegExp("<",'g');
  str = str.replace(reg, "&lt;");
  reg=new RegExp(">",'g');
  str = str.replace(reg, "&gt;");
  reg=new RegExp("\'",'g')
  str = str.replace(reg, "&apos;");
  reg=new RegExp("\"",'g')
  str = str.replace(reg, "&quot;");
  //str = str.Replace("/", "&#47;");
  return str;
}
/**
 * html转换转义字符
 */
export function HtmlDecode(str){
  let reg=new RegExp("&nbsp;",'g');//g代表全部
  str = str.replace(reg, " ");
  reg=new RegExp("&lt;",'g');
  str = str.replace(reg, "<");
  reg=new RegExp("&gt;",'g');
  str = str.replace(reg, ">");
  reg=new RegExp("&apos;",'g');
  str = str.replace(reg, "\'");
  reg=new RegExp("&quot;",'g');
  str = str.replace(reg, "\"");
  reg=new RegExp("<br>",'g');//g代表全部
  str = str.replace(reg, "\r\n");
  return str;
}
/**
 * 换行
 */
export function HtmlLineBreak(str){
  let reg=new RegExp("\r\n",'g');//g代表全部
  str = str.replace(reg, "<br>");
  reg=new RegExp("\n",'g');
  str = str.replace(reg, "<br>")
  return str;
}
/**

 * @desc 格式化日期字符串

 * @param { String} - 日期时间字符串\服务器时间

 * @returns { String } 格式化后的日期字符串

 */

export function formatDate(value) {

  // 注意ie和firefox浏览器时间格式兼容性

  let timestamp=new Date(value).getTime();

  // 补全为13位

  let arrTimestamp = (timestamp + '').split('');

  for (let start = 0; start < 13; start++) {

    if (!arrTimestamp[start]) {

      arrTimestamp[start] = '0';

    }

  }

  timestamp = arrTimestamp.join('') * 1;

  let minute = 1000 * 60;

  let hour = minute * 60;

  let day = hour * 24;

  let month = day * 30;

  let now = new Date().getTime();

  let diffValue = now - timestamp;

  // 如果本地时间反而小于变量时间

  if (diffValue < 0) {

    return 'not long ago';

  }

  // 计算差异时间的量级

  let yearC = diffValue / (month*12);

  let monthC = diffValue / month;

  let weekC = diffValue / (7 * day);

  let dayC = diffValue / day;

  let hourC = diffValue / hour;

  let minC = diffValue / minute;

  // 数值补0方法

  let zero = function (value) {

    if (value < 10) {

      return '0' + value;

    }

    return value;

  };

  // 使用

  if (yearC >= 1) {

    // 超过1年，直接显示年月日

    return (function () {
      const m=new Date(timestamp).getMonth()+1;
      const y=new Date(timestamp).getFullYear();
      const d = new Date(timestamp).getDate();
      if(m==1){
        return `January ${d}, ${y}`
      }else if(m==2){
        return `February ${d}, ${y}`
      }else if(m==3){
        return `March ${d}, ${y}`
      }else if(m==4){
        return `April ${d}, ${y}`
      }else if(m==5){
        return `May ${d}, ${y}`
      }else if(m==6){
        return `June ${d}, ${y}`
      }else if(m==7){
        return `July ${d}, ${y}`
      }else if(m==8){
        return `August ${d}, ${y}`
      }else if(m==9){
        return `September ${d}, ${y}`
      }else if(m==10){
        return `October ${d}, ${y}`
      }else if(m==11){
        return `November ${d}, ${y}`
      }else if(m==12){
        return `December ${d}, ${y}`
      }
    })();
  } else if (monthC >= 1) {

    return parseInt(monthC) + 'months ago';

  } else if (weekC >= 1) {

    return parseInt(weekC) + 'weeks ago';

  } else if (dayC >= 1) {

    return parseInt(dayC) + 'days ago';

  } else if (hourC >= 1) {

    return parseInt(hourC) + 'hours ago';

  } else if (minC >= 1) {

    return parseInt(minC) + 'minutes ago';

  }

  return 'just now';

}
/**
 * 时间显示成英文,2020/12/1 (December 1, 2020)
 */
export function dateEnglish(date){
  const m=new Date(date).getMonth()+1;
  const y=new Date(date).getFullYear();
  const d=new Date(date).getDate();
  if(m==1){
    return `January ${d}, ${y}`
  }else if(m==2){
    return `February ${d}, ${y}`
  }else if(m==3){
    return `March ${d}, ${y}`
  }else if(m==4){
    return `April ${d}, ${y}`
  }else if(m==5){
    return `May ${d}, ${y}`
  }else if(m==6){
    return `June ${d}, ${y}`
  }else if(m==7){
    return `July ${d}, ${y}`
  }else if(m==8){
    return `August ${d}, ${y}`
  }else if(m==9){
    return `September ${d}, ${y}`
  }else if(m==10){
    return `October ${d}, ${y}`
  }else if(m==11){
    return `November ${d}, ${y}`
  }else if(m==12){
    return `December ${d}, ${y}`
  }else{
    return '111'
  }
}
/**
 * 判断是否是移动端
 */
export function isMobile() {
	let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
	return flag;
}