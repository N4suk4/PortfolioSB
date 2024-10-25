const header = document.querySelector('header');
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

// Utilisez offsetWidth et offsetHeight pour définir la taille du canvas
canvas.width = header.offsetWidth;
canvas.height = header.offsetHeight;

let particlesArray = [];
let mouse = { x: null, y: null };


class Particle {
  constructor(x, y, size, color, speedX, speedY, alphaMax) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.speedX = speedX;
    this.speedY = speedY;
    this.alpha = Math.random() * 0.1;
    this.alphaMax = alphaMax;
  }

  update() {
    const dx = this.x - mouse.x;
    const dy = this.y - mouse.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const forbiddenRadius = 80; // Rayon d'interdiction autour de la souris
  
    // Si la particule est dans la zone interdite, changer de direction
    if (distance < forbiddenRadius) {
      const directionX = dx / distance;
      const directionY = dy / distance;
  
      // Augmentez la force de repulsion
      const repulsionStrength = 4; // Augmentez cette valeur pour une force plus forte
      this.x += directionX * repulsionStrength; 
      this.y += directionY * repulsionStrength;
    } else {
      // Sinon, continuer à se déplacer normalement
      this.x += this.speedX;
      this.y += this.speedY;
    }
  
    this.alpha += 0.005; // L'alpha monte progressivement jusqu'à un maximum
    if (this.alpha > this.alphaMax) this.alpha = this.alphaMax;
  
    // Si la particule sort des limites du header, la repositionner
    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
    }
  }
  

  draw() {
    ctx.globalAlpha = this.alpha; // Applique la transparence
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

function createParticleBatch(numParticles, color, sizeRange, speedRange, alphaMax) {
  for (let i = 0; i < numParticles; i++) {
    const x = Math.random() * canvas.width;  // Créer les particules dans les dimensions du header
    const y = Math.random() * canvas.height;
    const size = Math.random() * (sizeRange[1] - sizeRange[0]) + sizeRange[0];
    const speedX = (Math.random() - 0.5) * (speedRange[1] - speedRange[0]) + speedRange[0];
    const speedY = (Math.random() - 0.5) * (speedRange[1] - speedRange[0]) + speedRange[0];
    const alphaMaxValue = alphaMax;

    particlesArray.push(new Particle(x, y, size, color, speedX, speedY, alphaMaxValue));
  }
}

function createParticles() {
  createParticleBatch(300, "#F0F0F0", [1, 3], [0.1, 0.5], 0.4); // Petites particules
  createParticleBatch(100, "#C0C0C0", [4, 6], [0.05, 0.2], 0.3); // Moyennes particules
  createParticleBatch(10, "#A0A0A0", [10, 20], [0.02, 0.1], 0.2); // Grandes particules
}

function createLineConnection(particle1, particle2, color) {
  ctx.beginPath();
  ctx.moveTo(particle1.x, particle1.y);
  ctx.lineTo(particle2.x, particle2.y);
  ctx.strokeStyle = color;
  ctx.stroke();
}

function drawLines() {
  const connectionColor = "#FFFFFF"; // Couleur blanche
  const maxDistance = 100; // Distance maximale pour créer une connexion

  for (let i = 0; i < particlesArray.length; i++) {
    for (let j = i + 1; j < particlesArray.length; j++) {
      const dx = particlesArray[i].x - particlesArray[j].x;
      const dy = particlesArray[i].y - particlesArray[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < maxDistance) {
        createLineConnection(particlesArray[i], particlesArray[j], connectionColor);
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particlesArray.forEach((particle) => {
    particle.update();
    particle.draw();
  });

  if (particlesArray.length < 400) { // Limite pour éviter une surcharge de particules
    createParticles();
  }

  drawLines(); // Dessiner les lignes de connexion après avoir dessiné les particules

  requestAnimationFrame(animate);
}

function resizeCanvas() {
  canvas.width = header.offsetWidth;
  canvas.height = header.offsetHeight;
}

function handleMouseMove(event) {
  mouse.x = event.x;
  mouse.y = event.y;
}

window.addEventListener('resize', resizeCanvas);
window.addEventListener('mousemove', handleMouseMove);

createParticles();
animate();



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

