/**
 * @file 所有模版的基lei
 * @author wanglijun
 */

export default class Component {
    constructor(props) {
        this.props = props
    }

    render() {
        return '<div>我是基类，不要直接使用我</div>'
    }

    constructElement() {
        const html = this.render();
        debugger
        const $content = document.createElement('div')
        const $container = document.createElement('div')
        $container.appendChild($content)
        $content.outerHTML = html;
        this.$el = $container.firstChild;
        return this.$el;
    }
}