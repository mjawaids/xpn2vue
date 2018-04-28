<template>
<div>
    <div v-if="mode === 'define'" class="corner-style">
        <md-select name="response" v-model="el.value" class="md-select-value corner-style">
            <md-option value="datastore">Datastore</md-option>
            <md-option value="report">Report</md-option>
            <md-option value="?">?</md-option>
        </md-select>
    </div>
    <div v-if="mode === 'design'" @click="openDialog(`dialog-${i}${j}`)" class="corner-style">
        <md-select name="response" v-model="el.value" class="md-select-value corner-style" disabled>
            <md-option value="datastore">Datastore</md-option>
            <md-option value="report">Report</md-option>
            <md-option value="?">?</md-option>
        </md-select>
        <md-dialog v-if="el.value === 'report'" :ref="`dialog-${i}${j}`">
            <md-dialog-title class="text-center">Monthly Costs Action Details</md-dialog-title>
            <md-dialog-content class="bigger-modal response-modal-grid">
                <div class="column col-left">
                    <md-toolbar md-theme="white">
                        <span class="md-title">Report Structure</span>
                    </md-toolbar>
                    <tree-list :obj="el.objects" :depth="1" :type="el.type" @unindent="handleUnIndent"></tree-list>
                    <md-input-container>
                        <label>Add Object/Message</label>
                        <md-select name="object" v-model="selectedObj">
                            <md-option v-for="(obj, objIndex) in objects" :key="objIndex" :value="obj.value || obj.label">{{obj.value || obj.label}}</md-option>
                        </md-select>
                        <md-button class="md-raised md-primary md-dense" @click="addObject({i, j, selectedObj})"><md-icon>add</md-icon></md-button>
                    </md-input-container>
                </div>
                <div class="column">

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

import treeList from './tree-list.vue';

export default {
    name: 'response',
    props: ['el', 'mode', 'i', 'j'],
    components: {treeList},
    data: () => ({
        selectedObj: ''
    }),
    methods: {
      openDialog(ref) {
        this.$refs[ref].open();
        this.value = this.el.value;
      },
      closeDialog(ref) {
        this.$refs[ref].close();
      },
      saveAndCloseDialog(ref) {
        this.closeDialog(ref);
      },
      addObject(data) {
        if(this.selectedObj) {
          this.$bus.emit('addObjToResponse', data);
          this.selectedObj = '';
        };
      },
      handleUnIndent(event){
        this.el.objects.push(event);
      }
    },
    computed: {
      objects() {
        return this.$store.getters.getAllObjects;
    }
  }
}
</script>

<style>
.corner-style {
    width:20px !important;
    height:20px !important;
    margin:auto;
}

.md-select-value {
    padding-right: 20px !important;
    line-height: 20px !important;
    min-width:20px;
}

.response-modal-grid {
    display: grid;
    grid-column-gap: 10px;
    grid-template-columns: 400px 540px;
    height: 400px;
}

.response-modal-grid .column {
    border: solid 1px grey;
    border-radius: 5px; 
    padding: 5px;
}

</style>