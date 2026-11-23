import { useMemo, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import EstadoVacio from '../components/EstadoVacio';
import TarjetaHotel from '../components/TarjetaHotel';
import { useItinerario } from '../context/ItinerarioContext';

export default function DestinoHoteles() {
  const { ofertas } = useOutletContext();
  const { itinerario, fijarHotel } = useItinerario();
  const [categoriaMinima, setCategoriaMinima] = useState(0);
  const [soloDisponibles, setSoloDisponibles] = useState(false);

  const hoteles = useMemo(
    () =>
      ofertas.hoteles
        .filter((h) => h.categoria >= categoriaMinima && (!soloDisponibles || h.habitaciones > 0))
        .sort((a, b) => a.precioNoche - b.precioNoche),
    [ofertas.hoteles, categoriaMinima, soloDisponibles]
  );

  // Elegir el hotel ya seleccionado lo quita del itinerario.
  const alternar = (hotel) => fijarHotel(itinerario.hotel?.id === hotel.id ? null : hotel);

  return (
    <section aria-label="Hoteles disponibles">
      <div className="barra-filtros">
        <label>
          <span className="solo-lectores">Categoría mínima</span>
          <select className="campo" value={categoriaMinima} onChange={(e) => setCategoriaMinima(Number(e.target.value))} aria-label="Categoría mínima">
            <option value={0}>Todas las categorías</option>
            <option value={3}>3 estrellas o más</option>
            <option value={4}>4 estrellas o más</option>
            <option value={5}>Solo 5 estrellas</option>
          </select>
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input type="checkbox" checked={soloDisponibles} onChange={(e) => setSoloDisponibles(e.target.checked)} />
          Solo con habitaciones
        </label>
      </div>

      {hoteles.length === 0 ? (
        <EstadoVacio icono="🛏️" titulo="No hay hoteles con esos filtros" texto="Prueba con una categoría menor." />
      ) : (
        <div className="lista-ofertas">
          {hoteles.map((hotel) => (
            <TarjetaHotel key={hotel.id} hotel={hotel} elegido={itinerario.hotel?.id === hotel.id} onAlternar={alternar} />
          ))}
        </div>
      )}
    </section>
  );
}
