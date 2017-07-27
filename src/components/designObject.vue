<template>
    <div class="vertical">

        <input class="min-width-small height-20" :placeholder="el.label" v-model="el.value"></input>


</div>


</template>

<script>
export default {
    name: 'obj',
    props: ['el'],

    methods: {
        fireAddCol() {
            this.$bus.emit('addCol', true);
        },

        fireDeleteCol() {
            this.$bus.emit('deleteCol', this.el);
        }
    }
}
</script>

<style>
.vertical {
    transform: rotate(90deg);
    position: absolute;
    transform-origin: 10px 12px;

}

.min-width-small {
    min-width: 160px;
    width: 160px;
}

.height-20 {
    height: 20px;
}



.font-medium {
    font-size: medium;
}
</style>
