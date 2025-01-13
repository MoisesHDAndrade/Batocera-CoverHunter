const BASE_URL = "http://localhost:5002"
const app = new Vue({
    el:"#app",
    delimiters:["[[","]]"],
    router: router,
    data(){
        return{
            path:""
        }
    },
    methods:{
    }
})
Vue.component('v-select', VueSelect.VueSelect);