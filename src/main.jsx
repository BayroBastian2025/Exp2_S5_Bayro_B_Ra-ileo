import { ApolloProvider } from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import { crearApollo } from './api/apollo';
import { ItinerarioProvider } from './context/ItinerarioContext';
import { worker } from './mocks/browser';
import './styles/index.css';

const apollo = crearApollo();

// 1) Se activa el backend mock (MSW). 2) Recién entonces se dibuja la aplicación.
async function arrancar() {
  await worker.start({
    onUnhandledRequest: 'bypass',
    serviceWorker: { url: `${import.meta.env.BASE_URL}mockServiceWorker.js` },
  });

  // HashRouter: compatible con GitHub Pages sin redirecciones en el servidor.
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <HashRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <ApolloProvider client={apollo}>
          <ItinerarioProvider>
            <App />
          </ItinerarioProvider>
        </ApolloProvider>
      </HashRouter>
    </React.StrictMode>
  );
}

arrancar();
