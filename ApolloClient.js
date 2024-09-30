import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://products.prod.svc.cluster.local:4001/graphql', // Replace with your GraphQL server URL
  cache: new InMemoryCache(),
});

export default client;
