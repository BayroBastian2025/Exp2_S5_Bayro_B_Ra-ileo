import { useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { Link, NavLink, Outlet, useParams } from 'react-router-dom';
import { OFERTAS_DESTINO } from '../api/operaciones';
import BarraItinerario from '../components/BarraItinerario';
import Cargando from '../components/Cargando';
import EstadoError from '../components/EstadoError';
import { useItinerario } from '../context/ItinerarioContext';
import { useDestino } from '../hooks/useDestinos';

const clase = ({ isActive }) => (isActive ? 'activo' : '');

// Ruta padre de /destino/:destinoId. Carga UNA vez el destino (REST) y sus ofertas (GraphQL)
// y se las entrega a las rutas hijas (resumen, vuelos y hoteles) mediante <Outlet context>.
export default function DestinoLayout() {
  const { destinoId } = useParams();
  const { fijarDestino } = useItinerario();

  const rest = useDestino(destinoId);
  const graphql = useQuery(OFERTAS_DESTINO, {
    variables: { destinoId },
    skip: !rest.datos, // las ofertas solo se piden si el destino existe
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    if (rest.datos) fijarDestino(rest.datos);
  }, [rest.datos, fijarDestino]);

  if (rest.cargando) return <Cargando texto="Cargando destino…" />;
  if (rest.error) {
    return (
      <>
        <EstadoError mensaje={rest.error} onReintentar={rest.reintentar} />
        <p style={{ marginTop: 16, textAlign: 'center' }}><Link to="/explorar">← Volver a explorar</Link></p>
      </>
    );
  }

  const destino = rest.datos;
  const ofertas = graphql.data?.ofertasDestino;

  return (
    <>
      <nav className="migas" aria-label="Ruta de navegación">
        <Link to="/explorar">Explorar</Link> › {destino.nombre}
      </nav>

      <header className="destino-cabecera" style={{ '--color': `${destino.acento}44` }}>
        <span className="destino-cabecera__icono" aria-hidden="true">{destino.icono}</span>
        <div>
          <h1>{destino.nombre}</h1>
          <p>{destino.pais} · {destino.region}</p>
        </div>
      </header>

      <nav className="subnav" aria-label="Secciones del destino">
        <NavLink to="." end className={clase}>Resumen</NavLink>
        <NavLink to="vuelos" className={clase}>Vuelos{ofertas ? ` (${ofertas.vuelos.length})` : ''}</NavLink>
        <NavLink to="hoteles" className={clase}>Hoteles{ofertas ? ` (${ofertas.hoteles.length})` : ''}</NavLink>
      </nav>

      {graphql.loading && !ofertas && <Cargando texto="Consultando vuelos y hoteles…" />}
      {graphql.error && <EstadoError mensaje={graphql.error.message} onReintentar={() => graphql.refetch()} />}
      {ofertas && <Outlet context={{ destino, ofertas }} />}

      <BarraItinerario />
    </>
  );
}
