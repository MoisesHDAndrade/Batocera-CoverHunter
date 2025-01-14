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
                                                            <button class="btn btn-primary" @click="savePickedImage" data-bs-dismiss="modal">
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
                                                    <input class="form-control" v-model="game.name" >
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
                                                                    <button class="btn btn-primary text-center" @click="saveScrapedImage(image)" data-bs-dismiss="modal">Save Image</button>
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

        /**
         * Saves the scraped image to the appropriate endpoint based on the upload type.
         *
         * Depending on the `imageUploadType`, the method sends a POST request to either 
         * upload the image or upload the clear logo. The request includes the image, 
         * game name, and game index as payload.
         *
         * @async
         * @param {string} image - The URL or binary data of the image to be uploaded.
         *
         * Side Effects:
         * - Logs the response data to the console if the upload type is "image".
         * - Sends a POST request to the server.
         *
         */
        async saveScrapedImage(image) {
            // Check if the image upload type is "image"
            if (this.imageUploadType == "image") {
                // Sends a POST request to the endpoint for uploading regular images
                const response = await axios.post(`${BASE_URL}/upload-image-scrape`, {
                    'image': image, // The scraped image data
                    'gamename': this.game.name, // Name of the game associated with the image
                    'index': this.$route.query.index // Index of the game from the query parameters
                });
        
                // Log the response data for debugging purposes
                console.log(response.data);
            } else {
                // Sends a POST request to the endpoint for uploading clear logos
                const response = await axios.post(`${BASE_URL}/upload-clearlogo-scrape`, {
                    'image': image, // The scraped image data
                    'gamename': this.game.name, // Name of the game associated with the clear logo
                    'index': this.$route.query.index // Index of the game from the query parameters
                });
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

        /**
         * Opens a file selection dialog, allowing the user to select an image file.
         *
         * Once an image is selected, it creates a `FormData` object containing the image, 
         * the game index, and the game name. It also generates a preview of the selected 
         * image using a blob URL and a Base64 string for further use.
         *
         * Side Effects:
         * - Dynamically creates and interacts with an HTML input element.
         * - Updates `formData`, `selectedImage`, and `selectedImageBase64` properties with the selected file's data.
         *
         * Example Usage:
         * ```javascript
         * this.selectImage();
         * ```
         */
        selectImage() {
            // Dynamically create an <input> element for file selection
            const el = document.createElement("input");
            el.setAttribute("type", "file"); // Specify input type as 'file'
            el.setAttribute("accept", "image/*"); // Restrict file types to images
            el.click(); // Simulate a click to open the file dialog

            // Add an event listener to handle the file selection
            el.addEventListener("change", (event) => {
                // Get the first file from the file input
                const file = event.target.files[0];
                if (file) {
                    // Initialize a FormData object to store the file and metadata
                    this.formData = new FormData();
                    this.formData.append("image", file); // Append the selected image file
                    this.formData.append("index", this.$route.query.index); // Append the game index
                    this.formData.append("gamename", this.game.name); // Append the game name

                    // Generate a preview URL for the selected image
                    this.selectedImage = URL.createObjectURL(file);

                    // Read the file as a Base64 string
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        this.selectedImageBase64 = e.target.result; // Store the Base64 string
                    };
                    reader.readAsDataURL(file); // Start reading the file
                }
            });
        },


        /**
         * Uploads the selected image or clear logo to the appropriate server endpoint.
         *
         * Depending on the `imageUploadType`, this method sends a POST request with the 
         * `FormData` containing the image and associated metadata (game name and index).
         * If the upload is successful, it updates the game's `image` or `marquee` property 
         * with the response data.
         *
         * @async
         * Side Effects:
         * - Sends a POST request to the server with `FormData`.
         * - Updates `this.game.image` or `this.game.marquee` with the uploaded image's URL.
         * - Logs the server response to the console.
         *
         * Example Usage:
         * ```javascript
         * await savePickedImage();
         * ```
         */
        async savePickedImage() {
            if (this.imageUploadType === "image") {
                // Send the image to the upload endpoint for standard images
                const response = await axios.post(
                    `${BASE_URL}/upload-image`, 
                    this.formData, 
                    {
                        headers: {
                            "Content-Type": "multipart/form-data", // Specify the request type
                        },
                    }
                );
                console.log(response.data); // Log server response
                // If the server responds with success, update the game's image property
                if (response.data.status === 'ok') {
                    this.game.image = response.data.image;
                }
            } else {
                // Send the image to the upload endpoint for clear logos
                const response = await axios.post(
                    `${BASE_URL}/upload-clearlogo`, 
                    this.formData, 
                    {
                        headers: {
                            "Content-Type": "multipart/form-data", // Specify the request type
                        },
                    }
                );
                console.log(response.data); // Log server response
                // If the server responds with success, update the game's marquee property
                if (response.data.status === 'ok') {
                    this.game.marquee = response.data.image;
                }
            }
        },

       
        /**
         * Opens a modal for image upload and sets the image upload type.
         *
         * This method updates the `imageUploadType` property based on the provided parameter 
         * and toggles the visibility of the modal with the specified ID. It uses Bootstrap's 
         * Modal API to manage the modal behavior.
         *
         * @param {string} image_type - The type of image being uploaded (e.g., "image" or "clearlogo").
         *
         * Side Effects:
         * - Updates the `imageUploadType` property.
         * - Toggles the visibility of the modal identified by the "exampleModal" ID.
         *
         * Example Usage:
         * ```javascript
         * openModal("image"); // Opens the modal for standard image upload
         * ```
         */
        openModal(image_type) {
            this.imageUploadType = image_type; // Set the type of image to be uploaded

            // Get the modal element by its ID
            const el = document.getElementById("exampleModal");

            // Initialize the Bootstrap modal instance
            const modal = new bootstrap.Modal(el);

            // Toggle the modal's visibility
            modal.toggle();
        },

        

        /**
         * Formats the URL of an image by appending the base URL and encoding any single quotes.
         *
         * @param {string} image - The relative path or name of the image.
         * @returns {string} - The formatted URL with the base URL and encoded single quotes.
         *
         * Example Usage:
         * ```javascript
         * const imageUrl = getImage("images/sample.jpg");
         * console.log(imageUrl); // Outputs: `${BASE_URL}/images/sample.jpg`
         * ```
         */
        getImage(image) {
            const img = `${BASE_URL}/${image}`; // Combine the base URL with the image path
            return img.replace("'", "%27"); // Replace single quotes with encoded equivalents
        },


        /**
         * Formats a date string into the "DD-MM-YYYY" format using the Moment.js library.
         *
         * @param {string|Date} date - The date to be formatted.
         * @returns {string} - The formatted date string in "DD-MM-YYYY" format.
         *
         * Example Usage:
         * ```javascript
         * const formattedDate = returnFormatedDate("2025-01-13");
         * console.log(formattedDate); // Outputs: "13-01-2025"
         * ```
         */
        returnFormatedDate(date) {
            const d = moment(date).format("DD-MM-YYYY"); // Format the date using Moment.js
            return d;
        },

        /**
         * Dynamically creates a CSS style for a background image with overlay and masking effects.
         *
         * This function generates a `<style>` element containing a CSS class (`img-background`)
         * that applies a radial gradient overlay and masks the image for specific visual effects.
         * The CSS is then appended to the `<head>` of the document.
         *
         * @param {string} img - The URL of the image to be used as the background.
         *
         * Side Effects:
         * - Appends a `<style>` element to the `<head>` of the document.
         *
         * Example Usage:
         * ```javascript
         * createBg("https://example.com/image.jpg");
         * ```
         */
        createBg(img) {
            // Create and configure a new <style> element
            const st = document.createElement("style");
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
                    z-index: -1; /* Ensures the pseudo-element is behind the content */
                    background-image: radial-gradient(circle, rgba(33, 37, 41, 0) 60%, rgba(33, 37, 41, 0.6) 100%),
                    url('${decodeURIComponent(img)}');
                    background-color: rgba(33, 37, 41, 0.9);
                    background-blend-mode: overlay;
                    background-size: cover;
                    background-position: center;
                    -webkit-mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 80%, rgba(0, 0, 0, 0) 100%);
                    -webkit-mask-repeat: no-repeat;
                    -webkit-mask-size: cover;
                    mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0) 100%);
                    mask-repeat: no-repeat;
                    mask-size: cover;
                }
            `;

            // Append the <style> element to the document's <head>
            document.head.appendChild(st);
        },

        /**
         * Retrieves the last path stored in local storage and assigns it to the root's `path` property.
         *
         * If the root's `path` property is not already set, this method attempts to retrieve 
         * the "lastPath" value from local storage and parses it as JSON.
         *
         * Side Effects:
         * - Updates the `$root.path` property with the value from local storage, if available.
         *
         * Example Usage:
         * ```javascript
         * retrievePathFromLocalStorage();
         * console.log(this.$root.path); // Outputs the retrieved path
         * ```
         */
        retrievePathFromLocalStorage() {
            // Check if the $root's path is not already set
            if (!this.$root.path) {
                // Retrieve and parse the lastPath from local storage
                this.$root.path = JSON.parse(localStorage.getItem("lastPath"));
            }
        }
        
    },
    mounted(){
        this.getGameInfo()
       
    }
})

