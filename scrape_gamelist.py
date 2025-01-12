from bs4 import BeautifulSoup as bs
import xml.etree.ElementTree as ET
import json
import os

from util import *


def xml_to_dict(element):
    result = {}
    for child in element:
        # Verifica se o elemento tem filhos
        if len(child) > 0:
            result[child.tag] = xml_to_dict(child)
        else:
            # Adiciona o texto do elemento ou atributos se disponíveis
            result[child.tag] = child.text or child.attrib
    return result

def get_game_by_index(path, index):
    tree = ET.parse(path)
    root = tree.getroot()
    game = root.findall("game")[index]
    return xml_to_dict(game)


def update_image_xml(game_index, image_path, xml_file, dir_images):
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
    tree = ET.parse(path)
    root = tree.getroot()
    games = []
    image = ""
    name = ""
    release = ""
    genre = ""
    for index, item in enumerate(root.findall("game")):
        if item.find("image") != None:
            image = item.find("image").text
        else:
            image = None
        
        if item.find("releasedate") != None:
            release = item.find("releasedate").text
        else:
            release = None

        if item.find("genre") != None:
            genre = item.find("genre").text
        else:
            genre = None

        name = item.find("name").text
        games.append({'game':name, "image":image, 'index':index, 'release_date':release, 'genre':genre})

    return games



