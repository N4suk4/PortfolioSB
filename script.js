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


hexagons.forEach(hex => {
  const perspectiveElement = hex.parentElement;

  perspectiveElement.addEventListener('mousemove', e => {
    const hexRect = perspectiveElement.getBoundingClientRect();

    const x = e.clientX - hexRect.left;
    const y = e.clientY - hexRect.top;

    const midCardWidth = hexRect.width / 2;
    const midCardHeight = hexRect.height / 2;

    const angleY = (x - midCardWidth) ;
    const angleX = -(y - midCardHeight) ;

    hex.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg) translateZ(-20px)`;
  });

  perspectiveElement.addEventListener('mouseleave', () => {
    hex.style.transform = `rotateX(0) rotateY(0)`; // Remet à la position initiale
  });
});
