// * Dots do carrossel

// Seleciona todos os carrosséis na página
const carousels = document.querySelectorAll(".carousel");

carousels.forEach((carousel) => {
  const items = carousel.querySelectorAll(".carousel-item img");
  const dotsContainer = carousel.nextElementSibling; // assume que os dots estão logo depois do carrossel

  if (!dotsContainer) return; // segurança
  const dots = dotsContainer.querySelectorAll(".btn-xs");

  dots.forEach((dot, idx) => {
    dot.addEventListener("click", (e) => {
      e.preventDefault(); // evita comportamento padrão se ainda for <a>
      e.stopPropagation(); // evita eventos extras

      // Scroll suave até o item correspondente
      items[idx].scrollIntoView({ behavior: "smooth", inline: "center" });

      // Atualiza estilo dos dots
      dots.forEach((d) => d.classList.remove("btn-primary"));
      dot.classList.add("btn-primary");

      // Remove hash da URL (caso sejam <a>)
      history.replaceState(null, "", window.location.pathname + window.location.search);

      // Remove foco do botão (evita jumps em mobile)
      dot.blur();
    });
  });

  // Observa qual card está visível para atualizar os dots
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const index = Array.from(items).indexOf(entry.target);
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          dots.forEach((d) => d.classList.remove("btn-primary"));
          if (dots[index]) dots[index].classList.add("btn-primary");
        }
      });
    },
    { root: carousel, threshold: 0.5 }
  );

  items.forEach((item) => observer.observe(item));
});
