import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'flex-start', // Align to the top
      marginVertical: 80,
      marginBottom: 50
    },
    touchableOpacity: {
      marginHorizontal: 30, // Adjust the margin as per your preference for the gap between images
    },
    btnImg: {
      width: 25, // Adjust the width as needed
      height: 25, // Adjust the height as needed
    },
    btnImgAlarmClock: {
      width: 30, // Adjust the width as needed
      height: 30, // Adjust the height as needed
      marginVertical: -3
    },
  });

export default styles;
