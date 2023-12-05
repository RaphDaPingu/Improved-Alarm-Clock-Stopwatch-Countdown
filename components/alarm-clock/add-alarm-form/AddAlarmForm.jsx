import React, { useEffect, useState } from 'react';
import { View, Button, Alert, Text, ScrollView } from 'react-native';
import styles from './addalarmform.style';
import axios from 'axios';
import WheelPicker from 'react-native-wheely';
import {Audio} from 'expo-av';

const AddAlarmForm = ({fetchAlarms, setIsFormVisible}) => {
  const sound = new Audio.Sound();

  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

  const [currentTime, setCurrentTime] = useState({
    hours: null,
    minutes: null,
    seconds: null
  });

  useEffect(() => {
    // Function to get current time
    const getCurrentTime = () => {
      const currentDate = new Date();

      const hours = currentDate.getHours();
      const minutes = currentDate.getMinutes();
      const seconds = currentDate.getSeconds();

      return { hours, minutes, seconds };
    };

    // Set initial time when component mounts
    setCurrentTime(getCurrentTime());
  }, []); // Empty dependency array ensures this effect runs only once

  const optionsHours = generateOptions(23);
  const optionsMinutesSeconds = generateOptions(59);

  const HOURS = Array(24)
    .fill(0)
    .map((_, index) => {
      return {
        value: index,
        label: index < 10 ? "0" + index : index
      };
    });

  const handleSubmit = async () => {
    if (!hours || !minutes || !seconds) {
      Alert.alert('Error', 'Please enter all fields');
      return;
    }

    const formattedTime = `${hours}:${minutes}:${seconds}`;
    console.log(formattedTime);

    try {
      // Fetch existing alarms from the server
      const response = await axios.get('http://10.100.102.16:3000/alarmClocks');
      const existingAlarms = response.data;

      // Check if the formatted time already exists
      const isDuplicate = existingAlarms.some(alarm => alarm.time === formattedTime);

      if (isDuplicate) {
        Alert.alert('Error', `Alarm for ${formattedTime} already exists`);
      }
      
      else {
        // Make a POST request to append the formattedTime to the alarmClocks array
        await axios.post('http://10.100.102.16:3000/alarmClocks', {
          "time": formattedTime
        });

        Alert.alert('Success', `Alarm set for ${formattedTime}`);

        // Clear input fields after submission
        setHours('');
        setMinutes('');
        setSeconds('');

        setIsFormVisible(false);
        fetchAlarms();
      }
    } catch (error) {
      console.error('Error adding alarm:', error);
      Alert.alert('Error', 'Failed to add alarm. Please try again.');
    }
  };

  const handleClose = () => {
    setIsFormVisible(false);
  }

  function generateOptions(count) {
    const options = [];
    for (let i = 0; i <= count; i++) {
      const formattedNumber = i < 10 ? `0${i}` : `${i}`;
      options.push(formattedNumber);
    }
    return options;
  }

  const playSound = async () => {
    sound.setOnPlaybackStatusUpdate(async (status) => {
      if (status.didJustFinish) {
        // The sound has finished playing, unload it to release resources
        await sound.unloadAsync();
      }
    });
  
    // Check if the sound is already loaded or loading
    if (sound._loaded === false && sound._loading === false) {
      // Load and play the sound
      await sound.loadAsync(require("../../../assets/sounds/pick-sound.mp3"));
      await sound.playAsync();
    }
  }

  // Conditional rendering based on whether currentTime is set
  if (currentTime.hours == null && currentTime.minutes == null && currentTime.seconds == null) {
    return null; // Or loading indicator or any other placeholder
  }

  return (
    <View style={styles.container}>
      <View style={styles.pickerRow}>
        <WheelPicker
          selectedIndex={optionsHours[currentTime.hours]}
          options={optionsHours}
          onChange={(index) => {setHours(optionsHours[index]); playSound();}}
        />
        <WheelPicker
          selectedIndex={optionsMinutesSeconds[currentTime.minutes]}
          options={optionsMinutesSeconds}
          onChange={(index) => {setMinutes(optionsMinutesSeconds[index]); playSound();}}
        />
        <WheelPicker
          selectedIndex={optionsMinutesSeconds[currentTime.seconds]}
          options={optionsMinutesSeconds}
          onChange={(index) => {setSeconds(optionsMinutesSeconds[index]); playSound();}}
        />
      </View>
      <Button title="Submit" color="green" onPress={handleSubmit} />
      <Text></Text>
      <Button title="Close" color="red" onPress={handleClose} />
    </View>
  );
};

export default AddAlarmForm;
