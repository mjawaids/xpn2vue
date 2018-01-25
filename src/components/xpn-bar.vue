<template>
    <md-layout class="bar">    

        <md-layout md-flex-offset="20">
            <input class="align-right width-med font-xlarge" v-model="data.problem" @change="update" maxlength="30"></input>
            <span class="font-xlarge">&nbsp;_</span>
            <input class="align-center width-small font-xlarge" v-model="data.version" @change="update" maxlength="5"></input>
            <span class="font-xlarge">_&nbsp;</span>
            <input class="width-med font-xlarge" v-model="data.author" @change="update" maxlength="30"></input>
        </md-layout>

        <md-layout md-flex="15" class="align-right">
            <md-button class="md-icon-button"><md-icon md-theme="green" class="md-primary">done</md-icon></md-button>
            <md-button class="md-icon-button"><md-icon class="md-accent">clear</md-icon></md-button>
        </md-layout>

    </md-layout>
</template>

<script>
export default {
    name: 'xpn-bar',

    data() {
        return {
            data: {
                problem: 'Problem',
                version: 'V01',
                author: 'Author'
            }
        }
    },

    methods: {
        update() {
            console.log(model);
            this.$emit('barupdated', this.data);
        }
    }
}
</script>

<style>

input {
    height: 40px;
    border: none;
    font-family: inherit;
    background-color: inherit;
}

.bar {
    margin: 20px;
    padding: 10px 20px;
    border-radius: 20px;
    background-color: #eee;
}

.align-center {
    text-align: center;
}

.align-right {
    text-align: right;
}

.width-small {
    width: 40px;
}

.width-med {
    width: 230px;
}

.font-xlarge {
    font-size: x-large;
}

</style>