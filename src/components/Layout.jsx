import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';

export default function Layout() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="app">
      <Navbar />
      <main className="contenedor principal">
        <Outlet />
      </main>
      <footer className="pie">Nómade · Planificador de viajes · Desarrollo Frontend II (PFY2202)</footer>
    </div>
  );
}
