    function isValidURL(str) {
      try {
        new URL(str);
        return true;
      } catch {
        return false;
      }
    }

    function browse() {
      const input = document.getElementById('url').value.trim();
      let target = "";

      if (!input) return alert("Please enter something.");

      if (isValidURL(input)) {
        target = input;
      } else if (/^[^\s]+\.[^\s]{2,}/.test(input)) {
        target = "https://" + input;
      } else {
        target = `https://duckduckgo.com/?t=h_&q=${encodeURIComponent(input)}&ia=web`;
      }

      window.location.href = `/active/embed?url=${encodeURIComponent(target)}`;
    }
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();

const letters = "LUMA WEB PROXY";
const fontSize = 10;
const columns = Math.floor(canvas.width / fontSize);

const drops = Array.from({ length: columns }, () => Math.random() * canvas.height / fontSize);

function draw() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "white";
  ctx.font = `${fontSize}px 'Cal Sans', sans-serif`;

  for (let i = 0; i < drops.length; i++) {
    const char = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillText(char, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height || Math.random() > 0.975) {
      drops[i] = 0;
    } else {
      drops[i]++;
    }
  }
}

setInterval(draw, 40);

window.addEventListener('resize', () => {
  resizeCanvas();
  for (let i = 0; i < drops.length; i++) {
    drops[i] = Math.random() * canvas.height / fontSize;
  }
});

function openIframedUrlInNewBlank(url) {
    const newWindow = window.open('about:blank', '_blank');

    if (newWindow) {
        newWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>${url}</title>
                <style>
                    body, html {
                        margin: 0;
                        padding: 0;
                        width: 100%;
                        height: 100%;
                        overflow: hidden;
                    }
                    iframe {
                        width: 100%;
                        height: 100%;
                        border: none;
                    }
                </style>
            </head>
            <body>
                <iframe src="${url}" frameborder="0"></iframe>
            </body>
            </html>
        `);
        newWindow.document.close();
    } else {
        alert("Please enable popups to view this content.");
    }
}

document.getElementById('github-link').addEventListener('click', function (e) {
    e.preventDefault();
    openIframedUrlInNewBlank('/active/embed?url=https://github.com/luma9x/luma9x.github.io/');
});
