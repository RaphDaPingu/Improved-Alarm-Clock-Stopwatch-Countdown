import React, {useState} from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import AddAlarmForm from '../add-alarm-form/AddAlarmForm';
import styles from './addalarmbutton.style';

const AddAlarmButton = ({setAlarms, fetchAlarms}) => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Modal visible={isFormVisible} animationType="slide">
        <AddAlarmForm setAlarms={setAlarms} fetchAlarms={fetchAlarms} setIsFormVisible={setIsFormVisible} />
      </Modal>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setIsFormVisible(true)}
      >
        <View>
          <Text style={styles.addButtonText}>Add Alarm</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
};

export default AddAlarmButton;
