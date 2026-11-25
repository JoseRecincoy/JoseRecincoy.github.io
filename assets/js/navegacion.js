const menuButton = document.querySelector(".menu-toggle");

if (menuButton) {
  const header = menuButton.closest(".site-header");
  const nav = document.getElementById(menuButton.getAttribute("aria-controls"));
  const homeLink = nav.querySelector('a[aria-current="page"]');
  const sectionLinks = Array.from(nav.querySelectorAll('a[href^="#"]'), (link) => ({
    link,
    section: document.getElementById(link.hash.slice(1)),
  })).filter(({ section }) => section);
  let currentLink = homeLink;

  function updateHeader() {
    header.classList.toggle("is-scrolled", window.scrollY > 6);
    if (!homeLink) return;

    const activeLine = header.getBoundingClientRect().bottom + 24;
    const atEnd = window.scrollY > 0 &&
      document.documentElement.scrollHeight - window.innerHeight - window.scrollY <= 2;
    let activeLink = homeLink;

    for (const { link, section } of sectionLinks) {
      if (atEnd || section.getBoundingClientRect().top <= activeLine) {
        activeLink = link;
      }
    }

    if (activeLink !== currentLink) {
      currentLink.removeAttribute("aria-current");
      activeLink.setAttribute("aria-current", activeLink === homeLink ? "page" : "location");
      currentLink = activeLink;
    }
  }

  function syncHeaderHeight() {
    document.documentElement.style.setProperty("--header-height", `${header.offsetHeight}px`);
    updateHeader();
  }

  menuButton.hidden = false;

  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
  });

  nav.addEventListener("click", (event) => {
    if (event.target.closest("a[href]")) {
      menuButton.setAttribute("aria-expanded", "false");
    }
  });

  header.addEventListener("keydown", (event) => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";

    if (event.key === "Escape" && isOpen && menuButton.getClientRects().length) {
      event.preventDefault();
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.focus();
    }
  });

  syncHeaderHeight();
  window.addEventListener("scroll", updateHeader, { passive: true });
  window.addEventListener("hashchange", updateHeader);
  window.addEventListener("resize", syncHeaderHeight);
  if (typeof ResizeObserver === "function") {
    new ResizeObserver(syncHeaderHeight).observe(header);
  }
}

const galleryDialog = document.querySelector(".gallery-dialog");

if (galleryDialog && typeof galleryDialog.showModal === "function") {
  const title = galleryDialog.querySelector("h2");
  const imageSlot = galleryDialog.querySelector(".dialog-image");
  const originalLink = galleryDialog.querySelector(".dialog-original");
  let opener;

  document.querySelectorAll("[data-gallery]").forEach((link) => {
    link.addEventListener("click", (event) => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) {
        return;
      }

      event.preventDefault();
      opener = link;
      title.textContent = link.dataset.gallery;
      originalLink.href = link.href;

      const thumbnail = link.querySelector("img");
      const fullImage = new Image(
        Number(thumbnail.getAttribute("width")),
        Number(thumbnail.getAttribute("height")),
      );
      fullImage.alt = thumbnail.alt;
      fullImage.src = link.href;

      imageSlot.replaceChildren(fullImage);
      galleryDialog.showModal();
      galleryDialog.scrollTop = 0;
    });
  });

  galleryDialog.addEventListener("close", () => {
    imageSlot.replaceChildren();
    opener?.focus();
  });
}
