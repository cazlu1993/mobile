import React from 'react';
import { ApolloClient, InMemoryCache } from '@apollo/client';

const API_URL = process.env.EXPO_PLUBIC_API_BASE_URL;
const client = new ApolloClient({
  uri: `http://${API_URL}/graphql`,
  cache: new InMemoryCache()
});

export default client;

