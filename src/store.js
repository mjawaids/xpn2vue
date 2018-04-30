export default {
  state: {
    data: [],
    problem: '',
    version: '',
    author: '',

    defaults: {
      /**     TOP ROWS     */

      /** RESPONSE */
      response: {type:'response', value:'?', objects: []},
      /** SERVICE */
      service: {type:'service', label:'New Service', value:''},
      /** TASK */
      task: {type:'task', value:'?'},

      /**     MID ROWS     */

      /** OBJECT */
      obj: {
        type: 'obj',
        label: 'New Object',
        value:'',
        attributes: [
          {
            attribute: 'New Attribute',
            type: '',
            key: '',
            enumValues: '',
            parent: '',
            rule: ''
          }
        ]
      },
      /** RULES */
      rules: {
        type:'rules',
        value:[{type:'rule', label:'New Rule', rule:'' }]
      },
      /** SUBJECT */
      subject: {type:'subject', label:'New Actor', value:''},

      /**     BOTTOM ROWS     */

      /** MESSAGE */
      message: {
        type: 'message',
        value: '?',
        attribute: [{title: '', value: ''}]
      },
      /** ACTION */
      action: {type:'action', label:'New Action', objects: [] },
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

  getters: {
    // createService: state => {
    //     return {type:'service', label:'New Service mama', value:''};
    // }
    getAllObjects(state) {
      return state.data
        .map(row => row.filter(column => column.type === 'obj'))
        .filter(item => item.length)[0];
    }
  },

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
    deleteFieldFromRequestForm(state, indices) {
      state.data[indices.i][indices.j].form.fields.splice(indices.fieldIndex, 1);
    },

    addAttributeToMessage(state, indices) {
      state.data[indices.i][indices.j].attribute.push({
        title: '',
        value: ''
      });
    },

    deleteAttributeFromMessage(state, indices) {
      state.data[indices.i][indices.j].attribute.splice(indices.attrIndex, 1);
    },

    addAttributeToObj(state, indices) {
      state.data[indices.i][indices.j].attributes.push({
        attribute: 'New Attribute',
        type: '',
        key: '',
        enumValues: '',
        parent: '',
        rule: ''
      });
    },

    deleteAttributeFromObj(state, indices) {
      state.data[indices.i][indices.j].attributes.splice(indices.attrIndex, 1);
    },

    addObjToAction(state, data) {
      state.data[data.i][data.j].objects.push(
        {
          label: data.selectedObj,
          order: '',
          filter: '',
          children: []
        }
      );
    },
    addObjToAction(state, data) {
      state.data[data.i][data.j].objects.push(
        {
          label: data.selectedObj,
          order: '',
          filter: '',
          children: []
        }
      );
    },
    
    addObjToResponse(state, data) {
      state.data[data.i][data.j].objects.push({
        label: data.selectedObj,
        objectAttributes: {
          order: '',
          filter: ''
        },
        fieldAttributes: {
          label: '',
          value: '',
          mask: '',
          W: '',
          H: ''
        },
        children: []
      });
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