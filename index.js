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
function setTheme(theme) {
    if (theme === 'light') {
        document.body.style.backgroundColor = '#fff';
        document.body.style.color = '#000';
    } else {
        document.body.style.backgroundColor = '#000';
        document.body.style.color = '#fff';
    }
}
setTheme('dark');