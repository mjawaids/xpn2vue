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
        message: {
          socialSecurityNumber: '',
          name: '',
          address: '',
          zipcode: '',
          place: '',
          dateOfBirth: '',
          gender: 'Uppercase(Gender)',
          contract: '',
          signature: ''
        }
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
    addFieldToRequestForm(state, formIndex) {
      state.data[formIndex][2].form.fields.push({
        label: 'New Field',
        type: 'Input (Outpus, Search, Lookup)',
        component: 'text',
        value: '',
        rule: '',
        mask: '',
        H: '',
        W: ''
      });
    },
    deleteFieldFromRequestForm(state, formIndex, fieldIndex) {
      state.data[formIndex][2].form.fields.splice(fieldIndex, 1);
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