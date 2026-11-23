import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import Cargando from '../components/Cargando';
import Encabezado from '../components/Encabezado';
import EstadoError from '../components/EstadoError';
import EstadoVacio from '../components/EstadoVacio';
import TarjetaDestino from '../components/TarjetaDestino';
import { useDestinos } from '../hooks/useDestinos';

const REGIONES = ['Asia', 'América', 'Europa', 'África', 'Oceanía'];
const ORDENES = {
  nombre: (a, b) => a.nombre.localeCompare(b.nombre, 'es'),
  duracion: (a, b) => a.duracionSugerida - b.duracionSugerida,
};

// Listado de destinos. Los filtros viven en la URL (?region=Asia&q=tokio&orden=nombre),
// así se pueden compartir y el botón "atrás" del navegador funciona.
export default function Explorar() {
  const [params, setParams] = useSearchParams();
  const region = params.get('region') ?? '';
  const busqueda = params.get('q') ?? '';
  const orden = params.get('orden') ?? 'nombre';

  // La región se filtra en el servidor REST (cambia la petición); el texto se filtra en el cliente.
  const { datos: destinos, cargando, error, reintentar } = useDestinos(region);

  const actualizar = (clave, valor) => {
    const siguiente = new URLSearchParams(params);
    if (valor) siguiente.set(clave, valor);
    else siguiente.delete(clave);
    setParams(siguiente, { replace: true });
  };

  const visibles = useMemo(() => {
    const texto = busqueda.trim().toLowerCase();
    return (destinos ?? [])
      .filter((d) => !texto || `${d.nombre} ${d.pais} ${d.actividades.join(' ')} ${d.resumen}`.toLowerCase().includes(texto))
      .sort(ORDENES[orden] ?? ORDENES.nombre);
  }, [destinos, busqueda, orden]);

  return (
    <>
      <Encabezado titulo="Explorar destinos" texto="Filtra por región, busca por nombre o actividad y elige dónde planificar tu viaje." />

      <div className="barra-filtros">
        <div className="barra-filtros__busqueda">
          <label htmlFor="q" className="solo-lectores">Buscar destino, país o actividad</label>
          <input id="q" type="search" className="campo" placeholder="Buscar destino, país o actividad…" value={busqueda} onChange={(e) => actualizar('q', e.target.value)} />
        </div>
        <label>
          <span className="solo-lectores">Región</span>
          <select className="campo" value={region} onChange={(e) => actualizar('region', e.target.value)} aria-label="Región">
            <option value="">Todas las regiones</option>
            {REGIONES.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </label>
        <label>
          <span className="solo-lectores">Ordenar por</span>
          <select className="campo" value={orden} onChange={(e) => actualizar('orden', e.target.value)} aria-label="Ordenar por">
            <option value="nombre">Orden alfabético</option>
            <option value="duracion">Duración sugerida</option>
          </select>
        </label>
      </div>

      {cargando && <Cargando texto="Buscando destinos…" />}
      {error && <EstadoError mensaje={error} onReintentar={reintentar} />}

      {!cargando && !error && (
        <>
          <p className="oferta__meta" style={{ marginBottom: 16 }} aria-live="polite">
            {visibles.length} {visibles.length === 1 ? 'destino encontrado' : 'destinos encontrados'}
          </p>
          {visibles.length > 0 ? (
            <div className="grilla">
              {visibles.map((destino) => (
                <TarjetaDestino key={destino.id} destino={destino} />
              ))}
            </div>
          ) : (
            <EstadoVacio titulo="Sin resultados" texto="Prueba con otra palabra o elige otra región." />
          )}
        </>
      )}
    </>
  );
}
