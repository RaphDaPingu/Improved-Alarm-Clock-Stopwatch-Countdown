import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50', // Green color, you can change it
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  iconContainer: {
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  timeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  labelText: {
    fontSize: 14,
    color: 'white',
  },
});

export default styles;
