import React, {useMemo, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {useQuery, gql, useMutation} from '@apollo/client';
import SearchBar from '../ SearchAndFilter/SearchBar';
import FilterOptions from '../ SearchAndFilter/FilterOptions';

const GET_BOOKS = gql`
  query GetBooks {
    books {
      id
      title
      author
      publicationYear
    }
  }
`;
const BookList = ({navigation}) => {
  const {loading, error, data} = useQuery(GET_BOOKS);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterYear, setFilterYear] = useState('');
  const [filterAuthor, setFilterAuthor] = useState('');

  const filteredData = useMemo(
    () =>
      data?.books?.filter(book =>
        !(filterAuthor || filterYear || searchQuery)
          ? true
          : (filterAuthor && book?.author?.includes(filterAuthor)) ||
            (filterYear &&
              book?.publicationYear.toString().includes(filterYear)) ||
            (searchQuery &&
              (book?.author?.includes(searchQuery) ||
                book?.title?.includes(searchQuery))),
      ),
    [data, searchQuery, filterAuthor, filterYear],
  );

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;
  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate('BookDetail', {id: item.id})}>
      <Image
        style={styles.image}
        source={require('../Assets/images/closed_book.png')}
      />
      <View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.author}>Author: {item.author}</Text>
        <Text style={styles.publicationYear}>Year: {item.publicationYear}</Text>
      </View>
    </TouchableOpacity>
  );
  
  return (
    <View style={styles.container}>
      <SearchBar searchQuery={searchQuery} onSearch={setSearchQuery} />
      <FilterOptions
        filterYear={filterYear}
        filterAuthor={filterAuthor}
        onFilterYear={setFilterYear}
        onFilterAuthor={setFilterAuthor}
      />
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContent}></FlatList>
      <TouchableOpacity
        style={styles.addbutton}
        onPress={() => navigation.navigate('AddBook')}>
        <Text style={styles.addbuttonField}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  listContent: {
    justifyContent: 'space-between',
    
  },

  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#000000',
    flexDirection: 'row',
    backgroundColor: '#FDAE37',
    borderRadius:10,
    marginBottom:10
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color:'#fff'
  },
  author: {
    marginTop: 5,
    color:'#fff'
  },
  publicationYear: {
    marginTop: 5,
    color: '#fff',
  },
  image: {
    height: 65,
    width: 65,
    resizeMode: 'cover',
    marginRight: 10,
    borderRadius: 5,
  },
  addbutton: {
    width: 50,
    height: 50,
    borderRadius: 60,
    marginVertical: 25,
    marginHorizontal: '85%',
    backgroundColor: '#FDAE37',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addbuttonField:{
    fontSize: 30,
    color:'#fff',
    fontWeight:'bold'
  }
});

export default BookList;
