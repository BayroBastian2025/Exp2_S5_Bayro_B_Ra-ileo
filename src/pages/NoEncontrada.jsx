import { Link } from 'react-router-dom';
import EstadoVacio from '../components/EstadoVacio';

export default function NoEncontrada() {
  return (
    <EstadoVacio icono="🗺️" titulo="Error 404: ruta no encontrada" texto="La página que buscas no existe o fue movida.">
      <Link to="/" className="boton">Volver al inicio</Link>
    </EstadoVacio>
  );
}
