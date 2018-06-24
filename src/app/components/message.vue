<template>
<div>
    <div v-if="mode === 'define'" class="corner-style">
        <md-select name="message" v-model="el.value" class="md-select-value corner-style">
            <md-option value="create">Create</md-option>
            <md-option value="update">Update</md-option>
            <md-option value="delete">Delete</md-option>
            <md-option value="?">?</md-option>
        </md-select>
    </div>
    <div v-if="mode === 'design'" class="corner-style" @click="openDialog(`dialog-${i}${j}` ,el.value)">
        <md-select name="message" v-model="el.value" class="md-select-value corner-style" disabled>
            <md-option value="create">Create</md-option>
            <md-option value="update">Update</md-option>
            <md-option value="delete">Delete</md-option>
            <md-option value="?">?</md-option>
        </md-select>
        <md-dialog v-if="el.value !== '?' && el.value" :ref="`dialog-${i}${j}`">
            <md-dialog-title class="text-center">{{getObj.value || getObj.label}} Message Details</md-dialog-title>
            <md-dialog-content class="big-modal">
                <md-table>
                    <md-table-header>
                        <md-table-row>
                            <md-table-head>Attribute</md-table-head>
                            <md-table-head>Value</md-table-head>
                        </md-table-row>
                    </md-table-header>

                    <md-table-body>
                        <md-table-row v-for="(key, attrIndex) in getObj.attributes" :key="attrIndex">
                            <md-table-cell class="table-attribute">
                                <md-input-container class="condensed-input">
                                    <md-input v-model="key.attribute"></md-input>
                                </md-input-container>
                            </md-table-cell>
                            <md-table-cell>
                                <md-input-container class="condensed-input">
                                    <md-input></md-input>
                                </md-input-container>
                                <md-button class="md-icon-button" @click="fireDeleteAttribute({j, attrIndex})">
                                    <md-icon>delete</md-icon>
                                </md-button>
                            </md-table-cell>
                        </md-table-row>
                    </md-table-body>
                </md-table>
                <md-button class="md-raised md-primary md-dense" @click="fireAddAttribute({j})">Add Attribute</md-button>

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
  name: "message",
  props: ["el", "mode", "i", "j"],
  methods: {
    fireAddAttribute(indices) {
      this.$bus.emit("addObjAttr", indices);
    },

    fireDeleteAttribute(indices) {
      this.$bus.emit("deleteObjAttr", indices);
    },
    openDialog(ref, value) {
      if (value !== "?" && value) {
        this.$refs[ref].open();
      }
    },
    closeDialog(ref) {
      this.$refs[ref].close();
    },
    saveAndCloseDialog(ref) {
      this.closeDialog(ref);
    },
    setFieldIndex(fieldIndex) {
      this.fieldInd = fieldIndex;
    }
  },
  computed: {
    getObj() {
      return this.$store.getters.getObject({ i: this.i, j: this.j });
    }
  }
};
</script>

<style>
.corner-style {
  width: 20px !important;
  height: 20px !important;
  margin: auto;
}

.md-select-value {
  padding-right: 20px !important;
  line-height: 20px !important;
  min-width: 20px;
}

.big-modal {
  width: 600px;
}

.text-center {
  text-align: center;
}

label {
  text-transform: capitalize;
}

.table-attribute {
  width: 250px;
}

.condensed-input {
  margin: 0;
  padding: 0;
  min-height: auto !important;
}
</style>