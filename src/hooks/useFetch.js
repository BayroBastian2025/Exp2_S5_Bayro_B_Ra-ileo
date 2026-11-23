import { useEffect, useState } from 'react';

// Hook para la API REST: maneja carga, error y reintento. Cancela la petición si el componente se desmonta.
export default function useFetch(peticion, dependencias) {
  const [estado, setEstado] = useState({ datos: null, cargando: true, error: null });
  const [intento, setIntento] = useState(0);

  useEffect(() => {
    const controlador = new AbortController();
    setEstado((previo) => ({ ...previo, cargando: true, error: null }));

    peticion({ signal: controlador.signal })
      .then((datos) => setEstado({ datos, cargando: false, error: null }))
      .catch((error) => {
        if (error.name === 'AbortError') return;
        setEstado({ datos: null, cargando: false, error: error.message || 'No fue posible conectar con el servidor' });
      });

    return () => controlador.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencias, intento]);

  return { ...estado, reintentar: () => setIntento((n) => n + 1) };
}
