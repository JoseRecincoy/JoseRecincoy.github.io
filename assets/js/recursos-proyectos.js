function readHttpsUrl(value) {
  if (typeof value !== "string" || !value.trim()) return null;

  try {
    const url = new URL(value);
    if (url.protocol === "https:" && !url.username && !url.password && !url.port) {
      return url;
    }
  } catch {
    return null;
  }

  return null;
}

function getYouTubeId(value) {
  const url = readHttpsUrl(value);
  if (!url) return "";

  let id = "";

  if (url.hostname === "youtu.be") {
    id = url.pathname.slice(1).replace(/\/$/, "");
  } else if (
    ["youtube.com", "www.youtube.com", "m.youtube.com"].includes(url.hostname) &&
    url.pathname === "/watch"
  ) {
    const ids = url.searchParams.getAll("v");
    if (ids.length === 1) id = ids[0];
  }

  return id.length === 11 && /^[A-Za-z0-9_-]{11}$/.test(id) ? id : "";
}

function getRepositoryUrl(value) {
  const url = readHttpsUrl(value);
  const repositoryPath = /^\/[\w-]+\/[\w.-]+\/?$/;

  if (
    !url ||
    !["github.com", "www.github.com"].includes(url.hostname) ||
    !repositoryPath.test(url.pathname)
  ) {
    return "";
  }

  return `https://github.com${url.pathname.replace(/\/$/, "")}`;
}

function showResource(link, href) {
  if (!href) return;
  link.href = href;
  link.hidden = false;
}

const projectPage = document.querySelector("[data-proyecto]");
const projectLinks = projectPage && ENLACES_PROYECTOS[projectPage.dataset.proyecto];

if (projectLinks) {
  const mainVideo = getYouTubeId(projectLinks.videoPrincipal);
  const fullVideo = getYouTubeId(projectLinks.videoCompleto);

  showResource(
    projectPage.querySelector("[data-repositorio]"),
    getRepositoryUrl(projectLinks.repositorio),
  );

  showResource(
    projectPage.querySelector("[data-video-completo]"),
    fullVideo ? `https://www.youtube.com/watch?v=${fullVideo}` : "",
  );

  if (mainVideo) {
    const videoSection = projectPage.querySelector("[data-video-seccion]");
    const player = videoSection.querySelector("[data-video-principal]");
    const projectName = projectPage.dataset.proyecto.toUpperCase();
    showResource(
      videoSection.querySelector("[data-video-alternativo]"),
      `https://www.youtube.com/watch?v=${mainVideo}`,
    );
    const loadButton = document.createElement("button");
    loadButton.className = "button button-secondary";
    loadButton.type = "button";
    loadButton.textContent = `Cargar demostración de ${projectName}`;

    loadButton.addEventListener("click", () => {
      const iframe = document.createElement("iframe");
      iframe.title = `Demostración resumida de ${projectName}`;
      iframe.src = `https://www.youtube-nocookie.com/embed/${mainVideo}?autoplay=0`;
      iframe.referrerPolicy = "strict-origin-when-cross-origin";
      iframe.allow = "encrypted-media; picture-in-picture";
      iframe.allowFullscreen = true;
      player.replaceChildren(iframe);
      iframe.focus();
    }, { once: true });

    player.append(loadButton);
    videoSection.hidden = false;
    videoSection.closest(".delivery-section").classList.add("has-demo");
  }
}
