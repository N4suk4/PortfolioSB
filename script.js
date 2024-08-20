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

const influenceCurseur = 100; 
const effectStrengthFactor = 5;

// Fonction pour calculer la distance entre deux points
function getDistance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

// Fonction pour appliquer l'effet aux hexagones
function applyEffect(e) {
  const cursorX = e.clientX;
  const cursorY = e.clientY;

  hexagons.forEach(hex => {
    const hexRect = hex.getBoundingClientRect();
    const hexCenterX = hexRect.left + hexRect.width / 2;
    const hexCenterY = hexRect.top + hexRect.height / 2;

    // Calculer la distance entre le curseur et le centre de l'hexagone
    const distance = getDistance(cursorX, cursorY, hexCenterX, hexCenterY);

    // Calculer l'effet en fonction de la distance
    const effectStrength = Math.max(0, (influenceCurseur - distance) / influenceCurseur) * effectStrengthFactor;

    // Calculer les angles de rotation
    const angleY = (cursorX - hexCenterX) / 4 * effectStrength;
    const angleX = -(cursorY - hexCenterY) / 4 * effectStrength;

    // Appliquer la transformation
    hex.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg) translateZ(-20px)`;
  });
}

// Ajouter l'écouteur d'événements sur le conteneur
document.querySelector('.hexagonContainer').addEventListener('mousemove', applyEffect);

// Réinitialiser la transformation lorsque le curseur quitte le conteneur
document.querySelector('.hexagonContainer').addEventListener('mouseleave', () => {
  hexagons.forEach(hex => {
    hex.style.transform = `rotateX(0) rotateY(0)`;
  });
});

