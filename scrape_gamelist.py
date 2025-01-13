from bs4 import BeautifulSoup as bs
import xml.etree.ElementTree as ET
import json
import os

from util import *


def xml_to_dict(element):
    """
    Recursively converts an XML element and its children into a dictionary.

    Args:
        element (xml.etree.ElementTree.Element): The XML element to convert.

    Returns:
        dict: A dictionary representation of the XML element.
    """
    result = {}
    for child in element:
        # Checks if the element has children
        if len(child) > 0:
            result[child.tag] = xml_to_dict(child)
        else:
            # Adds the text of the element or its attributes if available
            result[child.tag] = child.text or child.attrib
    return result

def get_game_by_index(path, index):
    """
    Retrieves a specific game entry from an XML file by its index.

    Args:
        path (str): Path to the XML file.
        index (int): Index of the game entry to retrieve.

    Returns:
        dict: A dictionary representation of the game entry.
    """
    tree = ET.parse(path)
    root = tree.getroot()
    game = root.findall("game")[index]
    return xml_to_dict(game)

def update_image_xml(game_index, image_path, xml_file, dir_images):
    """
    Updates the image path for a specific game in the XML file.

    Args:
        game_index (int): Index of the game in the XML file.
        image_path (str): Path to the new image file.
        xml_file (str): Path to the XML file.
        dir_images (str): Directory where images are stored.

    Returns:
        str: The updated image path.

    Side Effects:
        Deletes the old image if it differs from the new image.
    """
    tree = ET.parse(xml_file)
    root = tree.getroot()
    game = root.findall("game")[game_index]
    old_file = ""
    new_image = ""
    if game is not None:
        image_element = game.find("image")
        if image_element is not None:
            old_file = image_element.text
            relative_path = os.path.relpath(image_path, start=os.path.dirname(xml_file))
            image_element.text = f"./{relative_path}"
        else:
            relative_path = os.path.relpath(image_path, start=os.path.dirname(xml_file))
            new_image_element = ET.SubElement(game, "image")
            new_image_element.text = f"./{relative_path}"

        new_image = game.find("image").text
    
    tree.write(xml_file, encoding='utf-8', xml_declaration=True)
    if old_file != new_image:
        delete_image_from_path(old_file, dir_images)
    return new_image

def update_marquee_xml(game_index, image_path, xml_file, dir_images):
    """
    Updates the marquee path for a specific game in the XML file.

    Args:
        game_index (int): Index of the game in the XML file.
        image_path (str): Path to the new marquee file.
        xml_file (str): Path to the XML file.
        dir_images (str): Directory where marquee files are stored.

    Returns:
        str: The updated marquee path.

    Side Effects:
        Deletes the old marquee if it differs from the new marquee.
    """
    tree = ET.parse(xml_file)
    root = tree.getroot()
    game = root.findall("game")[game_index]
    old_file = ""
    new_image = ""
    if game is not None:
        image_element = game.find("marquee")
        if image_element is not None:
            old_file = image_element.text
            relative_path = os.path.relpath(image_path, start=os.path.dirname(xml_file))
            image_element.text = f"./{relative_path}"
        else:
            relative_path = os.path.relpath(image_path, start=os.path.dirname(xml_file))
            new_image_element = ET.SubElement(game, "marquee")
            new_image_element.text = f"./{relative_path}"

        new_image = game.find("marquee").text
    
    tree.write(xml_file, encoding='utf-8', xml_declaration=True)
    if old_file != new_image:
        delete_image_from_path(old_file, dir_images)
    return new_image

def get_all_names(path):
    """
    Retrieves all game entries from the XML file, including their name, image, release date, and genre.

    Args:
        path (str): Path to the XML file.

    Returns:
        list: A list of dictionaries containing game details:
              - 'game' (str): Name of the game.
              - 'image' (str or None): Path to the game image (if available).
              - 'index' (int): Index of the game in the XML file.
              - 'release_date' (str or None): Release date of the game (if available).
              - 'genre' (str or None): Genre of the game (if available).
    """
    tree = ET.parse(path)
    root = tree.getroot()
    games = []
    image = ""
    name = ""
    release = ""
    genre = ""
    for index, item in enumerate(root.findall("game")):
        if item.find("image") is not None:
            image = item.find("image").text
        else:
            image = None
        
        if item.find("releasedate") is not None:
            release = item.find("releasedate").text
        else:
            release = None

        if item.find("genre") is not None:
            genre = item.find("genre").text
        else:
            genre = None

        name = item.find("name").text
        games.append({'game': name, "image": image, 'index': index, 'release_date': release, 'genre': genre})

    return games
