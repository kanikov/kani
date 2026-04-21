// ===== SMOOTH ANIMATIONS & INTERACTIVITY =====

// Initialize AOS (Animate on Scroll)
AOS.init({
  duration: 1000,
  once: true,
  mirror: false,
  offset: 100
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.innerHTML = navLinks.classList.contains('active') 
      ? '<i class="fas fa-times"></i>' 
      : '<i class="fas fa-bars"></i>';
  });
}

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Active Navigation Highlight
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navItems.forEach(item => {
    item.classList.remove('active');
    if (item.getAttribute('href').includes(current)) {
      item.classList.add('active');
    }
  });
});

// Parallax Effect for Hero
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const heroVisual = document.querySelector('.hero-visual');
  if (heroVisual) {
    heroVisual.style.transform = `translateY(${scrolled * 0.3}px)`;
  }
});

// Download Counter Animation
function animateNumber(element, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    element.innerHTML = Math.floor(progress * (end - start) + start).toLocaleString();
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

// Animate stats on page load
document.addEventListener('DOMContentLoaded', () => {
  const statNumbers = document.querySelectorAll('.stat-number');
  statNumbers.forEach(stat => {
    const value = parseInt(stat.getAttribute('data-value'));
    if (value) {
      animateNumber(stat, 0, value, 2000);
    }
  });
});

// Download Button Animation
document.querySelectorAll('.download-btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.preventDefault();
    const originalText = this.innerHTML;
    this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
    this.style.pointerEvents = 'none';
    
    // Simulate download
    setTimeout(() => {
      this.innerHTML = '<i class="fas fa-check"></i> Downloaded!';
      setTimeout(() => {
        this.innerHTML = originalText;
        this.style.pointerEvents = 'auto';
      }, 2000);
    }, 1500);
  });
});

// Mouse Trail Effect (Gaming aesthetic)
let mouseTrail = [];
const trailCount = 5;

document.addEventListener('mousemove', (e) => {
  mouseTrail.push({ x: e.clientX, y: e.clientY });
  if (mouseTrail.length > trailCount) {
    mouseTrail.shift();
  }
  
  updateTrail();
});

function updateTrail() {
  let trailElements = document.querySelectorAll('.mouse-trail');
  if (trailElements.length === 0) {
    for (let i = 0; i < trailCount; i++) {
      const trail = document.createElement('div');
      trail.className = 'mouse-trail';
      trail.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: radial-gradient(circle, var(--primary), transparent);
        pointer-events: none;
        z-index: 9999;
        transition: all 0.1s ease;
        opacity: 0.5;
        filter: blur(2px);
      `;
      document.body.appendChild(trail);
    }
    trailElements = document.querySelectorAll('.mouse-trail');
  }
  
  trailElements.forEach((trail, index) => {
    if (mouseTrail[index]) {
      trail.style.left = mouseTrail[index].x + 'px';
      trail.style.top = mouseTrail[index].y + 'px';
      trail.style.opacity = 1 - (index * 0.2);
      trail.style.transform = `scale(${1 - index * 0.15})`;
    }
  });
}

// Add to cart animation
function addToCartAnimation(productName) {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    background: linear-gradient(135deg, var(--primary), var(--secondary));
    color: white;
    padding: 1rem 2rem;
    border-radius: 50px;
    box-shadow: var(--glow);
    z-index: 10000;
    animation: slideIn 0.5s ease, fadeOut 0.5s ease 3s forwards;
    font-weight: 600;
  `;
  notification.innerHTML = `<i class="fas fa-check-circle"></i> ${productName} added to downloads!`;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.remove();
  }, 3500);
}

// Product card hover sound effect simulation (visual only)
document.querySelectorAll('.product-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
  });
});

// Lazy loading images with fade effect
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.add('fade-in');
      observer.unobserve(img);
    }
  });
});

images.forEach(img => imageObserver.observe(img));

// Keyboard navigation for accessibility
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navLinks.classList.contains('active')) {
    navLinks.classList.remove('active');
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
  }
});

// Performance optimization - debounce scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  console.log('%c🎮 NEBULA GEAR · Premium Gaming Accessories', 'font-size: 20px; background: linear-gradient(135deg, #6c5ce7, #00d2ff); color: white; padding: 10px; border-radius: 10px;');
  
  // Add page transition effect
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 100);
});
