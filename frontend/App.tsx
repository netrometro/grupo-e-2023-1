import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import RegisterScreen from './src/screens/register/register';

export default function App() {
  return (
    <View style={styles.container}>
      <RegisterScreen/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4CAF9D',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
