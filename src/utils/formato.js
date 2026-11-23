const moneda = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 });
export const dinero = (valor) => moneda.format(valor);

export const fecha = (iso) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString('es-CL', { day: '2-digit', month: 'short', year: 'numeric' });

export const diasEntre = (desde, hasta) =>
  Math.max(1, Math.round((new Date(`${hasta}T12:00:00`) - new Date(`${desde}T12:00:00`)) / 86400000));

export const horas = (valor) => `${valor} h`;
