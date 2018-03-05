<template>
    <div class="vertical">
        
        <input class="min-width-small height-20" :placeholder="el.label" v-model="el.value">
    
        <md-button @click.native="fireAddCol" class="btn-style btn-green"><i class="material-icons font-medium">done</i></md-button>
        <md-button @click.native="fireDeleteCol" class="btn-style btn-red"><i class="material-icons font-medium">clear</i></md-button>
        
    </div>
</template>

<script>
export default {
    name: 'subject',
    props: ['el'],

    methods: {
        fireAddCol() {
            this.$bus.emit('addCol', false);
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

.btn-style {
    width: 20px !important;
    min-width: 20px !important;

    height: 20px !important;
    min-height: 20px !important;

    padding: 0px !important;
    margin: 0px !important;

    line-height: 0;
}

.btn-green {
    color: #4caf50;
}

.btn-red {
    color: #f44336;
}

.font-medium {
    font-size: medium;
}
</style>