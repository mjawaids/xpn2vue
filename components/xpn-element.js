var Response = { 
    props: ['el'],
    
    template: `
    <div  style="width:40px; height:40px; margin:auto">
        <md-select name="response" v-model="el.value" style="min-width:40px;">
            <md-option value="datastore">Datastore</md-option>
            <md-option value="report">Report</md-option>
            <md-option value="?">?</md-option>
        </md-select>
    </div>
    `
};

var Service = { 
    props: ['el'],
    
    template: `
    <div class="height-20" style="padding-left: 5px;width: 200px;">        
        <input class="min-width-small" :placeholder="el.label" v-model="el.value"></input>

        <span style="margin-bottom:5px;">
        <md-button @click="fireAddRow" class="md-icon-button"><md-icon md-theme="green" class="md-primary">done</md-icon></md-button>
        <md-button @click="fireDeleteRow" class="md-icon-button"><md-icon class="md-accent">clear</md-icon></md-button>
        </span>
    </div>
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
    <div style="width:40px; height:40px; margin:auto">
        <md-select name="task" v-model="el.value" style="min-width:40px;">
            <md-option value="controls">Controles</md-option>
            <md-option value="executes">Executes</md-option>
            <md-option value="?">?</md-option>
        </md-select>
    </div>
    `
};

var Obj = {
    props: ['el'],
    
    template: `
    <div class="vertical">
        
        <div style="height:50%;">
            <md-button @click="fireAddCol" class="md-icon-button"><md-icon md-theme="green" class="md-primary">done</md-icon></md-button>
            <md-button @click="fireDeleteCol" class="md-icon-button"><md-icon class="md-accent">clear</md-icon></md-button>
        </div>
        
        <div style="height:50%; padding: 10px;">
            <input class="min-width-small" :placeholder="el.label" v-model="el.value"></input>
        </div>
        
    </div>
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
    <div class="height-20 margin">
        <span>&nbsp;</span>
        <input class="min-width-small" :placeholder="el.label" v-model="el.value"></input>
        <span>&nbsp;</span>
        
        <md-button @click="fireAddRule" class="md-icon-button"><md-icon md-theme="green" class="md-primary">done</md-icon></md-button>
        
        <span>&nbsp;</span>
        <md-button @click="fireDeleteRule" class="md-icon-button"><md-icon class="md-accent">clear</md-icon></md-button>
        <span>&nbsp;</span>
    </div>
    `,

    methods: {
        fireAddRule() {
            bus.$emit('addRule');
        },

        fireDeleteRule() {
            bus.$emit('deleteRule', this.el);
        }
    }
};

var Rules = {
    props: ['el'],

    components: {
        rule: Rule
    },

    template: `
        <md-layout md-flex="10" class="width-200-300" style="width:230px;height:130px;overflow-y:auto;">
            <rule v-for="rule in el.value" :el="rule"></rule>
        </md-layout>
    `
};

var Subject = {
    props: ['el'],
    
    template: `
    <div class="vertical">
        
        <div style="height:50%;">
            <md-button @click="fireAddCol" class="md-icon-button"><md-icon md-theme="green" class="md-primary">done</md-icon></md-button>
            <md-button @click="fireDeleteCol" class="md-icon-button"><md-icon class="md-accent">clear</md-icon></md-button>
        </div>
        
        <div style="height:50%; padding: 10px;">
            <input class="min-width-small" :placeholder="el.label" v-model="el.value"></input>
        </div>
        
    </div>
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
    <div style="width:40px; height:40px; margin:auto">
        <md-select name="message" v-model="el.value" style="min-width:40px;">
            <md-option value="create">Create</md-option>
            <md-option value="update">Update</md-option>
            <md-option value="delete">Delete</md-option>
            <md-option value="?">?</md-option>
        </md-select>
    </div>
    `
};

var Action = {
    props: ['el'],
    
    template: `
    <div class="height-20">
        <span>&nbsp;</span>
        <input class="min-width-small" :placeholder="el.label" v-model="el.value"></input>
        <span>&nbsp;</span>
        
        <md-button @click="fireAddRow" class="md-icon-button"><md-icon md-theme="green" class="md-primary">done</md-icon></md-button>
        
        <span>&nbsp;</span>
        <md-button @click="fireDeleteRow" class="md-icon-button"><md-icon class="md-accent">clear</md-icon></md-button>
        <span>&nbsp;</span>
    </div>
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
    <div style="width:40px; height:40px; margin:auto">
        <md-select name="request" v-model="el.value" style="min-width:40px;">
            <md-option value="form">Form</md-option>
            <md-option value="?" selected>?</md-option>
        </md-select>
    </div>
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
        rules: Rules,
        subject: Subject,
        message: Message,
        action: Action,
        request: Request
    },

    template: `
        <component :el="el" v-bind:is="el.type" >
            <!-- component changes when vm.el.type changes! -->
        </component>
    `
});