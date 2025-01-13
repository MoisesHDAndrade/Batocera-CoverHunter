import requests
from bs4 import BeautifulSoup as bs
from fake_useragent import UserAgent

# Initializes UserAgent to generate dynamic HTTP headers
ua = UserAgent()

class TheGamesDBScraper():
    """
    Class to interact with TheGamesDB website, perform searches, and manipulate results.
    """

    def __init__(self, gamename, platform):
        """
        Initializes the class with the game name and platform.
        """
        self.game_name = gamename
        self.platform = platform
        self.body = ""
        self.covers = ""
        self.screens = ""
        self.logos = ""

    def base(self, url):
        """
        Makes a GET request to TheGamesDB website to fetch information about a specific game.

        Args:
            url (str): The URL for the request.

        Returns:
            str: HTML content of the response.
        """
        headers = {
            "User-Agent": ua.random  # Generates a random User-Agent
        }
        # Sends the GET request
        req = requests.get(url, headers=headers)
        return req.text

    def soup(self, content):
        """
        Parses the HTML content using BeautifulSoup.
        """
        return bs(content, 'html.parser')

    def search_from_thegamesdb(self):
        """
        Searches for specific information on TheGamesDB for a predefined game and platform.

        Returns:
            str: HTML content returned by the 'base' method.
        """
        url = f"https://thegamesdb.net/search.php?name={self.game_name}&platform_id%5B%5D={self.platform}"
        return self.base(url)

    def get_results_from_thegamesdb(self):
        """
        Extracts and returns the section of HTML with the ID 'display' returned by TheGamesDB.

        Returns:
            str: HTML content of the 'display' div returned by the 'search_from_thegamesdb' method.
        """
        # Gets the HTML from the search
        info = self.search_from_thegamesdb()
        # Parses the HTML using BeautifulSoup
        body = bs(info, 'html.parser')
        # Finds the element with the ID 'display'
        display = body.find(id="display")
        # Returns the found content
        return display

    def get_games_result_from_thegamesdb(self):
        """
        This method will retrieve the URL for saving images and descriptions as needed.

        This method will return the first item in the list for now.

        Returns:
            str: URL of the game's page
        """
        display = self.get_results_from_thegamesdb()
        games = display.find_all(class_="col-6")
        if games:
            return games[0].find("a").get("href")
        else:
            print("No results found for your search")

    def get_game_page_info_from_thegamesdb(self):
        """
        Retrieves detailed information about the game, such as images and descriptions.
        """
        game_id = self.get_games_result_from_thegamesdb()
        url = f"https://thegamesdb.net/{str(game_id).replace('./','')}"
        base = self.base(url)
        body = self.soup(base)
        self.body = body
        images = []

        try:
            # Retrieves game images
            images.append(self.get_clearlogo_from_thegamesdb())
            images.append(self.get_screenshot_from_thegamesdb())
            images.append(self.get_cover_from_thegamesdb())
            return images
        except:
            pass

    def get_cover_from_thegamesdb(self):
        """
        Retrieves the cover image of the game.
        """
        body = self.body
        cover_container = body.find_all(attrs={"data-fancybox": "cover"})
        cover_image_url = cover_container[0].find("img").get("src")
        self.covers = cover_image_url
        return cover_image_url

    def get_screenshot_from_thegamesdb(self):
        """
        Retrieves the screenshot of the game.
        """
        body = self.body
        screenshot_container = body.find_all(attrs={"data-fancybox": "screenshots"})
        screenshot_image = screenshot_container[0]
        screenshot_image_url = screenshot_image.find_all("img")[0].get("src")
        self.screens = screenshot_image_url
        return screenshot_image_url

    def get_clearlogo_from_thegamesdb(self):
        """
        Retrieves the logo image of the game.
        """
        body = self.body
        clearlogo_container = body.find_all(attrs={"data-fancybox": "clearlogos"})
        clearlogo_image_url = clearlogo_container[0].find_all("img")[0].get("src")
        self.logos = clearlogo_image_url
        return clearlogo_image_url

    def get_game_description_from_thegamesdb(self):
        """
        Retrieves and prints the description of the game.
        """
        body = self.get_game_page_info_from_thegamesdb()
        description = body.find_all(class_="game-overview")[0]
        print(description.text)
