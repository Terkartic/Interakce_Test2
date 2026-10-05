const pinsData = [
  { id: 1, title: 'Horska krajina', category: 'priroda', height: 400 },
  { id: 2, title: 'Moderni architektura', category: 'architektura', height: 300 },
  { id: 3, title: 'Kava a snidane', category: 'jidlo', height: 500 },
  { id: 4, title: 'Minimalisticky interier', category: 'architektura', height: 350 },
  { id: 5, title: 'Lesni cesta', category: 'priroda', height: 450 },
  { id: 6, title: 'Domaci pizza', category: 'jidlo', height: 280 }
];

const container = document.getElementById('pin-container');
const searchInput = document.getElementById('search-input');
const tabAll = document.getElementById('tab-all');
const tabSaved = document.getElementById('tab-saved');

let savedPinIds = [];
let activeTab = 'all';

function updateDisplay() {
  const query = searchInput.value.toLowerCase().trim();

  const filteredPins = pinsData.filter(pin => {
    const matchesSearch = pin.title.toLowerCase().includes(query) || 
                          pin.category.toLowerCase().includes(query);
    const matchesTab = (activeTab === 'all') || savedPinIds.includes(pin.id);
    return matchesSearch && matchesTab;
  });

  renderPins(filteredPins);
}

function renderPins(pinsToRender) {
  container.innerHTML = '';

  if (pinsToRender.length === 0) {
    container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px; color: #666;">Žádné piny k zobrazení.</p>';
    return;
  }

  pinsToRender.forEach(pin => {
    const isSaved = savedPinIds.includes(pin.id);
    const pinElement = document.createElement('div');
    pinElement.className = 'pin';

    const imageUrl = 'https://dummyimage.com/300x' + pin.height + '/cccccc/000000.png?text=' + encodeURIComponent(pin.title);

    pinElement.innerHTML = `
      <img src="${imageUrl}" alt="${pin.title}">
      <button class="save-btn ${isSaved ? 'saved' : ''}">${isSaved ? 'Uloženo' : 'Uložit'}</button>
    `;

    const saveBtn = pinElement.querySelector('.save-btn');
    saveBtn.addEventListener('click', () => {
      toggleSavePin(pin.id);
    });

    container.appendChild(pinElement);
  });
}

function toggleSavePin(id) {
  if (savedPinIds.includes(id)) {
    savedPinIds = savedPinIds.filter(savedId => savedId !== id);
  } else {
    savedPinIds.push(id);
  }
  updateDisplay();
}

searchInput.addEventListener('input', updateDisplay);

tabAll.addEventListener('click', () => {
  activeTab = 'all';
  tabAll.classList.add('active');
  tabSaved.classList.remove('active');
  updateDisplay();
});

tabSaved.addEventListener('click', () => {
  activeTab = 'saved';
  tabSaved.classList.add('active');
  tabAll.classList.remove('active');
  updateDisplay();
});

updateDisplay();
