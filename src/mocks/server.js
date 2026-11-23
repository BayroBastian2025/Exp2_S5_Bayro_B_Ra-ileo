import { setupServer } from 'msw/node';
import { handlers } from './handlers';

// Mismos handlers para las pruebas automáticas en Node.
export const server = setupServer(...handlers);
