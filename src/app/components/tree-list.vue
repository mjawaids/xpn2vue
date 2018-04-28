<template>
  <div>
    <div v-for="(item, itemIndex) in obj" :key="itemIndex">
      <md-list class="md-dense">
          <md-list-item class="mini-dropdown-btn" :style="indentStyle">
              <div class="z-index-2">
                <span class="tree-list-label">{{item.label}}, </span>
                <span>Order = </span>
                <input class="input-bordered" v-model="item.order">
                <span>, Filter = </span>
                <input class="input-bordered" v-model="item.filter">
                <md-button class="md-icon-button md-dense" @click="down(itemIndex)">
                  <md-icon>arrow_downward</md-icon>
                </md-button>
                <md-button class="md-icon-button md-dense" @click="up(itemIndex)">
                  <md-icon>arrow_upward</md-icon>
                </md-button>
                <md-button class="md-icon-button md-dense" @click="unIndent(itemIndex)">
                  <md-icon>arrow_backward</md-icon>
                </md-button>
                <md-button class="md-icon-button md-dense" @click="indent(itemIndex)">
                  <md-icon>arrow_forward</md-icon>
                </md-button>
                </div>
              <md-list-expand v-if="item.children.length">
              <md-list>
                <tree-list :obj="item.children" :depth="depth+1" @unindent="handleUnIndent"></tree-list>
              </md-list>
              </md-list-expand>
          </md-list-item>
        </md-list>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tree-list',
  props: ['obj', 'depth'],
  methods: {
    up(itemIndex){
      let item = this.obj[itemIndex];
      let previousIndex = (itemIndex-1 < 0) ? 0 : itemIndex-1;
      this.obj.splice(itemIndex, 1);
      this.obj.splice(previousIndex, 0, item);
    },
    down(itemIndex){
      let item = this.obj[itemIndex];
      let nextIndex = (itemIndex+1 > this.obj.length-1) ? this.obj.length-1 : itemIndex+1;
      this.obj.splice(itemIndex, 1);
      this.obj.splice(nextIndex, 0, item);
    },
    indent(itemIndex){
      if(this.obj[itemIndex-1].children){
        let item = this.obj[itemIndex];
        this.obj.splice(itemIndex, 1);
        this.obj[itemIndex-1].children.push(item);
      }
    },
    unIndent(itemIndex){
      // if(this.obj[itemIndex-1].children){
        let item = this.obj[itemIndex];
        this.obj.splice(itemIndex, 1);
        this.$emit('unindent', item);
      // }
    },
    handleUnIndent(event){
      this.obj.push(event);
    }
  },
  computed: {
    indentStyle() {
      return { transform: `translate(${this.depth * 5}px)` }
    }
  }
}
</script>

<style>
  .z-index-2 {
    z-index: 2;
  }

  .input-bordered {
    border: rgb(32, 162, 206) 1px solid;
    height: 30px;
  }

  .tree-list-label{
    display: inline-block;
    width: 80px;
  }

</style>