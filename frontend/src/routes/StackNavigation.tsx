import * as React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from '../screens/register/register';
import LoginScreen from '../screens/login/LoginScreen';

const Stack = createStackNavigator();

type StackNavigation = {
  Register: undefined;
  Login: undefined;
};

export type StackTypes = StackNavigationProp<StackNavigation>;

export function StackNavigationComponent() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
