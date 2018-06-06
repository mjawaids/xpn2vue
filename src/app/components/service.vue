<template>
<div>
    <div v-if="mode === 'define'" class="">
        <input class="min-width-small height-20" :placeholder="el.label" v-model="el.value">

        <md-button @click.native="fireAddRow" class="btn-style btn-green"><i class="material-icons font-medium">done</i></md-button>
        <md-button @click.native="fireDeleteRow" class="btn-style btn-red"><i class="material-icons font-medium">clear</i></md-button>
        
    </div>
    <div v-if="mode === 'design'" class="">
        <input class="min-width-small height-20" :placeholder="el.label" v-model="el.value" readonly>
        <!-- <md-dialog :ref="`dialog-${i}${j}`">
            <md-dialog-content>
                <md-input-container>
                    <md-input @keyup.enter.native="saveAndCloseDialog(`dialog-${i}${j}`)" v-model="value"></md-input>
                </md-input-container>
            </md-dialog-content>

            <md-dialog-actions>
                <md-button class="md-primary" @click="closeDialog(`dialog-${i}${j}`)">close</md-button>
                <md-button class="md-primary" @click="saveAndCloseDialog(`dialog-${i}${j}`)">save</md-button>
            </md-dialog-actions>
        </md-dialog> -->
    </div>
</div>
</template>

<script>
export default {
  name: "service",
  props: ["el", "mode", "i", "j"],
  data: () => ({
    value: ""
  }),
  methods: {
    fireAddRow() {
      this.$bus.emit("addRow", true);
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
      this.el.value = this.value;
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
</style>