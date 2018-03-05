<template>
  <div id="design-grid" class="horizontal-scroll">
    <table class="table">
        <tr v-for="row in grid">
            <td v-for="el in row" :class="el.type">
                <design-element :el="el"></design-element>
            </td>
        </tr>
    </table>
  </div>
</template>

<script>
import designElement from './design-element.vue';

export default {
    name: 'design-grid',
    components: { designElement },

    computed: {
        grid() {
            return this.$store.state.data;
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

.rules {
  width:230px;
  height:214px
}

.service, .action {
  width: 214px;
  height: 20px;
}

.obj, .subject {
  width: 20px;
  height: 214px;
  vertical-align: top;
}

.response, .task, .message, .request {
  width: 20px;
  height: 20px;
}

</style>
