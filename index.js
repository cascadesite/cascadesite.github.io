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
    const searchInput = document.getElementById('searchInput');
    if (theme === 'light') {
        document.body.style.backgroundColor = '#fff';
        document.body.style.color = '#000';
        searchInput.style.border = '1px solid #000';
    } else if (theme === 'dark') {
        document.body.style.backgroundColor = '#000';
        document.body.style.color = '#fff';
        searchInput.style.border = '1px solid #fff';
    } else if (theme === 'system') {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.body.style.backgroundColor = '#000';
            document.body.style.color = '#fff';
            searchInput.style.border = '1px solid #fff';
        } else {
            document.body.style.backgroundColor = '#fff';
            document.body.style.color = '#000';
            searchInput.style.border = '1px solid #000';
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
    popup.className = 'popup fixed top-5 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white p-3 rounded-lg opacity-100 transition-opacity duration-500 z-50';
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
    gameCard.className = 'game-card relative w-34 h-48 m-2 flex flex-col items-center text-center';
    gameCard.style.width = '136px';
    gameCard.style.height = '188px';
    gameCard.style.margin = '8px';

    const background = document.createElement('div');
    background.className = 'game-background absolute top-0 left-0 w-full h-34 bg-gradient-to-r from-blue-800 via-blue-500 to-blue-400 rounded-lg z-0 transition-opacity duration-300';
    background.style.width = '136px';
    background.style.height = '136px';
    background.style.top = '-8px';
    background.style.left = '-8px';
    background.style.borderRadius = '8px';
    gameCard.appendChild(background);

    const imageBg = document.createElement('div');
    imageBg.className = 'game-image-bg absolute top-0 left-0 w-full h-34 bg-gray-500 rounded-lg z-1';
    imageBg.style.width = '136px';
    imageBg.style.height = '136px';
    imageBg.style.borderRadius = '8px';
    gameCard.appendChild(imageBg);

    if (game.image) {
        const img = document.createElement('img');
        img.src = game.image;
        img.alt = game.name;
        img.className = 'game-image w-full h-34 rounded-lg cursor-pointer z-2 object-cover';
        img.style.width = '136px';
        img.style.height = '136px';
        img.style.borderRadius = '8px';
        img.onclick = () => showIframe(game.path);
        gameCard.appendChild(img);
    } else {
        const noImageText = document.createElement('div');
        noImageText.className = 'no-image-text w-full h-34 bg-gray-500 text-white flex items-center justify-center rounded-lg cursor-pointer z-2';
        noImageText.style.width = '136px';
        noImageText.style.height = '136px';
        noImageText.style.borderRadius = '8px';
        noImageText.textContent = game.name;
        gameCard.appendChild(noImageText);
        noImageText.onclick = () => showIframe(game.path);
    }

    const link = document.createElement('a');
    link.href = '#';
    link.textContent = game.name;
    link.className = 'game-link text-white text-lg font-bold mt-2 z-2 w-full truncate';
    link.style.marginTop = '10px';
    link.style.visibility = 'hidden';
    link.style.overflow = 'hidden';
    link.style.textOverflow = 'ellipsis';
    link.style.whiteSpace = 'nowrap';
    link.onclick = () => showIframe(game.path);

    if (game.name.length > 15) {
        link.classList.add('long-name');
        link.style.fontSize = '14px';
    }
    if (game.name.length > 25) {
        link.classList.add('very-long-name');
        link.style.fontSize = '12px';
    }

    gameCard.appendChild(link);
    gamesList.appendChild(gameCard);

    gameCard.addEventListener('mouseover', () => {
        background.style.opacity = '0.6';
        link.style.visibility = 'visible';
    });
    gameCard.addEventListener('mouseout', () => {
        background.style.opacity = '1';
        link.style.visibility = 'hidden';
    });
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