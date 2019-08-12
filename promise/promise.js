// 编写基础resolve 同步，异步，样例1，样例2
// 添加链式调用 样例3
// 兼容链式调用返回new promise 
// reject catch 使用try catch 来捕捉错误并抛出

(function(global) {
    var Promise = function(processor) {
        // 私有属性表示状态
        var _status = 'pending';
        if(!processor) {
            return
        }
        var _context = this;
        processor(function(res) {
            _context._resolve(res)
        }, function(err) {
            _context._reject(err)
        })
    }

    Promise.prototype = {
        // then 传进来一个方法并执行它，入参就是processor运行之后的res
        then: function(onfullfilled) {
            this.onfullfilled = onfullfilled;
            this.next = new Promise()
            // 如果没有异步方法，顺序调用，那么resolve肯定已经运行过了，参考test.js 样例1
            if(this._status === 'fullfilled') {
                this._taskCallback(
                    this.currentValue,
                    this.onfullfilled,
                    this.next
                )
            }
            // 将next返回出去实现链式调用
            return this.next;
        },

        catch: function(onReject) {
            this.onReject = onReject;
            this.next = new Promise()
            if(this._status === 'reject') {
                this._taskCallback(
                    this.currentErr,
                    this.onReject,
                    this.next
                )
            }
        },

        _resolve: function(res) {
            this._status = 'fullfilled'
            this.currentValue = res
            // 如果Promise异步，则会先调用then，后调用resolve， 所以记一下处理方法，在resolve 中执行一下，参看test.js样例2
            if(this.next && this.onfullfilled) {
                this._taskCallback(
                    this.currentValue,
                    this.onfullfilled,
                    this.next
                )
            }
        },

        _reject: function(err) {
            this.status = 'reject'
            this.currentErr = err;
            if(this.next && this.onReject) {
                this._taskCallback(
                    this.currentErr,
                    this.onReject,
                    this.next
                )
            }
        },

        _taskCallback: function(value, processor, next) {
            var result = null;
            var successFlag = true;
            // 使用try catch 捕获错误并作出相应的处理 
            try {
                var result = processor(value)
            } catch(err) {
                successFlag = false;
                result = err;
            }
            if(result instanceof Promise) {
                // 如果返回的是promise，它的结果将成为processor的返回值被调用
                result.next = next
                // 内部新增promise的链式调用
                result.then(function(res) {
                    next._resolve(res)
                })
                return;
            }
            if(successFlag) {
                next._resolve(result)
            } else {
                next._reject(result)
            }
            
        }
    }

    global.Promise = Promise;
})(window)