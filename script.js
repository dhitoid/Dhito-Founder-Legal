const reveal = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, { threshold: 0.15 });

reveal.forEach(el => observer.observe(el));

document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', function (e) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');

    const rect = this.getBoundingClientRect();
    ripple.style.left = `${e.clientX - rect.left}px`;
    ripple.style.top = `${e.clientY - rect.top}px`;

    this.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  });
});

const bottomCta = document.getElementById('bottomCta');

window.addEventListener('scroll', () => {
  const scrollTrigger = window.innerHeight * 0.6;

  if (window.scrollY > scrollTrigger) {
    bottomCta.classList.add('show');
  } else {
    bottomCta.classList.remove('show');
  }
});

document.addEventListener('click', e => {
  const btn = e.target.closest('.bottom-cta-btn');
  if (!btn) return;

  const rect = btn.getBoundingClientRect();
  const ripple = document.createElement('span');

  ripple.className = 'ripple';
  ripple.style.width = ripple.style.height =
    Math.max(rect.width, rect.height) + 'px';

  ripple.style.left = e.clientX - rect.left - rect.width / 2 + 'px';
  ripple.style.top  = e.clientY - rect.top  - rect.height / 2 + 'px';

  btn.appendChild(ripple);

  setTimeout(() => ripple.remove(), 600);
});


const counters = document.querySelectorAll('.count');

const easeOutCubic = t => 1 - Math.pow(1 - t, 3);

const animateCounter = (el, target, duration = 1400) => {
  let start = 0;
  let startTime = null;

  const animate = time => {
    if (!startTime) startTime = time;
    const progress = Math.min((time - startTime) / duration, 1);
    const eased = easeOutCubic(progress);

    el.textContent = Math.floor(eased * target);

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      el.textContent = target + '+';
    }
  };

  requestAnimationFrame(animate);
};

const resetCounter = el => {
  el.textContent = '0';
};

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const counter = entry.target;
    const target = +counter.dataset.target;

    if (entry.isIntersecting) {
      animateCounter(counter, target);
    } else {
      resetCounter(counter);
    }
  });
}, {
  threshold: 0.6
});

counters.forEach(counter => counterObserver.observe(counter));

const trustBadges = document.querySelectorAll('.trust-badge');

const trustObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    } else {
      entry.target.classList.remove('animate');
    }
  });
}, {
  threshold: 0.6
});

trustBadges.forEach(badge => trustObserver.observe(badge));
