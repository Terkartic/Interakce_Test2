const container = document.getElementById('pin-container');

// Náhodné rozměry pro simulaci různé výšky obrázků
const pinHeights = [300, 400, 500, 350, 450, 280];

for (let i = 0; i < 20; i++) {
  const height = pinHeights[i % pinHeights.length];
  const pin = document.createElement('div');
  pin.className = 'pin';

  pin.innerHTML = `
    <img src="https://picsum.photos/300/${height}?random=${i}" alt="Pin ${i + 1}">
    <button class="save-btn" onclick="alert('Uloženo!')">Uložit</button>
  `;

  container.appendChild(pin);
}
// Data pro piny s tagy pro vyhledávání
const pinsData = [
  { id: 1, title: 'Horská krajina', category: 'příroda', height: 400 },
  { id: 2, title: 'Moderní architektura', category: 'architektura', height: 300 },
  { id: 3, title: 'Káva a snídaně', category: 'jídlo', height: 500 },
  { id: 4, title: 'Minimalistický interiér', category: 'architektura', height: 350 },
  { id: 5, title: 'Lesní cesta', category: 'příroda', height: 450 },
  { id: 6, title: 'Domácí pizza', category: 'jídlo', height: 280 },
  { id: 7, title: 'Abstraktní umění', category: 'umění', height: 380 },
  { id: 8, title: 'Cestování po Japonsku', category: 'příroda', height: 420 }
];

const container = document.getElementById('pin-container');
const searchInput = document.getElementById('search-input');
const tabAll = document.getElementById('tab-all');
const tabSaved = document.getElementById('tab-saved');
// Stav aplikace
let savedPinIds = JSON.parse(localStorage.getItem('savedPins')) || [];
let activeTab = 'all'; // 'all' nebo 'saved'

// Hlavní funkce pro filtrování a zobrazení pinů
function updateDisplay() {
  const query = searchInput.value.toLowerCase().trim();

  const filteredPins = pinsData.filter(pin => {
    // 1. Kontrola vyhledávání
    const matchesSearch = pin.title.toLowerCase().includes(query) || 
                          pin.category.toLowerCase().includes(query);
    
    // 2. Kontrola záložky (Vše vs. Uložené)
    const matchesTab = (activeTab === 'all') || savedPinIds.includes(pin.id);

    return matchesSearch && matchesTab;
  });

  renderPins(filteredPins);
}
// Funkce pro vykreslení pinů
function renderPins(pinsToRender) {
  container.innerHTML = '';

  if (pinsToRender.length === 0) {
    container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #666;">Žádné piny nebyly nalezeny.</p>';
    return;
  }

  pinsToRender.forEach(pin => {
    const isSaved = savedPinIds.includes(pin.id);
    const pinElement = document.createElement('div');
    pinElement.className = 'pin';

    pinElement.innerHTML = `
      <img src="https://picsum.photos/300/${pin.height}?random=${pin.id}" alt="${pin.title}">
      <button class="save-btn ${isSaved ? 'saved' : ''}" data-id="${pin.id}">
        ${isSaved ? 'Uloženo' : 'Uložit'}
      </button>
    `;

    // Přidání události na tlačítko Uložit
    const saveBtn = pinElement.querySelector('.save-btn');
    saveBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleSavePin(pin.id, saveBtn);
    });

    container.appendChild(pinElement);
  });
}

// Funkce pro uložení/zrušení uložení pinu
function toggleSavePin(id, button) {
  if (savedPinIds.includes(id)) {
    // Odstranění z uložených
    savedPinIds = savedPinIds.filter(savedId => savedId !== id);
    button.textContent = 'Uložit';
    button.classList.remove('saved');
  } else {
    // Přidání do uložených
    savedPinIds.push(id);
    button.textContent = 'Uloženo';
    button.classList.add('saved');
  }

  // Uložení stavu do localStorage prohlížeče
  localStorage.setItem('savedPins', JSON.stringify(savedPinIds));
  updateDisplay(); // Obnovit zobrazení
}

// Posluchače událostí pro vyhledávání
searchInput.addEventListener('input', updateDisplay);

// Posluchače událostí pro přepínání záložek
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

// Prvotní vykreslení
updateDisplay();
