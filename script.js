document.addEventListener("DOMContentLoaded", function () {
    const nav = document.getElementById("nav");
    const navToggle = document.getElementById("navToggle");
    const links = document.querySelectorAll(".nav-link");

    if (nav && navToggle) {
        navToggle.addEventListener("click", function () {
            nav.classList.toggle("open");
        });
    }

    links.forEach(function (link) {
        link.addEventListener("click", function () {
            links.forEach(function (l) {
                l.classList.remove("active");
            });
            link.classList.add("active");
            if (nav) {
                nav.classList.remove("open");
            }
        });
    });

    const form = document.querySelector(".contact-form");
    if (form) {
        form.addEventListener("submit", function (e) {
            const action = form.getAttribute("action") || "";
            if (action.toLowerCase().startsWith("mailto:")) {
                return;
            }
            e.preventDefault();
            alert("Thank you for reaching out! This demo does not send emails yet.");
        });
    }

    const revealElements = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window && revealElements.length > 0) {
        const observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("reveal-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.15
            }
        );
        revealElements.forEach(function (el) {
            observer.observe(el);
        });
    } else {
        revealElements.forEach(function (el) {
            el.classList.add("reveal-visible");
        });
    }
});
