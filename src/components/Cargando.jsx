export default function Cargando({ texto = 'Cargando…' }) {
  return (
    <div className="estado" role="status">
      <span className="cargador" aria-hidden="true" />
      <p>{texto}</p>
    </div>
  );
}
