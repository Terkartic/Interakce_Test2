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
