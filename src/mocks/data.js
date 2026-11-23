// Base de datos simulada de "Nómade" (backend mock). Precios en pesos chilenos (CLP).

export const destinos = [
  {
    id: 'tokio', nombre: 'Tokio', pais: 'Japón', region: 'Asia', icono: '🗼', acento: '#f472b6', duracionSugerida: 10, clima: 'Templado, ideal en primavera',
    resumen: 'Una metrópolis donde conviven templos milenarios, tecnología y una gastronomía impecable.',
    actividades: ['Templo Senso-ji', 'Cruce de Shibuya', 'Mercado de Tsukiji', 'Monte Fuji'],
  },
  {
    id: 'nueva-york', nombre: 'Nueva York', pais: 'Estados Unidos', region: 'América', icono: '🗽', acento: '#60a5fa', duracionSugerida: 7, clima: 'Frío en invierno, cálido en verano',
    resumen: 'La ciudad que nunca duerme: rascacielos, Broadway y parques en cada barrio.',
    actividades: ['Central Park', 'Times Square', 'Estatua de la Libertad', 'Museo MET'],
  },
  {
    id: 'paris', nombre: 'París', pais: 'Francia', region: 'Europa', icono: '🥐', acento: '#a78bfa', duracionSugerida: 8, clima: 'Templado, ideal de abril a junio',
    resumen: 'Arte, moda y cafés en una ciudad que se recorre a pie a la orilla del Sena.',
    actividades: ['Torre Eiffel', 'Museo del Louvre', 'Montmartre', 'Paseo por el Sena'],
  },
  {
    id: 'bali', nombre: 'Bali', pais: 'Indonesia', region: 'Asia', icono: '🌺', acento: '#34d399', duracionSugerida: 12, clima: 'Tropical, temporada seca de mayo a septiembre',
    resumen: 'Terrazas de arroz, templos sobre el mar y playas para surfear o simplemente descansar.',
    actividades: ['Templo Uluwatu', 'Terrazas de Tegallalang', 'Surf en Canggu', 'Bosque de los monos'],
  },
  {
    id: 'sidney', nombre: 'Sídney', pais: 'Australia', region: 'Oceanía', icono: '🦘', acento: '#38bdf8', duracionSugerida: 10, clima: 'Cálido en nuestro verano',
    resumen: 'Bahía, playas urbanas y una ópera que es símbolo mundial.',
    actividades: ['Ópera de Sídney', 'Bondi Beach', 'Puente de la Bahía', 'Blue Mountains'],
  },
  {
    id: 'estambul', nombre: 'Estambul', pais: 'Turquía', region: 'Europa', icono: '🕌', acento: '#fb923c', duracionSugerida: 7, clima: 'Templado, mejor en primavera y otoño',
    resumen: 'Dos continentes en una sola ciudad: bazares, mezquitas y vistas al Bósforo.',
    actividades: ['Santa Sofía', 'Gran Bazar', 'Crucero por el Bósforo', 'Mezquita Azul'],
  },
  {
    id: 'marrakech', nombre: 'Marrakech', pais: 'Marruecos', region: 'África', icono: '🐪', acento: '#f87171', duracionSugerida: 6, clima: 'Seco, evita el pleno verano',
    resumen: 'Zocos, jardines y riads en el corazón de la medina, con el Atlas de fondo.',
    actividades: ['Plaza Jemaa el-Fna', 'Jardín Majorelle', 'Zocos de la medina', 'Excursión al desierto'],
  },
  {
    id: 'ciudad-del-cabo', nombre: 'Ciudad del Cabo', pais: 'Sudáfrica', region: 'África', icono: '🦁', acento: '#facc15', duracionSugerida: 9, clima: 'Cálido y seco de noviembre a marzo',
    resumen: 'Entre la Montaña de la Mesa y dos océanos, con viñedos y safaris cerca.',
    actividades: ['Montaña de la Mesa', 'Cabo de Buena Esperanza', 'Isla Robben', 'Ruta del vino'],
  },
];

const vuelo = (destinoId, n, aerolinea, codigo, salida, regreso, escalas, duracionHoras, precio, cupos, capacidad) => ({
  id: `${destinoId}-vuelo-${n}`, destinoId, aerolinea, codigo, origen: 'Santiago (SCL)', salida, regreso, escalas, duracionHoras, precio, cupos, capacidad,
});
const hotel = (destinoId, n, nombre, categoria, zona, precioNoche, disponibleDesde, disponibleHasta, habitaciones, capacidad, etiquetas) => ({
  id: `${destinoId}-hotel-${n}`, destinoId, nombre, categoria, zona, precioNoche, disponibleDesde, disponibleHasta, habitaciones, capacidad, etiquetas,
});

export const vuelos = [
  vuelo('tokio', 1, 'Air Canada', 'AC 091', '2027-03-20', '2027-03-30', 1, 26, 1390000, 12, 180),
  vuelo('tokio', 2, 'Qatar Airways', 'QR 778', '2027-04-03', '2027-04-13', 1, 29, 1285000, 4, 200),
  vuelo('tokio', 3, 'Emirates', 'EK 252', '2027-04-17', '2027-04-27', 1, 31, 1450000, 0, 220),

  vuelo('nueva-york', 1, 'LATAM', 'LA 530', '2027-02-12', '2027-02-19', 0, 11, 890000, 20, 250),
  vuelo('nueva-york', 2, 'American Airlines', 'AA 940', '2027-03-05', '2027-03-12', 0, 11, 925000, 7, 220),
  vuelo('nueva-york', 3, 'Delta', 'DL 142', '2027-04-09', '2027-04-17', 1, 14, 810000, 2, 180),

  vuelo('paris', 1, 'Air France', 'AF 401', '2027-05-06', '2027-05-14', 0, 14, 1120000, 15, 260),
  vuelo('paris', 2, 'LATAM', 'LA 704', '2027-05-20', '2027-05-28', 1, 16, 985000, 6, 200),
  vuelo('paris', 3, 'Iberia', 'IB 6840', '2027-06-03', '2027-06-11', 1, 17, 940000, 1, 180),

  vuelo('bali', 1, 'Qantas', 'QF 028', '2027-06-10', '2027-06-24', 1, 24, 1320000, 9, 190),
  vuelo('bali', 2, 'Singapore Airlines', 'SQ 034', '2027-07-01', '2027-07-15', 1, 27, 1495000, 14, 210),
  vuelo('bali', 3, 'Emirates', 'EK 363', '2027-07-20', '2027-08-03', 1, 30, 1380000, 0, 220),

  vuelo('sidney', 1, 'Qantas', 'QF 028', '2027-01-14', '2027-01-26', 0, 14, 1180000, 11, 240),
  vuelo('sidney', 2, 'LATAM', 'LA 801', '2027-02-04', '2027-02-16', 0, 14, 1095000, 3, 230),
  vuelo('sidney', 3, 'Air New Zealand', 'NZ 031', '2027-03-11', '2027-03-23', 1, 17, 1010000, 8, 200),

  vuelo('estambul', 1, 'Turkish Airlines', 'TK 800', '2027-04-22', '2027-04-29', 1, 19, 1050000, 18, 280),
  vuelo('estambul', 2, 'Qatar Airways', 'QR 774', '2027-05-14', '2027-05-21', 1, 22, 990000, 5, 200),
  vuelo('estambul', 3, 'Emirates', 'EK 248', '2027-06-02', '2027-06-09', 1, 23, 1075000, 0, 220),

  vuelo('marrakech', 1, 'Iberia', 'IB 6841', '2027-03-26', '2027-04-01', 1, 18, 1025000, 10, 170),
  vuelo('marrakech', 2, 'Royal Air Maroc', 'AT 810', '2027-04-15', '2027-04-21', 1, 20, 980000, 4, 160),
  vuelo('marrakech', 3, 'Air Europa', 'UX 044', '2027-05-07', '2027-05-13', 1, 19, 945000, 2, 180),

  vuelo('ciudad-del-cabo', 1, 'Qatar Airways', 'QR 1360', '2027-01-09', '2027-01-18', 1, 21, 1260000, 13, 200),
  vuelo('ciudad-del-cabo', 2, 'Emirates', 'EK 773', '2027-02-06', '2027-02-15', 1, 23, 1340000, 6, 220),
  vuelo('ciudad-del-cabo', 3, 'South African Airways', 'SA 223', '2027-03-13', '2027-03-22', 0, 15, 1480000, 1, 190),
];

export const hoteles = [
  hotel('tokio', 1, 'Park Hyatt Shinjuku', 5, 'Shinjuku', 320000, '2027-03-15', '2027-04-30', 5, 40, ['Vista a la ciudad', 'Spa', 'Piscina']),
  hotel('tokio', 2, 'Hotel Gracery', 4, 'Kabukicho', 132000, '2027-03-15', '2027-04-30', 11, 60, ['Desayuno', 'Wi-Fi']),
  hotel('tokio', 3, 'Cápsula Asakusa', 2, 'Asakusa', 42000, '2027-03-15', '2027-04-30', 0, 30, ['Wi-Fi', 'Cerca del metro']),

  hotel('nueva-york', 1, 'The Plaza', 5, 'Midtown', 410000, '2027-02-10', '2027-04-30', 3, 50, ['Spa', 'Gimnasio', 'Concierge']),
  hotel('nueva-york', 2, 'Hotel Hudson Yards', 4, 'Chelsea', 205000, '2027-02-10', '2027-04-30', 9, 80, ['Wi-Fi', 'Gimnasio']),
  hotel('nueva-york', 3, 'Pod Brooklyn', 3, 'Brooklyn', 98000, '2027-02-10', '2027-04-30', 14, 70, ['Wi-Fi', 'Terraza']),

  hotel('paris', 1, 'Le Meurice', 5, 'Tullerías', 520000, '2027-05-01', '2027-06-30', 2, 30, ['Desayuno', 'Spa', 'Vista al jardín']),
  hotel('paris', 2, 'Hôtel Montmartre', 4, 'Montmartre', 168000, '2027-05-01', '2027-06-30', 8, 45, ['Desayuno', 'Wi-Fi']),
  hotel('paris', 3, 'Auberge Latina', 2, 'Barrio Latino', 69000, '2027-05-01', '2027-06-30', 0, 40, ['Wi-Fi', 'Cocina compartida']),

  hotel('bali', 1, 'Four Seasons Jimbaran', 5, 'Jimbaran', 360000, '2027-06-01', '2027-08-15', 4, 35, ['Playa privada', 'Spa', 'Piscina']),
  hotel('bali', 2, 'Villa Canggu Surf', 4, 'Canggu', 95000, '2027-06-01', '2027-08-15', 7, 25, ['Piscina', 'Clases de surf']),
  hotel('bali', 3, 'Ubud Garden Homestay', 3, 'Ubud', 44000, '2027-06-01', '2027-08-15', 10, 20, ['Desayuno', 'Yoga']),

  hotel('sidney', 1, 'Shangri-La Sydney', 5, 'The Rocks', 340000, '2027-01-10', '2027-03-31', 6, 60, ['Vista a la bahía', 'Piscina', 'Spa']),
  hotel('sidney', 2, 'Bondi Beach House', 4, 'Bondi', 175000, '2027-01-10', '2027-03-31', 2, 28, ['Frente al mar', 'Wi-Fi']),
  hotel('sidney', 3, 'Central Backpackers', 2, 'Centro', 58000, '2027-01-10', '2027-03-31', 13, 70, ['Wi-Fi', 'Cocina compartida']),

  hotel('estambul', 1, 'Çırağan Palace', 5, 'Bósforo', 295000, '2027-04-20', '2027-06-15', 4, 40, ['Vista al Bósforo', 'Spa', 'Piscina']),
  hotel('estambul', 2, 'Sultanahmet Boutique', 4, 'Sultanahmet', 98000, '2027-04-20', '2027-06-15', 9, 36, ['Desayuno turco', 'Terraza']),
  hotel('estambul', 3, 'Galata Hostel', 2, 'Galata', 34000, '2027-04-20', '2027-06-15', 0, 50, ['Wi-Fi', 'Terraza']),

  hotel('marrakech', 1, 'La Mamounia', 5, 'Medina', 340000, '2027-03-20', '2027-05-15', 3, 30, ['Jardines', 'Spa', 'Piscina']),
  hotel('marrakech', 2, 'Riad Jemaa', 4, 'Medina', 89000, '2027-03-20', '2027-05-15', 6, 14, ['Desayuno', 'Patio interior']),
  hotel('marrakech', 3, 'Riad Dar Sol', 3, 'Guéliz', 52000, '2027-03-20', '2027-05-15', 5, 10, ['Wi-Fi', 'Terraza']),

  hotel('ciudad-del-cabo', 1, 'The Silo Hotel', 5, 'V&A Waterfront', 380000, '2027-01-05', '2027-03-31', 2, 28, ['Vista a la montaña', 'Spa', 'Terraza']),
  hotel('ciudad-del-cabo', 2, 'Camps Bay Lodge', 4, 'Camps Bay', 142000, '2027-01-05', '2027-03-31', 8, 24, ['Piscina', 'Desayuno']),
  hotel('ciudad-del-cabo', 3, 'Long Street Hostel', 2, 'Centro', 38000, '2027-01-05', '2027-03-31', 0, 40, ['Wi-Fi', 'Bar']),
];
