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
                <xpn-design-element :el="el"></xpn-design-element>
            </td>
        </tr>
    </table>
  </div>
</template>

<script>
import xpnDesignElement from './xpn-design-element.vue';

export default {
    name: 'xpn-design',
    components: { xpnDesignElement },

    data () {
        return {
            grid: []
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
