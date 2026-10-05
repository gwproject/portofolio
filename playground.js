// 1. INIT LENIS SMOOTH SCROLL
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

// 2. CURSOR FOLLOWER
function initCursor() {
    const circ = document.querySelector("#move-circle");
    if (!circ) return;

    gsap.set(circ, { xPercent: -50, yPercent: -50 });

    window.addEventListener("mousemove", (e) => {
        gsap.to(circ, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.3,
            ease: "power2.out",
        });
    });
}
initCursor();

// 3. NAVIGATION & MOBILE DRAWER MENU
function initNavigation() {
    const menuBtn = document.querySelector("#menu");
    const ul = document.querySelector("#nav-inner-ul");
    const windowWidth = window.innerWidth;

    if (windowWidth > 600) {
        if (menuBtn && ul) {
            menuBtn.addEventListener("click", () => {
                gsap.to(menuBtn, { y: 22 });
                gsap.to(ul, { y: 22 });
            });
        }
    } else {
        const navUl = document.querySelector("#nav-inner-ul");
        if (navUl) navUl.style.display = "none";

        const extra = document.querySelector("#extra");
        if (extra) extra.style.display = "flex";

        const slider = document.querySelector("#mobile-slide");

        if (extra && slider) {
            extra.addEventListener("click", () => {
                gsap.to(slider, {
                    display: "block",
                    y: 950,
                    duration: 0.5,
                });

                document.body.style.overflow = "hidden";
                lenis.stop();

                const slideNav = document.querySelector("#slide-nav");
                const slideMenu = document.querySelectorAll("#slide-nav-menu li");
                const slideFoot = document.querySelector("#slide-foot");

                const timel = gsap.timeline();
                if (slideNav) timel.from(slideNav, { opacity: 0, delay: 0.2 });
                if (slideMenu.length > 0) {
                    slideMenu.forEach((s) => {
                        timel.from(s, { opacity: 0, duration: 0.2 }, "-=0.1");
                    });
                }
                if (slideFoot) timel.from(slideFoot, { opacity: 0 });
            });
        }


    }

    const slide = document.querySelector("#mobile-slide");
    const close = document.querySelector("#close");

    if (close && slide) {
        close.addEventListener("click", () => {
            gsap.to(slide, {
                y: "-100vh",
                duration: 0.5,
                onComplete: () => {
                    slide.style.display = "none";
                    document.body.style.overflow = "auto";
                    lenis.start();
                },
            });
        });
    }
}
initNavigation();

// 4. KINETIC TYPOGRAPHY INTERACTIVE LOGIC
function initKineticType() {
    const stage = document.querySelector("#kineticStage");
    const typeRow = document.querySelector("#typeRow");
    if (!stage || !typeRow) return;

    // CURSOR DISTORTION / WAVE EFFECT ON CHARACTERS
    stage.addEventListener("mousemove", (e) => {
        const chars = document.querySelectorAll(".char");
        const stageRect = stage.getBoundingClientRect();
        const mouseX = e.clientX - stageRect.left;
        const mouseY = e.clientY - stageRect.top;

        chars.forEach((char) => {
            const charRect = char.getBoundingClientRect();
            const charCenterX = charRect.left + charRect.width / 2 - stageRect.left;
            const charCenterY = charRect.top + charRect.height / 2 - stageRect.top;

            const distX = mouseX - charCenterX;
            const distY = mouseY - charCenterY;
            const distance = Math.sqrt(distX * distX + distY * distY);

            const maxDist = 250;
            if (distance < maxDist) {
                const force = (1 - distance / maxDist);
                const moveX = (distX / distance) * force * -35;
                const moveY = (distY / distance) * force * -45;
                const scale = 1 + force * 0.45;
                const rotate = (distX / distance) * force * 25;

                gsap.to(char, {
                    x: moveX,
                    y: moveY,
                    scale: scale,
                    rotation: rotate,
                    duration: 0.3,
                    ease: "power2.out",
                });
            } else {
                gsap.to(char, {
                    x: 0,
                    y: 0,
                    scale: 1,
                    rotation: 0,
                    duration: 0.6,
                    ease: "elastic.out(1, 0.4)",
                });
            }
        });


    });

    // RESET ON MOUSE LEAVE
    stage.addEventListener("mouseleave", () => {
        const chars = document.querySelectorAll(".char");
        gsap.to(chars, {
            x: 0,
            y: 0,
            scale: 1,
            rotation: 0,
            duration: 0.8,
            ease: "elastic.out(1, 0.3)",
            stagger: 0.02,
        });
    });

    // PRESET TEXT BUTTONS CONTROLLER
    const presetBtns = document.querySelectorAll(".preset-btn");
    presetBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            presetBtns.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");

            const newText = btn.dataset.text;

            // Animate transition out, rebuild chars, animate in
            gsap.to(".char", {
                y: -40,
                opacity: 0,
                stagger: 0.03,
                duration: 0.25,
                ease: "power2.in",
                onComplete: () => {
                    typeRow.innerHTML = "";
                    newText.split("").forEach((letter) => {
                        const span = document.createElement("span");
                        span.classList.add("char");
                        span.textContent = letter;
                        typeRow.appendChild(span);
                    });

                    gsap.fromTo(
                        ".char",
                        { y: 40, opacity: 0, scale: 0.8 },
                        {
                            y: 0,
                            opacity: 1,
                            scale: 1,
                            stagger: 0.04,
                            duration: 0.4,
                            ease: "back.out(1.7)",
                        }
                    );
                },
            });
        });


    });

    // COLOR THEME CONTROLLER
    const themeBtns = document.querySelectorAll(".theme-btn");
    themeBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            themeBtns.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");

            const theme = btn.dataset.theme;
            document.body.classList.remove("theme-neon", "theme-gradient");

            if (theme === "neon") {
                document.body.classList.add("theme-neon");
            } else if (theme === "gradient") {
                document.body.classList.add("theme-gradient");
            }
        });


    });
}
initKineticType();