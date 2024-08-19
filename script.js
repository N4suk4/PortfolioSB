const container = document.querySelector('.hexagonContainer');

function createHexagon(x, y) {
  const perspective = document.createElement('div');
  perspective.className = 'perspective';
  
  const hexagon = document.createElement('div');
  hexagon.className = 'hexagon';

  perspective.style.position = 'absolute';
  perspective.style.left = `${x}px`;
  perspective.style.top = `${y}px`;

  perspective.appendChild(hexagon);
  container.appendChild(perspective);
}

function generateHexagons() {
  const hexWidth = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--HexagonLargeur'));
  const hexHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--HexagonHauteur'));
  
  const hexWidthWithSpacing = hexWidth * Math.sqrt(3);
  const hexHeightWithSpacing = hexHeight;
  
  const containerWidth = container.clientWidth;
  const containerHeight = container.clientHeight;

  for (let y = 0; y < containerHeight; y += hexHeightWithSpacing) {
    for (let x = 0; x < containerWidth; x += hexWidthWithSpacing) {
      const offsetX = (y / hexHeightWithSpacing) % 2 === 0 ? 0 : hexWidthWithSpacing / 2;
      createHexagon(x + offsetX, y);
    }
  }
}

generateHexagons();


const hexagons = document.querySelectorAll('.hexagon');

hexagons.forEach(el => {
  el.parentElement.addEventListener('mousemove', e => {
    let elRect = el.parentElement.getBoundingClientRect();

    let x = e.clientX - elRect.left;
    let y = e.clientY - elRect.top;

    let midCardWidth = elRect.width / 2;
    let midCardHeight = elRect.height / 2;

    let angleY = (x - midCardWidth) / 8;
    let angleX = (y - midCardHeight) / 8;

    el.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg)`;
  });
});
