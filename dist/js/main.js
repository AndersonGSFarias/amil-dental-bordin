// * Dots do carrossel

// Seleciona todos os carrosséis
const carousels = document.querySelectorAll(".carousel");

carousels.forEach((carousel) => {
  const items = carousel.querySelectorAll(".carousel-item img");
  const dotsContainer = carousel.nextElementSibling; // assume que os dots estão logo depois do carousel
  const dots = dotsContainer.querySelectorAll(".btn-xs");

  dots.forEach((dot, idx) => {
    dot.addEventListener("click", () => {
      items[idx].scrollIntoView({ behavior: "smooth", inline: "center" });

      // Atualiza dots
      dots.forEach((d) => d.classList.remove("btn-primary"));
      dot.classList.add("btn-primary");
    });
  });

  // Opcional: acompanhar scroll automático
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const index = Array.from(items).indexOf(entry.target);
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          dots.forEach((d) => d.classList.remove("btn-primary"));
          dots[index].classList.add("btn-primary");
        }
      });
    },
    { root: carousel, threshold: 0.5 }
  );

  items.forEach((item) => observer.observe(item));
});
