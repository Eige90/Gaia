import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
import time

class SimpleCrawler:
    def __init__(self, base_url, max_depth=2):
        self.base_url = base_url
        self.max_depth = max_depth
        self.visited_urls = set()

    def crawl(self, url, depth=0):
        if depth > self.max_depth or url in self.visited_urls:
            return
        print(f"Crawling: {url} at depth {depth}")
        
        try:
            response = requests.get(url)
            response.raise_for_status()
        except requests.exceptions.RequestException as e:
            print(f"Failed to retrieve {url}: {e}")
            return

        self.visited_urls.add(url)
        soup = BeautifulSoup(response.text, 'html.parser')

        # Extrahiere und drucke den Titel der Seite
        title = soup.title.string if soup.title else "No title"
        print(f"Title: {title}")

        # Suche nach allen Links auf der Seite
        links = [a.get('href') for a in soup.find_all('a', href=True)]
        for link in links:
            full_url = urljoin(url, link)
            if self.is_valid_url(full_url):
                self.crawl(full_url, depth + 1)
        
        # Verzögerung einfügen, um die Serverlast zu reduzieren
        time.sleep(1)

    def is_valid_url(self, url):
        parsed_url = urlparse(url)
        return bool(parsed_url.netloc) and bool(parsed_url.scheme) and parsed_url.netloc == urlparse(self.base_url).netloc

# Verwenden des Crawlers
if __name__ == "__main__":
    start_url = "https://example.com"  # Ersetze dies mit der gewünschten Start-URL
    crawler = SimpleCrawler(start_url, max_depth=2)
    crawler.crawl(start_url)
