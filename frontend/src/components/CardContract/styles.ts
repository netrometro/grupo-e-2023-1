import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 3,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    paddingHorizontal: 5,
  },
  editButton: {
    marginTop: 10,
  },
});


export default styles;
