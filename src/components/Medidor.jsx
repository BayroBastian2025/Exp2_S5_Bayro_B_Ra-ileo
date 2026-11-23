// Medidor de disponibilidad: barra proporcional a los cupos restantes.
export default function Medidor({ disponibles, capacidad, unidad }) {
  const porcentaje = Math.max(0, Math.min(100, Math.round((disponibles / capacidad) * 100)));
  const estado = disponibles === 0 ? 'agotado' : disponibles <= 3 ? 'poco' : 'normal';
  const texto = disponibles === 0 ? `Sin ${unidad} disponibles` : `${disponibles} ${unidad} disponibles`;

  return (
    <div className={`medidor medidor--${estado}`}>
      <div className="medidor__texto">
        <span>{texto}</span>
        {estado === 'poco' && <span>¡Últimos cupos!</span>}
      </div>
      <div className="medidor__pista" role="img" aria-label={`${porcentaje}% de ${unidad} libres`}>
        <div className="medidor__relleno" style={{ width: `${Math.max(porcentaje, disponibles > 0 ? 4 : 0)}%` }} />
      </div>
    </div>
  );
}
