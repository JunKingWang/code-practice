/**
 * @file 管理全局入口
 * @author wanglijun
 */

class Manager {
    constructor($container) {
        this.$container = $container
    }

    init() {
        this.$container.append('123')
    }

    // 静态方法，可以在类外部被直接在类上调用
    static getInstance($container) {
        return new Manager($container)
    }
}

const $container = document.getElementById('container');
const manager = Manager.getInstance($container);

manager.init();