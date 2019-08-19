<template>
    <div>
        <single-pic v-bind='item.data' v-for="(item, index) in listData" v-if="item.type === 'singlePic'"></single-pic>
        <multiple-pic v-bind='item.data' v-for="(item, index) in listData" v-else></multiple-pic>
    </div>
</template>
<script>

import singlePic from '../components/items/single-pic.vue'
import multiplePic from '../components/items/multiple-pic.vue'

export default {
    data() {
        return {
            listData: []
        }
    },

    created() {
        fetch('/list').then(res => res.json())
            .then(({ data }) => {
                this.listData = data
            })
    },

    components: {
        singlePic,
        multiplePic
    }
}
</script>