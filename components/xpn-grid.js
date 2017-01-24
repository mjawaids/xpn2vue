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
                this.grid.unshift( this.grid[0].slice(0) );
                return;
            }

            let lastIndex = this.grid.length - 1;
            this.grid.push( this.grid[lastIndex].slice(0) );
        },

        deleteRow(obj) {
            let foundRow = false;
            let midRowIndex = 0;

            //find mid row
            for(let i = 0; i<this.grid.length; i++) {
                if(this.grid[i][0].type == 'obj') {
                    midRowIndex = i;
                }
            }

            for(let i = 0; i<this.grid.length; i++) {
                for(let j = 0; j<this.grid[i].length; j++) {
                    if(this.grid[i][j] == obj) {
                        foundRow = true;
                        break;
                    }
                }

                if(foundRow) {
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
            let midRowIndex, midColIndex = 0;

            //find mid row
            for(let i = 0; i<this.grid.length; i++) {
                if(this.grid[i][0].type == 'obj') {
                    midRowIndex = i;
                }
            }

            //find mid col
            for(let i = 0; i<this.grid[midRowIndex].length; i++) {
                if(this.grid[midRowIndex][i].type != 'obj' && this.grid[midRowIndex][i].type != 'subject') {
                    midColIndex = i;
                }
            }

            // Find the col
            for(let i = 0; i<this.grid.length; i++) {
                for(let j = 0; j<this.grid[i].length; j++) {
                    if(this.grid[i][j] == obj) {
                        foundCol = j;
                        break;
                    }
                }

                // if found break and delete the col
                if(foundCol) {
                    break;
                }
            }

            // check condition for min grid
            if(foundCol < midColIndex && midColIndex == 1) {
                return;
            }

            if(foundCol > midColIndex && midColIndex == this.grid[0].length-2) {
                return;
            }
            
            // delete the col
            for(let i = 0; i<this.grid.length; i++) {
                this.grid[i].splice(foundCol, 1);
            }
        }
    }
});
