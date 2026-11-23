import { Link } from 'react-router-dom';

// Tarjeta de destino: país, región y actividades populares.
export default function TarjetaDestino({ destino }) {
  return (
    <article className="tarjeta tarjeta-destino">
      <div className="tarjeta-destino__portada" style={{ '--color': `${destino.acento}55` }} aria-hidden="true">
        <span className="tarjeta-destino__region">{destino.region}</span>
        {destino.icono}
      </div>
      <div className="tarjeta-destino__cuerpo">
        <div>
          <h3>{destino.nombre}</h3>
          <p className="tarjeta-destino__pais">{destino.pais} · {destino.duracionSugerida} días sugeridos</p>
        </div>
        <ul className="etiquetas" aria-label={`Actividades populares en ${destino.nombre}`}>
          {destino.actividades.slice(0, 3).map((actividad) => (
            <li key={actividad} className="etiqueta">{actividad}</li>
          ))}
        </ul>
        <Link to={`/destino/${destino.id}`} className="boton boton--borde">
          Planificar viaje
        </Link>
      </div>
    </article>
  );
}
