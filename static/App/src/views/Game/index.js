const Game = Vue.component('Game',{
    template:/*html*/`
        <div id="main" style="position-relative">
            <div class="img-background text-light"  style="height:25rem;width:100%">
                <div class="d-flex align-items-end h-100">
                    <div class="p-3">
                        <h1 class="text-light text-start display-1 fw-bold">[[game.name]]</h1>
                    </div>
                </div>
            </div>
            <div class="position-relative">
                <div class="row w-100 mx-0 " style=""> 
                    <div class="col-md-6 text-white my-2" >
                        <div class="py-2 px-3 position-relative" style="height:4rem;background-color:rgba(0,0,0,0.2);border-radius:.5rem">
                            <span class="fa fa-calendar text-muted position-absolute" style="top:.5rem;right:.5rem"></span>
                            <span class="text-primary" style="font-size:.9rem">Release Date</span>
                            <p class="text-light m-0 fw-bold">[[returnFormatedDate(game.releasedate)]]</p>
                        </div>
                    </div>
                    <div class="col-md-6 text-white my-2" >
                        <div class="py-2 px-3 position-relative" style="height:4rem;background-color:rgba(0,0,0,0.2);border-radius:.5rem">
                            <span class="fa fa-users text-muted position-absolute" style="top:.5rem;right:.5rem"></span>
                            <span class="text-primary" style="font-size:.9rem">Players</span>
                            <p class="text-light m-0 fw-bold">[[game.players]]</p>
                        </div>
                    </div>
                    <div class="col-md-6 text-white my-2" >
                        <div class="py-2 px-3 position-relative" style="height:4rem;background-color:rgba(0,0,0,0.2);border-radius:.5rem">
                            <span class="fa fa-book text-muted position-absolute" style="top:.5rem;right:.5rem"></span>
                            <span class="text-primary" style="font-size:.9rem">Gender</span>
                            <p class="text-light m-0 fw-bold">[[game.genre]]</p>
                        </div>
                    </div>
                    <div class="col-md-6 text-white my-2" >
                        <div class="py-2 px-3 position-relative" style="height:4rem;background-color:rgba(0,0,0,0.2);border-radius:.5rem">
                            <span class="fa fa-code text-muted position-absolute" style="top:.5rem;right:.5rem"></span>
                            <span class="text-primary" style="font-size:.9rem">Developer</span>
                            <p class="text-light m-0 fw-bold">[[game.developer]]</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="">
                <div class="row mx-0 w-100" >
                    <div class="col-md-12 text-light my-2">
                        <div class="p-3" style="background-color:rgba(0,0,0,0.2);border-radius:.5rem">
                            <h5 class="fw-bold">Description</h5>
                            <p class="m-0">[[game.desc]]</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="">
                <div class="row mx-0 w-100" >
                    <div class="col-md-12 text-light my-2">
                        <div class="p-3" style="background-color:rgba(0,0,0,0.2);border-radius:.5rem">
                            <h5 class="fw-bold">Saved Images</h5>
                            <div class="row w-100 mx-0 mt-3">
                                <div class="col-md-6 text-center my-3">
                                    <div class="card card-scraped text-white  bg-dark position-relative h-100" style="width:auto;" >
                                        <div class="card-body">
                                            <h6 class="card-title m-0 mb-3 text-light">Front Image</h6>
                                            <div class="d-flex align-items-center justify-content-center h-100 img-container">
                                                <img class="rounded-3 rounded img-fluid" :src="getImage(decodeURIComponent(this.game.image))" style="max-width:20rem;height:auto" :alt="game.image" />
                                            </div>
                                        </div>
                                        <div class="card-footer border-0">
                                            <button class="btn btn-primary tet-center mt-5" @click="openModal('image')">Change</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 text-center my-3">
                                    <div class="card card-scraped text-white  bg-dark position-relative h-100" style="width:auto;" >
                                        <div class="card-body">
                                            <h6 class="card-title m-0 mb-3 text-light">Clear Logo</h6>
                                            <div class="d-flex align-items-center justify-content-center h-100 img-container">
                                                <img class="rounded-3 rounded img-fluid" :src="getImage(decodeURIComponent(this.game.marquee))" style="max-width:20rem;height:auto" :alt="game.image" />
                                            </div>
                                        </div>
                                        <div class="card-footer border-0">
                                            <button class="btn btn-primary text-center mt-5"  @click="openModal('clearlogo')">Change</button>
                                        </div>
                                    </div>
                                </div>



                                   
                            </div>
                        </div>
                    </div>
                </div>
            </div>

           

            <!-- Modal -->
            <div class="modal fade bg-dark" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-fullscreen bg-dark ">
                    <div class="modal-content bg-dark">
                        <div class="modal-header text-light border-0">
                            <h5 class="modal-title" id="exampleModalLabel">Replace [[imageUploadType == 'image' ? 'Image':'Clearlogo']]</h5>
                            <button type="button" class="btn shadow-none" data-bs-dismiss="modal" aria-label="Close">
                                <span class="fa fa-close text-white fs-1"></span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="row w-100 mx-0">
                                <div class="col-12">
                                    <div>
                                        <div class="form-check">
                                            <input class="form-check-input" value="pick" type="radio" name="flexRadioDefault" id="flexRadioDefault1" 
                                             checked v-model="selectScrapingMode">
                                            <label class="form-check-label text-white" for="flexRadioDefault1">
                                                Pick your own
                                            </label>
                                            <div class="row mx-0 w-100" v-if="selectScrapingMode == 'pick'">
                                                <div class="col text-center">
                                                    <button class="btn btn-primary" @click="selectImage">
                                                       <span class="fa fa-upload"> </span> Upload Image
                                                    </button>
                                                </div>
                                            </div>

                                            <div v-if="selectedImageBase64 && selectScrapingMode != 'scrape'">
                                                <div class="row mx-0 w-100">
                                                    <div class="col text-center my-4">
                                                        <img class="img-fluid" :src="selectedImage">
                                                    </div>
                                                    </div>
                                                    <div class="row mx-0 w-100" >
                                                        <div class="col text-center">
                                                            <button class="btn btn-primary" @click="savePickedImage">
                                                                Save
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        <div>
                                            <p class="text-white my-3">Or</p>
                                        </div>

                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" value="scrape" name="flexRadioDefault" id="flexRadioDefault2" 
                                            v-model="selectScrapingMode">
                                            <label class="form-check-label text-white" for="flexRadioDefault2">
                                                Scrape
                                            </label>
                                        </div>
                                        <div v-if="selectScrapingMode == 'scrape'">
                                            <div class="row w-100 mx-0 mt-3">
                                                <div class="col">
                                                    <label class="text-light">Game Name</label>
                                                    <input class="form-control" disabled :value="game.name">
                                                </div>
                                            </div>
                                            <div class="row w-100 mx-0 mt-3">
                                                <div class="col">
                                                    <label class="text-light">Platform</label>
                                                    <v-select :options="Object.values(platforms)" v-model="selectedPlatform"></v-select>
                                                </div>
                                            </div>
                                           <!--
                                            <div class="row w-100 mx-0 mt-3">
                                                <div class="col">
                                                    <div class="form-check">
                                                        <input class="form-check-input" value="gamesgb" type="radio" name="thegamesdb" id="flexRadioDefault3" 
                                                        checked  v-model="scrapingSource">
                                                        <label class="form-check-label text-white" for="flexRadioDefault3">
                                                            The GamesDB
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            -->
                                            <div class="row w-100 mx-0 mt-3">
                                                <div class="col">
                                                    <div class="form-check">
                                                        <input class="form-check-input" value="launch" type="radio" name="thegamesdb" id="flexRadioDefault4" 
                                                        checked v-model="scrapingSource">
                                                        <label class="form-check-label text-white" for="flexRadioDefault4">
                                                            Launchbox
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row mx-0 w-100">
                                                <div class="col text-center">
                                                    <button class="btn btn-primary" @click="scrapeNow">
                                                        Scrape Now
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        

                                        <div class="row w-100 mx-0 justify-content-center"  v-if="scrapedImages.length > 0 && selectScrapingMode == 'scrape'">
                                            <div class="col-md-4 text-center mt-5 mb-3"  v-for="image in scrapedImages" :key="image">
                                                <div class="card card-scraped text-white  bg-dark position-relative" style="height:22rem;overflow:hidden" >
                                                    <div class="d-flex align-items-center justify-content-center h-100 img-container">
                                                    <img class="rounded-3 rounded" :src="image" style="height:15rem" :alt="image" />
                                                        <div class="card-img-overlay mx-0 px-0">
                                                            <div class="position-absolute d-flex justify-content-center h-100 w-100 card-save" style="">
                                                                <div>
                                                                    <button class="btn btn-primary text-center" @click="saveScrapedImage(image)">Save Image</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row w-100 mx-0 justify-content-center" v-if="scraping">
                                            <div class="col text-center mt-5">
                                                <div class="spinner-border text-primary mt-4" role="status">
                                                    <span class="visually-hidden">Loading...</span>
                                                </div>
                                                <p class="m-0 text-light mt-3">Loading Images</p>
                                            </div>
                                        </div>
                                        <div class="row w-100 mx-0 mt-5 justify-content-center" v-if="noResults">
                                            <div class="col-12 text-center">
                                                <h3 class="text-white text-center">Oh no! Something went wrong! Unfortunately, we couldn't find any images for your game. 
                                                Please try selecting an image manually or double-check the platform and game name.</h3>
                                            </div>
                                        </div>
                                       

                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        <div class="modal-footer border-0">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

            




           


        </div>
    `,
    delimiters:["[[","]]"],
    data(){
        return{
            game:[],
            selectScrapingMode:"",
            selectedImageBase64:"",
            selectedImage:"",
            formData:"",
            noResults:false,

            imageUploadType:"",
            
            scrapingSource:"",
            scrapedImages:[],
            scraping:false,
            selectedScrapedImage:"",

            platforms:platforms,
            selectedPlatform:""
            
        }
    },
    methods:{
        /**
         * Asynchronous function to fetch specific game information.
         * 
         * This function uses the `axios` library to make a POST request to a specific API endpoint
         * and retrieves the game data corresponding to the index provided in the route query.
         * The retrieved data is stored in the `this.game` property, and a background image
         * is created using the game's image URL.
         */
        async getGameInfo(){
            // Retrieve the path stored in Local Storage and set it in the root component.
            // This is necessary to ensure the POST request contains the correct payload.
            this.retrievePathFromLocalStorage()
            try {
                // Make a POST request to the API endpoint with the game's index and the stored path.
                // The game's index is obtained from the current route's query parameters.
                const response = await axios.post(
                    `${BASE_URL}/game-index/${this.$route.query.index}`, // Dynamic endpoint to fetch the game by index.
                    {
                        "path": this.$root.path // Send the path as part of the request body.
                    }
                );
        
                // Store the game data returned by the API in the `game` property of the component.
                this.game = response.data.data;
        
                // Create the game's background using the encoded URL of the game's image.
                this.createBg(encodeURIComponent(this.getImage(this.game.image)));
            } catch (error) {
                // Handle errors that may occur during the API request.
                console.error("Error fetching game information:", error);
            }
        },

       /**
         * Finds the platform ID corresponding to a given platform name.
         *
         * This function searches through the `platforms` object for a platform whose name
         * matches the given `searchValue`. If a match is found, it returns the platform name.
         *
         * @param {string} searchValue - The name of the platform to search for.
         * @returns {string} The name of the first matching platform.
         */
        findPlatformID(searchValue) {
            // Convert the `platforms` object into an array of [key, value] pairs and filter it
            // to find entries where the value (platform name) contains the search string.
            const filtered = Object.entries(platforms).filter(([key, value]) =>
                value.includes(searchValue)
            );

            // Return the name of the first matching platform (filtered[0][1]).
            return filtered;
        },
       /**
         * Initiates a scraping request for game data based on the selected platform and game name.
         *
         * This function sets the `scraping` flag to `true` to indicate that a scraping process
         * is in progress. It first identifies the platform ID for the selected platform using
         * the `findPlatformID` method. Then, it makes a POST request to the scrape endpoint with
         * the game name and platform. The scraped image data is stored, and the `scraping` flag
         * is reset to `false` after completion.
         */
        async scrapeNow() {
            // Set the `scraping` flag to `true` to indicate that scraping is in progress.
            this.scraping = true;
            this.noResults = false
            // Find the platform ID based on the selected platform name.
            this.findPlatformID(this.selectedPlatform);
            console.log(this.selectedPlatform)
            try {
                // Make a POST request to the scrape endpoint with the game name and platform.
                const response = await axios.post(
                    `${BASE_URL}/scrape/lauchbox`,
                    {
                        'gamename': this.game.name, // Send the game's name in the request body.
                        'platform': this.findPlatformID(this.selectedPlatform) // Include the selected platform.
                    }
                );

                // Log the response from the server to the console for debugging purposes.
                console.log(response.data.data);
                const scrapedData = response.data.data;
                console.log(`Scraped Data: ${scrapedData}`);
        
                // If no data is found, set the `noResults` flag and skip further processing.
                if (!scrapedData || scrapedData === null || scrapedData === 'null' || scrapedData.length === 0) {
                    this.noResults = true;
                    this.scraping = false
                    return; // Exit early since there's no valid data.
                }
                // Store the scraped image data in the `scrapedImages` property.
                this.scrapedImages = response.data.data;
            } catch (error) {
                // Handle any errors during the request.
                console.error("Error during scraping:", error);
            } finally {
                // Reset the `scraping` flag to `false` to indicate that the scraping process has finished.
                this.scraping = false;
            }
        },

        async saveScrapedImage(image){
            if(this.imageUploadType == "image"){
                const response = await axios.post(`${BASE_URL}/upload-image-scrape`,{'image':image,'gamename':this.game.name,'index':this.$route.query.index})
                console.log(response.data)
            }
            else{
                const response = await axios.post(`${BASE_URL}/upload-clearlogo-scrape`,{'image':image,'gamename':this.game.name,'index':this.$route.query.index})

            }
            
        },
        selectImage(){
            const el = document.createElement("input")
            el.setAttribute("type","file")
            el.setAttribute("accept","image/*")
            el.click()

            el.addEventListener("change",(event)=>{
                const file = event.target.files[0]
                if(file){
                    this.formData = new FormData()
                    this.formData.append("image", file)
                    this.formData.append("index", this.$route.query.index)
                    this.formData.append("gamename", this.game.name)
                    this.selectedImage = URL.createObjectURL(file)
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        this.selectedImageBase64 = e.target.result
                    };
                    reader.readAsDataURL(file);

                }
            })
            
        },

        async savePickedImage(){
            if(this.imageUploadType == "image"){
                const response = await axios.post(`${BASE_URL}/upload-image`, this.formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data", // Indica que o corpo contém um FormData
                        },
                    })
                    console.log(response.data)
                    if(response.data.status == 'ok'){
                        this.game.image = response.data.image
                    }   
            }
            else{
                const response = await axios.post(`${BASE_URL}/upload-clearlogo`, this.formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data", // Indica que o corpo contém um FormData
                        },
                    })
                    console.log(response.data)
                    if(response.data.status == 'ok'){
                        this.game.marquee = response.data.image
                    } 
            }
            
        },
        verificaStatus(){
            console.log(this.selectScrapingMode)
        },
        openModal(image_type){
            this.imageUploadType = image_type
            const el = document.getElementById("exampleModal")
            const modal = new bootstrap.Modal(el)
            modal.toggle()
        },
        getImage(image){
            const img = `${BASE_URL}/${image}`
            return img.replace("'","%27")
        },
        returnFormatedDate(date){
            const d = moment(date).format("DD-MM-YYYY")
            return d
        },
        createBg(img){
            // Criar e configurar o elemento <style>
            const st = document.createElement('style');
            // st.id = 'dynamic-bg-style'; // ID único para evitar duplicação
            st.textContent = `
                .img-background {
                    position: relative;
                    z-index: 1;
                    overflow: hidden;
                }
    
                .img-background::before {
                    color: white;
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: -1; /* Fica atrás do conteúdo */
                    background-image: radial-gradient(circle, rgba(33, 37, 41, 0) 60%, rgba(33, 37, 41, 0.6) 100%),
                    url('${decodeURIComponent(img)}');
                    background-color: rgba(33, 37, 41, 0.9); /* Cor semi-transparente */
                    background-blend-mode: overlay; /* Combina a cor com a imagem */
                    background-size: cover; /* Garante que a imagem cubra toda a área */
                    background-position: center; /* Centraliza a imagem */
                    -webkit-mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 80%, rgba(0, 0, 0, 0) 100%);
                    -webkit-mask-repeat: no-repeat;
                    -webkit-mask-size: cover;
                    mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0) 100%);
                    mask-repeat: no-repeat;
                    mask-size: cover;
                }
            `;
    
            // Adicionar ao <head>
            document.head.appendChild(st);
        },
        retrievePathFromLocalStorage(){
            if(!this.$root.path){
                this.$root.path = JSON.parse(localStorage.getItem("lastPath"))
            }

        }
        
    },
    mounted(){
        this.getGameInfo()
       
    }
})

