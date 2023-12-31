// styles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4CAF9D',

  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    paddingBottom:10,
    paddingTop:10,
    width: '80%',
  },
  inputWhiteBackground: {
    backgroundColor: 'white', 
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  }
});

export default styles;
