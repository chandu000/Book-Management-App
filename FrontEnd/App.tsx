import React from 'react';
import { ApolloProvider, client } from './src/client/client'; // Use the correct import
import Navigation from './src/navigation/Navigation';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Navigation />
    </ApolloProvider>
  );
};

export default App;
