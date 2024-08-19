const container = document.querySelector('.hexagonContainer');

function createHexagon(x, y) {
  const hexagon = document.createElement('div');
  hexagon.className = 'hexagon';
  hexagon.style.position = 'absolute';
  hexagon.style.left = `${x}px`;
  hexagon.style.top = `${y}px`;
  container.appendChild(hexagon);
}

function generateHexagons() {
  const hexWidth = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--HexagonLargeur'));
  const hexHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--HexagonHauteur'));
  
  const spacing = 0; // Espacement de 1 pixel
  const hexWidthWithSpacing = hexWidth + spacing;
  const hexHeightWithSpacing = hexHeight + spacing;
  
  const containerWidth = container.clientWidth;
  const containerHeight = container.clientHeight;

  for (let y = 0; y < containerHeight; y += hexHeightWithSpacing) {
    for (let x = 0; x < containerWidth; x += hexWidthWithSpacing * Math.sqrt(3)) {
      const offsetX = (y / hexHeightWithSpacing) % 2 === 0 ? 0 : hexWidthWithSpacing * Math.sqrt(3) / 2;
      createHexagon(x + offsetX, y);
    }
  }
}

generateHexagons();
