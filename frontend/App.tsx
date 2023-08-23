import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import RegisterScreen from './src/screens/register/register';
import LoginScreen from './src/screens/login/LoginScreen';
import AddProductScreen from './src/screens/produtoScreen/AddProductScreen';
import CreatePostScreen from './src/screens/home-faxineiro/createPost';
import AddStoreScreen from './src/screens/storeScreen/AddStoreScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <AddStoreScreen/>
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
