# Portafolio de José Daniel Recincoy Sarceño

Portafolio estático de un desarrollador de software junior. Presenta la formación profesional y los proyectos académicos SIGV y SAIF. Está hecho con HTML5, CSS3 y JavaScript y se puede abrir directamente en un navegador.

Dirección de GitHub Pages: [joserecincoy.github.io](https://joserecincoy.github.io/).

- **SIGV (2026).** Sistema Integral de Gestión de Vidriería. Proyecto académico individual desarrollado e implementado para Vidriería Gaitán. Su repositorio es privado.
- **SAIF (2025).** Sistema de Administración de Inventario de Farmacia. Proyecto académico colaborativo de cinco integrantes, con liderazgo técnico de desarrollo. [Repositorio del equipo](https://github.com/PabloChun-16/SaludAhorro)

## Abrir localmente

1. Abre `index.html` con tu navegador.
2. Desde **Proyectos**, abre la ficha de SIGV o SAIF. Sus galerías permiten ampliar cada captura.
3. Usa Tab y Mayús + Tab para moverte, y Enter para activar enlaces. En pantalla estrecha, abre el menú con Enter o Espacio y ciérralo con Escape mientras el foco esté en el menú. Escape también cierra el visor de capturas y devuelve el foco al enlace que lo abrió.

## Estructura y edición

| Ruta | Contenido |
| --- | --- |
| `index.html` | Presentación, proyectos destacados, formación y contacto. |
| `sigv.html` y `saif.html` | Casos de estudio, tecnologías, galerías, implementación y videos opcionales. |
| `assets/css/estilos.css` | Estilos compartidos y variantes azul para SIGV y verde para SAIF. |
| `assets/js/navegacion.js` | Barra fija durante el desplazamiento, estado de sección activa, menú móvil y visor accesible de capturas. Los enlaces y las imágenes completas siguen disponibles con JavaScript deshabilitado. |
| `assets/js/enlaces-proyectos.js` | URLs de los videos y repositorios de SIGV y SAIF. |
| `assets/js/recursos-proyectos.js` | Validación de URLs, carga de los reproductores bajo demanda y presentación de enlaces opcionales. |
| `assets/capturas/sigv/` y `assets/capturas/saif/` | Copias WebP para el sitio. Cada captura tiene una miniatura de 960 px y una versión de 1917 px para ampliar. |
| `assets/fuentes/` | Manrope e Inter en WOFF2, con sus licencias SIL Open Font License. |
| `assets/logotipos/` y `assets/recursos/` | Reservadas para futuros recursos aprobados. |
| `.nojekyll` | Archivo que permite servir el sitio directamente desde GitHub Pages. |

- Edita el contenido en la página correspondiente y conserva las rutas relativas. Repite los cambios de navegación en los tres HTML y deja `aria-current="page"` en el enlace que corresponde a cada página.
- Las fuentes se cargan desde el propio sitio. Consulta sus licencias en `assets/fuentes/`. [Manrope](https://github.com/google/fonts/tree/main/ofl/manrope) · [Inter](https://github.com/google/fonts/tree/main/ofl/inter)
- Para actualizar el contacto, edita la sección de inicio y los pies de las tres páginas. Si cambia la dirección del sitio o alguna captura destacada, actualiza también los metadatos Open Graph de las páginas afectadas.

## Capturas de demostración

Los 11 PNG originales se conservan en `assets/sigv/` y `assets/saif/`, ambos excluidos por `.gitignore`. Las 22 copias WebP de `assets/capturas/` se generaron directamente desde los originales con los datos ficticios de demostración visibles. El correo autorizado que aparece en SAIF también se usa para el contacto del portafolio.

| Proyecto | Capturas incorporadas |
| --- | --- |
| SIGV | Dashboard, gestión de inventario, cotizaciones, pedidos y órdenes de trabajo, reportes y asistente inteligente. |
| SAIF | Panel de control, gestión de productos, recepciones de productos, reportes de vencimiento y gestión de presentaciones. Las unidades de medida se ven en la gestión de productos. |

El autor confirmó el permiso para mostrar en este portafolio las marcas y emblemas visibles en las capturas y en las demostraciones de SIGV y SAIF. Confirma el permiso para cualquier recurso empresarial que se incorpore en el futuro. Las comparativas locales del refinamiento están en `revision-fase-3.5/` y quedan fuera de Git.

## Videos y enlaces de los proyectos

Los videos demostrativos se configuran en `assets/js/enlaces-proyectos.js`.

| Propiedad | Recurso configurado |
| --- | --- |
| `sigv.videoPrincipal` | [Demostración de SIGV](https://youtu.be/cn6MBfNYg_g) |
| `saif.videoPrincipal` | [Demostración de SAIF](https://youtu.be/hjrEdEaAek4) |
| `sigv.videoCompleto` y `saif.videoCompleto` | Vacías. Los videos extendidos quedan fuera del portafolio. |
| `sigv.repositorio` | Vacía mientras el repositorio sea privado. |
| `saif.repositorio` | [Repositorio del equipo](https://github.com/PabloChun-16/SaludAhorro) |

Para actualizar un video, pega su URL HTTPS de YouTube, ya sea la dirección normal o el enlace corto de **Compartir**. Deja `""` cuando un recurso no esté disponible. Antes de publicar un nuevo video, revisa los datos, marcas y materiales visibles durante toda la grabación. Agrega subtítulos si hay diálogo o narración.

Para probar la inserción, sirve una copia local que contenga únicamente el HTML y los recursos públicos, con Python 3.

```sh
python -m http.server --bind 127.0.0.1 8000
```

En el navegador, abre la dirección que muestra el servidor. Desde la ficha, activa **Cargar demostración** y usa el control de YouTube para iniciar la reproducción. El reproductor usa `youtube-nocookie.com` y se carga bajo demanda. Si falla la inserción, usa el enlace **Ver demostración en YouTube**. [Ayuda de YouTube sobre la inserción de videos](https://support.google.com/youtube/answer/171780?hl=es)

## Publicar en GitHub Pages

1. Confirma los permisos de los recursos y revisa las ramas del [repositorio de destino](https://github.com/JoseRecincoy/JoseRecincoy.github.io). Si ya tiene historial, trabaja en un clon de ese repositorio. Si está vacío, inicializa Git en la carpeta del portafolio con `git init -b main` y agrega `https://github.com/JoseRecincoy/JoseRecincoy.github.io.git` como remoto `origin`.
2. Prepara los archivos explícitamente y audita el índice antes de subirlo.

   ```sh
   git add -- .gitignore .nojekyll README.md index.html sigv.html saif.html assets/css assets/js assets/capturas assets/fuentes
   git diff --cached --name-status
   git -c core.whitespace=cr-at-eol diff --cached --check
   ```

3. Crea el commit y ejecuta `git push -u origin main` para la primera publicación, o `git push origin main` para las siguientes. Si el remoto tiene cambios, intégralos antes de volver a intentar el envío.
4. En **Settings > Pages**, elige **Deploy from a branch**, selecciona **main** y **/(root)** y guarda. GitHub Pages servirá el HTML estático desde la raíz mediante `.nojekyll`.
5. Cuando termine el despliegue, abre la dirección pública y comprueba la navegación, el contacto, las capturas ampliables y ambos videos en escritorio y móvil. [Configuración de la fuente de GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
