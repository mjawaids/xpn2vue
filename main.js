Vue.component('xpn-grid', {
    template: `
    <table>
        <tr>
            <xpn-element v-for="el in elements">{{ el.name }}</xpn-element>
        </tr>
        <tr>
        </tr>
        <tr>
        </tr>
        <tr>
        </tr>
    </table>
    `,

    data() {
        return {
            elements: [
                {name: "top left"},
                {name: "top right"},
                {name: "bottom left"},
                {name: "bottom right"} 
            ]
        };
    }
});

Vue.component('xpn-element', {
    template: `
        <td>
            <slot></slot>
        </td>
    `
});

new Vue({
    el: '#root'
});