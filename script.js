// @ts-check

document.addEventListener("DOMContentLoaded", () => {
  /** @type {HTMLElement | null} */
  const nav = document.getElementById("nav");

  /** @type {HTMLButtonElement | null} */
  const navToggle = document.getElementById("navToggle");

  /** @type {NodeListOf<HTMLAnchorElement>} */
  const links = document.querySelectorAll(".nav-link");

  // Mobile nav toggle
  if (nav && navToggle) {
    navToggle.addEventListener("click", () => {
      nav.classList.toggle("open");
    });
  }

  // Smooth scroll + close menu
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href") ?? "";

      if (href.startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target instanceof HTMLElement) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }

      if (nav) nav.classList.remove("open");
    });
  });

  // ✅ IMPORTANT: make sections typed as HTMLElement (this removes offsetTop/offsetHeight errors)
  /** @type {NodeListOf<HTMLElement>} */
  const sections = document.querySelectorAll("section[id]");

  const setActive = () => {
    let currentId = "home";
    const scrollY = window.scrollY;

    sections.forEach((section) => {
      // section is HTMLElement here, so offsetTop/offsetHeight are valid
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentId = section.id || "home";
      }
    });

    links.forEach((l) => l.classList.remove("active"));

    const active = document.querySelector(`.nav-link[href="#${currentId}"]`);
    if (active instanceof HTMLAnchorElement) {
      active.classList.add("active");
    }
  };

  window.addEventListener("scroll", setActive);
  setActive();

  // ✅ DO NOT BLOCK FORM SUBMIT (Formspree will work now)

  // Reveal animation
  /** @type {NodeListOf<HTMLElement>} */
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && revealElements.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealElements.forEach((el) => observer.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add("reveal-visible"));
  }
  // Clear form fields after successful submit
const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", () => {
    // Small delay so Formspree can capture values first
    setTimeout(() => {
      contactForm.reset();
    }, 300);
  });
}

});
