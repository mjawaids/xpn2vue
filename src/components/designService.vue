<template>
    <div class="">
        <input class="min-width-small height-20" :placeholder="el.label" v-model="el.value"></input>
    </div>
</template>

<script>
export default {
    name: 'service',
    props: ['el']
}
</script>

<style>
.min-width-small {
    min-width: 160px;
    width: 160px;
}
.height-20 {
    height: 20px;
}
</style>
