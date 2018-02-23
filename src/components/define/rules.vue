<template>
    <md-layout class="e">
        <rule v-for="rul in el.value" :el="rul" :key="rul"></rule>
    </md-layout>
</template>

<script>
import rule from './rule.vue';

export default {
    name: 'rules',
    props: ['el'],
    components: { rule }
}
</script>

<style>
.e {
    overflow-y: auto;
    max-height: 214px;
}
</style>