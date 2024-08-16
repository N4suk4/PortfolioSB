const container = document.querySelector('.hexagon-container');

// Fonction pour créer un hexagone
function createHexagon(x, y) {
  const hexagon = document.createElement('div');
  hexagon.className = 'hexagon';
  hexagon.style.position = 'absolute';
  hexagon.style.left = `${x}px`;
  hexagon.style.top = `${y}px`;
  container.appendChild(hexagon);
}

// Fonction pour générer plusieurs hexagones
function generateHexagons() {
  const hexWidth = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--HexagonLargeur'));
  const hexHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--HexagonHauteur'));
  const containerWidth = container.clientWidth;
  const containerHeight = container.clientHeight;

  for (let x = 0; x < containerWidth; x += hexWidth * 0.75) {
    for (let y = 0; y < containerHeight; y += hexHeight) {
      createHexagon(x, y);
    }
  }
}

generateHexagons();
