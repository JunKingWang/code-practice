/**
 * @file utils
 * @author wanglijun
 */

import josnData from './mock.json'
/**
 * @description 网络请求封装
 * @param {object} [oarms] - 发请求用的参数
 * @returns {Promise} 请求的Promise任务对象
 */
export const request = params => {
    // 假装这里是一个请求，并且以promise的形式返回--不会写后端的原因，有机会日后补上
    return new Promise((resolve, reject) => {
        setTimeout((res) => {
            resolve(josnData)
        })
    })
}