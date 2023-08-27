// styles.ts
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#4CAF9D',

  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  inputWhiteBackground: {
    backgroundColor: 'white',
  },
  buttonContainer: {
    paddingBottom:10,
    paddingTop:10,
    width: '80%',
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
  },
});

export default styles;
