<template>
    <div>
    <div v-if="mode === 'define'">        
        <input class="min-width-small height-20" :placeholder="el.label" v-model="el.value">

        <md-button @click.native="fireAddRow" class="btn-style btn-green"><i class="material-icons font-medium">done</i></md-button>
        <md-button @click.native="fireDeleteRow" class="btn-style btn-red"><i class="material-icons font-medium">clear</i></md-button>
        
    </div>

    <div v-if="mode === 'design'">        
        <input @click="openDialog(`dialog-${i}${j}`)" class="min-width-small height-20" :placeholder="el.label" v-model="el.value" readonly>
        <md-dialog :ref="`dialog-${i}${j}`">
            <md-dialog-title class="text-center">Monthly Costs Action Details</md-dialog-title>
            <md-dialog-content class="bigger-modal">
              <tree-list :obj="el.objects" :depth="1" :type="el.type" @unindent="handleUnIndent"></tree-list>
              <md-input-container>
                  <label>Add Object/Message</label>
                  <md-select name="object" v-model="selectedObj">
                    <md-option v-for="(obj, objIndex) in objects" :key="objIndex" :value="obj.value || obj.label">{{obj.value || obj.label}}</md-option>
                  </md-select>
                  <md-button class="md-raised md-primary md-dense" @click="addObject({i, j, selectedObj})"><md-icon>add</md-icon></md-button>
              </md-input-container>
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
  name: "action",
  props: ["el", "mode", "i", "j"],
  components: {treeList},
  data: () => ({
    selectedObj: ''
  }),
  methods: {
    fireAddRow() {
      this.$bus.emit("addRow", false);
    },

    fireDeleteRow() {
      this.$bus.emit("deleteRow", this.el);
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
    },
    addObject(data) {
      if(this.selectedObj) {
        this.$bus.emit('addObjToAction', data);
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
};
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

.bigger-modal {
  width: 1000px;
}
</style>