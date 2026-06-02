/**
 * Ruhul Amin - Portfolio Website
 * Main JavaScript File
 * Author: Ruhul Amin
 * Version: 1.0
 */

'use strict';

// ==========================================
// PAGE LOADER
// ==========================================
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('pageLoader');
    if (loader) loader.classList.add('hidden');
  }, 1500);
});

// ==========================================
// DARK / LIGHT MODE TOGGLE
// ==========================================
const themeToggle = document.getElementById('themeToggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  if (themeToggle) {
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
    themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }
}

// Load saved theme or use system preference
const savedTheme = localStorage.getItem('theme') || (prefersDark.matches ? 'dark' : 'light');
setTheme(savedTheme);

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
  });
}

// ==========================================
// NAVBAR - SCROLL & MOBILE TOGGLE
// ==========================================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('navHamburger');
const mobileNav = document.getElementById('navMobile');
const navLinks = document.querySelectorAll('.nav-links a, .nav-mobile a');

// Navbar scroll effect
window.addEventListener('scroll', () => {
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }
  updateActiveNav();
  toggleBackToTop();
});

// Hamburger toggle
if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });
}

// Close mobile nav on link click
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (hamburger) hamburger.classList.remove('active');
    if (mobileNav) mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// Active nav link based on scroll position
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 100;

  sections.forEach(section => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute('id');

    document.querySelectorAll(`.nav-links a[href="#${id}"]`).forEach(link => {
      link.classList.toggle('active', scrollPos >= top && scrollPos < bottom);
    });
  });
}

// ==========================================
// BACK TO TOP BUTTON
// ==========================================
const backToTop = document.getElementById('backToTop');

function toggleBackToTop() {
  if (backToTop) {
    backToTop.classList.toggle('visible', window.scrollY > 400);
  }
}

if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ==========================================
// SCROLL ANIMATIONS (Intersection Observer)
// ==========================================
const animateElements = document.querySelectorAll('.animate-on-scroll');

const observerOptions = {
  root: null,
  threshold: 0.1,
  rootMargin: '0px 0px -60px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
      scrollObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

animateElements.forEach(el => scrollObserver.observe(el));

// ==========================================
// SKILL PROGRESS BARS ANIMATION
// ==========================================
const skillBars = document.querySelectorAll('.skill-bar-fill');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = entry.target.getAttribute('data-width');
      entry.target.style.width = target + '%';
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

skillBars.forEach(bar => skillObserver.observe(bar));

// ==========================================
// PROJECT FILTER
// ==========================================
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active button
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    projectCards.forEach((card, i) => {
      const category = card.getAttribute('data-category');
      const show = filter === 'all' || category === filter;

      card.style.transition = `opacity 0.3s ease ${i * 0.05}s, transform 0.3s ease ${i * 0.05}s`;

      if (show) {
        card.classList.remove('hidden');
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
        }, 10);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.95)';
        setTimeout(() => card.classList.add('hidden'), 300);
      }
    });
  });
});

// ==========================================
// BLOG SEARCH
// ==========================================
const blogSearch = document.getElementById('blogSearch');
const blogCards = document.querySelectorAll('.blog-card');

if (blogSearch) {
  blogSearch.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();

    blogCards.forEach(card => {
      const title = card.querySelector('.blog-card-title')?.textContent.toLowerCase() || '';
      const excerpt = card.querySelector('.blog-card-excerpt')?.textContent.toLowerCase() || '';
      const category = card.querySelector('.blog-card-cat')?.textContent.toLowerCase() || '';

      const match = title.includes(query) || excerpt.includes(query) || category.includes(query);
      card.style.display = match || query === '' ? '' : 'none';
    });
  });
}

// ==========================================
// BLOG CATEGORY FILTER
// ==========================================
const categoryBtns = document.querySelectorAll('.category-btn');

categoryBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    categoryBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const cat = btn.getAttribute('data-cat');

    blogCards.forEach(card => {
      const cardCat = card.getAttribute('data-category');
      const show = cat === 'all' || cardCat === cat;
      card.style.display = show ? '' : 'none';
    });
  });
});

// ==========================================
// CONTACT FORM
// ==========================================
const contactForm = document.getElementById('contactForm');
const successMsg = document.getElementById('formSuccess');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('.form-submit');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>পাঠানো হচ্ছে...</span>';
    submitBtn.disabled = true;

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
    contactForm.reset();

    if (successMsg) {
      successMsg.style.display = 'block';
      setTimeout(() => successMsg.style.display = 'none', 5000);
    }

    showToast('✅ বার্তা সফলভাবে পাঠানো হয়েছে!', 'success');
  });
}

// ==========================================
// TOAST NOTIFICATION
// ==========================================
function showToast(message, type = '') {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }

  toast.className = `toast ${type}`;
  toast.textContent = message;

  requestAnimationFrame(() => {
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3500);
  });
}

// ==========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ==========================================
// TYPED TEXT EFFECT (Hero)
// ==========================================
const typedEl = document.getElementById('typedText');
const texts = [
  'EEE Student',
  'Web Developer',
  'Problem Solver',
  'Tech Enthusiast'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingTimeout;

function typeEffect() {
  const current = texts[textIndex];

  if (isDeleting) {
    typedEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? 60 : 110;

  if (!isDeleting && charIndex === current.length) {
    speed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
    speed = 400;
  }

  typingTimeout = setTimeout(typeEffect, speed);
}

if (typedEl) typeEffect();

// ==========================================
// COUNTER ANIMATION (Hero Stats)
// ==========================================
function animateCounter(el, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current) + (el.dataset.suffix || '');
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.count);
      animateCounter(el, target);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

// ==========================================
// NAVBAR LOGO TYPEWRITER (optional)
// ==========================================
// Active nav on page load
updateActiveNav();

// ==========================================
// KEYBOARD ACCESSIBILITY
// ==========================================
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (mobileNav && mobileNav.classList.contains('open')) {
      hamburger.classList.remove('active');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    }
  }
});

// ==========================================
// LAZY LOAD IMAGES
// ==========================================
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
      imageObserver.unobserve(img);
    }
  });
});

lazyImages.forEach(img => imageObserver.observe(img));

console.log('%c Ruhul Amin Portfolio', 'color: #0066ff; font-size: 20px; font-weight: bold; font-family: Syne, sans-serif;');
console.log('%c Built with ❤️ using HTML, CSS & JavaScript', 'color: #94a3b8; font-size: 12px;');
