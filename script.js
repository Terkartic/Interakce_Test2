const container = document.getElementById('pin-container');

// Náhodné rozměry pro simulaci různé výšky obrázků
const pinHeights = [300, 400, 500, 350, 450, 280];

for (let i = 0; i < 20; i++) {
  const height = pinHeights[i % pinHeights.length];
  const pin = document.createElement('div');
  pin.className = 'pin';

  pin.innerHTML = `
<img src="[https://dummyimage.com/300x$](https://dummyimage.com/300x$){pin.height}/e0e0e0/000000.png&text=${encodeURIComponent(pin.title)}">
<button class="save-btn" onclick="alert('Uloženo!')">Uložit</button>
  `;

  container.appendChild(pin);
}
