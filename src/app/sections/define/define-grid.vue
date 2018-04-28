<template>
  <div id="define-grid" class="horizontal-scroll">
    <table class="table">
        <tr v-for="(row,i) in grid" :key="i">
            <td v-for="(el,j) in row" :class="el.type" :key="j">
                <define-element :el="el" :mode="'define'" :i="i" :j="j"></define-element>
            </td>
        </tr>
    </table>
  </div>
</template>

<script>
import defineElement from './define-element.vue';

export default {
    name: 'define-grid',
    components: { defineElement },

    computed: {
        grid() {
            return this.$store.state.data;
        }
    },

    created() {

        let clear = this.resetGrid;
        this.$bus.on('clearData', function () {
            clear();
        });

        let addrow = this.addRow;
        this.$bus.on('addRow', function (param) {
            addrow(param);
        });

        let delrow = this.deleteRow;
        this.$bus.on('deleteRow', function (param) {
            delrow(param);
        });

        let addcol = this.addCol;
        this.$bus.on('addCol', function (param) {
            addcol(param);
        });

        let delcol = this.deleteCol;
        this.$bus.on('deleteCol', function (param) {
            delcol(param);
        });

        let addrule = this.addRule;
        this.$bus.on('addRule', function () {
            addrule();
        });

        let delrule = this.deleteRule;
        this.$bus.on('deleteRule', function (param) {
            delrule(param);
        });

        this.init();
    },

    methods: {

        init() {

            if(this.$store.state.data.length != 0) {
                return;
            }

            this.$store.commit('addTopRow');
            this.$store.commit('addMidRow');
            this.$store.commit('addBottomRow');
        },

        resetGrid() {
            for(let i = 0; i < this.$store.state.data.length; i++) {
                this.$store.state.data.splice(i, this.$store.state.data.length);
            }

            this.init();
        },

        findMidColofMidRow() {
            let midRowIndex = this.findMidRow();

            for(let i = 0; i<this.$store.state.data[midRowIndex].length; i++) {
                if(this.$store.state.data[midRowIndex][i].type == 'rules') {
                    return i;
                }
            }
        },

        findMidColOfTopRow() {
            for(let i = 0; i<this.$store.state.data[0].length; i++) {
                if(this.$store.state.data[0][i].type == 'service') {
                    return i;
                }
            }
        },

        findMidColOfBottomRow() {
            let index = this.$store.state.data.length - 1;
            for(let i = 0; i<this.$store.state.data[index].length; i++) {
                if(this.$store.state.data[index][i].type == 'action') {
                    return i;
                }
            }
        },

        findMidRow() {
            for(let i = 0; i<this.$store.state.data.length; i++) {
                if(this.$store.state.data[i][0].type == 'obj') {
                    return i;
                }
            }
        },

        findCol(obj) {
            for(let i = 0; i<this.$store.state.data.length; i++) {
                for(let j = 0; j<this.$store.state.data[i].length; j++) {
                    if(this.$store.state.data[i][j] == obj) {
                        return j;
                    }
                }
            }
        },

        findRules() {
            let midRowIndex = this.findMidRow();
            let midColIndex = this.findMidColofMidRow();
            
            return this.$store.state.data[midRowIndex][midColIndex].value;
        },

        createTopRow() {
            let index = this.findMidColOfTopRow();
            let length = this.$store.state.data[0].length;
            
            let numOfResponses = index;
            let numOfTasks = length - index - 1;

            let row = [];

            this.addResponsesInRow(row, numOfResponses);

            let service = this.createService();
            row.push(service);

            this.addTasksInRow(row, numOfTasks);

            return row;
        },

        addResponsesInRow(row, numOfResponses) {
            for(let i=0; i<numOfResponses; i++) {
                row.push( this.createResponse() );
            }
        },

        createResponse() {
            return {type:'response', value:'?', objects:[]};
        },

        createService() {
            return {type:'service', label:'New Service', value:''};
        },

        addTasksInRow(row, numOfTasks){
            for(let i=0; i<numOfTasks; i++) {
                row.push( this.createTask() );
            }
        },

        createTask() {
            return {type:'task', value:'?'};
        },

        createBottomRow() {
            let index = this.findMidColOfBottomRow();
            let lastRowIndex = this.$store.state.data.length - 1;
            let length = this.$store.state.data[lastRowIndex].length;
            
            let numOfMessages = index;
            let numOfRequests = length - index - 1;

            let row = [];

            this.addMessagesInRow(row, numOfMessages);    

            let action = this.createAction();
            row.push(action);

            this.addRequestsInRow(row, numOfRequests);

            return row;
        },

        addMessagesInRow(row, numOfMessages) {
            for(let i=0; i<numOfMessages; i++) {
                row.push( this.createMessage() );
            }
        },

        createMessage() {
            return {
                type:'message', 
                value:'?',
                attribute: [{title: "", value: ""}]
            };
        },

        createAction() {
            return {type:'action', label:'New Action', value:'', objects:[]};
        },

        addRequestsInRow(row, numOfRequests) {
            for(let i=0; i<numOfRequests; i++) {
                row.push( this.createRequest() );
            }
        },

        createRequest() {
            return {
                type:'request', 
                value:'?', 
                form: {
                    preCondition: [],
                    fields: [{
                        label: 'New Field',
                        type: 'Input (Outpus, Search, Lookup)',
                        component: 'text',
                        value: '',
                        rule: '',
                        mask: '',
                        H: '',
                        W: ''
                    }],
                    postCondition: []
                }
            };
        },

        addRow(atTop) {
            if(atTop) {
                this.addRowToTop( this.createTopRow() );
                return;
            }

            this.addRowToBottom( this.createBottomRow() );
        },

        addRowToTop( row ) {
            this.$store.state.data.unshift( row );
        },

        addRowToBottom( row ) {
            this.$store.state.data.push( row );
        },

        deleteRow(obj) {
            let foundRow = false;
            
            for(let i = 0; i<this.$store.state.data.length; i++) {
                for(let j = 0; j<this.$store.state.data[i].length; j++) {
                    if(this.$store.state.data[i][j] == obj) {
                        foundRow = true;
                        break;
                    }
                }

                if(foundRow) {
                    let midRowIndex = this.findMidRow();

                    // check for min grid with top, mid, and bottom rows
                    if(i < midRowIndex && midRowIndex == 1) {
                        // cannot delete service row. min 1 required
                        break;
                    }

                    if(i > midRowIndex && midRowIndex == this.$store.state.data.length-2) {
                        // cannot delete action row. min 1 required
                        break;
                    }

                    this.$store.state.data.splice(i, 1);
                    break;
                }
            }
        },

        createElementOfType(type) {
            let el = null;

            switch(type) {
                case 'response':
                    el = {type:'response', value:'?', objects:[]};
                break;

                case 'task':
                    el = {type:'task', value:'?'};
                break;

                case 'obj':
                    el = {type:'obj', label:'New Object', attributes:[
                        {
                            attribute: 'New Attribute',
                            type: '',
                            key: '',
                            enumValues: '',
                            parent: '',
                            rule: ''
                        }]
                    };
                break;

                case 'subject':
                    el = {type:'subject', label:'New Actor', value:''};
                break;

                case 'message':
                    el = {type:'message', value:'?', attribute:[{title: "", value: ""}]};
                break;

                case 'request':
                    el = {
                        type:'request', 
                        value:'?',
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
                break;
            }

            return el;
        },

        addCol(atLeft = true) {
            let rowLength = this.$store.state.data[0].length;
            let colIndex = atLeft ? 0 : rowLength - 1;
                
            for(let i = 0; i<this.$store.state.data.length; i++) {
                let el = this.$store.state.data[i][colIndex];
                let newEl = this.createElementOfType(el.type);
                
                if(atLeft) {
                    this.$store.state.data[i].unshift(newEl);
                    continue;
                }
                
                this.$store.state.data[i].push(newEl);
            }
        },

        deleteCol(obj) {
            let midColIndex = this.findMidColofMidRow();
            let foundColIndex = this.findCol(obj);

            // check condition for min grid
            if(foundColIndex < midColIndex && midColIndex == 1) {
                return;
            }

            if(foundColIndex > midColIndex && midColIndex == this.$store.state.data[0].length-2) {
                return;
            }
            
            // delete the col
            for(let i = 0; i<this.$store.state.data.length; i++) {
                this.$store.state.data[i].splice(foundColIndex, 1);
            }
        },

        addRule() {
            let midRowIndex = this.findMidRow();
            let midColIndex = this.findMidColofMidRow();
            
            let newRule = {type:'rule', label:'New Rule', rule:''};
            this.$store.state.data[midRowIndex][midColIndex].value.push( newRule );
        },

        deleteRule(rule) {
            let rules = this.findRules();
            
            // check condition for min
            if(rules.length <= 1) {
                return;
            }

            for(let i = 0; i<rules.length; i++) {
                if(JSON.stringify(rules[i]) === JSON.stringify(rule) ) {
                    rules.splice(i, 1);
                    break;
                }
            }
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
