/**
 * @file 管理全局入口
 * @author wanglijun
 */

import './static/index.css'
import * as utils from './utils'
import components from './items';

const THRESHOLD = 50

class Manager {
    constructor($container) {
        this.$container = $container
    }

    init() {
        this.appendData();
        this.detectReachBottom(() => this.appendData())
    }

    appendData() {
        utils.request().then(res => {
            const items = res.data;
            items.forEach((item) => {
                const componentName = item.type.replace(/^\w/g, w => w.toUpperCase())
                const Component = components[componentName]
                const currentComponent = new Component(item)
                const element = currentComponent.constructElement()
                this.$container.append(element)
            })
        })
    }

    // callback 默认是一个空方法，这样就不用了进行类型校验~
    detectReachBottom(callback = () =>{}) {
        window.onscroll = () => {
            const offsetHeight = document.documentElement.offsetHeight
            const screenHeight = window.screen.height
            const scrollY = window.scrollY
            const gap = offsetHeight - screenHeight - scrollY
            if(gap < THRESHOLD) {
                callback();
            }
        }
    }

    // 静态方法，可以在类外部被直接在类上调用
    static getInstance($container) {
        return new Manager($container)
    }
}

const $container = document.getElementById('container');
const manager = Manager.getInstance($container);

manager.init();