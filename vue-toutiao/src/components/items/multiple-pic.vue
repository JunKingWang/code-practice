<template>
    <div class="item multiple-image">
        <h3>
            {{title}}
        </h3>
        <div class="image-list">
            <img :src='item' v-for="(item, index) in imageList" />
        </div>
    </div>
</template>
<script>
    export default {
        props: ['title', 'imageList']
    }
</script>