import {StyleSheet} from "react-native";

export default StyleSheet.create({
  container: {
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'row-reverse',
  },
  photo: {
    height: 140,
    marginBottom: 3,
  },
  icon: {
    width: 80,
    height: 80,
    marginTop: 25,
    marginHorizontal: 30,
  },
  swipeButton: {
    width: 75,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFA500',
    marginBottom: -3,
  },
});
