const phrases = [
        "Part of the GLSDev!",
        "https://glseries.net",
        "Credits to PeteZah for the servers.",
        "Supports Geforce NOW!",
        "Disable particles for the best performance.",
        "Pin your favorite sites on the top right!",
        "There is someone behind you.",
        "That cat is barking.",
        "https://discord.gg/mqGRCEAuna",
        "You can use the launcher for better controls. Just make your own application!",
        "Someone new joined the team. Who could it be?",
        "Share this project with your friends, give it some love!",
        "SolarX AI coming SUPER soon...",
        "Hi, do you really read these messages?",
        "Made with patience.",
        "Open in new tab is best for Geforce NOW.",
        "Did you know you can click me?",
        "What else is there to put here...",
        "What should the next setting be? Let us know in the Discord server! (definitely not custom bare servers)",
        "Miss Infinite Craft? Go to https://infinite-craft.org/",
        "Big big giveaway in the discord server next month :) ($50 TOTAL)",
        "What do you search here?",
        "This shortcut (ctrl + w) opens a Inspect Tool you can use.",
        "GLS V4 has over 1,000,000+ links.",
    ]

    const paragraph = document.getElementById('dynamicParagraph');

    function changeText() {
        const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
        paragraph.textContent = randomPhrase;
    }

    paragraph.addEventListener('click', changeText);
    window.onload = changeText;

    function updateTime() {
        const timeElement = document.getElementById("time");
        const now = new Date();
        let hours = now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        
        hours = hours % 12;
        hours = hours ? hours : 12;
        hours = hours.toString().padStart(2, '0');
        
        timeElement.textContent = `${hours}:${minutes}:${seconds} ${ampm}`;
    }

    setInterval(updateTime, 1000);

    const pinMenuTrigger = document.getElementById('pin-menu-trigger');
    const pinDropdown = document.getElementById('pin-dropdown');
    const addPinBtn = document.getElementById('add-pin-btn');
    const popup = document.getElementById('add-pin-popup');
    const addBtn = document.getElementById('add-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    const pinGrid = document.getElementById('pin-grid');
    const searchInput = document.getElementById('uv-address');
    const searchButton = document.getElementById('search-button');

    let draggedElement = null;

    function submitSearch() {
        const form = document.getElementById('uv-form');
        if (form) {
            form.dispatchEvent(new Event('submit'));
        }
    }

    searchButton.addEventListener('click', function(e) {
        e.preventDefault();
        submitSearch();
    });

    pinMenuTrigger.addEventListener('click', function(e) {
        e.stopPropagation();
        pinDropdown.classList.toggle('show');
    });

    document.addEventListener('click', function(e) {
        if (!pinDropdown.contains(e.target) && !pinMenuTrigger.contains(e.target)) {
            pinDropdown.classList.remove('show');
        }
    });

    function loadSavedPins() {
        const savedPins = JSON.parse(localStorage.getItem('pinnedBookmarks') || '[]');
        savedPins.forEach(pin => {
            createPinElement(pin.name, pin.url, pin.image);
        });
    }

    function createPinElement(name, url, imageData) {
        const pinItem = document.createElement('div');
        pinItem.className = 'pin-item';
        pinItem.draggable = true;
        pinItem.dataset.url = url;
        pinItem.dataset.name = name;
        pinItem.dataset.image = imageData;

        const img = document.createElement('img');
        img.src = imageData;
        img.alt = name;

        const nameDiv = document.createElement('div');
        nameDiv.className = 'pin-item-name';
        nameDiv.textContent = name;

        const deleteBtn = document.createElement('div');
        deleteBtn.className = 'delete-btn';
        deleteBtn.innerHTML = '×';
        deleteBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            deletePin(pinItem);
        });

        pinItem.appendChild(img);
        pinItem.appendChild(nameDiv);
        pinItem.appendChild(deleteBtn);

        pinItem.addEventListener('click', function(e) {
            e.preventDefault();
            
            searchInput.value = url;
            
            pinDropdown.classList.remove('show');
            
            setTimeout(() => {
                submitSearch();
            }, 100);
        });

        pinItem.addEventListener('dragstart', function(e) {
            draggedElement = this;
            this.classList.add('dragging');
            e.dataTransfer.setData('text/html', this.outerHTML);
        });

        pinItem.addEventListener('dragend', function() {
            this.classList.remove('dragging');
            draggedElement = null;
            savePinsOrder();
        });

        pinGrid.appendChild(pinItem);
    }

    function deletePin(pinElement) {
        pinElement.remove();
        savePinsOrder();
    }

    pinGrid.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.classList.add('drag-over');
        
        const afterElement = getDragAfterElement(this, e.clientY);
        if (afterElement == null) {
            this.appendChild(draggedElement);
        } else {
            this.insertBefore(draggedElement, afterElement);
        }
    });

    pinGrid.addEventListener('dragleave', function() {
        this.classList.remove('drag-over');
    });

    pinGrid.addEventListener('drop', function(e) {
        e.preventDefault();
        this.classList.remove('drag-over');
    });

    function getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.pin-item:not(.dragging)')];
        
        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }

    function savePinsOrder() {
        const pins = [];
        pinGrid.querySelectorAll('.pin-item').forEach(item => {
            pins.push({
                name: item.dataset.name,
                url: item.dataset.url,
                image: item.dataset.image
            });
        });
        localStorage.setItem('pinnedBookmarks', JSON.stringify(pins));
    }

    function savePin(name, url, imageData) {
        const savedPins = JSON.parse(localStorage.getItem('pinnedBookmarks') || '[]');
        savedPins.push({ name, url, image: imageData });
        localStorage.setItem('pinnedBookmarks', JSON.stringify(savedPins));
    }

    addPinBtn.addEventListener('click', function(e) {
        e.preventDefault();
        popup.style.display = 'block';
    });

    addBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const nameInput = document.getElementById('pin-name').value;
        const urlInput = document.getElementById('pin-url').value;
        const imageInput = document.getElementById('pin-image').files[0];

        if (!nameInput) {
            alert('Please enter a name for the pin');
            return;
        }

        if (!urlInput.startsWith('https://')) {
            alert('URL must start with https://');
            return;
        }

        if (!imageInput) {
            alert('Please select an image');
            return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            const imageData = e.target.result;
            createPinElement(nameInput, urlInput, imageData);
            savePin(nameInput, urlInput, imageData);
            popup.style.display = 'none';
            document.getElementById('pin-name').value = '';
            document.getElementById('pin-url').value = '';
            document.getElementById('pin-image').value = '';
        };
        reader.readAsDataURL(imageInput);
    });

    cancelBtn.addEventListener('click', function(e) {
        e.preventDefault();
        popup.style.display = 'none';
        document.getElementById('pin-name').value = '';
        document.getElementById('pin-url').value = '';
        document.getElementById('pin-image').value = '';
    });

    window.addEventListener('load', loadSavedPins);

    function createStar() {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.top = Math.random() * 100 + 'vh';
        star.style.left = Math.random() * 100 + 'vw';
        star.style.animationDuration = (Math.random() * 2 + 1) + 's';
        document.body.appendChild(star);
    }

    function createShootingStar() {
        const shootingStar = document.createElement('div');
        shootingStar.classList.add('shooting-star');
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight / 2;
        shootingStar.style.top = startY + 'px';
        shootingStar.style.left = startX + 'px';
        shootingStar.style.animationDuration = (Math.random() * 1 + 0.5) + 's';
        shootingStar.style.animationTimingFunction = 'linear';
        shootingStar.style.animationIterationCount = 'infinite';
        shootingStar.style.animationDelay = (Math.random() * 5) + 's';
        document.body.appendChild(shootingStar);

        shootingStar.addEventListener('animationend', () => {
            shootingStar.remove();
        });
    }

    for (let i = 0; i < 100; i++) {
        createStar();
    }

    for (let i = 0; i < 10; i++) {
        createShootingStar();
    }