<template>
    <component :el="el" v-bind:is="el.type"  >

        <!-- component changes when vm.el.type changes! -->
    </component>


</template>

<script>
import response from './response.vue';
import service from './service0.vue';
import task from './task.vue';
import obj from './obj0.vue';
import rules from './rules0.vue';
import subject from './subject0.vue';
import message from './message.vue';
import action from './action0.vue';
import request from './request.vue';

export default {
    name: 'xpn-element0',
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
