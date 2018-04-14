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
                
                <xpn-bar></xpn-bar>
                <define-grid></define-grid>

            </md-tab>

            <!-- ######################################## DESIGN ######################################## -->

            <md-tab id="design" md-label="Design">
                
                <xpn-bar></xpn-bar>
                <design-grid></design-grid>

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
import xpnBar from './app/components/xpn-bar.vue';
import defineGrid from './app/sections/define/define-grid.vue';
import designGrid from './app/sections/design/design-grid.vue';

export default {
    name: 'app',
    components: { xpnBar, defineGrid, designGrid }
}
</script>

<style>

.align-center {
    text-align: center;
}

</style>
