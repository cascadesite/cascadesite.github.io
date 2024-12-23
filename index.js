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
// Particles
particlesJS('particles-js', {
    "particles": {
        "number": {
            "value": 100,
            "density": {
                "enable": true,
                "value_area": 800
            }
        },
        "color": {
            "value": "#ffffff"
        },
        "shape": {
            "type": "circle",
            "stroke": {
                "width": 0,
                "color": "#000000"
            }
        },
        "opacity": {
            "value": 1,
            "random": true,
            "anim": {
                "enable": true,
                "speed": 1.5,
                "opacity_min": 0.3,
                "sync": false
            }
        },
        "size": {
            "value": 3,
            "random": true,
            "anim": {
                "enable": false,
                "speed": 40,
                "size_min": 0.1,
                "sync": false
            }
        },
        "line_linked": {
            "enable": false
        },
        "move": {
            "enable": true,
            "speed": 0,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
            }
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": false
            },
            "onclick": {
                "enable": false
            },
            "resize": true
        },
        "modes": {
            "grab": {
                "distance": 400,
                "line_linked": {
                    "opacity": 1
                }
            },
            "bubble": {
                "distance": 400,
                "size": 40,
                "duration": 2,
                "opacity": 8,
                "speed": 3
            },
            "repulse": {
                "distance": 200,
                "duration": 0.4
            },
            "push": {
                "particles_nb": 4
            },
            "remove": {
                "particles_nb": 2
            }
        }
    },
    "retina_detect": true
  });