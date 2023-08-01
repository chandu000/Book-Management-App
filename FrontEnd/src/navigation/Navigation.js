import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ApolloProvider } from '@apollo/client';
import BookList from '../screens/BookList';
import BookDetail from '../screens/BookDetails';
import AddBook from '../screens/AddBook';
import EditBook from '../screens/EditBook';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <ApolloProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="BookList">
          <Stack.Screen name="BookList" component={BookList} options={{ title: 'Books' }} />
          <Stack.Screen name="BookDetail" component={BookDetail} options={{ title: 'Book Details' }} />
          <Stack.Screen name="AddBook" component={AddBook} options={{ title: 'Add Book' }} />
          <Stack.Screen name="EditBook" component={EditBook} options={{ title: 'Edit Book' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default Navigation;
