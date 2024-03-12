import Vue from 'vue'
// WebSocket与普通的请求所用协议有所不同，ws等同于http，wss等同于https
let wsUrl = "wss://backend.intellijocean.cn/api/wx/";
let websocket
export const webSocketInit = (wxScanUuid) => {
    websocket = new WebSocket(wsUrl + wxScanUuid)
    return websocket
}

export const onMessage = () => {
    let message = websocket.onmessage()
    console.log(message)
    return message
}

// websocket.onopen = websocketonopen;
// websocket.onerror = websocketonerror;
// websocket.onmessage = setOnmessageMessage;
// websocket.onclose = websocketclose;
// 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
// window.onbeforeunload = that.onbeforeunload
