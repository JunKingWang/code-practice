/**
 * @file 多图组件
 * @author wanglijun
 */

 import Component from './component'
 
 export default class MultiplePic extends Component {
    constructor(props) {
        super(props)
    }   

    render() {
        debugger
        const { data } = this.props;
        const imageList = data.imageList.map(imgUrl => {
            return `<img src=${imgUrl} />`
        }).join('')
        return `<div class="item multiple-image">
                <h3>
                    ${data.title}
                </h3>
                <div class="image-list">
                    ${imageList}
                </div>
            </div>`
    }
 }