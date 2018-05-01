<template>
  <div>
    <div v-for="(item, itemIndex) in obj" :key="itemIndex">
      <md-list class="md-dense">
          <md-list-item :style="indentStyle" @click="handleClick(item)">
              <div class="z-index-2" @click="handleClick(item)">
                <span class="tree-list-label">{{item.label}}</span>
                <span v-if="type === 'action'">
                  <span>, Order = </span>
                  <input class="input-bordered" v-model="item.order">
                  <span>, Filter = </span>
                  <input class="input-bordered" v-model="item.filter">
                </span>
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
                <md-button class="md-icon-button md-dense" @click="deleteObj(itemIndex)">
                  <md-icon>delete</md-icon>
                </md-button>
              <md-list-expand v-if="item.children.length">
              <md-list>
                <tree-list :obj="item.children" :depth="depth+1" :type="type" @unindent="handleUnIndent"></tree-list>
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
  props: ['obj', 'depth', 'type'],
  data: () => ({
    clickedItem: ''
  }),
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
      if(this.obj[itemIndex-1]){
        let item = this.obj[itemIndex];
        this.obj.splice(itemIndex, 1);
        this.obj[itemIndex-1].children.push(item);
      }
    },
    unIndent(itemIndex){
      let item = this.obj[itemIndex];
      this.obj.splice(itemIndex, 1);
      this.$emit('unindent', item);
    },
    deleteObj(itemIndex) {
      let clickedItemString = JSON.stringify(this.clickedItem);
      let currentItemString = JSON.stringify(this.obj[itemIndex]);
      console.log(clickedItemString === currentItemString);
      if(clickedItemString === currentItemString){
        this.handleClick("");
      }
      this.obj.splice(itemIndex, 1);
    },
    handleUnIndent(event){
      this.obj.push(event);
    },
    handleClick(obj) {
      this.$bus.emit('itemClicked', obj);
      this.clickedItem = obj;
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
    height: 30px;
    line-height: 30px;
  }

</style>