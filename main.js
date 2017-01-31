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
        tabledata: []
    },

    methods: {
      confirmCancel(ref) {
        this.$refs[ref].open();
      },
      
      onClose(type) {
        if(type == 'ok') {
          bus.$emit('clearData');
        }
      }
    }
});