import Taro from '@tarojs/taro'
import { HTTP_STATUS } from './status'
import { logError } from './utils'

const token = ''
const base = ''

export default {
    baseOptions(params, method = 'GET') {
        let { url, data } = params
        let contentType = 'text/plain; charset=utf-8'
        contentType = params.contentType || contentType
        const option = {
            isShowLoading: false,
            loadingText: '正在加载',
            url: base + url,
            data: data,
            method: method,
            header: { 'content-type': contentType, 'token': token },
            success(res) {
                if (res.statusCode === HTTP_STATUS.NOT_FOUND) {
                    return logError('api', '请求资源不存在')
                } else if (res.statusCode === HTTP_STATUS.BAD_GATEWAY) {
                    return logError('api', '服务端出现了问题')
                } else if (res.statusCode === HTTP_STATUS.FORBIDDEN) {
                    return logError('api', '没有权限访问')
                } else if (res.statusCode === HTTP_STATUS.SUCCESS) {
                    return res.data
                }
            },
            error(e) {
                logError('api', '请求接口出现问题', e)
            }
        }
        return Taro.request(option)
    },
    get(url, data = '') {
        let option = { url, data }
        return this.baseOptions(option)
    },
    post: function (url, data) {
        let params = { url, data, contentType: 'application/x-www-form-urlencoded' }
        return this.baseOptions(params, 'POST')
    },
    postByJson: function(url, data) {
        let params = { url, data, contentType: 'application/json' }
        return this.baseOptions(params, 'POST')
    }
}
