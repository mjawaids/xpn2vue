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
            <md-dialog-title class="text-center">Create Client Message Details</md-dialog-title>
            <md-dialog-content class="big-modal">
                <div>
                    <md-input-container v-for="(key, keyInd) in messageKeys" :key="keyInd">
                        <label>{{key}}</label>
                        <md-input v-model="el.message[key]"></md-input>
                    </md-input-container>
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
    name: 'message',
    props: ['el', 'mode', 'i', 'j'],
    methods: {
        openDialog(ref, value) {
            if(value !== '?' && value){
                this.$refs[ref].open();
            }
        },
        closeDialog(ref) {
            this.$refs[ref].close();
        },
        saveAndCloseDialog(ref) {
            this.closeDialog(ref);
        },
        setFieldIndex(fieldIndex){
            this.fieldInd = fieldIndex;
        }
    },
    computed: {
        messageKeys() {
            return Object.keys(this.el.message);
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

.big-modal {
    width: 600px;
}

.text-center {
    text-align: center;
}

label {
    text-transform: capitalize;
}

</style>