import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Cargando from '../components/Cargando';
import Layout from '../components/Layout';

// Carga diferida de páginas: se descargan solo cuando se visita la ruta.
const Inicio = lazy(() => import('../pages/Inicio'));
const Explorar = lazy(() => import('../pages/Explorar'));
const DestinoLayout = lazy(() => import('../pages/DestinoLayout'));
const DestinoResumen = lazy(() => import('../pages/DestinoResumen'));
const DestinoVuelos = lazy(() => import('../pages/DestinoVuelos'));
const DestinoHoteles = lazy(() => import('../pages/DestinoHoteles'));
const Itinerario = lazy(() => import('../pages/Itinerario'));
const NoEncontrada = lazy(() => import('../pages/NoEncontrada'));

export default function AppRoutes() {
  return (
    <Suspense fallback={<Cargando />}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Inicio />} />
          <Route path="explorar" element={<Explorar />} />

          {/* Rutas anidadas: /destino/:destinoId, /destino/:destinoId/vuelos y /destino/:destinoId/hoteles */}
          <Route path="destino/:destinoId" element={<DestinoLayout />}>
            <Route index element={<DestinoResumen />} />
            <Route path="vuelos" element={<DestinoVuelos />} />
            <Route path="hoteles" element={<DestinoHoteles />} />
          </Route>

          <Route path="itinerario" element={<Itinerario />} />
          <Route path="*" element={<NoEncontrada />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
