/* ================= MOBILE NAV ================= */
const toggle = document.querySelector(".mobile-toggle");
const navMenu = document.querySelector("nav ul");

if (toggle) {
  toggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });
}

/* Close menu on link click (mobile UX) */
document.querySelectorAll("nav ul li a").forEach(link => {
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
  ".glass-card, .plan-card, .about-image, .about-text, .contact-form, .hero-content"
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
const form = document.querySelector(".contact-form");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputs = form.querySelectorAll("input, textarea");
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
      form.reset();
    }
  });
}

/* ================= PERFORMANCE SAFE ================= */
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});
