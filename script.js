/* ==================================================
   SAFE DOM READY
================================================== */
document.addEventListener('DOMContentLoaded', () => {

/* ==================================================
   REVEAL ON SCROLL (UP vs DOWN)
================================================== */
const reveals = document.querySelectorAll('.reveal');
let lastScrollY = window.scrollY;

if (reveals.length) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const el = entry.target;
      const currentScrollY = window.scrollY;
      const direction = currentScrollY > lastScrollY ? 'down' : 'up';

      if (entry.isIntersecting) {
        // reset dulu agar animasi replay
        el.classList.remove('active-down', 'active-up');
        void el.offsetWidth;

        el.classList.add(
          direction === 'down' ? 'active-down' : 'active-up'
        );
      } else {
        // keluar viewport → reset
        el.classList.remove('active-down', 'active-up');
      }

      lastScrollY = currentScrollY;
    });
  }, {
    threshold: 0.2
  });

  reveals.forEach(el => revealObserver.observe(el));
}

  /* ==================================================
     iOS RIPPLE (BTN + BOTTOM CTA)
  ================================================== */
  document.addEventListener('click', e => {
    const target = e.target.closest('.btn, .bottom-cta-btn');
    if (!target) return;

    const rect = target.getBoundingClientRect();
    const ripple = document.createElement('span');

    ripple.className = 'ripple';
    ripple.style.width = ripple.style.height =
      Math.max(rect.width, rect.height) + 'px';

    ripple.style.left = e.clientX - rect.left - rect.width / 2 + 'px';
    ripple.style.top  = e.clientY - rect.top  - rect.height / 2 + 'px';

    target.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });

  /* ==================================================
     AUTO HIDE / SHOW BOTTOM CTA
  ================================================== */
  const bottomCta = document.getElementById('bottomCta');
  let lastScroll = 0;
  const showAfter = 200;

  if (bottomCta) {
    window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;

      if (currentScroll < showAfter) {
        bottomCta.classList.remove('show');
        lastScroll = currentScroll;
        return;
      }

      if (currentScroll > lastScroll + 10) {
        bottomCta.classList.add('show');
      } else if (currentScroll < lastScroll - 10) {
        bottomCta.classList.remove('show');
      }

      lastScroll = currentScroll;
    });
  }

  /* ==================================================
     DYNAMIC CTA TEXT
  ================================================== */
  const ctaTitle = document.getElementById('ctaTitle');
  const ctaSubtitle = document.getElementById('ctaSubtitle');
  const ctaBox = document.querySelector('.bottom-cta-text');

  const ctaMessages = [
    { title: "Konsultasi Gratis", subtitle: "Respon cepat via WhatsApp" },
    { title: "Sudah 100+ Klien", subtitle: "Dipercaya pelaku usaha" },
    { title: "Butuh Legalitas?", subtitle: "Kami bantu sampai selesai" }
  ];

  if (ctaTitle && ctaSubtitle && ctaBox) {
    let ctaIndex = 0;

    setInterval(() => {
      ctaBox.classList.add('fade-out');

      setTimeout(() => {
        ctaIndex = (ctaIndex + 1) % ctaMessages.length;
        ctaTitle.textContent = ctaMessages[ctaIndex].title;
        ctaSubtitle.textContent = ctaMessages[ctaIndex].subtitle;

        ctaBox.classList.remove('fade-out');
        ctaBox.classList.add('fade-in');
      }, 350);
    }, 4500);
  }

  /* ==================================================
     MINI TESTIMONIAL ROTATOR
  ================================================== */
  const testimonialBox = document.getElementById('miniTestimonial');
  const testimonialText = document.getElementById('testimonialText');

  const testimonials = [
    "Proses cepat & jelas",
    "Tidak ribet & aman",
    "Admin responsif",
    "PT saya jadi cepat",
    "Sesuai aturan & resmi"
  ];

  if (testimonialBox && testimonialText) {
    let testimonialIndex = 0;

    setInterval(() => {
      testimonialBox.classList.add('fade-out');

      setTimeout(() => {
        testimonialIndex = (testimonialIndex + 1) % testimonials.length;
        testimonialText.textContent = testimonials[testimonialIndex];

        testimonialBox.classList.remove('fade-out');
        testimonialBox.classList.add('fade-in');
      }, 350);
    }, 4000);
  }
  
  /* ==================================================
   SCROLL RESPONSIVE BACKGROUND
================================================== */

const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

if (!prefersReducedMotion) {
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const progress = Math.min(scrollY / docHeight, 1);

    // Gerakan pelan & organik
    const bgX = 50 + progress * 20;
    const bgY = progress * 60;

    document.documentElement.style.setProperty('--bg-x', `${bgX}%`);
    document.documentElement.style.setProperty('--bg-y', `${bgY}%`);
  });
}

  /* ==================================================
     COUNTER ANIMATION (%, +, REPEATABLE)
  ================================================== */
  const counters = document.querySelectorAll('.count');

  const easeOutCubic = t => 1 - Math.pow(1 - t, 3);

  const animateCounter = (el, target, suffix = '', duration = 1400) => {
    let startTime = null;

    const animate = time => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      const eased = easeOutCubic(progress);

      el.textContent = Math.floor(eased * target) + suffix;

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        el.textContent = target + suffix;
      }
    };

    requestAnimationFrame(animate);
  };

  if (counters.length) {
    const counterObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        const suffix = el.dataset.suffix || '';

        if (entry.isIntersecting) {
          el.textContent = '0' + suffix;
          setTimeout(() => {
            animateCounter(el, target, suffix);
          }, 120);
        } else {
          el.textContent = '0' + suffix;
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
  }

});

/* ==================================================
   SCROLL VELOCITY ENGINE
================================================== */
let lastScrollY = window.scrollY;
let lastTime = performance.now();
let scrollVelocity = 0;

window.addEventListener('scroll', () => {
  const now = performance.now();
  const deltaY = Math.abs(window.scrollY - lastScrollY);
  const deltaTime = now - lastTime || 16;

  scrollVelocity = deltaY / deltaTime;

  // clamp agar tidak liar
  scrollVelocity = Math.min(scrollVelocity, 1.5);

  // mapping velocity → animasi
  const distance = 24 + scrollVelocity * 30; // px
  const duration = 0.45 + (1.2 - scrollVelocity) * 0.25; // sec

  document.documentElement.style.setProperty(
    '--reveal-distance',
    `${distance}px`
  );
  document.documentElement.style.setProperty(
    '--reveal-duration',
    `${duration}s`
  );

  lastScrollY = window.scrollY;
  lastTime = now;
});
