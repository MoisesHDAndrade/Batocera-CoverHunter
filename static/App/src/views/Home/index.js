const Home = Vue.component('Home',{
    template:/*html*/`
        <div class="container">
            <div class="d-flex justify-content-center align-items-center ">
                <div class="row w-100 mx-0">
                        <div class="col mt-5">
                            <div class="d-flex justify-content-between px-3 py-2 bg-dark border-primary border align-items-center shadow" style="border-radius:.6rem">
                                <span class="fa fa-search text-light"></span>
                                <input type="text" class="form-control border-0 shadow-none bg-dark text-light" placeholder="Copy your gameList.xml location" v-model="path" @keyup.enter="search">
                            </div>
                        </div>
                </div>
            </div>
            <div class="row w-100 mx-0 justify-content-center" v-if="loading">
                <div class="col text-center mt-5">
                    <div class="spinner-border text-primary mt-4" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <p class="m-0 text-light mt-3">Loading the game list</p>
                </div>
            </div>

            <div class="row w-100 mx-0 justify-content-center" v-if="gameList" >
                <div class="col-md-4 text-center mt-5 mb-3" v-for="(game, index) in gameList" :key="index" >
                    <div class="card  text-white  bg-dark" style="height:22rem;overflow:hidden" @click="goToGame(game.index)">
                        <img class="rounded-3 rounded" :src="getImage(decodeURIComponent(game.image))" style="height:15rem" :alt="game.game" />
                        <div class="card-body bg-dark p-1">
                            <p class="card-title text-light m-0 text-start mt-2">[[game.game]]</p>
                            <p class="text-light m-0 text-start mt-1" style="font-size:.8rem">[[returnFormatedDate(game.release_date)]]</p>
                            <p class="text-muted m-0 text-start mt-1" style="font-size:.8rem">[[game.genre]]</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    delimiters:["[[","]]"],
    data(){
        return{
            path:"",
            gameList:[],
            loading:false,
        }
    },
    methods:{
        getImage(image){
            const img = `${BASE_URL}/${image}`
            return img
        },
       
        goToGame(index){
            this.$router.push({"name":"Game", query: { "index": index }})
            console.log(index)
        },
        returnFormatedDate(date){
            const d = moment(date).format("DD-MM-YYYY")
            return d
        },
        async search(){
            this.loading = true
            this.gameList = []
            this.$root.path = this.path
            const response = await axios.post(`${BASE_URL}/get-list`,{path:this.path},{})
            this.gameList = response.data.games
            this.gameList.sort((a, b) => a.game.localeCompare(b.game));
            this.saveToLocalStorage()
            this.loading = false
        },
        saveToLocalStorage(){
            localStorage.setItem("gamelist", JSON.stringify(this.gameList))
            localStorage.setItem("lastPath", JSON.stringify(this.path))
        },
        retrieveFromLocalStorage(){
            this.loading = true
            this.gameList = []
            this.gameList = JSON.parse(localStorage.getItem("gamelist"))
            this.loading = false
        }
    },
    mounted(){
        this.retrieveFromLocalStorage()
    }
})