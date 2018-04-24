<template>
    <md-layout class="e">
        <rule v-for="(rul, index) in el.value" :el="rul" :mode="mode" :i="i" :j="j" :key="index"></rule>
    </md-layout>
</template>

<script>
import rule from './rule.vue';

export default {
    name: 'rules',
    props: ['el', 'mode', 'i', 'j'],
    components: { rule }
}
</script>

<style>
.e {
    overflow-y: auto;
    max-height: 214px;
}
</style>