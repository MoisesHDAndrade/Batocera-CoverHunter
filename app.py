from flask import Flask, render_template, request, jsonify, send_from_directory
from flask_cors import CORS
from scrape_gamelist import *
from launchbox_scraper import *
from the_games_db_scraper import *
from util import *

app = Flask(__name__)
CORS(app)


@app.route("/")
def index():
    return render_template("index.html")

# Caminho base para os arquivos fora do static
BASE_DIR = ""
BASE_DIR_XML = ""
BASE_DIR_IMAGES = ""
app.config['UPLOAD_FOLDER'] = BASE_DIR_IMAGES


@app.route('/images/<path:filename>')
def serve_image(filename):
    return send_from_directory(BASE_DIR_IMAGES, filename)


def changeDIR(path):
    global BASE_DIR
    global BASE_DIR_XML
    global BASE_DIR_IMAGES
    BASE_DIR_XML = path
    gamelist_filename = BASE_DIR_XML.split('/')[-1]
    BASE_DIR = path.replace(f"/{gamelist_filename}","/")
    BASE_DIR_IMAGES = f"{BASE_DIR}images/"

@app.route("/get-list", methods=["POST"])
def get_list():
    data = request.get_json()
    path = data.get("path")
    changeDIR(path)
    games = get_all_names(path)
    return jsonify({"games":games})

@app.route('/upload-image', methods=['POST'])
def upload_image():
    global app
    if 'image' not in request.files:
        return jsonify({})
    
    file = request.files['image']
    game_index = request.form.get('index')
    game_name = remove_special_character(request.form.get('gamename'))
    if file.filename == '':
        return jsonify({})
    
    filename = f"{game_name}-image.png"
    filepath = BASE_DIR_IMAGES+filename
    file.save(filepath)
    convert_to_png(BASE_DIR_IMAGES, filepath, filename)
    new_image = update_image_xml(int(game_index), filepath, BASE_DIR_XML, BASE_DIR)
    return jsonify({'status':'ok','image':new_image})


@app.route('/upload-clearlogo', methods=['POST'])
def upload_clearlogo():
    if 'image' not in request.files:
        return jsonify({})
    
    file = request.files['image']
    game_index = request.form.get('index')
    game_name = remove_special_character(request.form.get('gamename'))
    if file.filename == '':
        return jsonify({})
    
    filename = f"{game_name}-marquee.png"
    filepath = BASE_DIR_IMAGES+filename
    file.save(filepath)
    convert_to_png(BASE_DIR_IMAGES, filepath, filename)
    new_image = update_marquee_xml(int(game_index), filepath, BASE_DIR_XML, BASE_DIR)
    return jsonify({'status':'ok','image':new_image})

@app.route('/upload-image-scrape', methods=['POST'])
def upload_image_scrape():
    data = request.get_json()
   
    game_index = data.get('index')
    game_name = remove_special_character(data.get('gamename'))
    
    filename = f"{game_name}-image.png"
    filepath = BASE_DIR_IMAGES+filename
    save_scraped_image(data.get('image'),filepath )
    convert_to_png(BASE_DIR_IMAGES, filepath, filename)
    new_image = update_image_xml(int(game_index), filepath, BASE_DIR_XML, BASE_DIR)
    return jsonify({'status':'ok','image':new_image})


@app.route('/upload-clearlogo-scrape', methods=['POST'])
def upload_clearlogo_scrape():
    data = request.get_json()
   
    game_index = data.get('index')
    game_name = remove_special_character(data.get('gamename'))
    
    filename = f"{game_name}-marquee.png"
    filepath = BASE_DIR_IMAGES+filename
    save_scraped_image(data.get('image'),filepath )
    convert_to_png(BASE_DIR_IMAGES, filepath, filename)
    new_image = update_marquee_xml(int(game_index), filepath, BASE_DIR_XML, BASE_DIR)
    # return jsonify({})
    return jsonify({'status':'ok','image':new_image})




@app.route('/scrape/lauchbox', methods=["POST"])
def scrape_lauchbox():
    data = request.get_json()
    gamename = data.get("gamename")
    platform = data.get("platform")
    lb = LauchBoxScrapper(gamename, platform[0][1])
    gdb = TheGamesDBScraper(gamename, platform[0][0])
    lb_images = lb.get_images()
    gdb_images = gdb.get_game_page_info_from_thegamesdb()
    if lb_images and gdb_images:
        images = lb_images + gdb_images
        return jsonify({'data':images})
    
    if lb_images and not gdb_images:
        return jsonify({'data':lb_images})
    else:
        return jsonify({'data':gdb_images})

@app.route("/game-index/<int:index>", methods=["POST"])
def get_game(index):
    data = request.get_json()
    path = data.get("path")
    changeDIR(path)
    game = get_game_by_index(path, index)
    return jsonify({"data":game})

if __name__ == '__main__':
    app.run(debug=True, port = 5002)