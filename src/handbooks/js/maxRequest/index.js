/**
 * 最大请求数量控制，需要将请求封装成 Promise, 配合axios等库使用较方便
 *
 * @param {Number} max
 * @method add
 * @method start
 * @method pause
 * @method clear
 *
 * @example:
 * const maxRequest = new MaxRequest(max) or MaxRequest(max)
 *
 * maxRequest.add(reqList[,runNow?]) 添加请求队列[立即执行请求]
 * maxRequest.start() 开始执行请求
 * maxRequest.pause() 暂停请求队列
 * maxRequest.clear() 清空请求队列
 * maxRequest.getReqQueue() 获取当前等待状态的请求队列
 */


export default function MaxRequest(num) {
    const max = num
    const stopCallback = false
    let reqNum = 0
    let reqQueue = []
    let pause = false

    const sendRequest = function() {
        reqNum++
        if ( reqNum > max || reqQueue.length === 0 || pause ) {
            reqNum--
            return
        }
        const newReq = reqQueue.shift()
        const result = newReq.req instanceof Function && newReq.req(newReq.options)
        if (result instanceof Promise) {
            result.then(res => {
                if (!stopCallback) {
                    newReq.callback(res)
                }
                reqNum--
                sendRequest()
            })
        } else {
            reqNum--
        }
        sendRequest()
    }

    return {
        add: function (reqList, runNow = false) {
            reqList.forEach(e => {
                reqQueue.push(e)
            });
            if (runNow) this.start()
        },
        start: function () {
            pause = false
            if (reqNum === 0) sendRequest()
        },
        pause: function () {
            pause = true
        },
        clear: function () {
            reqNum = 0
            reqQueue = []
            pause = false
        },
        getReqQueue: function () {
            return reqQueue
        }
    }
}


