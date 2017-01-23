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
        tabledata: [ 
            // // Top Row
            // [
            //     {type:'response', value:'?'}, 
            //     {type:'service', label:'New Service', value:''}, 
            //     {type:'task', value:'?'}
            // ], 
            
            // // Mid Row
            // [
            //     {type:'obj', label:'New Object', value:''},
            //     {type:'rule', label:'New Rule', value:''},
            //     {type:'subject', label:'New Actor', value:''}
            // ], 
            
            // // Bottom Row
            // [
            //     {type:'message', value:'?'},
            //     {type:'action', label:'New Action', value:''},
            //     {type:'request', value:'?'}
            // ] 
        ]
    }
});