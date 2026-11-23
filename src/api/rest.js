import { construirUrl } from './url';

// Cliente de la API REST mock.
async function pedir(ruta, { signal } = {}) {
  const respuesta = await fetch(construirUrl(ruta), { signal });
  if (!respuesta.ok) {
    const cuerpo = await respuesta.json().catch(() => ({}));
    throw new Error(cuerpo.error ?? `El servidor respondió con el error ${respuesta.status}`);
  }
  return respuesta.json();
}

export const obtenerDestinos = (region, opciones) =>
  pedir(region ? `api/destinos?region=${encodeURIComponent(region)}` : 'api/destinos', opciones);

export const obtenerDestino = (id, opciones) => pedir(`api/destinos/${encodeURIComponent(id)}`, opciones);
