/**
 * @file 单图组件
 * @author wanglijun
 */

 import Component from './component'

 export default class SinglePic extends Component {
     constructor(props) {
        super(props)
     }

     render() {
         debugger
         const { data } = this.props

         return `<div class="item single-pic">
            <div class="content">
                <span>
                    ${data.title}
                </span>
            </div>
            <img src="${data.imageList[0]}"/>
         </div>`
     }
 }