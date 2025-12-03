// Form Handling
const contactForm = document.getElementById("contact-form"),
    formStatus = document.getElementById("form-status");

if (contactForm) {
    contactForm.addEventListener("submit", async e => {
        e.preventDefault();
        let t = formStatus,
            n = new FormData(e.target),
            s = Object.fromEntries(n.entries()),
            a = e.target.querySelector('button[type="submit"]'),
            i = a.innerHTML;
        t.innerHTML = "Sending...", t.style.display = "block", t.className = "form-status", a.disabled = !0, a.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';
        try {
            let r = await fetch(e.target.action, {
                method: "POST",
                body: JSON.stringify(s),
                headers: {
                    Accept: "application/json"
                }
            });
            if (r.ok) {
                t.innerHTML = "Thanks! Your message has been sent.", t.className = "form-status success", e.target.reset();
            } else {
                let l = await r.json();
                Object.hasOwn(l, "errors") ? t.innerHTML = l.errors.map(e => e.message).join(", ") : (t.innerHTML = "Oops! There was a problem sending your message.", t.className = "form-status error")
            }
        } catch (o) {
            t.innerHTML = "Something went wrong. Please try again.", t.className = "form-status error"
        } finally {
            a.innerHTML = i, a.disabled = !1, setTimeout(() => {
                t.style.display = "none", t.className = "form-status"
            }, 5000)
        }
    });
}

// Mobile Menu Handling
document.addEventListener("DOMContentLoaded", () => {
    let e = document.getElementById("menu-icon"),
        t = document.querySelector(".nav-links"),
        n = document.querySelectorAll(".nav-links li a"),
        s = e ? e.querySelector("i") : null;
    if (e && t) {
        e.addEventListener("click", () => {
            t.classList.toggle("active");
            if (t.classList.contains("active")) {
                s.classList.remove("fa-bars");
                s.classList.add("fa-xmark");
            } else {
                s.classList.remove("fa-xmark");
                s.classList.add("fa-bars");
            }
        });
        n.forEach(e => {
            e.addEventListener("click", () => {
                t.classList.remove("active");
                if (s) {
                    s.classList.remove("fa-xmark");
                    s.classList.add("fa-bars");
                }
            })
        });
    }
});

// Active Link Highlight
const navLinksItems = document.querySelectorAll(".nav-links li a");
navLinksItems.forEach(e => {
    e.addEventListener("click", function() {
        navLinksItems.forEach(e => e.classList.remove("active")), this.classList.add("active")
    })
});

// Typing Animation
const roles = [{
        line1: "UI UX",
        line2: "Designer"
    }, {
        line1: "Graphic",
        line2: "Designer"
    }],
    roleLine1 = document.getElementById("role-line-1"),
    roleLine2 = document.getElementById("role-line-2");
let roleIndex = 0;

function type(e, t, n) {
    let s = 0;
    e.textContent = "",
        function a() {
            s < t.length ? (e.textContent += t.charAt(s), s++, setTimeout(a, 100)) : n && n()
        }()
}

function erase(e, t) {
    let n = e.textContent;
    ! function s() {
        n.length > 0 ? (n = n.slice(0, -1), e.textContent = n, setTimeout(s, 50)) : t && t()
    }()
}

function animateText() {
    if (roleLine1 && roleLine2) {
        erase(roleLine2, () => {
            erase(roleLine1, () => {
                roleIndex = (roleIndex + 1) % roles.length;
                let e = roles[roleIndex];
                type(roleLine1, e.line1, () => {
                    type(roleLine2, e.line2, () => {
                        setTimeout(animateText, 2000)
                    })
                })
            })
        })
    }
}

// Speed Optimization: Hides preloader quickly
window.addEventListener("DOMContentLoaded", () => {
    let e = document.querySelector(".preloader");
    if (e) {
        e.classList.add("hidden");
        setTimeout(() => e.style.display = "none", 1000);
    }
    setTimeout(animateText, 2000);
});

// Scroll Animations
const observer = new IntersectionObserver(e => {
    e.forEach(e => {
        e.isIntersecting ? e.target.classList.add("show-animation") : e.target.classList.remove("show-animation")
    })
});

const hiddenElements = document.querySelectorAll(".about-image-box, .about-card, .project-card, .skill-card, .contact-info, .contact-form");
hiddenElements.forEach(e => observer.observe(e));