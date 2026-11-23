export default function EstadoVacio({ icono = '🧳', titulo, texto, children }) {
  return (
    <div className="estado">
      <span className="estado__icono" aria-hidden="true">{icono}</span>
      <h2>{titulo}</h2>
      {texto && <p>{texto}</p>}
      {children}
    </div>
  );
}
