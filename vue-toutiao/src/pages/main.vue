<template>
    <div>
        <single-pic v-bind='item.data' v-for="(item, index) in listData" v-if="item.type === 'singlePic'"></single-pic>
        <multiple-pic v-bind='item.data' v-for="(item, index) in listData" v-else-if="item.type === 'multiplePic'"></multiple-pic>
        <agriculture v-else></agriculture>
    </div>
</template>
<script>

import singlePic from '../components/items/single-pic.vue'
import multiplePic from '../components/items/multiple-pic.vue'
import agriculture from '../components/items/agriculture.vue'
const THRESHOLD = 50;
const createThrottle = (delay=1000) => {
    let status = 'START'
    return (fn) => {
        debugger
        if(status === 'WAITING') {
            return;
        }
        status = 'WAITING'
        setTimeout(() => {
            fn && fn()
            status = 'START'
        }, delay)
    }
}
export default {
    data() {
        return {
            listData: [],
            throttle: createThrottle(3000)
        }
    },

    created() {
        fetch('/list?tab=agriculture').then(res => res.json())
            .then(({ data }) => {
                this.listData = data
            })

        window.onscroll = () => {
            const offsetHeight = document.documentElement.offsetHeight
            const screenHeight = window.screen.height
            const scrollY = window.scrollY
            const gap = offsetHeight - screenHeight - scrollY
            if(gap < THRESHOLD) {
                this.throttle(() => {
                    console.log('加载')
                })
            }
        }
    },

    components: {
        singlePic,
        multiplePic,
        agriculture
    }
}
</script>