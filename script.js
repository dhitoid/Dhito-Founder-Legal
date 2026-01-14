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

const counters = document.querySelectorAll('.count');
let counterStarted = false;

const startCount = () => {
  counters.forEach(counter => {
    const target = +counter.dataset.target;
    const speed = 200; // makin kecil makin cepat

    const updateCount = () => {
      const current = +counter.innerText;
      const increment = Math.ceil(target / speed);

      if (current < target) {
        counter.innerText = current + increment;
        setTimeout(updateCount, 20);
      } else {
        counter.innerText = target + '+';
      }
    };

    updateCount();
  });
};

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !counterStarted) {
      counterStarted = true;
      startCount();
    }
  });
}, { threshold: 0.4 });

document.querySelectorAll('.stats').forEach(stat => {
  counterObserver.observe(stat);
});


