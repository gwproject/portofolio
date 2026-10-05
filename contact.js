// 1. LENIS SMOOTH SCROLL
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => 1 - Math.pow(1 - t, 4),
    smoothWheel: true,
    smoothTouch: true,
    touchMultiplier: 2,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// 2. MOBILE DRAWER MENU & DESKTOP TOGGLE
function initNavigation() {
    let menuBtn = document.querySelector("#menu");
    let ul = document.querySelector("#nav-inner-ul");
    let windowWidth = window.innerWidth;

    if (windowWidth > 600) {
        if (menuBtn && ul) {
            menuBtn.addEventListener("click", function () {
                gsap.to(menuBtn, { y: 22 });
                gsap.to(ul, { y: 22 });
            });
        }
    } else {
        let navUl = document.querySelector("#nav-inner-ul");
        if (navUl) navUl.style.display = "none";

        let extra = document.querySelector("#extra");
        if (extra) extra.style.display = "flex";

        let slider = document.querySelector("#mobile-slide");
        let closeBtn = document.querySelector("#close");

        if (extra && slider) {
            extra.addEventListener("click", function () {
                gsap.to(slider, {
                    display: "block",
                    y: 950,
                    duration: 0.5,
                });
                document.body.style.overflow = "hidden";
                lenis.stop();
            });
        }

        if (closeBtn && slider) {
            closeBtn.addEventListener("click", function () {
                gsap.to(slider, {
                    y: 0,
                    duration: 0.5,
                    onComplete: () => {
                        slider.style.display = "none";
                    },
                });
                document.body.style.overflow = "auto";
                lenis.start();
            });
        }
    }
}
initNavigation();

// 3. LIVE JAKARTA CLOCK REALTIME
function initLiveClock() {
    const clockEl = document.querySelector("#live-clock");
    if (!clockEl) return;

    function updateClock() {
        const now = new Date();
        const options = {
            timeZone: "Asia/Jakarta",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
        };
        clockEl.textContent = `${now.toLocaleTimeString("id-ID", options)} WIB`;
    }
    updateClock();
    setInterval(updateClock, 1000);
}
initLiveClock();

// 4. GSAP MAGNETIC EFFECT
function initMagneticItems() {
    const magneticItems = document.querySelectorAll(".magnetic-item");

    magneticItems.forEach((item) => {
        item.addEventListener("mousemove", (e) => {
            const position = item.getBoundingClientRect();
            const x = e.clientX - position.left - position.width / 2;
            const y = e.clientY - position.top - position.height / 2;

            gsap.to(item, {
                x: x * 0.25,
                y: y * 0.25,
                duration: 0.4,
                ease: "power2.out",
            });
        });

        item.addEventListener("mouseleave", () => {
            gsap.to(item, {
                x: 0,
                y: 0,
                duration: 0.6,
                ease: "elastic.out(1, 0.3)",
            });
        });
    });
}
initMagneticItems();

// 5. FLOATING PREVIEW IMAGE ON SOCIAL HOVER
function initSocialPreview() {
    const socialCards = document.querySelectorAll(".social-card");
    const previewBox = document.querySelector("#social-preview-box");
    const previewImg = document.querySelector("#social-preview-img");

    if (!previewBox || !previewImg) return;

    window.addEventListener("mousemove", (e) => {
        gsap.to(previewBox, {
            x: e.clientX + 20,
            y: e.clientY - 90,
            duration: 0.2,
            ease: "power1.out",
        });
    });

    socialCards.forEach((card) => {
        card.addEventListener("mouseenter", () => {
            const imgSrc = card.getAttribute("data-preview");
            if (imgSrc) {
                previewImg.src = imgSrc;
                gsap.to(previewBox, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.3,
                    ease: "back.out(1.7)",
                });
            }
        });

        card.addEventListener("mouseleave", () => {
            gsap.to(previewBox, {
                opacity: 0,
                scale: 0.8,
                duration: 0.2,
                ease: "power2.in",
            });
        });
    });
}
initSocialPreview();

// 6. CLICK TO COPY EMAIL WITH TOAST NOTIFICATION
function initCopyEmail() {
    const emailBtn = document.querySelector("#email-copy");
    const toast = document.querySelector("#toast-notify");

    if (!emailBtn || !toast) return;

    emailBtn.addEventListener("click", () => {
        const email = emailBtn.getAttribute("data-email");
        navigator.clipboard.writeText(email).then(() => {
            toast.classList.add("show");
            setTimeout(() => {
                toast.classList.remove("show");
            }, 2000);
        });
    });
}
initCopyEmail();

// 7. BACK TO TOP BUTTON
const backToTopBtn = document.querySelector("#back-to-top");
if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
        if (window.lenis) {
            lenis.scrollTo(0);
        } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    });
}