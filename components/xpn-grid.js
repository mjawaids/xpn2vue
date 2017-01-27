// Declare an event bus
var bus = new Vue();

// Main Grid component
Vue.component('xpn-grid', {
    props: { gridData: {type: Array, required: false } },

    components: { VueMaterial },    // TODO: this should be injected instead of hardcode

    template: `
    <table class="table">
        <tr v-for="row in gridData">
            <td v-for="el in row">
                <xpn-element :el="el"></xpn-element>
            </td>
        </tr>
    </table>
    `,

    data() {
        return {
            grid: []
        }
    },

    created() {
        this.grid = this.gridData;

        let addrow = this.addRow;
        bus.$on('addRow', function (param) {
            addrow(param);
        });

        let delrow = this.deleteRow;
        bus.$on('deleteRow', function (param) {
            delrow(param);
        });

        let addcol = this.addCol;
        bus.$on('addCol', function (param) {
            addcol(param);
        });

        let delcol = this.deleteCol;
        bus.$on('deleteCol', function (param) {
            delcol(param);
        });

        let addrule = this.addRule;
        bus.$on('addRule', function () {
            addrule();
        });

        let delrule = this.deleteRule;
        bus.$on('deleteRule', function (param) {
            delrule(param);
        });

        if(this.grid.length == 0) {
            this.init();
        }
    },
    
    methods: {
        init() {
            this.grid.push(
                [
                    {type:'response', value:'?'}, 
                    {type:'service', label:'New Service', value:''}, 
                    {type:'task', value:'?'}
                ]
            );

            this.grid.push(
                [
                    {type:'obj', label:'New Object', value:''},
                    {type:'rules', value:[
                        {type:'rule', label:'New Rule', value:''}
                    ]},
                    {type:'subject', label:'New Actor', value:''}
                ]
            );

            this.grid.push(
                [
                    {type:'message', value:'?'},
                    {type:'action', label:'New Action', value:''},
                    {type:'request', value:'?'}
                ]
            );
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

            for(let i=0; i<numOfResponses; i++) {
                let response = {type:'response', value:'?'};
                row.push(response);
            }

            let service = {type:'service', label:'New Service', value:''};
            row.push(service);

            for(let i=0; i<numOfTasks; i++) {
                let task = {type:'task', value:'?'};
                row.push(task);
            }

            return row;
        },

        createBottomRow() {
            let index = this.findMidColOfBottomRow();
            let lastRowIndex = this.grid.length - 1;
            let length = this.grid[lastRowIndex].length;
            let numOfMessages = index;
            let numOfRequests = length - index - 1;

            let row = [];

            for(let i=0; i<numOfMessages; i++) {
                let message = {type:'message', value:'?'};
                row.push(message);
            }

            let action = {type:'action', label:'New Action', value:''};
            row.push(action);

            for(let i=0; i<numOfRequests; i++) {
                let request = {type:'request', value:'?'};
                row.push(request);
            }

            return row;
        },

        addRow(atTop) {
            if(atTop) {
                let row = this.createTopRow();
                this.grid.unshift( row );
                
                return;
            }

            let row = this.createBottomRow();
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
});
