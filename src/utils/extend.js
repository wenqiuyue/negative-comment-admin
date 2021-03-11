		/**
		 * 将字符串的时间格式化成指定文本
		 * @param {format} 日期格式，比如 yyyy-MM-dd H:m:s => 2019-08-16 8:36:3
		 * @returns {String} 返回对应时间格式的字符串
		 */
		String.prototype.timeFormat = function(format) {
			let str = String(this);
			let _str = str.replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '').replace(/-/g, '/')
			let i = _str.indexOf('.')
			if (i !== -1) {
				_str = _str.slice(0, i)
			}
			let time;
			time = new Date(_str);
			if (time == 'Invalid Date') {
				time = new Date(str)
			}
			// console.log(sseeeee)
			let o = {
				"M+": time.getMonth() + 1,
				"d+": time.getDate(),
				"H+": time.getHours(),
				"m+": time.getMinutes(),
				"s+": time.getSeconds(),
				"q+": Math.floor((time.getMonth() + 3) / 3), //季度
				"f+": time.getMilliseconds() //毫秒
			};
			if (/(y+)/.test(format))
				format = format
				.replace(RegExp.$1, time.getFullYear() + "")
				.substr(4 - RegExp.$1.length);
			for (let k in o) {
				if (new RegExp("(" + k + ")").test(format))
					format = format.replace(
						RegExp.$1,
						RegExp.$1.length == 1 ?
						o[k] :
						("00" + o[k]).substr(("" + o[k]).length)
					);
			}
			return format;
		};
		/**
		 * 将日期时间的时间格式化成指定文本
		 * @param {format} 日期格式，比如 yyyy-MM-dd H:m:s => 2019-08-16 8:36:3
		 * @returns {String} 返回对应时间格式的字符串
		 */
		Date.prototype.timeFormat = function(format) {
			let time = this;
			let o = {
				"M+": time.getMonth() + 1,
				"d+": time.getDate(),
				"H+": time.getHours(),
				"m+": time.getMinutes(),
				"s+": time.getSeconds(),
				"q+": Math.floor((time.getMonth() + 3) / 3), //季度
				"f+": time.getMilliseconds() //毫秒
			};
			if (/(y+)/.test(format))
				format = format
				.replace(RegExp.$1, time.getFullYear() + "")
				.substr(4 - RegExp.$1.length);
			for (let k in o) {
				if (new RegExp("(" + k + ")").test(format))
					format = format.replace(
						RegExp.$1,
						RegExp.$1.length == 1 ?
						o[k] :
						("00" + o[k]).substr(("" + o[k]).length)
					);
			}
			return format;
		};