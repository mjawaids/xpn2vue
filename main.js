Vue.component('xpn-grid', {
    template: `
    <table class="table">
        <tr v-for="row in gridData">
            <td v-for="el in row">
                {{ el }}
            </td>
        </tr>
    </table>
    `,

    props: { gridData:Array },

    methods: {
    }
});

Vue.component('xpn-element', {
    template: `
        <span>
            <slot></slot>
        </span>
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
    }
});