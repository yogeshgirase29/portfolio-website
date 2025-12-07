// ========================
// Navbar Scroll Effect
// ========================
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  // Update active nav link based on scroll position
  updateActiveNavLink();
});

// ========================
// Mobile Menu Toggle
// ========================
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close mobile menu when clicking a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// ========================
// Smooth Scrolling
// ========================
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// ========================
// Update Active Nav Link
// ========================
function updateActiveNavLink() {
  const sections = document.querySelectorAll(".section, .hero");
  const scrollPosition = window.scrollY + 150;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

// ========================
// Scroll Reveal Animation
// ========================
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px",
  }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

// ========================
// Animated Counter for Achievements
// ========================
const statValues = document.querySelectorAll(".stat-value");
let hasAnimated = false;

const achievementsSection = document.getElementById("achievements");

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        animateCounters();
      }
    });
  },
  {
    threshold: 0.5,
  }
);

if (achievementsSection) {
  counterObserver.observe(achievementsSection);
}

function animateCounters() {
  statValues.forEach((stat) => {
    const target = parseInt(stat.getAttribute("data-target"));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;

    const updateCounter = () => {
      current += increment;
      if (current < target) {
        stat.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        stat.textContent = target;
      }
    };

    updateCounter();
  });
}

// =========================
// Contact Form - Clean Version
// =========================

const SHEET_URL =
  "https://script.google.com/macros/s/AKfycbz-qJDSZazUxxKB4_n8tP7Oq0ttuafmDefEXIOrEJbActVO4mrILJYzUU7_A4g-NLA/exec";

const contactForm = document.getElementById("contactForm");
const formSuccess = document.getElementById("formSuccess");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const honeypot = document.getElementById("honeypot").value;

  // Bot Protection (Honeypot)
  if (honeypot !== "") {
    console.warn("Bot detected — form blocked.");
    return;
  }

  // Email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  // Show loading state
  const sendBtn = document.getElementById("sendBtn");
  const btnText = document.getElementById("btnText");

  sendBtn.classList.add("btn-loading");
  btnText.innerText = "Sending...";
  sendBtn.insertAdjacentHTML(
    "beforeend",
    '<span class="spinner" id="btnSpinner"></span>'
  );

  // Prepare email data
  const time = new Date().toLocaleString();

  try {
    // Store in Google Sheets
    await fetch(SHEET_URL, {
      method: "POST",
      body: JSON.stringify({
        name: name,
        email: email,
        message: message,
      }),
    });

    await emailjs.send("service_ke16bz8", "template_nm0uznl", {
      from_name: name,
      reply_to: email,
      message: message,
      time: time,
    });

    // Success UI
    document.getElementById("btnSpinner").remove();
    sendBtn.classList.remove("btn-loading");
    btnText.innerText = "Send Message";

    contactForm.style.display = "none";
    formSuccess.classList.add("show");

    setTimeout(() => {
      contactForm.reset();
      formSuccess.classList.remove("show");
      contactForm.style.display = "block";
    }, 5000);
  } catch (error) {
    console.error("EmailJS Error:", error);
    alert("Could not send your message. Please try again later.");

    // Restore button state
    const spinner = document.getElementById("btnSpinner");
    if (spinner) spinner.remove();

    sendBtn.classList.remove("btn-loading");
    btnText.innerText = "Send Message";
  }
});

// ========================
// Floating Icons Animation Enhancement
// ========================
const floatingIcons = document.querySelectorAll(".floating-icon");

floatingIcons.forEach((icon, index) => {
  icon.addEventListener("mouseenter", () => {
    icon.style.transform = "scale(1.2) rotate(10deg)";
  });

  icon.addEventListener("mouseleave", () => {
    icon.style.transform = "scale(1) rotate(0deg)";
  });
});

// ========================
// Add Loading Animation
// ========================
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

// ========================
// Scroll to Top on Page Load
// ========================
window.addEventListener("beforeunload", () => {
  window.scrollTo(0, 0);
});

// ========================
// Add Hover Effect to Project Cards
// ========================
const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.borderColor = "rgba(0, 217, 255, 0.5)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.borderColor = "var(--glass-border)";
  });
});

// ========================
// Dynamic Year in Footer
// ========================
const footerText = document.querySelector(".footer p");
if (footerText) {
  document.getElementById("year").textContent = new Date().getFullYear();
}

console.log("Portfolio loaded successfully! 🚀");
