import { StyleSheet } from 'react-native';
import { Text, View } from '../../components/Themed';
import LoginScreen from '../../screens/LoginScreen';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <LoginScreen /> {/* Substitua pelo componente da tela de login */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
