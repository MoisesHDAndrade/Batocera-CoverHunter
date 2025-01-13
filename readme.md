# CoverHunter

This is a Flask-based web application designed to scrape and manage game-related data and images from multiple sources. The application serves as a utility for managing game libraries by fetching data and images from platforms such as LaunchBox and TheGamesDB. It supports image uploads, scraping, and dynamic updates to an XML-based database for game information.

CoverHunter is specifically tailored for use with Batocera, enabling users to modify game covers and clear logos. While Batocera's built-in scraping capabilities are excellent, CoverHunter provides a way to replace any cover or logo that does not meet the user's preferences, offering a more personalized experience.

**Note:** This application is primarily designed for Linux systems. You must ensure the necessary permissions are set to access the disk where the game files are stored.

## Features

- **Scrape Game Data:** Fetch game details and images from LaunchBox and TheGamesDB.
- **Custom Cover and Logo Uploads:** Upload and manage custom covers and clear logos for games.
- **Dynamic Updates:** Automatically updates an XML-based database with new data and images.
- **Image Conversion:** Converts and optimizes images for use within Batocera.
- **RESTful API:** Provides endpoints for managing and retrieving game data.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/coverhunter.git
   cd coverhunter
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Run the application:
   ```bash
   python app.py
   ```

4. Access the application in your web browser at `http://localhost:5002`.

## Usage

1. Use the web interface to upload your XML game list and scrape data from LaunchBox or TheGamesDB.
2. Replace or upload custom covers and logos for your games.
3. Export the updated XML and images back to your Batocera setup.

## API Endpoints

- `POST /get-list`: Fetch the list of games from the uploaded XML file.
- `POST /upload-image`: Upload a custom cover for a game.
- `POST /upload-clearlogo`: Upload a custom clear logo for a game.
- `POST /scrape/launchbox`: Scrape game data from LaunchBox.
- `POST /game-index/<int:index>`: Fetch details for a specific game by index.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

Developed with ❤️ for gamers who want complete control over their game library aesthetics.



Developed with ❤️ for gamers who want complete control over their game library aesthetics.

