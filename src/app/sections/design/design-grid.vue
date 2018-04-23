<template>
  <div id="design-grid" class="horizontal-scroll">
    <table class="table">
        <tr v-for="(row, i) in grid" :key="i">
            <td v-for="(el, j) in row" :class="el.type" :key="j">
              <design-element :el="el" :mode="'design'" :i="i" :j="j"></design-element>
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
    },
    created() {

        let addReqFormField = this.addReqFormField;
        this.$bus.on('addReqFormField', function (formIndex) {
            addReqFormField(formIndex);
        });

        let deleteReqFormField = this.deleteReqFormField;
        this.$bus.on('deleteReqFormField', function (formIndex, fieldIndex) {
            deleteReqFormField(formIndex, fieldIndex);
        });

    },
    methods: {
        addReqFormField(formIndex){
            this.$store.commit('addFieldToRequestForm', formIndex);
        },
        deleteReqFormField(formIndex, fieldIndex){
            this.$store.commit('deleteFieldFromRequestForm', formIndex, fieldIndex);
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
