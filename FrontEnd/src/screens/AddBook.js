import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useMutation, gql} from '@apollo/client';
import {client} from '../client/client';
import BookForm from '../forms/BookForm';

const ADD_BOOK = gql`
  mutation AddBook($title: String!, $author: String!, $publicationYear: Int!) {
    createBook(
      title: $title
      author: $author
      publicationYear: $publicationYear
    ) {
      id
      title
      author
      publicationYear
    }
  }
`;

const AddBook = ({navigation}) => {
  const [addBook] = useMutation(ADD_BOOK, {
    onCompleted: () => {
      client.resetStore();
      navigation.goBack();
    },
    onError: error => {
      console.log('Error adding book:', error.message);
    },
  });

  const handleSubmit = values => {
    addBook({
      variables: {
        title: values.title,
        author: values.author,
        publicationYear: parseInt(values.publicationYear),
      },
    });
  };

  return (
    <View style={styles.container}>
      <BookForm
        initialValues={{
          title: '',
          author: '',
          publicationYear: new Date().getFullYear(),
        }}
        onSubmit={handleSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
});

export default AddBook;
