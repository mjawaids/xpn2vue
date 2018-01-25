<template>
    <component :el="el" v-bind:is="el.type" >
        <!-- component changes when vm.el.type changes! -->
    </component>
</template>

<script>
import response from './response.vue';
import service from './service.vue';
import task from './task.vue';
import obj from './obj.vue';
import rules from './rules.vue';
import subject from './subject.vue';
import message from './message.vue';
import action from './action.vue';
import request from './request.vue';

export default {
    name: 'xpn-design-element',
    props: ['el'],
    components: {
        response,
        service,
        task,
        obj,
        rules,
        subject,
        message,
        action,
        request
    }
}
</script>

<style>
</style>