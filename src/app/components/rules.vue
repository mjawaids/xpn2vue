<template>
<div @click="openDialog(`dialog-${i}${j}`, mode)">
    <md-layout class="e">
        <rule v-for="(rul, index) in el.value" :el="rul" :mode="mode" :i="i" :j="j" :key="index"></rule>
    </md-layout>
    <md-dialog v-if="mode === 'design'" :ref="`dialog-${i}${j}`">
            <md-dialog-title class="text-center">Rule Details</md-dialog-title>
            <md-dialog-content class="big-modal">
                <md-table>
                    <md-table-header>
                        <md-table-row>
                            <md-table-head>Rule Name</md-table-head>
                            <md-table-head>Condition</md-table-head>
                        </md-table-row>
                    </md-table-header>

                    <md-table-body>
                        <md-table-row v-for="(rul, index) in el.value" :key="index">
                            <md-table-cell class="table-attribute">
                                <md-input-container class="condensed-input">
                                    <md-input v-model="rul.label"></md-input>
                                </md-input-container>
                            </md-table-cell>
                            <md-table-cell>
                                <md-input-container class="condensed-input">
                                    <md-input v-model="rul.rule"></md-input>
                                </md-input-container>
                                <md-button class="md-icon-button" @click="fireDeleteRule(rul)">
                                    <md-icon>delete</md-icon>
                                </md-button>
                            </md-table-cell>
                        </md-table-row>
                    </md-table-body>
                </md-table>
                <!-- <md-button class="md-raised md-primary md-dense" @click="fireAddRule">Add Attribute</md-button> -->
            </md-dialog-content>

            <md-dialog-actions>
                <md-button class="md-primary" @click="closeDialog(`dialog-${i}${j}`)">close</md-button>
                <md-button class="md-primary" @click="saveAndCloseDialog(`dialog-${i}${j}`)">save</md-button>
            </md-dialog-actions>
        </md-dialog>
        <!-- <button @click="openDialog(`dialog-${i}${j}`)"></button> -->
</div>
</template>

<script>
import rule from './rule.vue';

export default {
    name: 'rules',
    props: ['el', 'mode', 'i', 'j'],
    components: { rule },
    methods: {
        fireAddRule() {
            this.$bus.emit('addRule');
        },

        fireDeleteRule(el) {
            this.$bus.emit('deleteRule', el);
        },
        openDialog(ref, mode) {
            if(mode === 'design'){
                this.$refs[ref].open();
                this.value = this.el.value;
            }
        },
        closeDialog(ref) {
            this.$refs[ref].close();
        },
        saveAndCloseDialog(ref) {
            this.closeDialog(ref);
        }
    }
}
</script>

<style>
.e {
    overflow-y: auto;
    max-height: 214px;
}
</style>