var Response = { 
    props: ['el'],
    
    template: `
    <div class="corner-style">
        <md-select name="response" v-model="el.value" class="md-select-value corner-style">
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
    <div class="">
        <input class="min-width-small height-20" :placeholder="el.label" v-model="el.value"></input>

        <md-button @click="fireAddRow" class="btn-style btn-green"><i class="material-icons font-medium">done</i></md-button>
        <md-button @click="fireDeleteRow" class="btn-style btn-red"><i class="material-icons font-medium">clear</i></md-button>
        
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
    <div class="corner-style">
        <md-select name="task" v-model="el.value" class="md-select-value corner-style">
            <md-option value="controls">Controls</md-option>
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

        <input class="min-width-small height-20" :placeholder="el.label" v-model="el.value"></input>
        
        <md-button @click="fireAddCol" class="btn-style btn-green"><i class="material-icons font-medium">done</i></md-button>
        <md-button @click="fireDeleteCol" class="btn-style btn-red"><i class="material-icons font-medium">clear</i></md-button>
        
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
    <div class="">        
        <input class="min-width-small height-20" :placeholder="el.label" v-model="el.value"></input>

        <md-button @click="fireAddRule" class="btn-style btn-green"><i class="material-icons font-medium">done</i></md-button>
        <md-button @click="fireDeleteRule" class="btn-style btn-red"><i class="material-icons font-medium">clear</i></md-button>
        
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
        <md-layout class="e">
            <rule v-for="rule in el.value" :el="rule"></rule>
        </md-layout>
    `
};

var Subject = {
    props: ['el'],
    
    template: `
    <div class="vertical">
        
        <input class="min-width-small height-20" :placeholder="el.label" v-model="el.value"></input>
    
        <md-button @click="fireAddCol" class="btn-style btn-green"><i class="material-icons font-medium">done</i></md-button>
        <md-button @click="fireDeleteCol" class="btn-style btn-red"><i class="material-icons font-medium">clear</i></md-button>
        
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
    <div class="corner-style">
        <md-select name="message" v-model="el.value" class="md-select-value corner-style">
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
    <div class="">        
        <input class="min-width-small height-20" :placeholder="el.label" v-model="el.value"></input>

        <md-button @click="fireAddRow" class="btn-style btn-green"><i class="material-icons font-medium">done</i></md-button>
        <md-button @click="fireDeleteRow" class="btn-style btn-red"><i class="material-icons font-medium">clear</i></md-button>
        
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
    <div class="corner-style">
        <md-select name="request" v-model="el.value" class="md-select-value corner-style">
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