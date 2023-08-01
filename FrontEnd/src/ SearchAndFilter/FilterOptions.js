
import {View, Text, TextInput, StyleSheet} from 'react-native';

const FilterOptions = ({
  filterYear,
  filterAuthor,
  onFilterYear,
  onFilterAuthor,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.filterItem}>
        <Text style={styles.filterLabel}>Filter by Year:</Text>
        <TextInput
          style={styles.filterInput}
          placeholder="Enter year..."
          value={filterYear}
          onChangeText={onFilterYear}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.filterItem}>
        <Text style={styles.filterLabel}>Filter by Author:</Text>
        <TextInput
          style={styles.filterInput}
          placeholder="Enter author name..."
          value={filterAuthor}
          onChangeText={onFilterAuthor}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  filterItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  filterInput: {
    flex: 0.5,
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 5,
  },
  filterLabel: {
    flex: 0.5,
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default FilterOptions;
