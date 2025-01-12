import requests
from bs4 import BeautifulSoup as bs
from fake_useragent import UserAgent



# Inicializa o UserAgent para gerar cabeçalhos HTTP dinâmicos
ua = UserAgent()

class LauchBoxScrapper():
  
    def __init__(self, game_name, platform):
      
        self.game_name = game_name
        self.platform = platform

    def base(self, url):
        # Constrói a URL com os parâmetros fornecidos
        url = url
        headers = {
            "User-Agent": ua.random  # Gera um User-Agent aleatório
        }
        # Realiza a requisição GET
        req = requests.get(url, headers=headers)
        return req.text

    def soup(self, content):
        return bs(content, 'html.parser')
    

    def search_game(self):
        # Busca os dados utilizando o método 'base'
        url = f"https://gamesdb.launchbox-app.com/games/results/?title={self.game_name}&platform={self.platform}"
        
        return self.base(url)
    
    def get_results(self):
        # Obtém o HTML da busca
        info = self.search_game()
        # Faz o parsing do HTML usando BeautifulSoup
        body = bs(info, 'html.parser')
        # Busca o elemento com ID 'display'
        display = body.find(id="cardsContainer")
        # Exibe o conteúdo encontrado
        return display
    

    def get_game_link(self):
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
        try:
            # https://gamesdb.launchbox-app.com/games/images/2783-resident-evil-2
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
                # if "front" in img.get("alt"):
                #     print(img.get('src'))

            return imgs
        except:
           pass
        
    
