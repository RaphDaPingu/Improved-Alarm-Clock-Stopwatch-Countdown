import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TouchableHighlight, Image } from 'react-native';
import styles from './header.style'
import { icons } from '../../constants';

const Header = ({onIconPress}) => {
  const [alarmClockPressed, setAlarmClockPressed] = useState(true);
  const [stopWatchPressed, setStopWatchPressed] = useState(false);
  const [countDownPressed, setCountDownPressed] = useState(false);

  const handlePress = (icon) => {
    let newAlarmClockPressed = alarmClockPressed;
    let newStopWatchPressed = stopWatchPressed;
    let newCountDownPressed = countDownPressed;

    switch (icon) {
      case 'alarmClock':
        newAlarmClockPressed = true;
        newStopWatchPressed = false;
        newCountDownPressed = false;
        break;
      case 'stopWatch':
        newAlarmClockPressed = false;
        newStopWatchPressed = true;
        newCountDownPressed = false;
        break;
      case 'countDown':
        newAlarmClockPressed = false;
        newStopWatchPressed = false;
        newCountDownPressed = true;
        break;

      default:
        break;
    }

    setAlarmClockPressed(newAlarmClockPressed);
    setStopWatchPressed(newStopWatchPressed);
    setCountDownPressed(newCountDownPressed);
  
    onIconPress({
      alarmClockPressed: newAlarmClockPressed,
      stopWatchPressed: newStopWatchPressed,
      countDownPressed: newCountDownPressed,
    });
  };

  return (
    <View style={styles.container}>
      <TouchableHighlight
        style={styles.touchableOpacity}
        underlayColor="transparent"
        onPress={() => handlePress("alarmClock")}
      >
        <Image
          source={icons.alarmClock}
          resizeMode="cover"
          style={[
            styles.btnImgAlarmClock,
            alarmClockPressed && { tintColor: 'blue' },
          ]}
        />
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.touchableOpacity}
        underlayColor="transparent"
        onPress={() => handlePress("stopWatch")}
      >
        <Image
          source={icons.stopWatch}
          resizeMode="cover"
          style={[
            styles.btnImg,
            stopWatchPressed && { tintColor: 'blue' },
          ]}
        />
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.touchableOpacity}
        underlayColor="transparent"
        onPress={() => handlePress("countDown")}
      >
        <Image
          source={icons.countDown}
          resizeMode="cover"
          style={[
            styles.btnImg,
            countDownPressed && { tintColor: 'blue' },
          ]}
        />
      </TouchableHighlight>
    </View>
  );
};

export default Header;