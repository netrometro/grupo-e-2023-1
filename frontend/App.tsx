import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import RegisterScreen from './src/screens/register/register';
import LoginScreen from './src/screens/login/LoginScreen';
import AddProductScreen from './src/screens/produtoScreen/AddProductScreen';
import CreatePostScreen from './src/screens/home-faxineiro/createPost';
import { StackNavigationComponent } from './src/routes/StackNavigation';

export default function App() {
  return (
      <StackNavigationComponent/>
  );
}
