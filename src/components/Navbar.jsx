import { Link, NavLink } from 'react-router-dom';
import { useItinerario } from '../context/ItinerarioContext';

const ENLACES = [
  { to: '/', icono: '🏠', texto: 'Inicio', end: true },
  { to: '/explorar', icono: '🧭', texto: 'Explorar' },
  { to: '/itinerario', icono: '🧳', texto: 'Itinerario' },
];

// En escritorio es una barra superior; en móvil los enlaces pasan a una barra de pestañas inferior (CSS).
export default function Navbar() {
  const { itinerario } = useItinerario();
  const elegidos = [itinerario.vuelo, itinerario.hotel].filter(Boolean).length;

  return (
    <header className="navbar">
      <div className="contenedor navbar__interior">
        <Link to="/" className="marca">
          <span className="marca__icono" aria-hidden="true">✦</span> Nómade
        </Link>
        <nav aria-label="Navegación principal">
          <ul className="navbar__enlaces">
            {ENLACES.map(({ to, icono, texto, end }) => (
              <li key={to} style={{ display: 'contents' }}>
                <NavLink to={to} end={end} className={({ isActive }) => `navbar__enlace ${isActive ? 'activo' : ''}`}>
                  <span className="navbar__icono" aria-hidden="true">{icono}</span>
                  {texto}
                  {to === '/itinerario' && elegidos > 0 && (
                    <span className="insignia" aria-label={`${elegidos} elementos elegidos`}>{elegidos}</span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
