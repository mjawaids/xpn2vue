var Response = { 
    props: ['el'],
    
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
    <md-layout>
        <md-layout md-flex="70">
            <md-input-container>
                <md-input :placeholder="el.label" v-model="el.value"></md-input>
            </md-input-container>        
        </md-layout>
        <md-layout md-flex="15">
            <md-button @click="fireAddRow" class="md-icon-button"><md-icon class="md-primary">done</md-icon></md-button>
        </md-layout>
        <md-layout md-flex="15">
            <md-button @click="fireDeleteRow" class="md-icon-button"><md-icon class="md-accent">clear</md-icon></md-button>
        </md-layout>
    </md-layout>
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
        <md-layout md-gutter>
            <md-layout md-flex="70">
                <md-input-container class="vertical-text">
                    <md-input :placeholder="el.label" v-model="el.value"></md-input>
                </md-input-container>        
            </md-layout>
            <md-layout md-flex="30">
                <md-layout md-flex="100">
                    <md-button @click="fireAddCol" class="md-icon-button vertical-text"><md-icon class="md-primary">done</md-icon></md-button>
                </md-layout>
                <md-layout md-flex="100">
                    <md-button @click="fireDeleteCol" class="md-icon-button vertical-text"><md-icon class="md-accent">clear</md-icon></md-button>
                </md-layout>
            </md-layout>
        </md-layout>
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
        <md-layout>
            <md-layout md-flex="70">
                <md-input-container>
                    <md-input :placeholder="el.label" v-model="el.value"></md-input>
                </md-input-container>        
            </md-layout>
            <md-layout md-flex="15">
                <md-button @click="fireAddRule" class="md-icon-button"><md-icon class="md-primary">done</md-icon></md-button>
            </md-layout>
            <md-layout md-flex="15">
                <md-button @click="fireDeleteRule" class="md-icon-button"><md-icon class="md-accent">clear</md-icon></md-button>
            </md-layout>
        </md-layout>
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
        <md-layout md-flex="0">
            <md-layout md-flex="100" v-for="rule in el.value">
                <rule :el="rule"></rule>
            </md-layout>
        </md-layout>
    `
};

var Subject = {
    props: ['el'],
    
    template: `
        <md-layout>
            <md-layout md-flex="70">
                <md-input-container class="vertical-text">
                    <md-input :placeholder="el.label" v-model="el.value"></md-input>
                </md-input-container>        
            </md-layout>
            <md-layout md-flex="30">
                <md-layout md-flex="100">
                    <md-button @click="fireAddCol" class="md-icon-button vertical-text"><md-icon class="md-primary">done</md-icon></md-button>
                </md-layout>
                <md-layout md-flex="100">
                    <md-button @click="fireDeleteCol" class="md-icon-button vertical-text"><md-icon class="md-accent">clear</md-icon></md-button>
                </md-layout>
            </md-layout>
        </md-layout>
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
    <md-layout>
        <md-layout md-flex="70">
            <md-input-container>
                <md-input :placeholder="el.label" v-model="el.value"></md-input>
            </md-input-container>        
        </md-layout>
        <md-layout md-flex="15">
            <md-button @click="fireAddRow" class="md-icon-button"><md-icon class="md-primary">done</md-icon></md-button>
        </md-layout>
        <md-layout md-flex="15">
            <md-button @click="fireDeleteRow" class="md-icon-button"><md-icon class="md-accent">clear</md-icon></md-button>
        </md-layout>
    </md-layout>
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