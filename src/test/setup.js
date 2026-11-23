import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterAll, afterEach, beforeAll } from 'vitest';
import { reiniciarMock } from '../mocks/handlers';
import { server } from '../mocks/server';

window.scrollTo = () => {}; // jsdom no implementa scrollTo

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => {
  cleanup();
  server.resetHandlers();
  reiniciarMock();
  localStorage.clear();
});
afterAll(() => server.close());
