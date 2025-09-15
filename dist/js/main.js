// Seleciona todos os carrosséis
const carousels = document.querySelectorAll(".carousel");
const cooldownMs = 800;
const cooldownMap = new WeakMap();

function isInCooldown(carousel) {
  return cooldownMap.has(carousel);
}
function startCooldown(carousel) {
  cooldownMap.set(carousel, true);
  setTimeout(() => cooldownMap.delete(carousel), cooldownMs);
}

carousels.forEach((carousel) => {
  const items = Array.from(carousel.querySelectorAll(".carousel-item"));

  // dots
  let dotsContainer = carousel.parentElement?.nextElementSibling || carousel.nextElementSibling;
  dotsContainer ||= document.querySelector(".btn-xs")?.parentElement;
  if (!dotsContainer) return;
  const dots = Array.from(dotsContainer.querySelectorAll(".btn-xs"));
  const count = Math.min(items.length, dots.length);

  // clique nos dots
  dots.forEach((dot, idx) => {
    dot.addEventListener("click", (e) => {
      e.preventDefault();
      if (!items[idx]) return;

      // scroll e atualização de classe dentro de rAF
      requestAnimationFrame(() => {
        items[idx].scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
        dots.forEach((d) => d.classList.remove("btn-primary"));
        dot.classList.add("btn-primary");
        history.replaceState(null, "", window.location.pathname + window.location.search);
        dot.blur();
      });
    });
  });

  // observer para atualizar dot ativo
  const observer = new IntersectionObserver(
    (entries) => {
      requestAnimationFrame(() => {
        entries.forEach((entry) => {
          const index = items.indexOf(entry.target);
          if (index === -1 || !entry.isIntersecting || entry.intersectionRatio < 0.5) return;
          dots.forEach((d) => d.classList.remove("btn-primary"));
          if (dots[index]) dots[index].classList.add("btn-primary");
        });
      });
    },
    { root: carousel, threshold: [0.5] }
  );
  items.forEach((item) => observer.observe(item));

  if (dots.length && !dotsContainer.querySelector(".btn-primary")) {
    dots[0].classList.add("btn-primary");
  }

  // scroll pelas setas
  const wrapper = carousel.parentElement;
  const prevBtn = wrapper?.querySelector(".carousel-prev") || carousel.querySelector(".carousel-prev");
  const nextBtn = wrapper?.querySelector(".carousel-next") || carousel.querySelector(".carousel-next");

  function getScrollAmount() {
    if (items.length > 1) {
      const firstRect = items[0].getBoundingClientRect();
      const secondRect = items[1].getBoundingClientRect();
      const gap = secondRect.left - (firstRect.left + firstRect.width);
      return Math.round(firstRect.width + (isNaN(gap) ? 0 : gap));
    }
    return carousel.clientWidth;
  }

  function scrollByAmount(amount) {
    carousel.scrollBy({ left: amount, behavior: "smooth" });

    // atualizar dot ativo com rAF
    requestAnimationFrame(() => {
      const estCenter = carousel.scrollLeft + carousel.clientWidth / 2;
      let closestIdx = 0;
      let closestDist = Infinity;
      items.forEach((it, i) => {
        const itemCenter = it.offsetLeft + it.offsetWidth / 2;
        const dist = Math.abs(itemCenter - estCenter);
        if (dist < closestDist) {
          closestDist = dist;
          closestIdx = i;
        }
      });
      dots.forEach((d) => d.classList.remove("btn-primary"));
      if (dots[closestIdx]) dots[closestIdx].classList.add("btn-primary");
    });
  }

  if (nextBtn) {
    const handler = () => {
      if (isInCooldown(carousel)) return;
      scrollByAmount(getScrollAmount());
      startCooldown(carousel);
      nextBtn.blur();
    };
    nextBtn.addEventListener("click", handler);
    nextBtn.addEventListener("mousedown", (e) => e.preventDefault());
    nextBtn.addEventListener("touchstart", (e) => e.preventDefault(), { passive: false });
  }

  if (prevBtn) {
    const handler = () => {
      if (isInCooldown(carousel)) return;
      scrollByAmount(-getScrollAmount());
      startCooldown(carousel);
      prevBtn.blur();
    };
    prevBtn.addEventListener("click", handler);
    prevBtn.addEventListener("mousedown", (e) => e.preventDefault());
    prevBtn.addEventListener("touchstart", (e) => e.preventDefault(), { passive: false });
  }
});

// Preloader da página
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  const mainContent = document.getElementById("main-content");

  // opcional: espera 0,5~1 segundo para dar aquele “piscar”
  setTimeout(() => {
    preloader.classList.add("hide"); // faz fade-out
    mainContent.style.display = "block"; // mostra o conteúdo
  }, 500);
});
