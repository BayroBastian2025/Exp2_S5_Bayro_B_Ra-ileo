export default function Estrellas({ cantidad }) {
  return (
    <span className="estrellas" role="img" aria-label={`Categoría de ${cantidad} estrellas`}>
      {'★'.repeat(cantidad)}
      {'☆'.repeat(5 - cantidad)}
    </span>
  );
}
