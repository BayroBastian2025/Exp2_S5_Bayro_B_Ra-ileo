import { Link, useOutletContext } from 'react-router-dom';
import { dinero } from '../utils/formato';

// Pestaña "Resumen": información del destino (REST) + las mejores ofertas encontradas (GraphQL).
export default function DestinoResumen() {
  const { destino, ofertas } = useOutletContext();

  const vuelosConCupo = ofertas.vuelos.filter((v) => v.cupos > 0);
  const hotelesConCupo = ofertas.hoteles.filter((h) => h.habitaciones > 0);
  const vueloMasBarato = vuelosConCupo.length ? Math.min(...vuelosConCupo.map((v) => v.precio)) : null;
  const hotelMasBarato = hotelesConCupo.length ? Math.min(...hotelesConCupo.map((h) => h.precioNoche)) : null;

  return (
    <div className="lista-ofertas">
      <section className="tarjeta" aria-labelledby="sobre-destino">
        <h2 id="sobre-destino" className="titulo-seccion">Sobre {destino.nombre}</h2>
        <p>{destino.resumen}</p>
        <p className="oferta__meta">🌤️ {destino.clima} · 🗓️ {destino.duracionSugerida} días sugeridos</p>
        <h3 style={{ margin: '18px 0 10px', fontSize: '1.1rem' }}>Actividades populares</h3>
        <ul className="etiquetas">
          {destino.actividades.map((actividad) => (
            <li key={actividad} className="etiqueta">{actividad}</li>
          ))}
        </ul>
      </section>

      <div className="grilla" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
        <section className="tarjeta" aria-labelledby="desde-vuelos">
          <h3 id="desde-vuelos">✈️ Vuelos desde</h3>
          <p className="precio" style={{ margin: '10px 0' }}>{vueloMasBarato ? dinero(vueloMasBarato) : 'Sin cupos'}</p>
          <p className="oferta__meta">{vuelosConCupo.length} de {ofertas.vuelos.length} vuelos con cupos</p>
          <Link to="vuelos" className="boton boton--borde" style={{ marginTop: 14 }}>Ver vuelos</Link>
        </section>
        <section className="tarjeta" aria-labelledby="desde-hoteles">
          <h3 id="desde-hoteles">🏨 Hoteles desde</h3>
          <p className="precio" style={{ margin: '10px 0' }}>{hotelMasBarato ? `${dinero(hotelMasBarato)} / noche` : 'Sin cupos'}</p>
          <p className="oferta__meta">{hotelesConCupo.length} de {ofertas.hoteles.length} hoteles con habitaciones</p>
          <Link to="hoteles" className="boton boton--borde" style={{ marginTop: 14 }}>Ver hoteles</Link>
        </section>
      </div>
    </div>
  );
}
