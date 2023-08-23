import * as React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from '../screens/register/register';
import LoginScreen from '../screens/login/LoginScreen';
import AddStoreScreen from '../screens/storeScreen/AddStoreScreen';
import AddProductScreen from '../screens/produtoScreen/AddProductScreen';
import CreatePostScreen from '../screens/home-faxineiro/createPost';

const Stack = createStackNavigator();

type StackNavigation = {
  Register: undefined;
  Login: undefined;
};

export type StackTypes = StackNavigationProp<StackNavigation>;

export function StackNavigationComponent() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName="Login">
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="CreatePost" component={CreatePostScreen} />
        <Stack.Screen name="CreateStore" component={AddStoreScreen} />
        <Stack.Screen name="CreateProducts" component={AddProductScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
