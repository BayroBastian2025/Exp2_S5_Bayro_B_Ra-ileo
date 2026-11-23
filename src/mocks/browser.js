import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

// Service Worker de MSW: intercepta fetch en el navegador y responde con los handlers.
export const worker = setupWorker(...handlers);
