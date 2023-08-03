import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
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

            <View style={styles.yearView}>
            <Text style={styles.text}>Published on year:  </Text>
            <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.yearButton}>{selectedDate}</Text>
            </TouchableOpacity>
            </View>
            {showDatePicker && (
              <DateTimePicker
                value={new Date(selectedDate, 0)}
                themeVariant='dark'
                mode="date"
                display='default'
                onChange={handleDateChange(handleChange('publicationYear'))}
              />
            )}
            {touched.publicationYear && errors.publicationYear && (
              <Text style={styles.error}>{errors.publicationYear}</Text>
            )}
            <View>
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.text}>Submit</Text>
            </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    padding: 20,
    backgroundColor:'#000000',
    flexDirection:'column'
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius:10,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  error: {
    color: 'red',
    marginBottom: 5,
  },
  yearView:{
    alignItems:'baseline',
    flexDirection:'row',
  },
  yearButton:{
    color:'#007AFF',
    fontSize:18,
    marginTop:5,
    alignSelf:'center'
  },
  submitButton:{
    height:25,
    width:75,
    marginTop:30,
    alignSelf:'center',
    borderRadius:8,
    backgroundColor:'#FDAE37',
    justifyContent:'center',
    alignItems:'center'
  },
  text:{
    fontWeight:'bold',
    fontSize:18,
    color:'#fff'
  }
  
});

export default BookForm;
