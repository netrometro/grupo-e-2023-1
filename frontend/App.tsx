import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import RegisterScreen from './src/screens/register/register';
import CreatePostScreen from './src/screens/home-faxineiro/createPost';

export default function App() {
  return (
    <View style={styles.container}>
      <CreatePostScreen/>
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
