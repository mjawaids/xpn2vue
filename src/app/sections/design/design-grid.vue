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
        this.$bus.on('addReqFormField', function (indices) {
            addReqFormField(indices);
        });

        let deleteReqFormField = this.deleteReqFormField;
        this.$bus.on('deleteReqFormField', function (indices) {
            deleteReqFormField(indices);
        });

        let addMessageAttribute = this.addMessageAttribute;
        this.$bus.on('addMessageAttribute', function (indices) {
            addMessageAttribute(indices);
        });

        let deleteMessageAttribute = this.deleteMessageAttribute;
        this.$bus.on('deleteMessageAttribute', function (indices) {
            deleteMessageAttribute(indices);
        });

        let addObjAttr = this.addObjAttr;
        this.$bus.on('addObjAttr', function (indices) {
            addObjAttr(indices);
        });

        let deleteObjAttr = this.deleteObjAttr;
        this.$bus.on('deleteObjAttr', function (indices) {
            deleteObjAttr(indices);
        });

    },
    methods: {
        addReqFormField(indices){
            this.$store.commit('addFieldToRequestForm', indices);
        },
        deleteReqFormField(indices){
            this.$store.commit('deleteFieldFromRequestForm', indices);
        },
        addMessageAttribute(indices){
            this.$store.commit('addAttributeToMessage', indices);
        },
        deleteMessageAttribute(indices){
            this.$store.commit('deleteAttributeFromMessage', indices);
        },
        addObjAttr(indices){
            this.$store.commit('addAttributeToObj', indices);
        },
        deleteObjAttr(indices){
            console.log(indices);
            this.$store.commit('deleteAttributeFromObj', indices);
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
