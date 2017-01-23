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
                    {type:'rule', label:'New Rule', value:''},
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

        addRow(atTop) {
            if(atTop) {
                console.log("cloning:");
                console.log(this.grid[0]);
                this.grid.unshift( this.grid[0].slice(0) );
                return;
            }

            let lastIndex = this.grid.length - 1;
            console.log("cloning:");
            console.log(this.grid[lastIndex]);
            this.grid.push( this.grid[lastIndex].slice(0) );
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
                    // TODO: check condition for min grid with top, mid, and bottom rows
                    this.grid.splice(i, 1);
                    break;
                }
            }
        },

        addCol(atLeft = true) {
            for(let i = 0; i<this.grid.length; i++) {
                let index = atLeft ? 0 : this.grid[i].length - 1;
                let obj = this.grid[i][index];

                if(atLeft) {
                    this.grid[i].unshift(obj);
                    continue;
                }
                
                this.grid[i].push(obj);
            }
        },

        deleteCol(obj) {
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
