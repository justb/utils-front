import axios from 'axios'
import { message } from 'antd'

const codeMessage = {
    400: '请求有错误',
    401: '用户无权限',
    403: '访问被禁止',
    404: '请求不存在',
    500: '服务器错误',
}

const errMsgFn = msg => {
    if (window['errMsgTimer_' + msg]) {
        clearTimeout(window['errMsgTimer_' + msg])
    }

    window['errMsgTimer_' + msg] = setTimeout(() => {
        message.error(msg)
        delete window['errMsgTimer_' + msg]
    }, 200)
}

const request = (url, params, method, extraParams) => {
    let config = {
        url,
        method: method || 'get',
        withCredentials: true,
    }
    let showGlobalErrorMessage = true
    if (config.method === 'get' || config.method === 'delete') {
        config.params = params
    } else {
        config.data = params
    }
    config = {
        ...config,
        ...extraParams,
    }
    if (extraParams && extraParams.showGlobalErrorMessage === false) {
        showGlobalErrorMessage = false
    }
    return new Promise((resolve, reject) =>
        axios(config)
            .then(res => {
                const data = res.data
                if (data && data.code === 0) {
                    resolve({
                        requestParams: {
                            ...params,
                        },
                        payload: data.data,
                        response: data,
                        extraParams,
                    })
                } else {
                    const message = res && res.data && res.data.message
                    showGlobalErrorMessage && errMsgFn(message)
                    reject(res)
                }
            })
            .catch((error = {}) => {
                const { response } = error
                let errorText = '服务器错误'
                if (response && response.status) {
                    errorText = codeMessage[response.status] || response.statusText
                }
                showGlobalErrorMessage && errMsgFn(errorText)
                reject(error)
            }),
    )
}

export default request
