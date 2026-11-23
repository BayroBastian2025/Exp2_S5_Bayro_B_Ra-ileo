import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { diasEntre } from '../utils/formato';

const ItinerarioContext = createContext(null);
const CLAVE = 'nomade:itinerario';
const VACIO = { destino: null, vuelo: null, hotel: null, pasajeros: 1 };

const leer = () => {
  try {
    return { ...VACIO, ...JSON.parse(localStorage.getItem(CLAVE)) };
  } catch {
    return VACIO;
  }
};

// Itinerario en construcción: destino, vuelo y hotel elegidos más cantidad de pasajeros.
export function ItinerarioProvider({ children }) {
  const [itinerario, setItinerario] = useState(leer);

  useEffect(() => {
    try {
      localStorage.setItem(CLAVE, JSON.stringify(itinerario));
    } catch {
      /* localStorage no disponible: la app sigue funcionando en memoria */
    }
  }, [itinerario]);

  const acciones = useMemo(
    () => ({
      // Cambiar de destino reinicia vuelo y hotel.
      fijarDestino: (destino) =>
        setItinerario((actual) => (actual.destino?.id === destino.id ? actual : { ...VACIO, destino })),
      fijarVuelo: (vuelo) => setItinerario((actual) => ({ ...actual, vuelo, pasajeros: Math.min(actual.pasajeros, vuelo?.cupos || 1) })),
      fijarHotel: (hotel) => setItinerario((actual) => ({ ...actual, hotel })),
      fijarPasajeros: (cantidad) => setItinerario((actual) => ({ ...actual, pasajeros: Math.max(1, cantidad) })),
      vaciar: () => setItinerario(VACIO),
    }),
    []
  );

  // Valores derivados (no se guardan, se calculan).
  const costos = useMemo(() => {
    const noches = itinerario.vuelo ? diasEntre(itinerario.vuelo.salida, itinerario.vuelo.regreso) : 0;
    const vuelos = itinerario.vuelo ? itinerario.vuelo.precio * itinerario.pasajeros : 0;
    const alojamiento = itinerario.hotel ? itinerario.hotel.precioNoche * noches : 0;
    return { noches, vuelos, alojamiento, total: vuelos + alojamiento };
  }, [itinerario]);

  const valor = useMemo(() => ({ itinerario, costos, ...acciones }), [itinerario, costos, acciones]);
  return <ItinerarioContext.Provider value={valor}>{children}</ItinerarioContext.Provider>;
}

export function useItinerario() {
  const contexto = useContext(ItinerarioContext);
  if (!contexto) throw new Error('useItinerario debe usarse dentro de <ItinerarioProvider>');
  return contexto;
}
