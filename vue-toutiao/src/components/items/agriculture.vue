<template>
    <div>
        <h3>猪肉价格查询器</h3>
        <label for="area">地区/地名</label>
        <input type="text" v-model='area'>
        <div>
            <h4>{{area}}猪肉价格</h4>
            <span>{{ price | filterPrice}}</span>
        </div>
    </div>
</template>

<script>
const createdDebounce = (fn, time=1000) => {
    let timer = null
    return args => {
        if(timer !== null) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn && fn(args)
        }, time)
    }
}

export default {
    data() {
        return {
            area: '北京',
            price: 0,
            debounce: createdDebounce(newvalue => {
                this.requestPrice(newvalue)
            }, 3000)
        }
    },

    created() {
        this.requestPrice(this.area)
    },

    filters: {
        filterPrice(val) {
            return val + '$'
        }
    },

    methods: {
        requestPrice(area) {
            fetch(`/price?area=${area}`)
                .then(res => res.json())
                .then(res => {
                    this.price = res.infos[0].price
                })
        }
    },

    watch: {    
        area(newvalue) {
            this.debounce(newvalue)
        }
    }
}
</script>