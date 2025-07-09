// === Site Loaded Message ===
console.log("Site loaded for M. A. Idaiye & Co.");

// === Highlight Active Link in Navbar ===
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll('.topnav-right a');
  const currentPage = window.location.pathname.split('/').pop() || "index.html";

  navLinks.forEach(link => {
    const href = link.getAttribute('href');

    if (
      href === currentPage ||
      (href === "services.html" && currentPage.endsWith("-form.html"))
    ) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
});

// === Modal Service Request Handler ===
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('service-modal');
  if (!modal) return;

  const closeBtn = modal.querySelector('.modal-close');
  const titleEl = document.getElementById('modal-title');
  const serviceType = document.getElementById('service-type');
  const form = document.getElementById('service-form');

  document.querySelectorAll('.service-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.service-card');
      const svc = card.getAttribute('data-service') + ' Request';
      titleEl.textContent = svc;
      serviceType.value = card.getAttribute('data-service');
      modal.style.display = 'flex';
    });
  });

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', e => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    alert(`Service requested: ${serviceType.value}`);
    modal.style.display = 'none';
    form.reset();
  });
});

// === Testimonial Submission with JSONBin Integration ===
document.addEventListener('DOMContentLoaded', () => {
  const API_KEY = "$2a$10$Sv81zXtU6lJAkLBA8hTSKOg.DgjWcZcvKSvduv3G2NwIAPwbQZzcO";
  const BIN_ID = "6858f8898960c979a5af8e71";
  const BIN_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

  const form = document.getElementById('testimonial-form');
  const ticker = document.getElementById('testimonial-ticker');

  // Load existing testimonials from JSONBin
  async function loadTestimonials() {
    try {
      const response = await fetch(BIN_URL, {
        headers: { 'X-Master-Key': API_KEY }
      });
      const data = await response.json();
      const testimonials = data.record.testimonials || [];

      ticker.innerHTML = ''; // Clear previous testimonials

      testimonials.forEach(t => {
        const span = document.createElement('span');
        span.textContent = `"${t.message}" - ${t.name}`;
        ticker.appendChild(span);
      });
    } catch (err) {
      console.error('Failed to load testimonials:', err);
    }
  }

  // Submit new testimonial and update JSONBin
  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('testimonial-name').value.trim();
    const message = document.getElementById('testimonial-message').value.trim();

    if (!name || !message) return;

    try {
      // Get current testimonials
      const response = await fetch(BIN_URL, {
        headers: { 'X-Master-Key': API_KEY }
      });
      const data = await response.json();
      const testimonials = data.record.testimonials || [];

      // Add new testimonial
      const updated = [...testimonials, { name, message }];

      // Save updated testimonials to JSONBin
      await fetch(BIN_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': API_KEY
        },
        body: JSON.stringify({ testimonials: updated })
      });

      // Reload ticker and reset form
      await loadTestimonials();
      form.reset();
    } catch (err) {
      console.error('Failed to submit testimonial:', err);
    }
  });

  // Load testimonials on page load
  loadTestimonials();
});

// for product gallery
let slideIndex = 0;
const slides = document.querySelectorAll(".gallery-image");

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    if (i === index) slide.classList.add("active");
  });
}

function nextSlide() {
  slideIndex = (slideIndex + 1) % slides.length;
  showSlide(slideIndex);
}

function prevSlide() {
  slideIndex = (slideIndex - 1 + slides.length) % slides.length;
  showSlide(slideIndex);
}

// Auto-slide every 3 seconds
setInterval(nextSlide, 3000);

// Initial display
document.addEventListener("DOMContentLoaded", () => {
  showSlide(slideIndex);
});

