import React from 'react';
import {View, Text, StyleSheet, Button, Image, Alert} from 'react-native';
import {useQuery, gql, useMutation} from '@apollo/client';
import {client} from '../client/client';

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

const DELETE_BOOK = gql`
  mutation DeleteBook($id: ID!) {
    deleteBook(id: $id) {
      id
    }
  }
`;

const BookDetail = ({route, navigation}) => {
  const {id} = route.params;
  const {loading, error, data} = useQuery(GET_BOOK, {variables: {id}});
  const [deleteBook] = useMutation(DELETE_BOOK, {
    onCompleted: () => {
      client.resetStore();
      navigation.goBack();
    },
    onError: error => {
      console.log('Error deleting book:', error.message);
    },
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const {title, author, publicationYear} = data?.book || {};

  const handleDelete = () => {
    deleteBook({variables: {id}});
  };
  const alert= () =>
    Alert.alert('Are you sure ?', ' you want to delete this item', [
      {
        text: 'Cancel',
        onPress:()=>{},
        style: 'cancel',
      },
      {text: 'OK', onPress:handleDelete},
    ]);
  return (
    <View style={styles.container}>
      <View style={styles.imgcontainer}>
      <Image
        style={styles.image}
        source={require('../Assets/images/open_book.webp')}
      />
      <Text style={styles.booktitle}>{title}</Text>
      </View>
      <Text style={styles.title}>Title: {title}</Text>
      <Text style={styles.author}>Author: {author}</Text>
      <Text style={styles.publicationYear}>Year: {publicationYear}</Text>
      <Button
        title="Edit"
        onPress={() => navigation.navigate('EditBook', {id})}
      />
      <Button title="Delete" onPress={alert} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000000',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'#fff'
  },
  booktitle:{
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf:'center',
    color:'#fff'
  },
  author: {
    color:'#fff',
    fontSize: 16,
    marginBottom: 5,
  },
  publicationYear: {
    fontSize: 16,
    color: '#888',
  },
  image:{
    alignSelf:'center',
    width:200,
    height:200
  },
  imgcontainer:{
    flex:.5
  }
});

export default BookDetail;
