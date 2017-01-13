Vue.component('xpn-grid', {
    template: `
    <table class="table">
        <tr v-for="row in gridData">
            <td v-for="el in row">
                <xpn-element @addRow="addRow" @deleteRow="deleteRow">{{ el }}</xpn-element>
            </td>
        </tr>
    </table>
    `,

    props: { gridData: Array },

    data() {
        return {
            grid: []
        }
    },

    created() {
        this.grid = this.gridData;
    },
    
    methods: {
        addRow(atBottom=true) {
            console.log(atBottom);
            if(atBottom) {
                this.grid.push(['41', '42', '43']);
                return;
            }

            this.grid.unshift(['01', '02', '03']);
        },

        deleteRow() {
            alert('delete me');
        }
    }
});

Vue.component('xpn-element', {
    template: `
    <div>
        <div><slot></slot></div>
        <button @click="$emit('addRow')">Add Bottom Row</button>
        <button @click="$emit('addRow(false)')">Add Top Row</button>
        <button @click="$emit('deleteRow')">X</button>
    </div>
    `
});

Vue.use(VueMaterial);
new Vue({
    el: '#root',
    data: {
        tabledata: [
            ['11', '12', '13'],
            ['21', '22', '23'],
            ['31', '32', '33']
        ]
    },
    methods: {
        
    }
});