/**
 * @file 入口文件
 * @author wanglijun
 */
import Vue from 'vue'
import Main from './pages/main.vue'

const vm = new Vue({
    el: '#app',
    render: h => h(Main)
})