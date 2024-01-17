import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const AttendanceModal = ({showModal, onClose, onSave, initialOptions}) => {
  const [selectedOptions, setSelectedOptions] = useState({
    day: false,
    night: false,
  });

  useEffect(() => {
    setSelectedOptions(initialOptions || {day: false, night: false});
  }, [initialOptions]);

  const handleCheckboxChange = option => {
    setSelectedOptions(prevOptions => ({
      ...prevOptions,
      [option]: !prevOptions[option],
    }));
  };

  const handleSave = () => {
    console.log('selectedOptions', selectedOptions);
    onSave(selectedOptions);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showModal}
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select Option</Text>
          <View style={styles.checkboxContainer}>
            <CheckBox
              value={selectedOptions.day}
              tintColor={'#a9a9a9'}
              tintColors={{true: 'blue', false: '#a9a9a9'}}
              onValueChange={() => handleCheckboxChange('day')}
            />
            <Text style={styles.checkboxLabel}>Day</Text>
          </View>
          <View style={styles.checkboxContainer}>
            <CheckBox
              value={selectedOptions.night}
              tintColor={'#a9a9a9'}
              tintColors={{true: 'blue', false: '#a9a9a9'}}
              onValueChange={() => handleCheckboxChange('night')}
            />
            <Text style={styles.checkboxLabel}>Night</Text>
          </View>
          <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '100%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  checkboxLabel: {
    fontSize: 16,
    marginLeft: 10,
  },
  saveButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default AttendanceModal;
