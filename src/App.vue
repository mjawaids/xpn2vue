<template>
  <div id="app">
    <h2 class="flex align-center">EU 2 EU Software Factory</h2>

        <md-tabs md-fixed>

            <!-- ######################################## IMPORT ######################################## -->

            <md-tab id="import" md-label="Import">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolorum quas amet cum vitae, omnis! Illum quas voluptatem, expedita iste, dicta ipsum ea veniam dolore in, quod saepe reiciendis nihil.</p>
            </md-tab>

            <!-- ######################################## DEFINE ######################################## -->

            <md-tab id="define" md-label="Define" md-active>
                
                <xpn-bar @barupdated='updateBar'></xpn-bar>
                <define-grid :grid-data="tabledata"></define-grid>

            </md-tab>

            <!-- ######################################## DESIGN ######################################## -->

            <md-tab id="design" md-label="Design">
                
                <xpn-bar @barupdated='updateBar'></xpn-bar>

            </md-tab>

            <!-- ######################################## DEVELOP ######################################## -->

            <md-tab id="develop" md-label="Develop">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolorum quas.</p>
            </md-tab>

            <!-- ######################################## DEPLOY ######################################## -->

            <md-tab id="deploy" md-label="Deploy">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolorum quas.</p>
            </md-tab>

            <!-- ######################################## EXPORT ######################################## -->

            <md-tab id="export" md-label="Export">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolorum quas.</p>
            </md-tab>
        </md-tabs>

  </div>
</template>

<script>
import xpnBar from './components/xpn-bar.vue';
import defineGrid from './components/define/define-grid.vue';

export default {
  name: 'app',
  components: { xpnBar, defineGrid },

  data () {
    return {
      tabledata: []
    }
  },

  methods: {
    confirmCancel(ref) {
        this.$refs[ref].open();
    },

    saveData() {
        this.$bus.emit('saveData');
    },

    updateBar(data) {
        model.problem = data.problem;
        model.version = data.version;
        model.author = data.author;
    }
  }
}
</script>

<style>

.align-center {
    text-align: center;
}

</style>
