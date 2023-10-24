import React from 'react';
import { ApolloClient, InMemoryCache } from '@apollo/client';

const API_URL = process.env.EXPO_PLUBIC_API_BASE_URL;
const client = new ApolloClient({
  uri: `http://localhost:3000/graphql`,
  cache: new InMemoryCache()
});

export default client;

