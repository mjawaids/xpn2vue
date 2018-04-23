<template>
    <component :el="el" :mode="mode" :i="i" :j="j" v-bind:is="el.type" >
        <!-- component changes when vm.el.type changes! -->
    </component>
</template>

<script>
import response from '../../components/response.vue';
import service from '../../components/service.vue';
import task from '../../components/task.vue';
import obj from '../../components/obj.vue';
import rules from '../../components/rules.vue';
import subject from '../../components/subject.vue';
import message from '../../components/message.vue';
import action from '../../components/action.vue';
import request from '../../components/request.vue';

export default {
    name: 'design-element',
    props: ['el', 'mode', 'i', 'j'],
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