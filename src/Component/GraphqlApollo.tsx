import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useQuery, gql } from '@apollo/client';

// Define the GraphQL query
const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
    }
  }
`;

export default function GraphqlApollo() {
  // Use the useQuery hook to execute the query
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <ActivityIndicator />;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <View>
      {data.users.map((user) => (
        <Text key={user.id}>{user.name}</Text>
      ))}
    </View>
  );
}
