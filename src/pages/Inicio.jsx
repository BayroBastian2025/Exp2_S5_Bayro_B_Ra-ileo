import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Boton from '../components/Boton';
import Cargando from '../components/Cargando';
import EstadoError from '../components/EstadoError';
import TarjetaDestino from '../components/TarjetaDestino';
import { useDestinos } from '../hooks/useDestinos';

export default function Inicio() {
  const navegar = useNavigate();
  const [busqueda, setBusqueda] = useState('');
  const { datos: destinos, cargando, error, reintentar } = useDestinos();

  // El buscador lleva al listado con el texto como parámetro de la URL (/explorar?q=...).
  const buscar = (evento) => {
    evento.preventDefault();
    navegar(busqueda.trim() ? `/explorar?q=${encodeURIComponent(busqueda.trim())}` : '/explorar');
  };

  const paises = destinos ? new Set(destinos.map((d) => d.pais)).size : '—';
  const actividades = destinos ? destinos.reduce((total, d) => total + d.actividades.length, 0) : '—';

  return (
    <>
      <section className="hero" aria-labelledby="titulo-hero">
        <p className="hero__sobretitulo">Planificador de viajes</p>
        <h1 id="titulo-hero">El mundo, a tu <em>manera</em></h1>
        <p className="hero__texto">
          Elige un destino, compara vuelos y hoteles con sus cupos reales y arma tu itinerario en minutos.
        </p>
        <form className="buscador" onSubmit={buscar} role="search">
          <label htmlFor="buscar-inicio" className="solo-lectores">¿A dónde quieres ir?</label>
          <input id="buscar-inicio" className="campo" placeholder="Prueba con “Tokio” o “playa”…" value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
          <Boton type="submit">Buscar destino</Boton>
        </form>
      </section>

      <section className="estadisticas" aria-label="Datos de la agencia">
        <div className="estadistica"><strong>{destinos?.length ?? '—'}</strong><span>destinos disponibles</span></div>
        <div className="estadistica"><strong>{paises}</strong><span>países</span></div>
        <div className="estadistica"><strong>{actividades}</strong><span>actividades populares</span></div>
        <div className="estadistica"><strong>24/7</strong><span>consulta de disponibilidad</span></div>
      </section>

      <section aria-labelledby="titulo-destacados">
        <h2 id="titulo-destacados" className="titulo-seccion">Destinos para este año</h2>
        {cargando && <Cargando texto="Cargando destinos…" />}
        {error && <EstadoError mensaje={error} onReintentar={reintentar} />}
        {destinos && (
          <>
            <div className="grilla">
              {destinos.slice(0, 4).map((destino) => (
                <TarjetaDestino key={destino.id} destino={destino} />
              ))}
            </div>
            <p style={{ marginTop: 20, textAlign: 'center' }}>
              <Link to="/explorar">Ver los {destinos.length} destinos →</Link>
            </p>
          </>
        )}
      </section>
    </>
  );
}
