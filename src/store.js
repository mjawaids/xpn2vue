export default {
  state: {
    data: [],
    problem: '',
    version: '',
    author: '',

    defaults: {
      /**     TOP ROWS     */

      /** RESPONSE */
      response: {type:'response', value:'?'},
      /** SERVICE */
      service: {type:'service', label:'New Service', value:''},
      /** TASK */
      task: {type:'task', value:'?'},

      /**     MID ROWS     */

      /** OBJECT */
      obj: {type:'obj', label:'New Object', value:''},
      /** RULES */
        rules: {type:'rules', value:[
            {type:'rule', label:'New Rule', rule:'' }
        ]},
      /** SUBJECT */
      subject: {type:'subject', label:'New Actor', value:''},

      /**     BOTTOM ROWS     */

      /** MESSAGE */
      message: {
        type: 'message',
        value: '?',
        attribute: [
          {title: '', value: ''}
        ]
      },
      /** ACTION */
      action: {type:'action', label:'New Action', value:''},
      /** REQUEST */
      request: {
        type: 'request',
        value: '?',
        form: {
          preCondition: [],
          fields: [
            {
              label: 'New Field',
              type: 'Input (Outpus, Search, Lookup)',
              component: 'text',
              value: '',
              rule: '',
              mask: '',
              H: '',
              W: ''
            }
          ],
          postCondition: []
        }
      }
    }
  },

  // getters: {
  //     createService: state => {
  //         return {type:'service', label:'New Service mama', value:''};
  //     }
  // },

  mutations: {
    addTopRow(state) {
        state.data.push(
            [
        state.defaults.response,
        state.defaults.service,
        state.defaults.task
            ]
        );
    },

    addMidRow(state) {
        state.data.push(
            [
        state.defaults.obj,
        state.defaults.rules,
        state.defaults.subject
            ]
        );
    },

    addBottomRow(state) {
        state.data.push(
            [
        state.defaults.message,
        state.defaults.action,
        state.defaults.request
            ]
        );
    },
    addFieldToRequestForm(state, indices) {
      state.data[indices.i][indices.j].form.fields.push({
        label: "New Field",
        type: "Input (Outpus, Search, Lookup)",
        component: "text",
        value: "",
        rule: "",
        mask: "",
        H: "",
        W: ""
      });
    },
    deleteFieldFromRequestForm(state, indices) {
      state.data[indices.i][indices.j].form.fields.splice(indices.fieldIndex, 1);
    },

    addAttributeToMessage(state, indices) {
      console.log(indices, state.data[indices.i][indices.j]);
      state.data[indices.i][indices.j].attribute.push({
        title: "",
        value: ""
      });
    },

    deleteAttributeFromMessage(state, indices) {
      state.data[indices.i][indices.j].attribute.splice(indices.attrIndex, 1);
    },

    updateData(state, value) {
      state.data = value;
    },

    updateProblem(state, value) {
      state.problem = value;
    },

    updateVersion(state, value) {
      state.version = value;
    },

    updateAuthor(state, value) {
      state.author = value;
    }
  }
};