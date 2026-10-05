const lenis = new Lenis({
    duration: 1.15,
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

// FUNGSI NAVIGASI & MENU DRAWER
function menu() {
    let menuBtn = document.querySelector("#menu");
    let ul = document.querySelector("#nav-inner-ul");
    let windowWidth = window.innerWidth;

    if (windowWidth > 600) {
        if (menuBtn) {
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

        if (extra) {
            extra.addEventListener("click", function () {
                gsap.to(slider, {
                    display: "block",
                    y: 950,
                    duration: 0.5,
                });

                document.body.style.overflow = "hidden";
                lenis.stop();

                let slideNav = document.querySelector("#slide-nav");
                let slideMenu = document.querySelectorAll("#slide-nav-menu li");
                let slideFoot = document.querySelector("#slide-foot");

                let timel = gsap.timeline();
                timel.from(slideNav, { opacity: 0, delay: 0.2 });
                slideMenu.forEach(function (s) {
                    timel.from(s, { opacity: 0, duration: 0.2 }, "-=0.1");
                });
                timel.from(slideFoot, { opacity: 0 });
            });
        }
    }

    let slide = document.querySelector("#mobile-slide");
    let close = document.querySelector("#close");

    if (close) {
        close.addEventListener("click", function () {
            gsap.to(slide, {
                y: "-100vh",
                duration: 0.5,
                onComplete: () => {
                    slide.style.display = "none";
                    document.body.style.overflow = "auto";
                    lenis.start();
                }
            });
        });
    }
}
menu();

// ANIMASI AWAL NAVBAR & LOGO
function animeNav() {
    let logo = document.querySelector("#logo");
    let tl = gsap.timeline();

    if (logo) tl.from(logo, { y: 40, duration: 0.5 });

    if (window.innerWidth > 600) {
        let men = document.querySelector("#menu");
        if (men) tl.from(men, { y: 40, duration: 0.5 }, "-=0.3");
    } else {
        let extra = document.querySelector("#extra");
        if (extra) tl.from(extra, { y: 40, duration: 0.5 }, "-=0.3");
    }
}
animeNav();

// LOGIKA PREVIEW PROJECT
const items = document.querySelectorAll(".project-item");
const previewImage = document.querySelector("#preview-image");
const previewNumber = document.querySelector("#preview-number");
const previewName = document.querySelector("#preview-name");

let activeIndex = 0;

function updatePreview(item, index, animate = true) {
    const image = item.dataset.image;
    const name = item.querySelector("h2").textContent.trim();
    const number = String(index + 1).padStart(2, "0");

    if (image === previewImage.getAttribute("src")) {
        return;
    }

    if (animate) {
        gsap.to(previewImage, {
            opacity: 0,
            scale: 1.04,
            duration: 0.18,
            ease: "power2.in",
            onComplete: () => {
                previewImage.src = image;
                previewImage.alt = name + " project preview";

                gsap.to(previewImage, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.45,
                    ease: "power2.out",
                });
            },
        });
    } else {
        previewImage.src = image;
    }

    previewNumber.textContent = number + " / 05";
    previewName.textContent = name;

    items.forEach((project) => project.classList.remove("active"));
    item.classList.add("active");
    activeIndex = index;
}

items.forEach((item, index) => {
    item.addEventListener("mouseenter", () => {
        updatePreview(item, index);
    });

    item.addEventListener("click", (event) => {
        event.preventDefault();
        updatePreview(item, index, false);
    });
});

// ANIMASI INTRO SECTION
gsap.from(".intro-left .eyebrow", {
    y: 25,
    opacity: 0,
    duration: 0.6,
    delay: 0.15,
    ease: "power3.out",
});

gsap.from(".intro-left h1", {
    y: "25vw",
    opacity: 0,
    duration: 0.8,
    delay: 0.1,
    ease: "power3.out",
});

gsap.from(".intro-right", {
    y: 30,
    opacity: 0,
    duration: 0.7,
    delay: 0.3,
    ease: "power3.out",
});

gsap.from(".project-item", {
    y: 35,
    opacity: 0,
    duration: 0.6,
    stagger: 0.08,
    delay: 0.35,
    ease: "power3.out",
});

gsap.from(".preview-wrap", {
    x: 35,
    opacity: 0,
    duration: 0.8,
    delay: 0.4,
    ease: "power3.out",
});

gsap.from(".work-footer", {
    opacity: 0,
    duration: 0.7,
    delay: 0.8,
});