import { gql } from '@apollo/client';

// Una sola consulta trae vuelos y hoteles del destino (ventaja de GraphQL frente a dos endpoints REST).
export const OFERTAS_DESTINO = gql`
  query OfertasDestino($destinoId: ID!) {
    ofertasDestino(destinoId: $destinoId) {
      destinoId
      vuelos {
        id
        aerolinea
        codigo
        origen
        salida
        regreso
        escalas
        duracionHoras
        precio
        cupos
        capacidad
      }
      hoteles {
        id
        nombre
        categoria
        zona
        precioNoche
        disponibleDesde
        disponibleHasta
        habitaciones
        capacidad
        etiquetas
      }
    }
  }
`;

export const GUARDAR_ITINERARIO = gql`
  mutation GuardarItinerario($input: ItinerarioInput!) {
    guardarItinerario(input: $input) {
      id
      estado
      noches
      total
    }
  }
`;
