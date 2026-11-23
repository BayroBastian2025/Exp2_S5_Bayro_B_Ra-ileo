import { obtenerDestino, obtenerDestinos } from '../api/rest';
import useFetch from './useFetch';

export const useDestinos = (region = '') => useFetch((opciones) => obtenerDestinos(region, opciones), [region]);
export const useDestino = (id) => useFetch((opciones) => obtenerDestino(id, opciones), [id]);
