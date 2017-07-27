<template>
    <component :el="el" v-bind:is="el.type"  >
    </component>
</template>

<script>
import response from './response.vue';
import service from './designService.vue';
import task from './task.vue';
import obj from './designObject.vue';
import rules from './designRules.vue';
import subject from './designSubject.vue';
import message from './message.vue';
import action from './designAction.vue';
import request from './request.vue';

export default {
    name: 'xpn-element-design',
    props:['el'],
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
