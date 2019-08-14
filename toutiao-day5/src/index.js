/**
 * @file 管理全局入口
 * @author wanglijun
 */

import './static/index.css'
import * as utils from './utils'
import components from './items';

class Manager {
    constructor($container) {
        this.$container = $container
    }

    init() {
        this.appendData();
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

    // 静态方法，可以在类外部被直接在类上调用
    static getInstance($container) {
        return new Manager($container)
    }
}

const $container = document.getElementById('container');
const manager = Manager.getInstance($container);

manager.init();