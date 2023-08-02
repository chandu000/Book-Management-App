import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useMutation, gql, useQuery} from '@apollo/client';
import {client} from '../client/client';
import BookForm from '../forms/BookForm';

const GET_BOOK = gql`
  query GetBook($id: ID!) {
    book(id: $id) {
      id
      title
      author
      publicationYear
    }
  }
`;

const UPDATE_BOOK = gql`
  mutation UpdateBook(
    $id: ID!
    $title: String
    $author: String
    $publicationYear: Int
  ) {
    updateBook(
      id: $id
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

const EditBook = ({route, navigation}) => {
  const {id} = route.params;
  const {loading, error, data} = useQuery(GET_BOOK, {variables: {id}});
  const [updateBook] = useMutation(UPDATE_BOOK, {
    onCompleted: () => {
      client.resetStore();
      navigation.goBack();
    },
    onError: error => {
      console.log('Error updating book:', error.message);
    },
  });

  const handleSubmit = values => {
    updateBook({
      variables: {
        id,
        title: values.title,
        author: values.author,
        publicationYear: parseInt(values.publicationYear),
      },
    });
  };

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <View style={styles.container}>
      <BookForm initialValues={data.book} onSubmit={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
});

export default EditBook;
