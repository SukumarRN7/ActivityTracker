import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import useActivity from '../../hooks/useActivity';

const AddActivityScreen = () => {
  const {addActivity} = useActivity();
  const [activityName, setActivityName] = useState('');

  const _addActivity = () => {
    addActivity(activityName);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Activity</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter activity name"
        value={activityName}
        onChangeText={text => setActivityName(text)}
      />
      <TouchableOpacity style={styles.addButton} onPress={_addActivity}>
        <Text style={styles.addButtonText}>Add Activity</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    color: '#000000',
  },
  addButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default AddActivityScreen;
