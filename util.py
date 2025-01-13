from PIL import Image
from fake_useragent import UserAgent
import requests
import os
import re

# Initializes UserAgent for generating dynamic HTTP headers
ua = UserAgent()

def remove_special_character(text):
    """
    Removes special characters and whitespace from a string.

    Args:
        text (str): The input string.

    Returns:
        str: The sanitized string containing only alphanumeric characters.
    """
    text.replace(" ", "")
    text = re.sub(r"\s+", "", text)
    return re.sub(r"[^a-zA-Z0-9\s]", "", text)

def delete_image_from_path(path, dir):
    """
    Deletes a specified image file from a given directory.

    Args:
        path (str): The relative path of the image to delete.
        dir (str): The base directory containing the image.

    Returns:
        None
    """
    filepath = dir + path.replace("./", "")
    is_file = os.path.isfile(filepath)
    if is_file:
        os.remove(filepath)

def save_scraped_image(url, filepath):
    """
    Downloads an image from a given URL and saves it to a specified file path.

    Args:
        url (str): The URL of the image to download.
        filepath (str): The file path to save the downloaded image.

    Returns:
        None

    Raises:
        requests.exceptions.RequestException: If the request fails.
    """
    headers = {
        "User-Agent": ua.random  # Generates a random User-Agent
    }

    try:
        req = requests.get(url, headers=headers, stream=True)
        req.raise_for_status()
        with open(filepath, 'wb') as file:
            for chunk in req.iter_content(chunk_size=8192):
                file.write(chunk)
    except requests.exceptions.RequestException as e:
        print("Error", e)

def convert_to_png(base_dir, file_path, filename):
    """
    Converts an image to PNG format and saves it to a specified directory.

    Args:
        base_dir (str): The base directory where the PNG file will be saved.
        file_path (str): The path of the source image to be converted.
        filename (str): The name of the converted PNG file.

    Returns:
        PIL.Image.Image: The converted image object.
    """
    with Image.open(file_path) as img:
        # Checks if the image has an alpha channel (transparency)
        if img.mode in ("RGBA", "LA") or (img.mode == "P" and "transparency" in img.info):
            # Retains the original mode with alpha (if any)
            img = img.convert("RGBA")
        else:
            # Converts to RGB if there is no transparency
            img = img.convert("RGB")
        
        # Defines the path to save the PNG file
        png_path = os.path.join(base_dir, filename)

        # Saves the image as PNG
        img.save(png_path, "PNG", quality=100)
        
        return img
