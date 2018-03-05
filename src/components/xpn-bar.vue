<template>
    <md-layout class="bar">    

        <md-layout md-flex-offset="20">
            <input class="align-right width-med font-xlarge" v-model="problem" maxlength="30">
            <span class="font-xlarge">&nbsp;_</span>
            <input class="align-center width-small font-xlarge" v-model="version" maxlength="5">
            <span class="font-xlarge">_&nbsp;</span>
            <input class="width-med font-xlarge" v-model="author" maxlength="30">
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

    computed: {
        
        problem: {
            get () {
                return this.$store.state.problem;
            },
            set (value) {
                this.$store.commit('updateProblem', value);
            }
        },

        version: {
            get () {
                return this.$store.state.version;
            },
            set (value) {
                this.$store.commit('updateVersion', value);
            }
        },

        author: {
            get () {
                return this.$store.state.author;
            },
            set (value) {
                this.$store.commit('updateAuthor', value);
            }
        }
    },

    created: function() {
        this.$store.commit('updateProblem', 'Problem');
        this.$store.commit('updateVersion', 'V01');
        this.$store.commit('updateAuthor', 'Author');
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