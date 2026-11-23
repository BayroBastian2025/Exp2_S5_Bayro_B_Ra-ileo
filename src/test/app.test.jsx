import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { describe, expect, it } from 'vitest';
import { server } from '../mocks/server';
import { renderizarApp } from './helpers';

describe('API REST mock: destinos', () => {
  it('lista los destinos con país y actividades populares', async () => {
    renderizarApp('/explorar');
    expect(await screen.findByRole('heading', { name: 'Tokio' })).toBeInTheDocument();
    expect(screen.getByText('8 destinos encontrados')).toBeInTheDocument();
    expect(screen.getByText(/Japón/)).toBeInTheDocument();
    expect(screen.getByText('Templo Senso-ji')).toBeInTheDocument();
  });

  it('filtra por región (petición REST con parámetro) y por texto', async () => {
    const user = userEvent.setup();
    renderizarApp('/explorar');
    await screen.findByRole('heading', { name: 'Tokio' });

    await user.selectOptions(screen.getByLabelText('Región'), 'Europa');
    expect(await screen.findByText('2 destinos encontrados')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'París' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Tokio' })).not.toBeInTheDocument();

    await user.type(screen.getByLabelText(/Buscar destino/), 'bazar');
    expect(await screen.findByText('1 destino encontrado')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Estambul' })).toBeInTheDocument();
  });

  it('el buscador del inicio lleva al listado con el texto en la URL', async () => {
    const user = userEvent.setup();
    renderizarApp('/');
    await user.type(await screen.findByLabelText(/A dónde quieres ir/), 'bali');
    await user.click(screen.getByRole('button', { name: 'Buscar destino' }));
    expect(await screen.findByText('1 destino encontrado')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Bali' })).toBeInTheDocument();
  });

  it('muestra error con reintento cuando el servidor falla', async () => {
    const user = userEvent.setup();
    server.use(http.get('*/api/destinos', () => HttpResponse.json({ error: 'Servidor en mantención' }, { status: 503 })));
    renderizarApp('/explorar');
    expect(await screen.findByRole('alert')).toHaveTextContent('Servidor en mantención');

    server.resetHandlers();
    await user.click(screen.getByRole('button', { name: 'Reintentar' }));
    expect(await screen.findByRole('heading', { name: 'Tokio' })).toBeInTheDocument();
  });
});

describe('API GraphQL mock + rutas anidadas', () => {
  it('el resumen del destino combina datos REST y ofertas GraphQL', async () => {
    renderizarApp('/destino/paris');
    expect(await screen.findByRole('heading', { name: 'París', level: 1 })).toBeInTheDocument();
    expect(await screen.findByText(/Vuelos desde/)).toBeInTheDocument();
    expect(screen.getByText('Torre Eiffel')).toBeInTheDocument();
    expect(screen.getByText('3 de 3 vuelos con cupos')).toBeInTheDocument();
  });

  it('navega a vuelos y hoteles con precios, fechas y disponibilidad', async () => {
    const user = userEvent.setup();
    renderizarApp('/destino/tokio');
    await screen.findByText(/Vuelos desde/);

    await user.click(screen.getByRole('link', { name: /Vuelos \(3\)/ }));
    expect(await screen.findByText(/Qatar Airways/)).toBeInTheDocument();
    expect(screen.getByText('QR 778')).toBeInTheDocument();
    expect(screen.getByText('Sin cupos disponibles')).toBeInTheDocument(); // Emirates agotado
    expect(screen.getByText('4 cupos disponibles')).toBeInTheDocument();

    await user.click(screen.getByRole('link', { name: /Hoteles \(3\)/ }));
    expect(await screen.findByText(/Park Hyatt Shinjuku/)).toBeInTheDocument();
    expect(screen.getByText('11 habitaciones disponibles')).toBeInTheDocument();
  });

  it('ordena vuelos por precio y filtra por vuelos directos', async () => {
    const user = userEvent.setup();
    renderizarApp('/destino/nueva-york/vuelos');
    await screen.findByText('LA 530');

    await user.selectOptions(screen.getByLabelText('Ordenar vuelos por'), 'precio');
    expect(within(screen.getAllByRole('article')[0]).getByText('DL 142')).toBeInTheDocument();

    await user.click(screen.getByLabelText('Solo vuelos directos'));
    expect(screen.getAllByRole('article')).toHaveLength(2);
    expect(screen.queryByText('DL 142')).not.toBeInTheDocument();
  });

  it('muestra un error si el destino no existe', async () => {
    renderizarApp('/destino/atlantida');
    expect(await screen.findByRole('alert')).toHaveTextContent(/No encontramos el destino/);
  });

  it('muestra 404 en rutas desconocidas', async () => {
    renderizarApp('/no-existe');
    expect(await screen.findByText(/Error 404/)).toBeInTheDocument();
  });
});

describe('Flujo completo del itinerario', () => {
  it('elige vuelo y hotel, calcula el total y confirma con una mutation', async () => {
    const user = userEvent.setup();
    renderizarApp('/destino/marrakech/vuelos');
    await screen.findByText('IB 6841');

    await user.click(screen.getByRole('button', { name: /Elegir vuelo IB 6841/ }));
    await user.click(screen.getByRole('link', { name: /Hoteles/ }));
    await user.click(await screen.findByRole('button', { name: /Elegir hotel Riad Jemaa/ }));

    // 1.025.000 + 6 noches x 89.000 = 1.559.000
    const barra = screen.getByRole('region', { name: /Avance de tu itinerario/ });
    expect(within(barra).getByText(/1\.559\.000/)).toBeInTheDocument();

    await user.click(within(barra).getByRole('link', { name: 'Ver itinerario' }));
    expect(await screen.findByRole('heading', { name: 'Tu itinerario' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Agregar un pasajero' }));
    // 2 x 1.025.000 + 534.000 = 2.584.000
    expect(screen.getAllByText(/2\.584\.000/).length).toBeGreaterThan(0);

    await user.click(screen.getByRole('button', { name: 'Confirmar itinerario' }));
    expect(await screen.findByText('¡Itinerario confirmado!')).toBeInTheDocument();
    expect(screen.getByText('NMD-2026001')).toBeInTheDocument();
  });

  it('un itinerario vacío invita a explorar', async () => {
    renderizarApp('/itinerario');
    expect(await screen.findByText('Tu itinerario está vacío')).toBeInTheDocument();
  });
});
