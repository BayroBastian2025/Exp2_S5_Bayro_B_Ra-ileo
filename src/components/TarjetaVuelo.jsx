import { dinero, fecha, horas } from '../utils/formato';
import Boton from './Boton';
import Medidor from './Medidor';

export default function TarjetaVuelo({ vuelo, elegido, onElegir }) {
  const agotado = vuelo.cupos === 0;
  return (
    <article className={`tarjeta oferta ${elegido ? 'tarjeta--elegida' : ''}`}>
      <div>
        <div className="oferta__titulo">
          <h3>✈️ {vuelo.aerolinea}</h3>
          <span className="etiqueta">{vuelo.codigo}</span>
        </div>
        <p className="oferta__meta">
          {vuelo.origen} · {horas(vuelo.duracionHoras)} · {vuelo.escalas === 0 ? 'Vuelo directo' : `${vuelo.escalas} escala`}
        </p>
        <p className="oferta__fechas">
          <span>Salida: <b>{fecha(vuelo.salida)}</b></span>
          <span>Regreso: <b>{fecha(vuelo.regreso)}</b></span>
        </p>
        <Medidor disponibles={vuelo.cupos} capacidad={vuelo.capacidad} unidad="cupos" />
      </div>
      <div className="oferta__precio">
        <p className="precio">{dinero(vuelo.precio)}<small>por pasajero</small></p>
        <Boton
          variante={elegido ? 'elegido' : 'primario'}
          disabled={agotado}
          onClick={() => onElegir(vuelo)}
          aria-label={`${elegido ? 'Vuelo elegido' : 'Elegir vuelo'} ${vuelo.codigo} del ${fecha(vuelo.salida)}`}
        >
          {agotado ? 'Agotado' : elegido ? '✓ Elegido' : 'Elegir vuelo'}
        </Boton>
      </div>
    </article>
  );
}
