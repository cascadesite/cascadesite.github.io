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
