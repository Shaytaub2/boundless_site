// Simple script to remove the splash screen after animations complete
document.addEventListener('DOMContentLoaded', () => {
  // Remove the splash screen after its fade-out animation completes
  const splash = document.getElementById('splash');
  if (splash) {
    const removeSplash = () => {
      splash.parentElement.removeChild(splash);
    };
    // Total delay equals CSS animation-delay (2.5s) plus duration (1s) + small buffer
    setTimeout(removeSplash, 3800);
  }

  // Create dynamic animations: falling money and flying plane
  const animationsContainer = document.getElementById('animations');
  if (animationsContainer) {
    createFallingMoney(animationsContainer, 25);
    // Launch the plane slightly later so it appears after coins start falling
    setTimeout(() => createPlane(animationsContainer), 1000);
  }

  // Handle sticky call-to-action button visibility based on scroll position
  const sticky = document.getElementById('sticky-cta');
  const toggleSticky = () => {
    if (!sticky) return;
    if (window.scrollY > 300) {
      sticky.classList.remove('hidden');
    } else {
      sticky.classList.add('hidden');
    }
  };
  // Initial state
  toggleSticky();
  window.addEventListener('scroll', toggleSticky);
});

/**
 * Generates falling money items and appends them to the container.
 * @param {HTMLElement} container
 * @param {number} count
 */
function createFallingMoney(container, count = 25) {
  const moneySymbols = ['🧣', '💰', '💸'];
  for (let i = 0; i < count; i++) {
    const item = document.createElement('span');
    item.classList.add('falling-item');
    // Randomly pick a coin-like symbol
    const symbol = moneySymbols[Math.floor(Math.random() * moneySymbols.length)];
    item.textContent = symbol;
    // Randomize starting horizontal position (0 to 100%)
    item.style.left = `${Math.random() * 100}vw`;
    // Randomize animation duration between 4s and 8s
    const duration = 4 + Math.random() * 4;
    item.style.animationDuration = `${duration}s`;
    // Randomize animation delay to stagger drops (0 to 5s)
    const delay = Math.random() * 5;
    item.style.animationDelay = `${delay}s`;
    container.appendChild(item);
    // Remove item after animation completes to avoid DOM buildup
    setTimeout(() => item.remove(), (duration + delay) * 1000);
  }
}

/**
 * Creates a single flying plane element and appends it to the container.
 * The plane will animate across the screen and remove itself afterward.
 * @param {HTMLElement} container
 */
function createPlane(container) {
  const plane = document.createElement('span');
  plane.classList.add('plane-item');
  plane.textContent = '✈';
  // Randomize animation duration between 3s and 6s
  const duration = 3 + Math.random() * 3;
  plane.style.animationDuration = `${duration}s`;
  // Optional: randomize vertical starting position slightly
  const offsetY = 50 + Math.random() * 20; // 50% to 70%
  plane.style.top = `${offsetY}%`;
  container.appendChild(plane);
  // Remove plane element after animation completes
  setTimeout(() => plane.remove(), duration * 1000);
}
