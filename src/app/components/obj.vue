<template>
<div>
    <div v-if="mode === 'define'" class="vertical">

        <input class="min-width-small height-20" :placeholder="el.label" v-model="el.value">
        
        <md-button @click.native="fireAddCol" class="btn-style btn-green"><i class="material-icons font-medium">done</i></md-button>
        <md-button @click.native="fireDeleteCol" class="btn-style btn-red"><i class="material-icons font-medium">clear</i></md-button>
        
    </div>

    <div v-if="mode === 'design'" class="vertical">
        <input @click="openDialog(`dialog-${i}${j}`)" class="min-width-small height-20" :placeholder="el.label" v-model="el.value" readonly>
        <md-dialog :ref="`dialog-${i}${j}`">
            <md-dialog-title class="text-center">Open Account Form Details</md-dialog-title>
            <md-dialog-content class="modal-grid">
                    <div class="column">
                        <md-toolbar md-theme="white">
                            <span class="md-title">Attributes</span>
                        </md-toolbar>
                        <md-list class="md-dense">
                            <md-list-item v-for="(attr, attrIndex) in el.attributes" :key="attrIndex" @click="setAttrIndex(attrIndex)">
                                {{attr.attribute}}
                                <md-button class="md-icon-button" @click="fireDeleteObjAttr({i, j, attrIndex})">
                                    <md-icon>delete</md-icon>
                                </md-button>
                            </md-list-item>
                            <md-button class="md-raised md-primary md-dense" @click="fireAddObjAttr({i, j})">
                                <md-icon>add</md-icon>
                            </md-button>
                        </md-list>
                    </div>
                    <div class="column">
                        <div v-if="!el.attributes[attrIndex]">Please select an Attribute from side menu</div>
                        <div v-else>
                            <md-input-container v-for="(field, fieldIndex) in ObjAttrFields" :key="fieldIndex">
                                <label>{{field}}</label>
                                <md-input v-model="el.attributes[attrIndex][field]"></md-input>
                            </md-input-container>
                        </div>

                    </div>

            </md-dialog-content>

            <md-dialog-actions>
                <md-button class="md-primary" @click="closeDialog(`dialog-${i}${j}`)">close</md-button>
                <md-button class="md-primary" @click="saveAndCloseDialog(`dialog-${i}${j}`)">save</md-button>
            </md-dialog-actions>
        </md-dialog>
    </div>
</div>
</template>

<script>
export default {
    name: 'obj',
    props: ['el', 'mode', 'i', 'j'],
    data: () => ({
        attrIndex: ''
    }),
    methods: {
        fireAddCol() {
            this.$bus.emit('addCol', true);
        },
        fireDeleteCol() {
            this.$bus.emit('deleteCol', this.el);
        },
        fireAddObjAttr(indices) {
            this.$bus.emit('addObjAttr', indices);
        },
        fireDeleteObjAttr(indices) {
            this.$bus.emit('deleteObjAttr', indices);
        },
        openDialog(ref) {
            this.$refs[ref].open();
            this.value = this.el.value;
        },
        closeDialog(ref) {
            this.$refs[ref].close();
        },
        saveAndCloseDialog(ref) {
            this.closeDialog(ref);
            this.el.value = this.value;
        },
        setAttrIndex(index) {
            this.attrIndex = index;
        }
    },
    computed: {
        ObjAttrFields(){
            return Object.keys(this.el.attributes[0]);
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