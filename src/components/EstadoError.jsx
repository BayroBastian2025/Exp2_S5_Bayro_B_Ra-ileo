import Boton from './Boton';

export default function EstadoError({ mensaje, onReintentar }) {
  return (
    <div className="estado estado--error" role="alert">
      <span className="estado__icono" aria-hidden="true">⚠️</span>
      <h2>No pudimos completar la operación</h2>
      <p>{mensaje}</p>
      {onReintentar && <Boton variante="borde" onClick={onReintentar}>Reintentar</Boton>}
    </div>
  );
}
