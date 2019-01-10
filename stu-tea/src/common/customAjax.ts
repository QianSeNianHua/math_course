/**
 * ajax发送，前提需要引入jquery
 * @param postUrl url地址
 * @param data 发送的参数
 * @return resolve(data)
 * @return reject(mes)
 */
export default function ajax (postUrl: string, data: {}) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: postUrl,
            type: 'post',
            dataType: 'json',
            data,
            timeout: 10000,
            success: (data) => {
                resolve(data);
            },
            complete: (xml, status) => {
                if (status === 'timeout' || status === 'error') {
                    // console.log('网络连接失败');
                    reject('网络连接失败');
                }
            }
        });
    });
}
