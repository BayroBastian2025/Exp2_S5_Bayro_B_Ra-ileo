import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GUARDAR_ITINERARIO } from '../api/operaciones';
import Boton from '../components/Boton';
import Encabezado from '../components/Encabezado';
import EstadoVacio from '../components/EstadoVacio';
import { useItinerario } from '../context/ItinerarioContext';
import { dinero, fecha } from '../utils/formato';

// Itinerario: resumen del viaje y confirmación con una mutation de GraphQL.
export default function Itinerario() {
  const { itinerario, costos, fijarPasajeros, fijarHotel, vaciar } = useItinerario();
  const { destino, vuelo, hotel, pasajeros } = itinerario;
  const [confirmado, setConfirmado] = useState(null);

  const [guardar, { loading, error }] = useMutation(GUARDAR_ITINERARIO);

  const confirmar = async () => {
    try {
      const { data } = await guardar({
        variables: { input: { vueloId: vuelo.id, hotelId: hotel?.id ?? null, pasajeros } },
      });
      setConfirmado(data.guardarItinerario);
      vaciar();
    } catch {
      /* el mensaje queda en `error` y se muestra en pantalla */
    }
  };

  if (confirmado) {
    return (
      <section className="tarjeta confirmacion" aria-live="polite">
        <p style={{ fontSize: '2.6rem' }} aria-hidden="true">🎉</p>
        <h1>¡Itinerario confirmado!</h1>
        <p className="oferta__meta">Guarda tu código de reserva</p>
        <p className="confirmacion__codigo">{confirmado.id}</p>
        <p>{confirmado.noches} noches · Total <strong>{dinero(confirmado.total)}</strong></p>
        <Link to="/explorar" className="boton" style={{ marginTop: 20 }}>Planificar otro viaje</Link>
      </section>
    );
  }

  if (!vuelo) {
    return (
      <>
        <Encabezado titulo="Tu itinerario" />
        <EstadoVacio titulo="Tu itinerario está vacío" texto="Elige un destino y selecciona al menos un vuelo para comenzar.">
          <Link to="/explorar" className="boton">Explorar destinos</Link>
        </EstadoVacio>
      </>
    );
  }

  return (
    <>
      <Encabezado titulo="Tu itinerario" texto={`Revisa los detalles de tu viaje a ${destino?.nombre ?? 'tu destino'} y confírmalo.`} />

      <div className="dos-columnas">
        <div className="lista-ofertas">
          <section className="tarjeta" aria-labelledby="it-vuelo">
            <h2 id="it-vuelo" className="titulo-seccion" style={{ fontSize: '1.2rem' }}>✈️ Vuelo</h2>
            <p><strong>{vuelo.aerolinea}</strong> · {vuelo.codigo}</p>
            <p className="oferta__meta">{vuelo.origen} → {destino?.nombre} · {vuelo.duracionHoras} h</p>
            <p className="oferta__fechas"><span>Salida: <b>{fecha(vuelo.salida)}</b></span><span>Regreso: <b>{fecha(vuelo.regreso)}</b></span></p>
          </section>

          <section className="tarjeta" aria-labelledby="it-hotel">
            <h2 id="it-hotel" className="titulo-seccion" style={{ fontSize: '1.2rem' }}>🏨 Hotel</h2>
            {hotel ? (
              <>
                <p><strong>{hotel.nombre}</strong> · {hotel.zona}</p>
                <p className="oferta__meta">{dinero(hotel.precioNoche)} por noche · {costos.noches} noches</p>
                <Boton variante="borde" style={{ marginTop: 12 }} onClick={() => fijarHotel(null)}>Quitar hotel</Boton>
              </>
            ) : (
              <p className="oferta__meta">Aún no eliges hotel. <Link to={`/destino/${destino?.id}/hoteles`}>Ver hoteles</Link></p>
            )}
          </section>

          <section className="tarjeta" aria-labelledby="it-pasajeros">
            <h2 id="it-pasajeros" className="titulo-seccion" style={{ fontSize: '1.2rem' }}>👥 Pasajeros</h2>
            <div className="contador">
              <button type="button" aria-label="Quitar un pasajero" disabled={pasajeros <= 1} onClick={() => fijarPasajeros(pasajeros - 1)}>−</button>
              <output aria-live="polite">{pasajeros}</output>
              <button type="button" aria-label="Agregar un pasajero" disabled={pasajeros >= vuelo.cupos} onClick={() => fijarPasajeros(pasajeros + 1)}>+</button>
            </div>
            <p className="oferta__meta" style={{ marginTop: 8 }}>Máximo {vuelo.cupos} según los cupos del vuelo.</p>
          </section>
        </div>

        <aside className="tarjeta panel" aria-label="Resumen de costos">
          <h2>Resumen de costos</h2>
          <dl className="datos">
            <div><dt>Vuelos ({pasajeros})</dt><dd>{dinero(costos.vuelos)}</dd></div>
            <div><dt>Hotel ({costos.noches} noches)</dt><dd>{dinero(costos.alojamiento)}</dd></div>
            <div className="total"><dt>Total</dt><dd>{dinero(costos.total)}</dd></div>
          </dl>
          {error && <p className="aviso-error" role="alert" style={{ marginTop: 14 }}>{error.message}</p>}
          <Boton bloque style={{ marginTop: 18 }} disabled={loading} onClick={confirmar}>
            {loading ? 'Guardando…' : 'Confirmar itinerario'}
          </Boton>
          <Boton variante="borde" bloque style={{ marginTop: 10 }} onClick={vaciar}>Descartar viaje</Boton>
        </aside>
      </div>
    </>
  );
}
