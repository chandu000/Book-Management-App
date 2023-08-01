import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

const SearchBar = ({searchQuery, onSearch}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search by title or author..."
        value={searchQuery}
        onChangeText={onSearch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
  },
  input: {
    flex: 1,
    height: 34,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
});

export default SearchBar;
