<template>
  <div id="xpn-design" class="horizontal-scroll">
    <table class="table">
        <tr v-for="row in grid">
            <td v-for="el in row" :class="{
                    a: el.type == 'rules',
                    b: el.type == 'service' || el.type == 'action',
                    c: el.type == 'obj' || el.type == 'subject',
                    d: el.type == 'response' || el.type == 'task' || el.type == 'message' || el.type == 'request',
                }">
                <xpn-element-design :el="el"></xpn-element-design>
            </td>
        </tr>
    </table>
  </div>
</template>

<script>
import xpnElementDesign from './xpn-element-design.vue';

export default {
    name: 'xpn-design',
    props: { gridData: { type: Array, required: false } },
    components: { xpnElementDesign },

    data () {
        return {
            grid: []
        }
    },

    created() {
        let save = this.save;
        this.$bus.on('saveData', function () {
            save();
        });

        let clear = this.clear;
        this.$bus.on('clearData', function () {
            clear();
        });

        this.init();
    },

    methods: {
        init() {
            this.grid = this.gridData;

            if(this.grid.length != 0) {
                return;
            }

            this.grid = JSON.parse(localStorage.getItem('xpn-data') || '[]');

            if(this.grid.length != 0) {
                return;
            }

            this.grid.push(
                [
                    {type:'response', value:'?'},
                    {type:'service', label:'New Service', value:''},
                    {type:'task', value:'?'}
                ]
            );

            this.grid.push(
                [
                    {type:'obj', label:'New Object', value:''},
                    {type:'rules', value:[
                        {type:'rule', label:'New Rule', value:''}
                    ]},
                    {type:'subject', label:'New Actor', value:''}
                ]
            );

            this.grid.push(
                [
                    {type:'message', value:'?'},
                    {type:'action', label:'New Action', value:''},
                    {type:'request', value:'?'}
                ]
            );
        }
    }
}
</script>

<style>
.table {
    margin: auto;
}

td {
    border: 2px solid lightgray;
    white-space: nowrap;
}

.horizontal-scroll {
    overflow: auto;
    overflow-y: hidden;
}

.a {
  width:230px;
  height:214px
}

.b {
  width: 214px;
  height: 20px;
}

.c {
  width: 20px;
  height: 214px;
  vertical-align: top;
}

.d {
  width: 20px;
  height: 20px;
}
</style>
