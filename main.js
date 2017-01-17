Vue.component('xpn-grid', {
    props: { gridData: Array },

    template: `
    <table class="table">
        <tr v-for="row in gridData">
            <td v-for="el in row">
                <xpn-element 
                    @addRow="addRow" 
                    @deleteRow="deleteRow" 
                    @addCol="addCol" 
                    @deleteCol="deleteCol" 
                    :el="el">
                        {{ el.type }} - {{ el.id }}
                </xpn-element>
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
    },
    
    methods: {
        addRow(atBottom = true) {

            // TODO: add row based on updated number of columns

            if(atBottom) {
                let bottomRow = [{id:'41',type:'message'}, {id:'42',type:'action'}, {id:'43',type:'request'}];
                this.grid.push(bottomRow);
                return;
            }

            let topRow = [{id:'01',type:'response'}, {id:'02',type:'service'}, {id:'03',type:'task'}];
            this.grid.unshift(topRow);
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

        addCol(atRight = true) {
            for(let i = 0; i<this.grid.length; i++) {
                let index = atRight ? this.grid[i].length - 1 : 0;
                let obType = this.grid[i][index].type;
                let obj = {id:'o1', type: obType};

                if(atRight) {
                    this.grid[i].push(obj);
                    continue;
                }
                
                this.grid[i].unshift(obj);
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

Vue.component('xpn-element', {
    props: ['el'],
    template: `
    <div>
        <div><input type='text' :placeholder="el.type"></div>
        <div>
            <button @click="$emit('addRow')">Add Bottom Row \/</button>
            <button @click="$emit('addRow', false)">Add Top Row ^</button>
            <button @click="$emit('deleteRow', el)">X</button>
        </div>
        <div>
            <button @click="$emit('addCol')">Add Right Col ></button>
            <button @click="$emit('addCol', false)">Add Left Col <</button>
            <button @click="$emit('deleteCol', el)">x</button>
        </div>
    </div>
    `,

    data() {
        return {
            
        }
    },

    // created() {
    //     console.log("element: ");
    //     console.log( this.el);
    // },
});

Vue.use(VueMaterial);
new Vue({
    el: '#root',
    data: {
        tabledata: [
            [{id:'11',type:'response'}, {id:'12',type:'service'}, {id:'13',type:'task'}],
            [{id:'21',type:'object'}, {id:'22',type:'rule'}, {id:'23',type:'subject'}],
            [{id:'31',type:'message'}, {id:'32',type:'action'}, {id:'33',type:'request'}]
        ]
    },
    methods: {
        
    }
});