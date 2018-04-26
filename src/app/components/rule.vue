<template>
<div>
    <div v-if="mode === 'define'">        
        <input class="min-width-small height-20" :placeholder="el.label" v-model="el.label">

        <md-button @click.native="fireAddRule" class="btn-style btn-green"><i class="material-icons font-medium">done</i></md-button>
        <md-button @click.native="fireDeleteRule" class="btn-style btn-red"><i class="material-icons font-medium">clear</i></md-button>
        
    </div>
    <div v-if="mode === 'design'">        
        <input class="min-width-small height-20" :placeholder="el.label" v-model="el.value" readonly>
    </div>
</div>
</template>

<script>
export default {
    name: 'rule',
    props: ['el', 'mode', 'i', 'j'],
    methods: {
        fireAddRule() {
            this.$bus.emit('addRule');
        },

        fireDeleteRule() {
            this.$bus.emit('deleteRule', this.el);
        }
    }
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