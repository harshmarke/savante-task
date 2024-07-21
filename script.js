function scrollToSection(sectionId) {
  document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

function redirectToSignup(type) {
  if (type === 'brand') {
    window.location.href = 'signup-brand.html';
  } else if (type === 'influencer') {
    window.location.href = 'signup-influencer.html';
  }
}


window.addEventListener('mousemove', handleMouseMove);
window.addEventListener('resize', handleWindowResize);

const spansSlow = document.querySelectorAll('.spanSlow');
const spansFast = document.querySelectorAll('.spanFast');

let width = window.innerWidth;

function handleMouseMove(e) {
  let normalizedPosition = e.pageX / (width / 2) - 1;
  let speedSlow = 100 * normalizedPosition;
  let speedFast = 200 * normalizedPosition;
  spansSlow.forEach((span) => {
    span.style.transform = `translate(${speedSlow}px)`;
  });
  spansFast.forEach((span) => {
    span.style.transform = `translate(${speedFast}px)`
  })
}

function handleWindowResize() {
  width = window.innerWidth;
}


const card = document.querySelector('.card');
const container = document.querySelector('.card-container');
const cardImage = document.querySelector('.card-image');

let isMouseOver = false;
let rotateX = 0;
let rotateY = 0;

function lerp(start, end, t) {
  return start * (1 - t) + end * t;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function updateCardTransform() {
  const transformString = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  card.style.transform = transformString;
}

function animate() {
  if (!isMouseOver) {
    rotateX = lerp(rotateX, 0, 0.05);
    rotateY = lerp(rotateY, 0, 0.05);
  }

  updateCardTransform();
  requestAnimationFrame(animate);
}

container.addEventListener('mousemove', (e) => {
  if (!isMouseOver) return;

  const rect = container.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const mouseX = e.clientX - centerX;
  const mouseY = e.clientY - centerY;

  rotateY = clamp(mouseX / 10, -15, 15);
  rotateX = clamp(-mouseY / 10, -15, 15);
});

container.addEventListener('mouseenter', () => {
  isMouseOver = true;
  card.style.transition = 'none';
});

container.addEventListener('mouseleave', () => {
  isMouseOver = false;
  card.style.transition = 'transform 0.6s';
});

// Image here
const imageURL = 'https://images.unsplash.com/photo-1719773188310-85c82542f677?q=80&w=2436&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
cardImage.style.backgroundImage = `url(${imageURL})`;

particlesJS('particles-js', {
  particles: {
    number: { value: 80, density: { enable: true, value_area: 800 } },
    color: { value: "#00ffff" },
    shape: { type: "circle" },
    opacity: { value: 0.5, random: true, anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false } },
    size: { value: 3, random: true, anim: { enable: true, speed: 2, size_min: 0.1, sync: false } },
    line_linked: { enable: true, distance: 150, color: "#00ffff", opacity: 0.4, width: 1 },
    move: {
      enable: true,
      speed: 2,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: { enable: true, rotateX: 600, rotateY: 1200 }
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "grab" },
      onclick: { enable: true, mode: "push" },
      resize: true
    },
    modes: {
      grab: { distance: 140, line_linked: { opacity: 1 } },
      bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
      repulse: { distance: 200, duration: 0.4 },
      push: { particles_nb: 4 },
      remove: { particles_nb: 2 }
    }
  },
  retina_detect: true
});

animate();


