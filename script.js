/* ==================================================
   SAFE DOM READY
================================================== */
document.addEventListener('DOMContentLoaded', () => {

  /* ==================================================
     REVEAL ON SCROLL
  ================================================== */
  const reveals = document.querySelectorAll('.reveal');

  if (reveals.length) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.15 });

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
   COUNTER ANIMATION (FORMAT %, +, REPEATABLE)
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
        // Reset sebelum animasi (agar bisa replay)
        el.textContent = '0' + suffix;

        // Delay kecil agar sinkron dengan reveal
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