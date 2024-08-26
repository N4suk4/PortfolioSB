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

function getDistance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function applyEffect(e) {
  const cursorX = e.clientX;
  const cursorY = e.clientY;

  hexagons.forEach(hex => {
    const hexRect = hex.getBoundingClientRect();
    const hexCenterX = hexRect.left + hexRect.width / 2;
    const hexCenterY = hexRect.top + hexRect.height / 2;

    const distance = getDistance(cursorX, cursorY, hexCenterX, hexCenterY);

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

const lightRays = document.querySelectorAll('.lightRay');
const contain = document.querySelector('.hexagonContainer');

function moveLightRays(e) {
    const rect = contain.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Met à jour la position de la première lumière sans délai
    lightRays[0].style.transform = `translate(${mouseX - 50}px, ${mouseY - 50}px)`;

    // Applique un délai pour les traînées de lumière suivantes
    lightRays.forEach((lightRay, index) => {
        setTimeout(() => {
            lightRay.style.transform = `translate(${mouseX - 50}px, ${mouseY - 50}px)`;
        }, index * 50); // Ajustez le délai si nécessaire
    });
}

// Assure que la première lumière se déplace immédiatement
contain.addEventListener('mousemove', moveLightRays);

document.querySelectorAll('.movingLight').forEach(light => {
  function animateLight() {
      const startX = Math.random() * window.innerWidth;
      const startY = Math.random() * window.innerHeight;
      const endX = Math.random() * window.innerWidth;
      const endY = Math.random() * window.innerHeight;

      const duration = Math.random() * 5000 + 3000; // Durée entre 3 et 8 secondes

      light.style.transform = `translate(${startX}px, ${startY}px)`;
      light.style.transition = `transform ${duration}ms linear`;

      setTimeout(() => {
          light.style.transform = `translate(${endX}px, ${endY}px)`;
      }, 50);

      setTimeout(animateLight, duration);
  }

  animateLight();
});

// Modifier l'écouteur d'événements
document.addEventListener('mousemove', applyEffect);

// Optionnel: si vous avez un effet de réinitialisation lorsque le curseur quitte la zone
document.addEventListener('mouseleave', () => {
  hexagons.forEach(hex => {
    hex.style.transform = `rotateX(0) rotateY(0)`;
  });
});

function createLightBar() {
  const bar = document.createElement('div');
  bar.className = 'light-bar';

  // Position de départ aléatoire sur l'écran
  const startX = Math.random() * window.innerWidth;
  const startY = Math.random() * window.innerHeight;

  bar.style.left = `${startX}px`;
  bar.style.top = `${startY}px`;

  document.querySelector('.hexagonContainer').appendChild(bar);

  // Déplacement de la barre en diagonale
  requestAnimationFrame(() => {
      bar.style.opacity = 1;

      // Calcul d'une nouvelle position cible pour le mouvement
      const endX = startX + (Math.random() * 400 - 200);
      const endY = startY + (Math.random() * 400 - 200);

      // Applique la transformation pour déplacer la barre
      bar.style.transform = `rotate(-30deg) translate(${endX - startX}px, ${endY - startY}px)`;
  });

  // Barre disparaît après 2 secondes
  setTimeout(() => {
      bar.style.opacity = 0;
      setTimeout(() => bar.remove(), 1000);
  }, 2000);
}

function generateRandomLightBars() {
  setInterval(() => {
      const delay = Math.random() * 1000;
      setTimeout(createLightBar, delay);
  }, 500); // Génère une nouvelle barre toutes les 0.5 secondes en moyenne
}

generateRandomLightBars();
