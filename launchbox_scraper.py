import requests
from bs4 import BeautifulSoup as bs
from fake_useragent import UserAgent

# Initializes UserAgent for generating dynamic HTTP headers
ua = UserAgent()

class LauchBoxScrapper:
    """
    A class to scrape game data and images from the LaunchBox Games Database.
    """

    def __init__(self, game_name, platform):
        """
        Initializes the scraper with the game name and platform.

        Args:
            game_name (str): The name of the game to search for.
            platform (str): The platform of the game (e.g., PSX, PC).
        """
        self.game_name = game_name
        self.platform = platform

    def base(self, url):
        """
        Makes a GET request to the provided URL with a random User-Agent header.

        Args:
            url (str): The URL for the GET request.

        Returns:
            str: The HTML content of the response.
        """
        headers = {
            "User-Agent": ua.random  # Generates a random User-Agent
        }
        req = requests.get(url, headers=headers)
        return req.text

    def soup(self, content):
        """
        Parses HTML content using BeautifulSoup.

        Args:
            content (str): HTML content to be parsed.

        Returns:
            BeautifulSoup: Parsed HTML content.
        """
        return bs(content, 'html.parser')
    
    def search_game(self):
        """
        Constructs the search URL for the game and platform and fetches the HTML content.

        Returns:
            str: HTML content of the search results.
        """
        url = f"https://gamesdb.launchbox-app.com/games/results/?title={self.game_name}&platform={self.platform}"
        return self.base(url)
    
    def get_results(self):
        """
        Extracts the search results container from the HTML content.

        Returns:
            BeautifulSoup: The HTML container with search results.
        """
        info = self.search_game()
        body = bs(info, 'html.parser')
        display = body.find(id="cardsContainer")
        return display

    def get_game_link(self):
        """
        Searches the results for the specific game and platform, returning the game's detail link.

        Returns:
            str: The URL of the game's detail page if found, else None.
        """
        try:
            display = self.get_results()
            games = display.find_all(class_="games-grid-card")
            game_link = ""
            for index, item in enumerate(games):
                platform = item.find_all(class_="cardTitle")
                for plat in platform:
                    if str(plat.find("p").text).lower() == self.platform.lower() and str(item.find("h3").text).lower() == self.game_name.lower():
                        game_link = games[index].find("a")
            return game_link.get("href")
        except:
            pass
    
    def get_images(self):
        """
        Fetches all available images for the game from its detail page.

        Returns:
            list: A list of URLs for the game's images.
        """
        try:
            # Example image URL: https://gamesdb.launchbox-app.com/games/images/2783-resident-evil-2
            game_link = self.get_game_link()
            game_id = game_link.split("/")[-1]
            url = f"https://gamesdb.launchbox-app.com/games/images/{game_id}"
            base = self.base(url)
            images = self.soup(base).find_all(class_="imageCard")
            imgs = []
            for img in images:
                if "alt" in img.attrs:
                    print(img.get("alt"))
                    imgs.append(img.get("src"))
            return imgs
        except:
            pass
