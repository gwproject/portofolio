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

const items = document.querySelectorAll(".project-item");
const previewImage = document.querySelector("#preview-image");
const previewNumber = document.querySelector("#preview-number");
const previewName = document.querySelector("#preview-name");
const cursor = document.querySelector(".cursor");

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

window.addEventListener("mousemove", (event) => {
  if (window.innerWidth <= 600) return;

  gsap.to(cursor, {
    x: event.clientX,
    y: event.clientY,
    duration: 0.35,
    ease: "power2.out",
  });
});

items.forEach((item) => {
  item.addEventListener("mouseenter", () => {
    if (window.innerWidth <= 600) return;

    gsap.to(cursor, {
      scale: 1.25,
      opacity: 1,
      duration: 0.25,
      ease: "power2.out",
    });
  });

  item.addEventListener("mouseleave", () => {
    if (window.innerWidth <= 600) return;

    gsap.to(cursor, {
      scale: 1,
      opacity: 0,
      duration: 0.25,
      ease: "power2.out",
    });
  });
});

gsap.from(".work-nav", {
  y: -30,
  opacity: 0,
  duration: 0.7,
  ease: "power3.out",
});

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

window.addEventListener("resize", () => {
  if (window.innerWidth > 600) {
    cursor.style.display = "grid";
  } else {
    cursor.style.display = "none";
  }
});
