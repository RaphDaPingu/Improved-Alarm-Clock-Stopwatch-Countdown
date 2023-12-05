import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // You can replace this with your own icon library
import { Feather } from '@expo/vector-icons'; 
import styles from './alarm.style';

const Alarm = ({id, time, deleteAlarm}) => {
  const handleDelete = () => {
    // Call onAlarmPress with the item data
    deleteAlarm({ id });
  };

  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.iconContainer}>
        <FontAwesome name="clock-o" size={30} color="white" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.timeText}>{time}</Text>
        <Text style={styles.labelText}>Alarm</Text>
      </View>
      
      <Feather name="x" size={24} color="white" onPress={handleDelete} />
    </TouchableOpacity>
  );
};

export default Alarm;
