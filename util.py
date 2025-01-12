

from PIL import Image
from fake_useragent import UserAgent
import requests
import os
import re


ua = UserAgent()
def remove_special_character(text):
    text.replace(" ","")
    text = re.sub(r"\s+", "", text)
    return re.sub(r"[^a-zA-Z0-9\s]","", text)

def delete_image_from_path(path, dir):
    filepath = dir+path.replace("./","")
    is_file = os.path.isfile(filepath)
    if is_file:
        os.remove(dir+path.replace("./",""))



def save_scraped_image(url,filepath ):
    headers = {
        "User-Agent": ua.random  # Gera um User-Agent aleatório
    }

    try:
        req = requests.get(url, headers=headers, stream=True)
        req.raise_for_status()
        with open(filepath, 'wb') as file:
            for chunk in req.iter_content(chunk_size=8192):
                file.write(chunk)

    except requests.exceptions.RequestException as e:
        print("Error ", e)



def convert_to_jpg(base_dir, file_path, filename):
    with Image.open(file_path) as img:
        # Converte para RGB (necessário para JPEG)
        img = img.convert("RGB")
        
        # Define o caminho para salvar como JPEG
        
        jpeg_path = os.path.join(base_dir,filename)

        # Salva a imagem como JPEG com qualidade 90 (ajustável)
        img.save(jpeg_path, "PNG", quality=100)
        # os.remove(file_path)
        return img