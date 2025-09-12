// Seleciona todos os carrosséis na página
const carousels = document.querySelectorAll(".carousel");

// cooldown por carousel (WeakMap evita memory leaks quando elementos são removidos)
const cooldownMs = 800; // 0,8 segundo
const cooldownMap = new WeakMap();

function isInCooldown(carousel) {
  return cooldownMap.has(carousel);
}
function startCooldown(carousel) {
  cooldownMap.set(carousel, true);
  setTimeout(() => {
    cooldownMap.delete(carousel);
  }, cooldownMs);
}

carousels.forEach((carousel) => {
  // items: os elementos .carousel-item (divs)
  const items = Array.from(carousel.querySelectorAll(".carousel-item"));

  // Tenta achar o container dos dots:
  let dotsContainer = null;
  if (carousel.parentElement && carousel.parentElement.nextElementSibling) {
    dotsContainer = carousel.parentElement.nextElementSibling;
  } else {
    dotsContainer = carousel.nextElementSibling;
  }

  if (!dotsContainer) {
    const possible = document.querySelector(".btn-xs");
    if (possible) {
      dotsContainer = possible.parentElement;
    }
  }

  if (!dotsContainer) return; // não encontrou container dos dots

  const dots = Array.from(dotsContainer.querySelectorAll(".btn-xs"));

  // Se a quantidade de dots não bater com a de items, não quebra — só tenta usar o menor comprimento
  const count = Math.min(items.length, dots.length);

  // --- DOTS: clique nos dots ---
  dots.forEach((dot, idx) => {
    dot.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (items[idx]) {
        items[idx].scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }

      // atualiza visual dos dots imediatamente
      dots.forEach((d) => d.classList.remove("btn-primary"));
      dot.classList.add("btn-primary");

      // remove hash da URL (caso sejam <a>)
      history.replaceState(null, "", window.location.pathname + window.location.search);

      dot.blur();
    });
  });

  // --- OBSERVER: observa qual card está visível e atualiza dots ---
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const index = items.indexOf(entry.target);
        if (index === -1) return;
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          dots.forEach((d) => d.classList.remove("btn-primary"));
          if (dots[index]) dots[index].classList.add("btn-primary");
        }
      });
    },
    { root: carousel, threshold: [0.5] }
  );

  items.forEach((item) => observer.observe(item));

  // set dot inicial caso nenhum esteja marcado
  if (dots.length && !dotsContainer.querySelector(".btn-primary")) {
    dots[0].classList.add("btn-primary");
  }

  // -------------------------
  // Controles das setas (prev/next)
  // -------------------------
  const wrapper = carousel.parentElement;
  const prevBtn = (wrapper && wrapper.querySelector(".carousel-prev")) || carousel.querySelector(".carousel-prev");
  const nextBtn = (wrapper && wrapper.querySelector(".carousel-next")) || carousel.querySelector(".carousel-next");

  // calcula quanto rolar: largura do primeiro item + gap entre itens
  function getScrollAmount() {
    if (items.length > 1) {
      const firstRect = items[0].getBoundingClientRect();
      const secondRect = items[1].getBoundingClientRect();
      const gap = secondRect.left - (firstRect.left + firstRect.width);
      return Math.round(firstRect.width + (isNaN(gap) ? 0 : gap));
    }
    return carousel.clientWidth;
  }

  // função auxiliar para rolar e atualizar dot ativo aproximado (feedback imediato)
  function scrollByAmount(amount) {
    carousel.scrollBy({ left: amount, behavior: "smooth" });

    // estimativa do centro visível após scroll e seleção do dot mais próximo
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
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", (e) => {
      e.preventDefault();
      // se este carousel está em cooldown, ignora o clique (sem efeito visual)
      if (isInCooldown(carousel)) return;
      const amount = getScrollAmount();
      scrollByAmount(amount);
      // inicia cooldown para este carousel (sem alterar classes/atributos)
      startCooldown(carousel);
      nextBtn.blur();
    });
    nextBtn.addEventListener("mousedown", (e) => e.preventDefault());
    nextBtn.addEventListener("touchstart", (e) => e.preventDefault(), { passive: false });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (isInCooldown(carousel)) return;
      const amount = getScrollAmount();
      scrollByAmount(-amount);
      startCooldown(carousel);
      prevBtn.blur();
    });
    prevBtn.addEventListener("mousedown", (e) => e.preventDefault());
    prevBtn.addEventListener("touchstart", (e) => e.preventDefault(), { passive: false });
  }
});
