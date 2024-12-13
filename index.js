async function getRandomPhrase() {
    try {
      const response = await fetch('phrases.json');
      const phrases = await response.json();
      const randomIndex = Math.floor(Math.random() * phrases.length);
      return phrases[randomIndex];
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
  