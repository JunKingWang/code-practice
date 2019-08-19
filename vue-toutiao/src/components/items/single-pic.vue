<template>
    <div class="item single-pic">
        <div class="content">
            <span>
                {{title}}
            </span>
        </div>
        <img :src="imageList[0]"/>
    </div>
</template>
<script>
export default {
    props: ['title', 'imageList']
}
</script>