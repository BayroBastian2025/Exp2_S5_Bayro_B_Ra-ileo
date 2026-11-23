import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { construirUrl } from './url';

export const crearApollo = () =>
  new ApolloClient({
    link: new HttpLink({ uri: construirUrl('graphql') }),
    cache: new InMemoryCache(),
  });
