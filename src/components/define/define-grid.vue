<template>
  <div id="define-grid" class="horizontal-scroll">
    <table class="table">
        <tr v-for="row in grid">
            <td v-for="el in row" :class="{ 
                    a: el.type == 'rules',
                    b: el.type == 'service' || el.type == 'action',
                    c: el.type == 'obj' || el.type == 'subject',
                    d: el.type == 'response' || el.type == 'task' || el.type == 'message' || el.type == 'request',
                }">
                <define-element :el="el"></define-element>
            </td>
        </tr>
    </table>
  </div>
</template>

<script>
import defineElement from './define-element.vue';

export default {
    name: 'define-grid',
    props: { gridData: { type: Array, required: false } },
    components: { defineElement },

    data () {
        return {
            grid: []
        }
    },

    created() {
        let save = this.saveDataToLocalStorage;
        this.$bus.on('saveData', function () {
            save();
        });

        let clear = this.clearGrid;
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
        model = this.grid;
    },

    methods: {

        init() {
            this.grid = this.gridData;

            if(this.grid.length != 0) {
                return;
            }

            this.grid = this.getDataFromLocalStorage();

            if(this.grid.length != 0) {
                return;
            }

            this.initTopRow();

            this.initMidRow();

            this.initBottomRow();
        },

        saveDataToLocalStorage() {
            localStorage.setItem('xpn-data', JSON.stringify(this.grid) );
            /// TODO: show confirmation notification
        },

        getDataFromLocalStorage() {
            return JSON.parse(localStorage.getItem('xpn-data') || '[]');
        },

        initTopRow() {
            this.grid.push(
                [
                    {type:'response', value:'?'}, 
                    {type:'service', label:'New Service', value:''}, 
                    {type:'task', value:'?'}
                ]
            );
        },

        initMidRow() {
            this.grid.push(
                [
                    {type:'obj', label:'New Object', value:''},
                    {type:'rules', value:[
                        {type:'rule', label:'New Rule', value:''}
                    ]},
                    {type:'subject', label:'New Actor', value:''}
                ]
            );
        },

        initBottomRow() {
            this.grid.push(
                [
                    {type:'message', value:'?'},
                    {type:'action', label:'New Action', value:''},
                    {type:'request', value:'?'}
                ]
            );
        },

        clearGrid() {
            for(let i = 0; i < this.grid.length; i++) {
                this.grid.splice(i, this.grid.length);
            }

            this.init();
        },

        findMidColofMidRow() {
            let midRowIndex = this.findMidRow();

            for(let i = 0; i<this.grid[midRowIndex].length; i++) {
                if(this.grid[midRowIndex][i].type == 'rules') {
                    return i;
                }
            }
        },

        findMidColOfTopRow() {
            for(let i = 0; i<this.grid[0].length; i++) {
                if(this.grid[0][i].type == 'service') {
                    return i;
                }
            }
        },

        findMidColOfBottomRow() {
            let index = this.grid.length - 1;
            for(let i = 0; i<this.grid[index].length; i++) {
                if(this.grid[index][i].type == 'action') {
                    return i;
                }
            }
        },

        findMidRow() {
            for(let i = 0; i<this.grid.length; i++) {
                if(this.grid[i][0].type == 'obj') {
                    return i;
                }
            }
        },

        findCol(obj) {
            for(let i = 0; i<this.grid.length; i++) {
                for(let j = 0; j<this.grid[i].length; j++) {
                    if(this.grid[i][j] == obj) {
                        return j;
                    }
                }
            }
        },

        findRules() {
            let midRowIndex = this.findMidRow();
            let midColIndex = this.findMidColofMidRow();
            
            return this.grid[midRowIndex][midColIndex].value;
        },

        createTopRow() {
            let index = this.findMidColOfTopRow();
            let length = this.grid[0].length;
            
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
            return {type:'response', value:'?'};
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
            let lastRowIndex = this.grid.length - 1;
            let length = this.grid[lastRowIndex].length;
            
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
            return {type:'message', value:'?'};
        },

        createAction() {
            return {type:'action', label:'New Action', value:''};
        },

        addRequestsInRow(row, numOfRequests) {
            for(let i=0; i<numOfRequests; i++) {
                row.push( this.createRequest() );
            }
        },

        createRequest() {
            return {type:'request', value:'?'};
        },

        addRow(atTop) {
            if(atTop) {
                this.addRowToTop( this.createTopRow() );
                return;
            }

            this.addRowToBottom( this.createBottomRow() );
        },

        addRowToTop( row ) {
            this.grid.unshift( row );
        },

        addRowToBottom( row ) {
            this.grid.push( row );
        },

        deleteRow(obj) {
            let foundRow = false;
            
            for(let i = 0; i<this.grid.length; i++) {
                for(let j = 0; j<this.grid[i].length; j++) {
                    if(this.grid[i][j] == obj) {
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

                    if(i > midRowIndex && midRowIndex == this.grid.length-2) {
                        // cannot delete action row. min 1 required
                        break;
                    }

                    this.grid.splice(i, 1);
                    break;
                }
            }
        },

        createElementOfType(type) {
            let el = null;

            switch(type) {
                case 'response':
                    el = {type:'response', value:'?'};
                break;

                case 'task':
                    el = {type:'task', value:'?'};
                break;

                case 'obj':
                    el = {type:'obj', label:'New Object', value:''};
                break;

                case 'subject':
                    el = {type:'subject', label:'New Actor', value:''};
                break;

                case 'message':
                    el = {type:'message', value:'?'};
                break;

                case 'request':
                    el = {type:'request', value:'?'};
                break;
            }

            return el;
        },

        addCol(atLeft = true) {
            let rowLength = this.grid[0].length;
            let colIndex = atLeft ? 0 : rowLength - 1;
                
            for(let i = 0; i<this.grid.length; i++) {
                let el = this.grid[i][colIndex];
                let newEl = this.createElementOfType(el.type);
                
                if(atLeft) {
                    this.grid[i].unshift(newEl);
                    continue;
                }
                
                this.grid[i].push(newEl);
            }
        },

        deleteCol(obj) {
            let midColIndex = this.findMidColofMidRow();
            let foundColIndex = this.findCol(obj);

            // check condition for min grid
            if(foundColIndex < midColIndex && midColIndex == 1) {
                return;
            }

            if(foundColIndex > midColIndex && midColIndex == this.grid[0].length-2) {
                return;
            }
            
            // delete the col
            for(let i = 0; i<this.grid.length; i++) {
                this.grid[i].splice(foundColIndex, 1);
            }
        },

        addRule() {
            let midRowIndex = this.findMidRow();
            let midColIndex = this.findMidColofMidRow();
            
            let newRule = {type:'rule', label:'New Rule', value:''};
            this.grid[midRowIndex][midColIndex].value.push( newRule );
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

.a {
  width:230px;
  height:214px
}

.b {
  width: 214px;
  height: 20px;
}

.c {
  width: 20px;
  height: 214px;
  vertical-align: top;
}

.d {
  width: 20px;
  height: 20px;
}

</style>
