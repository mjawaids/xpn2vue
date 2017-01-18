ResponseTemplate = {type:'response', value:'?'};
ServiceTemplate = {type:'service', label:'New Service', value:''};
TaskTemplate = {type:'task', value:'?'};

ObjTemplate = {type:'obj', label:'New Object', value:''};
RuleTemplate =  {type:'rule', label:'New Rule', value:''};
SubjectTemplate =  {type:'subject', label:'New Actor', value:''};

MessageTeamplate = {type:'message', value:'?'};
ActionTemplate =  {type:'action', label:'New Action', value:''};
RequestTemplate = {type:'request', value:'?'};

TopRowTemplate = [ResponseTemplate, ServiceTemplate, TaskTemplate];
MidRowTemplate = [ObjTemplate, RuleTemplate, SubjectTemplate];
BottomRowTemplate = [MessageTeamplate, ActionTemplate, RequestTemplate];

// Declare an event bus
var bus = new Vue();

// Main Grid component
Vue.component('xpn-grid', {
    props: { gridData: Array },

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
        let delrow = this.deleteRow;
        let addcol = this.addCol;
        let delcol = this.deleteCol;

        bus.$on('addRow', function (param) {
            addrow(param);
        });

        bus.$on('deleteRow', function (param) {
            delrow(param);
        });

        bus.$on('addCol', function (param) {
            addcol(param);
        });

        bus.$on('deleteCol', function (param) {
            delcol(param);
        });
    },
    
    methods: {
        addRow(atTop) {
            console.log("addRow called with: " + atTop);
            // TODO: add row based on updated number of columns

            if(atTop) {
                this.grid.unshift(TopRowTemplate);
                return;
            }

            this.grid.push(BottomRowTemplate);    
        },

        deleteRow(obj) {
            console.log("deleteRow called");
            let foundRow = false;

            for(let i = 0; i<this.grid.length; i++) {
                for(let j = 0; j<this.grid[i].length; j++) {
                    if(this.grid[i][j] == obj) {
                        foundRow = true;
                        break;
                    }
                }

                if(foundRow) {
                    // TODO: check condition for min grid with top, mid, and bottom rows
                    this.grid.splice(i, 1);
                    break;
                }
            }
        },

        addCol(atLeft = true) {
            console.log("addCol called: " + atLeft);
            for(let i = 0; i<this.grid.length; i++) {
                let index = atLeft ? 0 : this.grid[i].length - 1;
                let obType = this.grid[i][index].type;
                let obj = {id:'o1', type: obType};

                if(atLeft) {
                    this.grid[i].unshift(obj);
                    continue;
                }
                
                this.grid[i].push(obj);
            }
        },

        deleteCol(obj) {
            console.log("deleteCol called");
            let foundCol = null;

            // Find the col
            for(let i = 0; i<this.grid.length; i++) {
                for(let j = 0; j<this.grid[i].length; j++) {
                    if(this.grid[i][j] == obj) {
                        foundCol = j;
                        break;
                    }
                }

                if(foundCol) {
                    break;
                }
            }

            for(let i = 0; i<this.grid.length; i++) {
                // TODO: check condition for min grid
                this.grid[i].splice(foundCol, 1);
            }
        }
    }
});

var Response = { 
    props: ['el'],
    
    // style: '.margin{margin:auto;}',

    template: `
    <md-card class="md-primary">
        <md-card-content class="margin">
            <md-input-container>
                <md-select name="response" v-model="el.value">
                    <md-option value="datastore">Datastore</md-option>
                    <md-option value="report">Report</md-option>
                    <md-option value="?">?</md-option>
                </md-select>
            </md-input-container>
        </md-card-content>
    </md-card>
    `
};

var Service = { 
    props: ['el'],
    
    template: `
    <md-card>
        <md-card-content class="margin">
            <md-layout>
                <md-layout md-flex="70">
                    <md-input-container>
                        <md-input :placeholder="el.label"></md-input>
                    </md-input-container>        
                </md-layout>
                <md-layout md-flex="15">
                    <md-button @click="fireAddRow"><md-icon class="md-primary">done</md-icon></md-button>
                </md-layout>
                <md-layout md-flex="15">
                    <md-button @click="fireDeleteRow"><md-icon class="md-accent">clear</md-icon></md-button>
                </md-layout>
            </md-layout>
        </md-card-content>
    </md-card>
    `,

    methods: {
        fireAddRow() {
            bus.$emit('addRow', true);
        },

        fireDeleteRow() {
            bus.$emit('deleteRow', this.el);
        }
    } 
};

var Task = {
    props: ['el'],
    
    template: `
    <md-card class="md-primary">
        <md-card-content class="margin">
            <md-input-container>
                <md-select name="task" v-model="el.value">
                    <md-option value="controls">Controles</md-option>
                    <md-option value="executes">Executes</md-option>
                    <md-option value="?">?</md-option>
                </md-select>
            </md-input-container>
        </md-card-content>
    </md-card>
    `
};

var Obj = {
    props: ['el'],
    
    template: `
    <md-card>
        <md-card-content class="margin">
            <md-layout>
                <md-layout md-flex="70">
                    <md-input-container>
                        <md-input :placeholder="el.label"></md-input>
                    </md-input-container>        
                </md-layout>
                <md-layout md-flex="15">
                    <md-button @click="fireAddCol"><md-icon class="md-primary">done</md-icon></md-button>
                </md-layout>
                <md-layout md-flex="15">
                    <md-button @click="fireDeleteCol"><md-icon class="md-accent">clear</md-icon></md-button>
                </md-layout>
            </md-layout>
        </md-card-content>
    </md-card>
    `,

    methods: {
        fireAddCol() {
            bus.$emit('addCol', true);
        },

        fireDeleteCol() {
            bus.$emit('deleteCol', this.el);
        }
    }
};

var Rule = {
    props: ['el'],
    
    template: `
    <md-card>
        <md-card-content class="margin">
            <md-layout>
                <md-layout md-flex="70">
                    <md-input-container>
                        <md-input :placeholder="el.label"></md-input>
                    </md-input-container>        
                </md-layout>
                <md-layout md-flex="15">
                    <md-button @click="fireAddRule"><md-icon class="md-primary">done</md-icon></md-button>
                </md-layout>
                <md-layout md-flex="15">
                    <md-button @click="fireDeleteRule"><md-icon class="md-accent">clear</md-icon></md-button>
                </md-layout>
            </md-layout>
        </md-card-content>
    </md-card>
    `,

    methods: {
        fireAddRule() {

        },

        fireDeleteRule() {

        }
    }
};

var Subject = {
    props: ['el'],
    
    template: `
    <md-card>
        <md-card-content class="margin">
            <md-layout>
                <md-layout md-flex="70">
                    <md-input-container>
                        <md-input :placeholder="el.label"></md-input>
                    </md-input-container>        
                </md-layout>
                <md-layout md-flex="15">
                    <md-button @click="fireAddCol"><md-icon class="md-primary">done</md-icon></md-button>
                </md-layout>
                <md-layout md-flex="15">
                    <md-button @click="fireDeleteCol"><md-icon class="md-accent">clear</md-icon></md-button>
                </md-layout>
            </md-layout>
        </md-card-content>
    </md-card>
    `,

    methods: {
        fireAddCol() {
            bus.$emit('addCol', false);
        },

        fireDeleteCol() {
            bus.$emit('deleteCol', this.el);
        }
    }
};

var Message = {
    props: ['el'],
    
    template: `
    <md-card class="md-primary">
        <md-card-content class="margin">
            <md-input-container>
                <md-select name="message" v-model="el.value">
                    <md-option value="create">Create</md-option>
                    <md-option value="update">Update</md-option>
                    <md-option value="delete">Delete</md-option>
                    <md-option value="?">?</md-option>
                </md-select>
            </md-input-container>
        </md-card-content>
    </md-card>
    `
};

var Action = {
    props: ['el'],
    
    template: `
    <md-card>
        <md-card-content class="margin">
            <md-layout>
                <md-layout md-flex="70">
                    <md-input-container>
                        <md-input :placeholder="el.label"></md-input>
                    </md-input-container>        
                </md-layout>
                <md-layout md-flex="15">
                    <md-button @click="fireAddRow"><md-icon class="md-primary">done</md-icon></md-button>
                </md-layout>
                <md-layout md-flex="15">
                    <md-button @click="fireDeleteRow"><md-icon class="md-accent">clear</md-icon></md-button>
                </md-layout>
            </md-layout>
        </md-card-content>
    </md-card>
    `,

    methods: {
        fireAddRow() {
            bus.$emit('addRow', false);
        },

        fireDeleteRow() {
            bus.$emit('deleteRow', this.el);
        }
    }
};

var Request = {
    props: ['el'],
    
    template: `
    <md-card class="md-primary">
        <md-card-content class="margin">
            <md-input-container>
                <md-select name="message" v-model="el.value">
                    <md-option value="form">Form</md-option>
                    <md-option value="?" selected>?</md-option>
                </md-select>
            </md-input-container>
        </md-card-content>
    </md-card>
    `
};

Vue.component('xpn-element', {
    props: ['el'],

    components: { 
        vuematerial: VueMaterial,
        response: Response,
        service: Service,
        task: Task,
        obj: Obj,
        rule: Rule,
        subject: Subject,
        message: Message,
        action: Action,
        request: Request
    },

    template: `
        <component v-bind:is="currentView" :el="el">
            <!-- component changes when vm.currentView changes! -->
        </component>
    `,

    data() {
        return {
            currentView: ''
        }
    },

    created() {
        this.currentView = this.el.type;
    },
});

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
    el: '#root',
    data: {
        tabledata: [ TopRowTemplate, MidRowTemplate, BottomRowTemplate ]
    },
    methods: {
        
    }
});