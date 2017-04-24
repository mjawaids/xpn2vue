<template>
  <div id="app">
    <h2 class="flex align-center">EU 2 EU Software Factory</h2>

        <md-tabs md-fixed>
            <md-tab id="import" md-label="Import">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolorum quas amet cum vitae, omnis! Illum quas voluptatem, expedita iste, dicta ipsum ea veniam dolore in, quod saepe reiciendis nihil.</p>
            </md-tab>

            <md-tab id="define" md-label="Define" md-active>
                
                <md-layout class="bar">    

                    <md-layout md-flex-offset="20">
                        <input class="align-right width-med font-xlarge" v-model="problem" maxlength="30"></input>
                        <span class="font-xlarge">&nbsp;_</span>
                        <input class="align-center width-small font-xlarge" v-model="version" maxlength="5"></input>
                        <span class="font-xlarge">_&nbsp;</span>
                        <input class="width-med font-xlarge" v-model="author" maxlength="30"></input>
                    </md-layout>

                    <md-layout md-flex="15" class="align-right">
                        <md-button class="md-icon-button"><md-icon md-theme="green" class="md-primary">done</md-icon></md-button>
                        <md-button class="md-icon-button"><md-icon class="md-accent">clear</md-icon></md-button>
                    </md-layout>

                </md-layout>
            
                <xpn-grid :grid-data="tabledata"></xpn-grid>

            </md-tab>

            <md-tab id="design" md-label="Design">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolorum quas.</p>
            </md-tab>

            <md-tab id="develop" md-label="Develop">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolorum quas.</p>
            </md-tab>

            <md-tab id="deploy" md-label="Deploy">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolorum quas.</p>
            </md-tab>

            <md-tab id="export" md-label="Export">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolorum quas.</p>
            </md-tab>
        </md-tabs>

        <!-- CONFIRMATION DIALOG FOR CLEARING DATA -->
        <md-dialog-confirm
            md-title="Are you sure?"
            md-content-html="This will clear the existing state."
            md-ok-text="Yes"
            md-cancel-text="No"
            @close="onClose"
            ref="cancelDialog">
        </md-dialog-confirm>
  </div>
</template>

<script>
import xpnGrid from './components/xpn-grid.vue';

export default {
  name: 'app',
  components: { xpnGrid },

  data () {
    return {
      tabledata: [],
      problem: 'Problem',
      version: 'V01',
      author: 'Author',
      versions: ['V01', 'V02']
    }
  },

  methods: {
    confirmCancel(ref) {
        this.$refs[ref].open();
    },

    saveData() {
        this.$bus.emit('saveData');
    },
      
    onClose(type) {
        if(type == 'ok') {
          this.$bus.emit('clearData');
        }
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
