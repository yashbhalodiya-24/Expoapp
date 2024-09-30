import { ApolloProvider } from '@apollo/client/react';
import React from 'react';
import GraphqlApollo from '../Component/GraphqlApollo';
// import client from './ApolloClient'; // Adjust the import based on your file location
// A sample component where you'll query data

import client from '../../ApolloClient';


export default function Graphql() {
  return (
    <ApolloProvider client={client}>
    <GraphqlApollo/>
    </ApolloProvider>
  );
}
