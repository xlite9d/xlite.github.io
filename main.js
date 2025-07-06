const searchInput = document.querySelector('.search-bar');
const gameCards = document.querySelectorAll('.game-card');
const noResultsMessage = document.getElementById('noResultsMessage');

document.addEventListener('DOMContentLoaded', function() {
  const cursorFollow = document.createElement('div');
  cursorFollow.classList.add('cursor-follow');
  document.body.appendChild(cursorFollow);

  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;

  document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    const speed = 0.15;
    cursorX += (mouseX - cursorX) * speed;
    cursorY += (mouseY - cursorY) * speed;

    cursorFollow.style.left = cursorX + 'px';
    cursorFollow.style.top = cursorY + 'px';

    requestAnimationFrame(animateCursor);
  }

  animateCursor();

  gameCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      document.body.classList.add('game-hover');
      cursorFollow.style.opacity = '1';
      cursorFollow.style.width = '350px';
      cursorFollow.style.height = '350px';
    });

    card.addEventListener('mouseleave', function() {
      document.body.classList.remove('game-hover');
      cursorFollow.style.opacity = '0';
      cursorFollow.style.width = '300px';
      cursorFollow.style.height = '300px';
    });

    card.addEventListener('click', () => {
      const url = card.getAttribute('data-url');
      if (url) {
        window.location.href = url;
      }
    });
  });

  searchInput.addEventListener('input', function() {
    const query = this.value.toLowerCase();
    let resultsFound = false;

    gameCards.forEach(card => {
      const title = card.querySelector('h3').textContent.toLowerCase();
      if (title.includes(query)) {
        card.style.display = '';
        resultsFound = true;
      } else {
        card.style.display = 'none';
      }
    });

    if (!resultsFound && query !== '') {
      noResultsMessage.style.display = 'flex';
    } else {
      noResultsMessage.style.display = 'none';
    }
  });
});
