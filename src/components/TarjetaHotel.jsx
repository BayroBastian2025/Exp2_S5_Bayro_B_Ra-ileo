import { dinero, fecha } from '../utils/formato';
import Boton from './Boton';
import Estrellas from './Estrellas';
import Medidor from './Medidor';

export default function TarjetaHotel({ hotel, elegido, onAlternar }) {
  const agotado = hotel.habitaciones === 0;
  return (
    <article className={`tarjeta oferta ${elegido ? 'tarjeta--elegida' : ''}`}>
      <div>
        <div className="oferta__titulo">
          <h3>🏨 {hotel.nombre}</h3>
          <Estrellas cantidad={hotel.categoria} />
        </div>
        <p className="oferta__meta">Zona {hotel.zona}</p>
        <p className="oferta__fechas">
          <span>Disponible desde: <b>{fecha(hotel.disponibleDesde)}</b></span>
          <span>hasta: <b>{fecha(hotel.disponibleHasta)}</b></span>
        </p>
        <ul className="etiquetas" style={{ marginTop: 10 }}>
          {hotel.etiquetas.map((etiqueta) => (
            <li key={etiqueta} className="etiqueta">{etiqueta}</li>
          ))}
        </ul>
        <Medidor disponibles={hotel.habitaciones} capacidad={hotel.capacidad} unidad="habitaciones" />
      </div>
      <div className="oferta__precio">
        <p className="precio">{dinero(hotel.precioNoche)}<small>por noche</small></p>
        <Boton
          variante={elegido ? 'elegido' : 'primario'}
          disabled={agotado}
          onClick={() => onAlternar(hotel)}
          aria-label={`${elegido ? 'Quitar hotel' : 'Elegir hotel'} ${hotel.nombre}`}
        >
          {agotado ? 'Agotado' : elegido ? '✓ Elegido' : 'Elegir hotel'}
        </Boton>
      </div>
    </article>
  );
}
