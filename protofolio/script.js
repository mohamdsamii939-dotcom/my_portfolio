/**
 * Mohamed Sami Fatouh Elgohary - Portfolio Script
 * Pure Vanilla JavaScript: Theme Toggle, Responsive Nav, Form Validation & Scroll Effects
 */

document.addEventListener('DOMContentLoaded', () => {
  initSplashScreen();
  initTypewriter();
  initTheme();
  initMobileNav();
  initActiveNavLinkSpy();
  initContactForm();
  initFooterYear();
  initScrollAnimations();
});

/* --------------------------------------------------------------------------
   0. Typewriter Effect for Black Welcome Screen
   -------------------------------------------------------------------------- */
let typewriterActive = true;
let typewriterTimeouts = [];

function initTypewriter() {
  const headlineEl = document.getElementById('typewriter-headline');
  const subtitleEl = document.getElementById('typewriter-sub');

  if (!headlineEl) return;

  typewriterActive = true;
  headlineEl.innerHTML = '';
  if (subtitleEl) {
    subtitleEl.textContent = '';
    subtitleEl.style.opacity = '0';
  }

  const part1 = "Welcome to the Portfolio of ";
  const part2 = "Mohamed Sami Fatouh Elgohary";
  const part3 = "Data Analyst & AI Practitioner";

  let i = 0;
  let j = 0;

  function typePart1() {
    if (!typewriterActive) return;
    if (i < part1.length) {
      headlineEl.textContent += part1.charAt(i);
      i++;
      typewriterTimeouts.push(setTimeout(typePart1, 26));
    } else {
      const nameSpan = document.createElement('span');
      nameSpan.className = 'splash-name';
      headlineEl.appendChild(nameSpan);
      typePart2(nameSpan);
    }
  }

  function typePart2(nameSpan) {
    if (!typewriterActive) return;
    if (j < part2.length) {
      nameSpan.textContent += part2.charAt(j);
      j++;
      typewriterTimeouts.push(setTimeout(() => typePart2(nameSpan), 32));
    } else {
      if (subtitleEl) {
        subtitleEl.style.opacity = '1';
        typePart3(subtitleEl);
      }
    }
  }

  function typePart3(el) {
    let k = 0;
    function typeChar() {
      if (!typewriterActive) return;
      if (k < part3.length) {
        el.textContent += part3.charAt(k);
        k++;
        typewriterTimeouts.push(setTimeout(typeChar, 24));
      }
    }
    typeChar();
  }

  // Brief initial pause before typing starts
  typewriterTimeouts.push(setTimeout(typePart1, 200));
}

function stopTypewriter() {
  typewriterActive = false;
  typewriterTimeouts.forEach(clearTimeout);
  typewriterTimeouts = [];
}

/* --------------------------------------------------------------------------
   0.1 Black Welcome Splash Screen with Sudden Reveal Action on Enter
   -------------------------------------------------------------------------- */
function initSplashScreen() {
  const splashScreen = document.getElementById('splash-screen');
  const enterBtn = document.getElementById('splash-enter-btn');
  if (!splashScreen) return;

  // Ensure body prevents scrolling while splash is active
  document.body.classList.add('splash-active');

  let isDismissed = false;

  function dismissSplash() {
    if (isDismissed) return;
    isDismissed = true;

    // 1. Immediately halt typewriter
    stopTypewriter();

    // 2. Play futuristic synthetic entry chime
    playEntranceChime();

    // 3. Button state change: Access Granted
    if (enterBtn) {
      enterBtn.classList.add('btn-granted');
      enterBtn.innerHTML = `
        <span class="key-badge success-badge">✓ GRANTED</span>
        <span class="enter-text">ACCESSING PORTFOLIO...</span>
        <span class="arrow-neon-wrapper">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="enter-arrow-icon" aria-hidden="true">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
          <span class="arrow-neon-glow" aria-hidden="true"></span>
        </span>
      `;
    }

    // 4. Instant cut of splash screen so photo and text appear suddenly!
    splashScreen.classList.add('splash-instant-cut');
    document.body.classList.remove('splash-active');

    // 5. Trigger sudden pop appearance of hero photo and text
    triggerHeroEntrance();

    // 6. Complete removal from DOM flow
    setTimeout(() => {
      splashScreen.style.display = 'none';
      splashScreen.setAttribute('aria-hidden', 'true');
    }, 120);
  }

  // Keyboard shortcut listener: Enter key
  window.addEventListener('keydown', (e) => {
    if (!isDismissed && (e.key === 'Enter' || e.code === 'Enter' || e.code === 'NumpadEnter')) {
      e.preventDefault();
      dismissSplash();
    }
  });

  // Click on enter button
  if (enterBtn) {
    enterBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dismissSplash();
    });
    // Auto-focus enter button for immediate accessibility
    enterBtn.focus();
  }

  // Click anywhere on splash overlay to enter (great for touch / mobile)
  splashScreen.addEventListener('click', (e) => {
    if (e.target !== enterBtn && !enterBtn.contains(e.target)) {
      dismissSplash();
    }
  });
}

/**
 * Synthesizes a melodic sci-fi dual-chime using Web Audio API on Enter
 */
function playEntranceChime() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    const now = ctx.currentTime;

    // Harmonic Chord Note 1: 523.25 Hz (C5)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(523.25, now);
    osc1.frequency.exponentialRampToValueAtTime(659.25, now + 0.12);
    gain1.gain.setValueAtTime(0.08, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.35);

    // Harmonic Chord Note 2: 1046.5 Hz (C6) with subtle shimmer
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(659.25, now + 0.1);
    osc2.frequency.exponentialRampToValueAtTime(1046.5, now + 0.25);
    gain2.gain.setValueAtTime(0.09, now + 0.1);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.55);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.1);
    osc2.stop(now + 0.55);
  } catch (err) {
    // Audio is non-critical enhancement; safely ignore if blocked
  }
}

/**
 * Triggers interactive animations across the Hero section after entering
 */
function triggerHeroEntrance() {
  // 1. Burst ambient glow behind Mohamed's portrait
  const portraitGlow = document.querySelector('.portrait-glow');
  if (portraitGlow) {
    portraitGlow.classList.add('glow-burst');
    setTimeout(() => portraitGlow.classList.remove('glow-burst'), 1500);
  }

  // 2. Animate Hero Stats Counters from 0
  animateHeroCounters();

  // 3. Display welcoming toast notification
  setTimeout(() => {
    displayToast(
      'System Ready',
      'Welcome to Mohamed Sami\'s Portfolio • Data Analyst & AI Practitioner',
      4500
    );
  }, 650);
}

/**
 * Smoothly animates metric numbers counting up from 0
 */
function animateHeroCounters() {
  const counterElements = document.querySelectorAll('.metric-value[data-count]');
  counterElements.forEach((el) => {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    if (isNaN(target)) return;

    const duration = 1200; // ms
    const startTime = performance.now();

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Easing: easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const val = Math.floor(easeProgress * target);

      el.textContent = val + suffix;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        el.textContent = target + suffix;
      }
    }

    requestAnimationFrame(updateCounter);
  });
}

/* --------------------------------------------------------------------------
   1. Theme Management (Dark Mode Default + Light Mode Toggle)
   -------------------------------------------------------------------------- */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const root = document.documentElement;

  // Retrieve saved preference or default to dark
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  applyTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = root.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
    });
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (themeToggleBtn) {
      themeToggleBtn.setAttribute(
        'aria-label',
        theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
      );
      themeToggleBtn.title = theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';
    }
  }
}

/* --------------------------------------------------------------------------
   2. Responsive Mobile Navigation Drawer
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!mobileMenuBtn || !mobileNav) return;

  function toggleMenu(forceClose = false) {
    const isCurrentlyActive = mobileMenuBtn.classList.contains('is-active');
    const shouldOpen = forceClose ? false : !isCurrentlyActive;

    mobileMenuBtn.classList.toggle('is-active', shouldOpen);
    mobileNav.classList.toggle('open', shouldOpen);
    mobileNav.hidden = !shouldOpen;
    mobileMenuBtn.setAttribute('aria-expanded', String(shouldOpen));
  }

  mobileMenuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Close when clicking any nav link
  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
      toggleMenu(true);
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
      toggleMenu(true);
      mobileMenuBtn.focus();
    }
  });

  // Close when clicking outside of mobile nav
  document.addEventListener('click', (e) => {
    if (
      mobileNav.classList.contains('open') &&
      !mobileNav.contains(e.target) &&
      !mobileMenuBtn.contains(e.target)
    ) {
      toggleMenu(true);
    }
  });
}

/* --------------------------------------------------------------------------
   3. Active Section Link Indicator (IntersectionObserver)
   -------------------------------------------------------------------------- */
function initActiveNavLinkSpy() {
  const sections = document.querySelectorAll('section[id]');
  const desktopLinks = document.querySelectorAll('.nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!sections.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const activeId = entry.target.getAttribute('id');
        updateActiveLink(activeId);
      }
    });
  }, observerOptions);

  sections.forEach((section) => observer.observe(section));

  function updateActiveLink(activeId) {
    desktopLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (href === `#${activeId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    mobileLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (href === `#${activeId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
}

/* --------------------------------------------------------------------------
   4. Contact Form Validation & Toast Notification
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const toast = document.getElementById('toast');
  if (!form) return;

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');
  const submitBtn = document.getElementById('submit-btn');

  // Helper: validate email address format
  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  // Helper: toggle input error styling
  function setError(input, hasError) {
    const formGroup = input.closest('.form-group');
    if (formGroup) {
      formGroup.classList.toggle('has-error', hasError);
    }
  }

  // Clear errors dynamically on input
  [nameInput, emailInput, subjectInput, messageInput].forEach((input) => {
    if (!input) return;
    input.addEventListener('input', () => {
      setError(input, false);
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;

    // Validate Name
    if (!nameInput.value.trim()) {
      setError(nameInput, true);
      isValid = false;
    } else {
      setError(nameInput, false);
    }

    // Validate Email
    if (!emailInput.value.trim() || !isValidEmail(emailInput.value.trim())) {
      setError(emailInput, true);
      isValid = false;
    } else {
      setError(emailInput, false);
    }

    // Validate Subject
    if (!subjectInput.value.trim()) {
      setError(subjectInput, true);
      isValid = false;
    } else {
      setError(subjectInput, false);
    }

    // Validate Message
    if (!messageInput.value.trim()) {
      setError(messageInput, true);
      isValid = false;
    } else {
      setError(messageInput, false);
    }

    if (!isValid) return;

    // Simulate successful form dispatch
    if (submitBtn) {
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Sending...</span>`;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        form.reset();
        displayToast(
          'Message Sent!',
          'Thank you for reaching out. Mohamed will review your message soon.',
          4500
        );
      }, 700);
    }
  });
}

/**
 * Displays a toast notification with custom title and message
 */
function displayToast(title = 'Success', desc = '', duration = 4000) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  const titleEl = toast.querySelector('.toast-title');
  const descEl = toast.querySelector('.toast-desc');

  if (titleEl && title) titleEl.textContent = title;
  if (descEl && desc) descEl.textContent = desc;

  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, duration);
}

/* --------------------------------------------------------------------------
   5. Dynamic Copyright Year
   -------------------------------------------------------------------------- */
function initFooterYear() {
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}

/* --------------------------------------------------------------------------
   6. Subtle Scroll Reveal Animations
   -------------------------------------------------------------------------- */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(
    '.project-card, .skill-category-card, .service-card, .about-card, .timeline-content'
  );

  if (!('IntersectionObserver' in window) || !animatedElements.length) return;

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  animatedElements.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(18px)';
    el.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
    revealObserver.observe(el);
  });
}
