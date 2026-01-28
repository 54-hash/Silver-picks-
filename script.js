





/* ================= MOBILE NAV ================= */
const toggle = document.getElementById("menu-toggle");
const navMenu = document.querySelector(".nav-links");

if (toggle) {
  toggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });
}

/* Close menu on link click (mobile UX) */
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
  });
});

/* ================= SMOOTH SCROLL ================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

/* ================= SCROLL REVEAL ================= */
const revealElements = document.querySelectorAll(
  ".product-card, .step, .testimonial, .feature, .about-text, .contact-form, .hero-text"
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal-active");
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach(el => {
  el.classList.add("reveal");
  revealObserver.observe(el);
});

/* ================= HEADER SHADOW ================= */
const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 40) {
    header.style.boxShadow = "0 10px 40px rgba(0,0,0,0.45)";
  } else {
    header.style.boxShadow = "none";
  }
});

/* ================= BUTTON RIPPLE ================= */
document.querySelectorAll(".btn").forEach(button => {
  button.addEventListener("mousemove", (e) => {
    const rect = button.getBoundingClientRect();
    button.style.setProperty("--x", `${e.clientX - rect.left}px`);
    button.style.setProperty("--y", `${e.clientY - rect.top}px`);
  });
});

/* ================= SAFE FORM HANDLER ================= */
const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputs = contactForm.querySelectorAll("input, textarea");
    let valid = true;

    inputs.forEach(input => {
      if (!input.value.trim()) {
        valid = false;
        input.style.borderColor = "#ff6b6b";
      } else {
        input.style.borderColor = "rgba(255,255,255,0.15)";
      }
    });

    if (valid) {
      alert("Message sent successfully. Our team will contact you.");
      contactForm.reset();
    }
  });
}

/* ================= MODAL FOR GET STARTED ================= */
const modal = document.getElementById("modal");
const getStartedBtns = document.querySelectorAll("#get-started-btn, #start-investing-btn, #cta-btn");
const closeModal = document.getElementById("close-modal");
const signupForm = document.getElementById("signup-form");

getStartedBtns.forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    modal.style.display = "block";
  });
});

if (closeModal) {
  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });
}

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Account created successfully! Welcome to Aurex Capital.");
    modal.style.display = "none";
    signupForm.reset();
  });
}

/* ================= CHART.JS INTEGRATION ================= */
const chartOptions = {
  type: 'line',
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
      },
    },
    scales: {
      x: { display: false },
      y: { display: false },
    },
    elements: {
      point: { radius: 0 },
      line: { borderWidth: 2 },
    },
    animation: {
      duration: 2000,
      easing: 'easeInOutQuart',
    },
  },
};

// Sample data for charts (replace with real API data in production)
const stocksData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [{
    data: [100, 105, 102, 110, 108, 115],
    borderColor: 'var(--primary)',
    backgroundColor: 'rgba(0, 123, 255, 0.1)',
    fill: true,
  }],
};

const cryptoData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [{
    data: [200, 220, 210, 240, 230, 250],
    borderColor: 'var(--secondary)',
    backgroundColor: 'rgba(40, 167, 69, 0.1)',
    fill: true,
  }],
};

const forexData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [{
    data: [1.0, 1.05, 1.02, 1.08, 1.06, 1.10],
    borderColor: 'var(--accent)',
    backgroundColor: 'rgba(255, 107, 53, 0.1)',
    fill: true,
  }],
};

const portfoliosData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [{
    data: [5000, 5200, 5100, 5400, 5300, 5600],
    borderColor: '#6f42c1',
    backgroundColor: 'rgba(111, 66, 193, 0.1)',
    fill: true,
  }],
};

// Initialize charts when products section is in view
const productsSection = document.getElementById('products');
const chartObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Delay to ensure DOM is ready
      setTimeout(() => {
        new Chart(document.getElementById('stocks-chart').getContext('2d'), { ...chartOptions, data: stocksData });
        new Chart(document.getElementById('crypto-chart').getContext('2d'), { ...chartOptions, data: cryptoData });
        new Chart(document.getElementById('forex-chart').getContext('2d'), { ...chartOptions, data: forexData });
        new Chart(document.getElementById('portfolios-chart').getContext('2d'), { ...chartOptions, data: portfoliosData });
      }, 500);
      chartObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

if (productsSection) {
  chartObserver.observe(productsSection);
}

/* ================= PERFORMANCE SAFE ================= */
window.addEventListener("load", () => {
  const loadingScreen = document.getElementById("loading-screen");
  if (loadingScreen) {
    loadingScreen.style.opacity = "0";
    setTimeout(() => {
      loadingScreen.style.display = "none";
    }, 500);
  }
  document.body.classList.add("loaded");
});
