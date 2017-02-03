Vue.use(VueMaterial);
Vue.material.registerTheme({
  default: {
    primary: 'blue',
    accent: 'red'
  },
  green: {
    primary: 'green',
    accent: 'pink'
  },
  orange: {
    primary: 'orange',
    accent: 'green'
  },
});

new Vue({
    el: '#app',
    data: {
        tabledata: [],
        problem: 'Problem',
        version: 'V01',
        author: 'Author',
        versions: ['V01', 'V02']
    },

    methods: {
      confirmCancel(ref) {
        this.$refs[ref].open();
      },

      saveData() {
        bus.$emit('saveData');
      },
      
      onClose(type) {
        if(type == 'ok') {
          bus.$emit('clearData');
        }
      }
    }
});