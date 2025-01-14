// Eruda
function loadEruda() {
    var script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/eruda';
    document.body.appendChild(script);
    script.onload = function () {
        eruda.init();
    };
}

(function () {
    var keyword = '';
    document.addEventListener('keypress', function (event) {
        keyword += event.key.toLowerCase();
        if (keyword.endsWith('eruda')) {
            loadEruda();
            keyword = '';
        }
        if (keyword.length > 5) {
            keyword = keyword.slice(-5);
        }
    });
})();
// Random Phrase
async function getRandomPhrase() {
    try {
      const response = await fetch('phrases.json');
      const phrases = await response.json();
      
      const ultraRareIndex = phrases.length - 1;
      const randomNumber = Math.random();
      
      if (randomNumber <= 0.01) {
        return phrases[ultraRareIndex];
      } else {
        const randomIndex = Math.floor(Math.random() * (phrases.length - 1));
        return phrases[randomIndex];
      }
    } catch (error) {
      console.error('Error fetching phrases:', error);
      return "An error occurred. Please try again.";
    }
  }
  
  document.addEventListener('DOMContentLoaded', async () => {
    const phraseContainer = document.getElementById('phrase-container');
    const randomPhrase = await getRandomPhrase();
    phraseContainer.textContent = randomPhrase;
  });
// Theme
let themeChanged = false;

function setTheme(theme) {
  if (theme === 'light') {
      document.body.style.backgroundColor = '#fff';
      document.body.style.color = '#000';
  } else if (theme === 'dark') {
      document.body.style.backgroundColor = '#000';
      document.body.style.color = '#fff';
  } else if (theme === 'system') {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
          document.body.style.backgroundColor = '#000';
          document.body.style.color = '#fff';
      } else {
          document.body.style.backgroundColor = '#fff';
          document.body.style.color = '#000';
      }
  }

  const textElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, a, span, div, li, td, th');

  textElements.forEach(function(el) {
      if (theme === 'light') {
          el.style.color = '#000';
      } else if (theme === 'dark') {
          el.style.color = '#fff';
      } else if (theme === 'system') {
          if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
              el.style.color = '#fff';
          } else {
              el.style.color = '#000';
          }
      }
  });

  if (themeChanged) {
      showPopup(`Theme set to ${theme.charAt(0).toUpperCase() + theme.slice(1)}`);
  }

  localStorage.setItem('theme', theme);
}

function toggleTheme() {
  const currentTheme = localStorage.getItem('theme') || 'system';
  let newTheme;
  
  if (currentTheme === 'system') {
      newTheme = 'light';
  } else if (currentTheme === 'light') {
      newTheme = 'dark';
  } else {
      newTheme = 'system';
  }

  themeChanged = true;
  setTheme(newTheme);
}

function showPopup(message) {
  const popup = document.createElement('div');
  popup.className = 'popup';
  popup.textContent = message;
  document.body.appendChild(popup);
  setTimeout(() => {
      popup.style.opacity = '0';
  }, 2000);
  setTimeout(() => {
      document.body.removeChild(popup);
  }, 3000);
}

window.onload = function() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
      setTheme(savedTheme);
  } else {
      setTheme('system');
  }
};
// Game Load
async function loadGames() {
    try {
        const response = await fetch('games.json');
        const games = await response.json();
        const gamesList = document.getElementById('gamesList');
        const searchInput = document.getElementById('searchInput');

        games.sort((a, b) => a.name.localeCompare(b.name));

        searchInput.addEventListener('input', () => filterGames(games));

        gamesList.innerHTML = '';
        games.forEach(game => {
            createGameCard(game);
        });
    } catch (error) {
        console.error('Error loading games:', error);
    }
}

function createGameCard(game) {
    const gamesList = document.getElementById('gamesList');

    const gameCard = document.createElement('div');
    gameCard.className = 'game-card';

    const background = document.createElement('div');
    background.className = 'game-background';
    gameCard.appendChild(background);

    if (game.image) {
        const img = document.createElement('img');
        img.src = game.image;
        img.alt = game.name;
        img.className = 'game-image';
        img.onclick = () => showIframe(game.path);
        gameCard.appendChild(img);
    } else {
        const noImageText = document.createElement('div');
        noImageText.className = 'no-image-text';
        noImageText.textContent = game.name;
        gameCard.appendChild(noImageText);
    }

    const link = document.createElement('a');
    link.href = '#';
    link.textContent = game.name;
    link.className = 'game-link';
    link.onclick = () => showIframe(game.path);

    if (game.name.length > 15) {
        link.classList.add('long-name');
    }
    if (game.name.length > 25) {
        link.classList.add('very-long-name');
    }

    gameCard.appendChild(link);
    gamesList.appendChild(gameCard);
}

function filterGames(games) {
    const searchQuery = document.getElementById('searchInput').value.toLowerCase();
    const filteredGames = games.filter(game => game.name.toLowerCase().includes(searchQuery));

    const gamesList = document.getElementById('gamesList');
    gamesList.innerHTML = '';
    filteredGames.forEach(game => {
        createGameCard(game);
    });
}

function showIframe(path) {
    const iframeContainer = document.getElementById('iframeContainer');
    const iframe = document.getElementById('gameIframe');
    const backgroundOverlay = document.getElementById('backgroundOverlay');

    iframe.src = `/${path}`;
    iframeContainer.style.display = 'block';
    backgroundOverlay.style.display = 'block';

    const buttonContainer = document.getElementById('buttonContainer');
    buttonContainer.style.display = 'flex';
}

function hideIframe() {
    const iframeContainer = document.getElementById('iframeContainer');
    const backgroundOverlay = document.getElementById('backgroundOverlay');

    iframeContainer.style.display = 'none';
    document.getElementById('gameIframe').src = '';
    backgroundOverlay.style.display = 'none';

    const buttonContainer = document.getElementById('buttonContainer');
    buttonContainer.style.display = 'none';
}

function toggleFullscreen() {
    const iframe = document.getElementById('gameIframe');
    if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
    } else if (iframe.mozRequestFullScreen) {
        iframe.mozRequestFullScreen();
    } else if (iframe.webkitRequestFullscreen) {
        iframe.webkitRequestFullscreen();
    } else if (iframe.msRequestFullscreen) {
        iframe.msRequestFullscreen();
    }
}

loadGames();
