import {StyleSheet} from "react-native";

export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 7,
    width: '100%',
    marginTop: 10,
  },
  photoContainer: {
    width: '90%',
    backgroundColor: 'white',
    borderColor: 'black',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: {
      height: 1,
      width: 1,
    },
  },
  photo: {
    marginTop: 10,
    backgroundColor: 'black',
    height: 150,
    width: '90%',
    alignSelf: 'center',
  },
  icon: {
    width: 80,
    height: 80,
    marginTop: 25,
    marginHorizontal: 30,
  },
  userText: {
    marginHorizontal: 5,
    justifyContent: 'center',
    alignContent: 'center',
    padding: 3,
    fontSize: 11,
  },
});
