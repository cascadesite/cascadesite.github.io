// Function to load Eruda
function loadEruda() {
    var script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/eruda';
    document.body.appendChild(script);
    script.onload = function () {
        eruda.init();
    };
}

// Listen for "eruda" keyword in console
(function () {
    var originalConsole = console.log;
    console.log = function (message) {
        if (typeof message === 'string' && message.toLowerCase() === 'eruda') {
            loadEruda();
        }
        originalConsole.apply(console, arguments);
    };
})();
