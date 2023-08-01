import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import DateTimePicker from '@react-native-community/datetimepicker';

const validationSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  author: yup.string().required('Author is required'),
  publicationYear: yup.string().required('Publication Year is required'),
});

const BookForm = ({initialValues, onSubmit}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    initialValues.publicationYear,
  );

  const handleDateChange = handleChange => (event, selected) => {
    setShowDatePicker(false);
    console.log(selected, selected.getFullYear());
    if (selected) {
      handleChange(`${selected.getFullYear()}`);

      setSelectedDate(selected.getFullYear());
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}>
      {({handleChange, handleSubmit, values, errors, touched}) => (
        <KeyboardAvoidingView>
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter Title"
              onChangeText={handleChange('title')}
              value={values.title}
              onBlur={() => {}}
            />
            {touched.title && errors.title && (
              <Text style={styles.error}>{errors.title}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="Enter Author"
              onChangeText={handleChange('author')}
              value={values.author}
              onBlur={() => {}}
            />
            {touched.author && errors.author && (
              <Text style={styles.error}>{errors.author}</Text>
            )}

            <Button
              title={`published on : ${selectedDate}`}
              onPress={() => setShowDatePicker(true)}
            />
            {showDatePicker && (
              <DateTimePicker
                value={new Date(selectedDate, 0)}
                mode="date"
                display='default'
                onChange={handleDateChange(handleChange('publicationYear'))}
              />
            )}
            {touched.publicationYear && errors.publicationYear && (
              <Text style={styles.error}>{errors.publicationYear}</Text>
            )}

            <Button title="Submit" onPress={handleSubmit} />
          </View>
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    padding: 20,
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  error: {
    color: 'red',
    marginBottom: 5,
  },
});

export default BookForm;
