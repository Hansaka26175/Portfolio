const roles = [
    { line1: "UI UX", line2: "Designer" },
    { line1: "Graphic", line2: "Designer" }
];

const roleLine1 = document.getElementById('role-line-1');
const roleLine2 = document.getElementById('role-line-2');

let roleIndex = 0;
const typingSpeed = 100;
const erasingSpeed = 50;
const pauseDuration = 2000; 

function type(element, text, callback) {
    let i = 0;
    element.textContent = '';
    function typing() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(typing, typingSpeed);
        } else if (callback) {
            callback();
        }
    }
    typing();
}

function erase(element, callback) {
    let text = element.textContent;
    function erasing() {
        if (text.length > 0) {
            text = text.slice(0, -1);
            element.textContent = text;
            setTimeout(erasing, erasingSpeed);
        } else if (callback) {
            callback();
        }
    }
    erasing();
}

function animateText() {
    if(!roleLine1 || !roleLine2) return; 

    erase(roleLine2, () => {
        erase(roleLine1, () => {
            roleIndex = (roleIndex + 1) % roles.length;
            const newRole = roles[roleIndex];
            
            type(roleLine1, newRole.line1, () => {
                type(roleLine2, newRole.line2, () => {
                    setTimeout(animateText, pauseDuration);
                });
            });
        });
    });
}

/* --- Pre-loader Fade Out & Initial Startup --- */
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    
    if(preloader) {
        preloader.classList.add('hidden');
        setTimeout(() => preloader.style.display = 'none', 1000);
    }
    
    setTimeout(animateText, pauseDuration);
});

/* =========================================
   SCROLL ANIMATION OBSERVER
   ========================================= */
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show-animation');
        } else {
            entry.target.classList.remove('show-animation'); 
        }
    });
});

const hiddenElements = document.querySelectorAll('.about-image-box, .about-card, .project-card, .skill-card, .contact-info, .contact-form');
hiddenElements.forEach((el) => observer.observe(el));


/* =========================================
   PERFORMANCE FIX: HIDE SPLINE ON SCROLL
   ========================================= */
const splinePerformanceObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        const splineViewer = document.getElementById('main-spline');
        
        if (splineViewer) {
            if (entry.isIntersecting) {
                splineViewer.style.visibility = 'visible';
            } else {
                splineViewer.style.visibility = 'hidden';
            }
        }
    });
}, { threshold: 0 }); 

const homeSectionForPerf = document.getElementById('home');
if(homeSectionForPerf) {
    splinePerformanceObserver.observe(homeSectionForPerf);
}

/* =========================================
   CONTACT FORM HANDLER
   ========================================= */
document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("contact-form");
    const status = document.getElementById("form-status");

    if (form) {
        form.addEventListener("submit", async function(event) {
            event.preventDefault(); 

            const data = new FormData(event.target);
            const submitBtn = form.querySelector('.submit-btn');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;

            try {
                const response = await fetch(event.target.action, {
                    method: form.method,
                    body: data,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    status.innerHTML = "Thanks! Your message has been sent.";
                    status.className = "form-status success"; 
                    form.reset(); 
                } else {
                    const jsonData = await response.json();
                    if (Object.hasOwn(jsonData, 'errors')) {
                        status.innerHTML = jsonData.errors.map(error => error.message).join(", ");
                    } else {
                        status.innerHTML = "Oops! There was a problem sending your message.";
                    }
                    status.className = "form-status error";
                }
            } catch (error) {
                status.innerHTML = "Something went wrong. Please try again.";
                status.className = "form-status error";
            } finally {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                
                setTimeout(() => {
                    status.style.display = 'none';
                    status.className = 'form-status';
                }, 5000);
            }
        });
    }
});

/* =========================================
   MOBILE MENU TOGGLE (NEW)
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {
    const menuIcon = document.getElementById('menu-icon');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li a');
    const iconImage = menuIcon ? menuIcon.querySelector('i') : null;

    if (menuIcon && navLinks) {
        // Toggle Menu
        menuIcon.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Toggle Icon (Bars <-> X)
            if (navLinks.classList.contains('active')) {
                iconImage.classList.remove('fa-bars');
                iconImage.classList.add('fa-xmark');
            } else {
                iconImage.classList.remove('fa-xmark');
                iconImage.classList.add('fa-bars');
            }
        });

        // Close Menu on Link Click
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
                if(iconImage) {
                    iconImage.classList.remove('fa-xmark');
                    iconImage.classList.add('fa-bars');
                }
            });
        });
    }
});/* =========================================
   ACTIVE LINK HANDLER (NEW)
   ========================================= */
const navLinksItems = document.querySelectorAll('.nav-links li a');

navLinksItems.forEach(item => {
    item.addEventListener('click', function() {
        // ඔක්කොගෙන්ම active අයින් කරනවා
        navLinksItems.forEach(link => link.classList.remove('active'));
        // Click කරපු එකට active දානවා
        this.classList.add('active');
        
        // Menu එක වහනවා
        const navLinks = document.querySelector('.nav-links');
        const iconImage = document.querySelector('.menu-icon i');
        if(navLinks) navLinks.classList.remove('active');
        if(iconImage) {
            iconImage.classList.remove('fa-xmark');
            iconImage.classList.add('fa-bars');
        }
    });
});