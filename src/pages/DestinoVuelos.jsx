import { useMemo, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import TarjetaVuelo from '../components/TarjetaVuelo';
import EstadoVacio from '../components/EstadoVacio';
import { useItinerario } from '../context/ItinerarioContext';

const ORDENES = {
  salida: (a, b) => a.salida.localeCompare(b.salida),
  precio: (a, b) => a.precio - b.precio,
  duracion: (a, b) => a.duracionHoras - b.duracionHoras,
};

export default function DestinoVuelos() {
  const { ofertas } = useOutletContext();
  const { itinerario, fijarVuelo } = useItinerario();
  const [orden, setOrden] = useState('salida');
  const [soloDirectos, setSoloDirectos] = useState(false);

  const vuelos = useMemo(
    () => ofertas.vuelos.filter((v) => !soloDirectos || v.escalas === 0).sort(ORDENES[orden]),
    // `sort` muta el arreglo: antes se hace una copia con filter, por lo que los datos originales no cambian.
    [ofertas.vuelos, orden, soloDirectos]
  );

  return (
    <section aria-label="Vuelos disponibles">
      <div className="barra-filtros">
        <label>
          <span className="solo-lectores">Ordenar vuelos por</span>
          <select className="campo" value={orden} onChange={(e) => setOrden(e.target.value)} aria-label="Ordenar vuelos por">
            <option value="salida">Fecha de salida</option>
            <option value="precio">Menor precio</option>
            <option value="duracion">Menor duración</option>
          </select>
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input type="checkbox" checked={soloDirectos} onChange={(e) => setSoloDirectos(e.target.checked)} />
          Solo vuelos directos
        </label>
      </div>

      {vuelos.length === 0 ? (
        <EstadoVacio icono="🛫" titulo="No hay vuelos directos" texto="Quita el filtro para ver todas las opciones con escala." />
      ) : (
        <div className="lista-ofertas">
          {vuelos.map((vuelo) => (
            <TarjetaVuelo key={vuelo.id} vuelo={vuelo} elegido={itinerario.vuelo?.id === vuelo.id} onElegir={fijarVuelo} />
          ))}
        </div>
      )}
    </section>
  );
}
