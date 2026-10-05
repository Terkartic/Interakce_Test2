const container = document.getElementById('pin-container');

// Náhodné rozměry pro simulaci různé výšky obrázků
const pinHeights = [300, 400, 500, 350, 450, 280];

for (let i = 0; i < 20; i++) {
  const height = pinHeights[i % pinHeights.length];
  const pin = document.createElement('div');
  pin.className = 'pin';

pinElement.innerHTML = `
  <img src="https://picsum.photos/id/${pin.id * 10}/300/${pin.height}" alt="${pin.title}">
  <button class="save-btn ${isSaved ? 'saved' : ''}" data-id="${pin.id}">
    ${isSaved ? 'Uloženo' : 'Uložit'}
  </button>
`;

  container.appendChild(pin);
}
