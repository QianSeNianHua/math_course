var page = function() {
	var result = {};

	var SearRecor = function() {
		var result = {}; //SearRecor的方法返回的结果集

		var name = ''; //

		/**
		 * 描述：getDate()：从json文件中获取试题和日期的数据
		 */
		function getDate() {

			$.ajax({

				type: "POST", //请求方式   

				url: "http://10.10.113.103/math_course/common/index.php/FindQuestion/allquestion", //文件位置   

				dataType: "json", //返回数据格式为json,也可以是其他格式如

				async: false, //async. 默认是 true，即为异步方式,如果async设置为：true，则不会等待ajax请求返回的结果，会直接执行ajax后面的语句。
				/**
				 * 请求成功后要执行的函数，拼接html的日期控件里面
				 */
				success: function(data) {

					/**
					 * 描述：从json文件中取得数据，并把日期数组截断存放到year，month，day中
					 *     再把数据嵌入到html中
					 */

					var year = new Array(); //年份数组

					var month = new Array(); //月份数组

					var day = new Array(); //天数数组

					for(var i = 0; i < data["data"].length; i++) {

						year[i] = data["data"][i]["q_time"].substring(0, 4);

						month[i] = data["data"][i]["q_time"].substring(5, 7);

						day[i] = data["data"][i]["q_time"].substring(8, 10);

						if(i == 0) {
							$("#year").append('<option label="全部" value="全部"></option>');

							$("#month").append('<option label="全部" value="全部"></option>');

							$("#day").append('<option label="全部" value="全部"></option>');

							$("#year").append('<option label="' + year[i] + '" value="' + year[i] + '"></option>');

							$("#month").append('<option label="' + month[i] + '" value="' + month[i] + '"></option>');

							$("#day").append('<option label="' + day[i] + '" value="' + day[i] + '"></option>');

						}

						if(i != 0 && year[i - 1] != year[i])

							$("#year").append('<option label="' + year[i] + '" value="' + year[i] + '"></option>');

						if(i != 0 && month[i - 1] != month[i])

							$("#month").append('<option label="' + month[i] + '" value="' + month[i] + '"></option>');

						if(i != 0 && day[i - 1] != day[i])

							$("#day").append('<option label="' + day[i] + '" value="' + day[i] + '"></option>');

						var state = "";
						if(data["data"][i]["q_state"] == 0) {
							state = "推送";
						} else {
							state = "推送中";
						}
						$("#u").prepend('<li><div class="box_body_border_code">' +
							(data["data"].length - i) + '</div><p ><a href="paintPage.html?txt=' + data["data"][i]["q_content"] + '"  class="link">' +
							data["data"][i]["q_content"] + '</a></p><button  id="' + data["data"][i]["q_id"] + '">' + state + '</button><p1>' + year[i] + '年' + month[i] + '月' + day[i] + '日</p1></li>');

					}

				},
				

			});

		};

		/**
		 * 描述：
		 */
		function searchTime() {

			$.ajax({

				type: "GET", //请求方式   

				url: "http://localhost/math_course/common/index.php/FindQuestion/allquestion", //文件位置   

				dataType: "json", //返回数据格式为json,也可以是其他格式如

				async: false, //async. 默认是 true，即为异步方式
				/**
				 * 请求成功后要执行的函数，拼接html的日期控件里面
				 */
				success: function(data) {
					var opYear = $("#year option:selected");
					var opMonth = $("#month option:selected");
					var opDay = $("#day option:selected");
					var str = opYear.val() + '-' + opMonth.val() + '-' + opDay.val(); //字符串，格式 ：年-月-日

					var reg = new RegExp(str); //正则表达式匹配字符串
					$("#u").empty();

					for(var i = 0, j = 0; i < data["data"].length; i++) {
						if(reg.test(data["data"][i]["q_time"]) || (opYear.val() == "全部" && opMonth.val() == "全部" && opDay.val() == "全部")) {
							var state = "";
							if(data["data"][i]["q_state"] == 0) {
								state = "推送";
							} else {
								state = "推送中";
							}
							$("#u").prepend('<li><div class="box_body_border_code">' +
								(j + 1) + '</div><p><a href="paintPage.html?txt=' + data["data"][i]["q_content"] + '"  class="link">' +
								data["data"][i]["q_content"] + '</a></p><button id="' + data["data"][i]["q_id"] + '">' + state + '</button><p1>' + data["data"][i]["q_time"].substring(0, 4) + '年' + data["data"][i]["q_time"].substring(5, 7) + '月' + data["data"][i]["q_time"].substring(8, 10) + '日</p1></li>');

							j++;
						} else {
							if(i == data.length - 1 && $("#u").find("li").length == 0)
								alert("年月日格式错误或该日期中没有数据！");

						}

					}

				}
			});

		};
		/**
		 * 描述：changeYear()：根据年份改变，月份也随着改变
		 */
		function changeYear() {
			var that = "";
			$.ajax({

				type: "GET", //请求方式   

				url: "http://localhost/math_course/common/index.php/FindQuestion/allquestion", //文件位置   

				dataType: "json", //返回数据格式为json,也可以是其他格式如

				async: true, //async. 默认是 true，即为异步方式

				/**
				 * 请求成功后要执行的函数，拼接html的日期控件里面
				 */
				success: function(data) {

					var year = new Array(); //年份数组

					var month = new Array(); //月份数组

					var day = new Array(); //天数数组

					var opYear = $("#year option:selected");
					var opMonth = $("#month option:selected");
					var opDay = $("#day option:selected");
					var str;
					var strDate = "";

					if(opYear.val() == "全部") {
						$("#year").empty();
						$("#month").empty();
						$("#day").empty();
						getDate();
					} else {

						for(var i = 0; i < data["data"].length; i++) {

							year[i] = data["data"][i]["q_time"].substring(0, 4);

							if(opYear.val() == year[i]) {

								str = new RegExp(year[i]);
								for(var j = 0, k = 0; j < data["data"].length; j++) {
									if(str.test(data["data"][j]["q_time"].substring(0, 4))) {
										day[k] = data["data"][j]["q_time"].substring(8, 10)
										month[k] = data["data"][j]["q_time"].substring(5, 7);
										k++;
									}

								}
								//if(opMonth.val() == "全部") {
								for(var j = 0; j < month.length; j++) {
									if(j == 0) {
										$("#month").empty();
										$("#month").append('<option label="全部" value="全部"></option>');
									}

									if(!(month[j - 1] == month[j] && j > 0))
										$("#month").append('<option label="' + month[j] + '" value="' + month[j] + '"></option>');
								}
								for(var j = 0; j < day.length; j++) {
									if(j == 0) {
										$("#day").empty();
										$("#day").append('<option label="全部" value="全部"></option>');
									}

									if(!(day[j - 1] == day[j] && j > 0))
										$("#day").append('<option label="' + day[j] + '" value="' + day[j] + '"></option>');
								}

								// } 
							}

						}

					}

				}

			});

		};

		/**
		 * 描述：changeYear()：根据月份改变，天数也随着改变
		 */
		function changeMonth() {
			$.ajax({

				type: "GET", //请求方式   

				url: "http://localhost/math_course/common/index.php/FindQuestion/allquestion", //文件位置   

				dataType: "json", //返回数据格式为json,也可以是其他格式如

				async: true, //async. 默认是 true，即为异步方式,

				/**
				 * 请求成功后要执行的函数，拼接html的日期控件里面
				 */
				success: function(data) {

					var year = new Array(); //年份数组

					var month = new Array(); //月份数组

					var day = new Array(); //天数数组

					var opYear = $("#year option:selected");
					var opMonth = $("#month option:selected");
					var opDay = $("#day option:selected");
					var str = opYear.val() + '-' + opMonth.val();
					var strDate;
					for(var i = 0, k = 0; i < data["data"].length; i++) {
						strDate = new RegExp(str);
						if(strDate.test(data["data"][i]["q_time"].substring(0, 7))) {
							day[k] = data["data"][i]["q_time"].substring(8, 10);
							if(k == 0) {
								$("#day").empty();
								$("#day").append('<option label="全部" value="全部"></option>');
							}
							if(!(day[k - 1] == day[k] && k > 0))
								$("#day").append('<option label="' + day[k] + '" value="' + day[k] + '"></option>');
							k++;
						}
					}

				}

			});

		};

		/**
		 * 描述：sendQues()：推送试题。
		 */
		
		result.name = name;
		result.getDate = getDate;
		result.searchTime = searchTime;
		result.changeYear = changeYear;
		result.changeMonth = changeMonth;
		

		return result;
	};

	result.SearRecor = SearRecor;

	return result;
};