///<reference path="./jquery-3.3.1.min.js"/>

/**
 * 方法：stuSocket()
 * 描述：向服务器发出请求，当试题状态为1时，页面跳到paintPage
 */
function stuSocket() {
	var ws = new WebSocket('ws://' + urlConf.host + ':' + urlConf.socketPost);

	var data = {
		identity: 'student',
		data: {}
	};

	// 连接成功
	ws.onopen = function() {
        console.log('连接成功');
        
        // 向服务端证明自己的身份
		ws.send(JSON.stringify(data));
	};

	// 连接失败
	ws.onerror = function(e) {
		console.log('连接失败');
		mui.alert('连接失败，请检查网络是否连接');
	};

	// 接收服务端发送的消息
	ws.onmessage = function(e) {
		var msg_obj = JSON.parse(e.data)

		//显示 服务器谁的消息都会推送
		if(!!msg_obj['status']) {
			// 推送中
			// window.location = 'paintPage.html?state='+encodeURI(msg_obj['state'])+'&content='+encodeURI(msg_obj['content'])+'';
            console.log('推送中');
            getQuestion(msg_obj['q_id'], function(data) {
				// 禁止返回键
				jQuery('a.box_head_location').attr('href', 'javascript:;');
				// 添加题目内容
				jQuery('.top_tools_panel_right').text(123);
				// 添加画板内容
			});
		} else if (!msg_obj['status']) {
			// 推送结束
			//window.location = 'paintPage.html?state='+encodeURI(msg_obj['state'])+'&content='+encodeURI(msg_obj['content'])+'';
            console.log('推送结束');
            jQuery('a.box_head_location').attr('href', 'index.html');
		}
	}

	// 获取题目内容
	function getQuestion(qId, callback) {
		jQuery.ajax({
			url: 'http://' + urlConf.url + ':' + urlConf.post + urlConf.root + 'KeepPhoto/base64_image_content',
			type: 'post',
			dataType: 'json',
			async: true,
			timeout: 10000,
			data: {
				'q_id': qId
			},
			success: function(data) {
				callback(data);
			},
			error: function(xml, status, err) {
				mui.alert('连接失败，请检查网络是否连接');
				jQuery('a.box_head_location').attr('href', 'index.html');
			}
		});
	}
}