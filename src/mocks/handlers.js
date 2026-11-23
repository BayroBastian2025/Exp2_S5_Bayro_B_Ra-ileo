import { delay, graphql, http, HttpResponse } from 'msw';
import { destinos, hoteles as hotelesBase, vuelos as vuelosBase } from './data';

// En las pruebas no esperamos; en el navegador simulamos latencia de red.
const RETARDO_MS = import.meta.env.MODE === 'test' ? 0 : 700;

// Copias en memoria: guardar un itinerario descuenta cupos y habitaciones mientras la página siga abierta.
let vuelos = [];
let hoteles = [];
let contador = 0;

export function reiniciarMock() {
  vuelos = vuelosBase.map((v) => ({ ...v }));
  hoteles = hotelesBase.map((h) => ({ ...h }));
  contador = 0;
}
reiniciarMock();

const dias = (a, b) => Math.max(1, Math.round((new Date(b) - new Date(a)) / 86400000));
const conTipo = (tipo, lista) => lista.map((item) => ({ __typename: tipo, ...item }));

export const handlers = [
  // ====================== REST ======================
  // GET /api/destinos?region=Europa  -> lista de destinos (país + actividades populares).
  http.get('*/api/destinos', async ({ request }) => {
    await delay(RETARDO_MS);
    const region = new URL(request.url).searchParams.get('region');
    const lista = region ? destinos.filter((d) => d.region === region) : destinos;
    return HttpResponse.json(lista);
  }),

  // GET /api/destinos/:id -> detalle de un destino.
  http.get('*/api/destinos/:id', async ({ params }) => {
    await delay(RETARDO_MS);
    const destino = destinos.find((d) => d.id === params.id);
    if (!destino) {
      return HttpResponse.json({ error: `No encontramos el destino "${params.id}"` }, { status: 404 });
    }
    return HttpResponse.json(destino);
  }),

  // ===================== GRAPHQL =====================
  // query OfertasDestino: vuelos y hoteles de un destino en UNA sola consulta.
  graphql.query('OfertasDestino', async ({ variables }) => {
    await delay(RETARDO_MS);
    const { destinoId } = variables;
    if (!destinos.some((d) => d.id === destinoId)) {
      return HttpResponse.json({ errors: [{ message: `El destino "${destinoId}" no existe en el catálogo` }] });
    }
    return HttpResponse.json({
      data: {
        ofertasDestino: {
          __typename: 'OfertasDestino',
          destinoId,
          vuelos: conTipo('Vuelo', vuelos.filter((v) => v.destinoId === destinoId)),
          hoteles: conTipo('Hotel', hoteles.filter((h) => h.destinoId === destinoId)),
        },
      },
    });
  }),

  // mutation GuardarItinerario: valida disponibilidad, descuenta cupos y calcula el total.
  graphql.mutation('GuardarItinerario', async ({ variables }) => {
    await delay(RETARDO_MS);
    const { vueloId, hotelId, pasajeros } = variables.input;
    const vuelo = vuelos.find((v) => v.id === vueloId);
    const hotel = hotelId ? hoteles.find((h) => h.id === hotelId) : null;

    if (!vuelo) return HttpResponse.json({ errors: [{ message: 'El vuelo elegido ya no existe' }] });
    if (vuelo.cupos < pasajeros) {
      return HttpResponse.json({ errors: [{ message: `Solo quedan ${vuelo.cupos} cupos en el vuelo ${vuelo.codigo}` }] });
    }
    if (hotelId && (!hotel || hotel.habitaciones < 1)) {
      return HttpResponse.json({ errors: [{ message: 'El hotel elegido ya no tiene habitaciones disponibles' }] });
    }

    const noches = dias(vuelo.salida, vuelo.regreso);
    vuelo.cupos -= pasajeros;
    if (hotel) hotel.habitaciones -= 1;
    contador += 1;

    return HttpResponse.json({
      data: {
        guardarItinerario: {
          __typename: 'Itinerario',
          id: `NMD-${2026000 + contador}`,
          estado: 'CONFIRMADO',
          noches,
          total: vuelo.precio * pasajeros + (hotel ? hotel.precioNoche * noches : 0),
        },
      },
    });
  }),
];
