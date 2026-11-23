// Botón reutilizable. variante: "primario" (por defecto), "borde" o "elegido".
const VARIANTES = { primario: '', borde: 'boton--borde', elegido: 'boton--elegido' };

export default function Boton({ variante = 'primario', bloque = false, className = '', type = 'button', children, ...resto }) {
  const clases = ['boton', VARIANTES[variante], bloque && 'boton--bloque', className].filter(Boolean).join(' ');
  return (
    <button type={type} className={clases} {...resto}>
      {children}
    </button>
  );
}
