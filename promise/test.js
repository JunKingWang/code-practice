// 样例1 同步
(new Promise(function(resolve, reject) {
    resolve('111')
})).then((res) => {
    console.log(res)
})

// 样例2 异步
(new Promise(function(resolve, reject) {
    setTimeout(function() {
        resolve('111')
    })
})).then((res) => {
    console.log(res)
})

// 样例3 链式调用
(new Promise(function(resolve, reject) {
    setTimeout(function() {
        resolve('111')
    })
})).then((res) => {
    console.log(res)
    return {
        name: '123'
    }
}).then((res) => {
    console.log(res)
})

// 样例4 链式调用并返回promise
(new Promise(function(resolve, reject) {
    setTimeout(function() {
        resolve('111')
    })
})).then((res) => {
    console.log(res)
    return new Promise(function(resolve, reject) {
        resolve('2222')
    })
}).then((res) => {
    console.log(res)
})

// 样例5 promise在then中抛出错误
(new Promise(function(resolve, reject) {
    setTimeout(function() {
        resolve('111')
    })
})).then((res) => {
    throw Error(1)
    
}).catch((err) => {
    console.log(err)
})