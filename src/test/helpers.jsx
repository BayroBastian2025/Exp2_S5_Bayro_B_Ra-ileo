import { ApolloProvider } from '@apollo/client';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import { crearApollo } from '../api/apollo';
import { ItinerarioProvider } from '../context/ItinerarioContext';

export function renderizarApp(ruta = '/') {
  return render(
    <MemoryRouter initialEntries={[ruta]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ApolloProvider client={crearApollo()}>
        <ItinerarioProvider>
          <App />
        </ItinerarioProvider>
      </ApolloProvider>
    </MemoryRouter>
  );
}
