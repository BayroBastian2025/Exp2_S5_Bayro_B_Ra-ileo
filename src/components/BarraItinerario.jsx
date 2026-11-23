import { Link } from 'react-router-dom';
import { useItinerario } from '../context/ItinerarioContext';
import { dinero } from '../utils/formato';

// Barra fija al pie de las páginas de destino con el avance del itinerario.
export default function BarraItinerario() {
  const { itinerario, costos } = useItinerario();
  const { vuelo, hotel } = itinerario;

  return (
    <div className="barra-itinerario" role="region" aria-label="Avance de tu itinerario">
      <p>
        Vuelo: <strong>{vuelo ? vuelo.codigo : 'sin elegir'}</strong> · Hotel: <strong>{hotel ? hotel.nombre : 'sin elegir'}</strong>
        {vuelo && <> · Total: <strong>{dinero(costos.total)}</strong></>}
      </p>
      <Link to="/itinerario" className={`boton ${vuelo ? '' : 'boton--borde'}`} aria-disabled={!vuelo} onClick={(e) => !vuelo && e.preventDefault()}>
        Ver itinerario
      </Link>
    </div>
  );
}
