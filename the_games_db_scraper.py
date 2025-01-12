import requests
from bs4 import BeautifulSoup as bs
from fake_useragent import UserAgent

# Inicializa o UserAgent para gerar cabeçalhos HTTP dinâmicos
ua = UserAgent()

class TheGamesDBScraper():
    """
    Classe para interagir com o site TheGamesDB, realizando buscas e manipulando os resultados.
    """

    def __init__(self, gamename, platform):
        """
        Inicializa a classe com o atributo 'url', que é uma string vazia.
        """
        self.game_name = gamename
        self.platform = platform
        self.body = ""
        self.covers = ""
        self.screens = ""
        self.logos = ""

    def base(self, url):
        """
        Faz uma requisição GET ao site TheGamesDB para buscar informações sobre um jogo específico.

        Args:
            name (str): Nome do jogo a ser pesquisado.
            platform (str): ID da plataforma no TheGamesDB.

        Returns:
            str: Conteúdo HTML da resposta da requisição.
        """
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

    def search_from_thegamesdb(self):
        """
        Busca informações específicas no site TheGamesDB para um jogo e uma plataforma predefinidos.

        Returns:
            str: Conteúdo HTML retornado pelo método 'base'.
        """
        # Define o ID da plataforma e o nome do jogo
        platform_id = {
            "psx": "10"  # ID da plataforma PlayStation 1 (PSX)
        }
        name = "Code Veronica"
        # Busca os dados utilizando o método 'base'
        url = f"https://thegamesdb.net/search.php?name={self.game_name}&platform_id%5B%5D={self.platform}"
        
        return self.base(url)

    def get_results_from_thegamesdb(self):
        """
        Extrai e exibe a seção do HTML com o ID 'display' retornada pelo site TheGamesDB.

        Returns:
            str: Conteúdo HTML da div 'id' retornado pelo método 'search_from_thegamesdb'.
        """
        # Obtém o HTML da busca
        info = self.search_from_thegamesdb()
        # Faz o parsing do HTML usando BeautifulSoup
        body = bs(info, 'html.parser')
        # Busca o elemento com ID 'display'
        display = body.find(id="display")
        # Exibe o conteúdo encontrado
        return display

    def get_games_result_from_thegamesdb(self):
        """
        Esse metodo ira obter a url para salvar as imagens e descricoes necessarias

        Utilizar este metodo para retornar a algum frontend todos os titulos disponiveis
        Por enquanto ira retornar apenas o primeiro item da lista

        Returns:
            str: URL da pagina do game

        Prints:


        """
        display = self.get_results_from_thegamesdb()
        games = display.find_all(class_="col-6")
        if games:
            return games[0].find("a").get("href")
        else:
            print("Nao achou nenhum resultado para a sua busca")

    def get_game_page_info_from_thegamesdb(self):
        game_id = self.get_games_result_from_thegamesdb()
        url = f"https://thegamesdb.net/{str(game_id).replace("./","")}"
        base = self.base(url)
        body = self.soup(base)
        self.body = body
        images = []

        try:
            images.append(self.get_clearlogo_from_thegamesdb())
            images.append(self.get_screenshot_from_thegamesdb())
            images.append(self.get_cover_from_thegamesdb())
            return images
        except:
            pass
       

    def get_cover_from_thegamesdb(self):
        body = self.body
        cover_container = body.find_all(attrs={"data-fancybox": "cover"})
        cover_image_url = cover_container[0].find("img").get("src")
        self.covers = cover_image_url
        return cover_image_url
    

    def get_screenshot_from_thegamesdb(self):
        body = self.body
        screenshot_container = body.find_all(attrs={"data-fancybox": "screenshots"})
        screenshot_image = screenshot_container[0]
        screenshot_image_url = screenshot_image.find_all("img")[0].get("src")
        self.screens = screenshot_image_url
        return screenshot_image_url

    def get_clearlogo_from_thegamesdb(self):
        body = self.body
        clearlogo_container = body.find_all(attrs={"data-fancybox": "clearlogos"})
        clearlogo_image_url = clearlogo_container[0].find_all("img")[0].get("src")
        self.logos = clearlogo_image_url
        return clearlogo_image_url
        

    
    def get_game_description_from_thegamesdb(self):
        body = self.get_game_page_info_from_thegamesdb()
        description = body.find_all(class_="game-overview")[0]
        print(description.text)




        

        