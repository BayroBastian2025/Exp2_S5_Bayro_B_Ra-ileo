// URL absoluta respecto de la página actual: funciona en localhost y en GitHub Pages (subcarpeta del repo).
export const construirUrl = (ruta) => new URL(ruta, window.location.href).href;
