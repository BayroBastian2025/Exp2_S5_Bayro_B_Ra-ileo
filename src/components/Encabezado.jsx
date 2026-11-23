export default function Encabezado({ titulo, texto, children }) {
  return (
    <header className="encabezado">
      <div>
        <h1>{titulo}</h1>
        {texto && <p>{texto}</p>}
      </div>
      {children}
    </header>
  );
}
