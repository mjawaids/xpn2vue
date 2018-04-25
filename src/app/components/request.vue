<template>
<div>
    <div v-if="mode === 'define'" class="corner-style">
        <md-select name="request" v-model="el.value" class="md-select-value corner-style">
            <md-option value="form">Form</md-option>
            <md-option value="?" selected>?</md-option>
        </md-select>
    </div>

    <div v-if="mode === 'design'" class="corner-style" @click="openDialog(`dialog-${i}${j}` ,el.value)">
        <md-select name="request" v-model="el.value" class="md-select-value corner-style" disabled>
            <md-option value="form">Form</md-option>
            <md-option value="?" selected>?</md-option>
        </md-select>
        <md-dialog v-if="el.value === 'form'" :ref="`dialog-${i}${j}`">
            <md-dialog-title class="text-center">Open Account Form Details</md-dialog-title>
            <md-dialog-content class="modal-grid">
                    <div class="column">
                        <md-list class="md-dense">
                        <md-list-item>
                            <span>Precondition</span>
                        </md-list-item>
                        <md-list-item>
                            <span>Fields</span>

                            <md-list-expand>
                            <md-list>
                                <md-list-item v-for="(field, fieldIndex) in el.form.fields" :key="fieldIndex" @click="setFieldIndex(fieldIndex)">
                                    {{field.label}}
                                    <md-button class="md-icon-button" @click="fireDeleteFormField(i, fieldIndex)">
                                        <md-icon>delete</md-icon>
                                    </md-button>
                                </md-list-item>
                                <md-button class="md-raised md-primary md-dense" @click="fireAddFormField(i)">
                                    <md-icon>add</md-icon>
                                </md-button>
                            </md-list>
                            </md-list-expand>
                        </md-list-item>
                        <md-list-item>
                            <span>Postcondition</span>
                        </md-list-item>
                        </md-list>
                    </div>
                    <div class="column">
                        <div v-if="!el.form.fields[fieldInd]">Please select a form from side menu</div>
                        <div v-else>
                            <md-input-container>
                                <label>Label</label>
                                <md-input v-model="el.form.fields[fieldInd].label"></md-input>
                            </md-input-container>
                            <md-input-container>
                                <label>Type</label>
                                <md-input v-model="el.form.fields[fieldInd].type"></md-input>
                            </md-input-container>
                            <md-input-container>
                                <label>Component</label>
                                <md-select name="movie" v-model="el.form.fields[fieldInd].component">
                                    <md-option value="text">Text</md-option>
                                    <md-option value="textarea">Textarea</md-option>
                                    <md-option value="tel">Tel</md-option>
                                    <md-option value="email">Email</md-option>
                                    <md-option value="checkbox">Checkbox</md-option>
                                    <md-option value="radio">Radio</md-option>
                                    <md-option value="date">Date</md-option>
                                </md-select>
                            </md-input-container>
                            <md-input-container>
                                <label>Value</label>
                                <md-input v-model="el.form.fields[fieldInd].value"></md-input>
                            </md-input-container>
                            <md-input-container>
                                <label>Rule</label>
                                <md-input v-model="el.form.fields[fieldInd].rule"></md-input>
                            </md-input-container>
                            <md-input-container>
                                <label>Mask</label>
                                <md-input v-model="el.form.fields[fieldInd].mask"></md-input>
                            </md-input-container>
                            <md-input-container>
                                <label>H</label>
                                <md-input v-model="el.form.fields[fieldInd].H"></md-input>
                            </md-input-container>
                            <md-input-container>
                                <label>W</label>
                                <md-input v-model="el.form.fields[fieldInd].W"></md-input>
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
    name: 'request',
    props: ['el', 'mode', 'i', 'j'],
    data: () => ({
        value: '',
        fieldInd: ''
    }),
    methods: {
        fireAddFormField(formIndex) {
            this.$bus.emit('addReqFormField', formIndex);
        },

        fireDeleteFormField(formIndex, fieldIndex) {
            this.$bus.emit('deleteReqFormField', formIndex, fieldIndex);
        },
        openDialog(ref, value) {
            if(value === 'form'){
                this.$refs[ref].open();
                this.value = this.el.value;
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

.modal-grid {
    display: grid;
    grid-column-gap: 10px;
    grid-template-columns: 200px 400px;
    height: 400px;
}

.modal-grid .column {
    border: solid 1px grey;
    border-radius: 5px; 
    padding: 5px;
}

</style>