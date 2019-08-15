/**
 * @file 大图组件
 * @author wanglijun
 */

import component from './component'

export default class LargePic extends component {
    constructor(props) {
        super(props)
    }

    render() {
        const { data } = this.props
        return `<div class="item large-pic">
                <h3>
                    ${data.title}
                </h3>
            <img src="${data.imageList[0]}"/>
        </div>`
    }
}