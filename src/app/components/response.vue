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
        <md-dialog v-if="el.value === 'report'" :ref="`dialog-${i}${j}`" @close="onClose">
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
                    <div v-if="!clickedItem">Please select a object from side menu</div>
                    <div v-else>
                    <h4 class="text-center">Object Attributes</h4>
                    <md-input-container>
                        <label>Order</label>
                        <md-input v-model="clickedItem.objectAttributes.order"></md-input>
                    </md-input-container>
                    <md-input-container>
                        <label>Filter</label>
                        <md-input v-model="clickedItem.objectAttributes.filter"></md-input>
                    </md-input-container>
                    <h4 class="text-center">Field Attributes</h4>
                    <md-input-container v-for="(key, index) in fieldAttrKeys" :key="index">
                        <label>{{key}}</label>
                        <md-input v-model="clickedItem.fieldAttributes[key]"></md-input>
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

import treeList from './tree-list.vue';

export default {
    name: 'response',
    props: ['el', 'mode', 'i', 'j'],
    components: {treeList},
    data: () => ({
        selectedObj: '',
        clickedItem: ''
    }),
    methods: {
      openDialog(ref) {
        this.$refs[ref].open();
        this.value = this.el.value;
      },
      closeDialog(ref) {
        this.$refs[ref].close();
      },
      onClose() {
        this.clickedItem = '';
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
      },
      handleItemClicked(obj) {
        this.clickedItem = obj;
      }
    },
    computed: {
      objects() {
        return this.$store.getters.getAllObjects;
      },
      fieldAttrKeys() {
          if(this.clickedItem) return Object.keys(this.clickedItem.fieldAttributes);
      }
    },
    created() {
      let handleItemClicked = this.handleItemClicked;
      this.$bus.on('itemClicked', function(obj){
        handleItemClicked(obj);
      });
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
    grid-template-columns: 400px auto;
    height: 400px;
}

.response-modal-grid .column {
    border: solid 1px grey;
    border-radius: 5px; 
    padding: 5px;
    overflow: scroll;
}

</style>