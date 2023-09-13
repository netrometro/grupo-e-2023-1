import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { StackTypes } from '../../routes/StackNavigation';
import styles from './styles';
import api from '../../service/api';

export default function LoginScreen() {

  const navigation = useNavigation<StackTypes>()

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const navigationHome = () => {
    navigation.navigate('CreatePost')
  }

  const navigationRegister = () => {
    navigation.navigate('Register')
  }

  const login = async () => {
    try {
      const response = await api.post('/faxineirosLogin', {
        email,
        senha,
      });

      if (response.status === 200) {
        const responseData = response.data;

        console.log('Login bem-sucedido:', responseData);
        navigationHome();
      } else {
        alert("Erro ao fazer Login, credenciais inválidas")
        console.error('Erro ao efetuar login');
      }
    } catch (error) {
      alert("Erro ao fazer Login, credenciais inválidas")
      console.error('Erro ao efetuar login:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Clean Connect</Text>
      <TextInput
        style={[styles.input, styles.inputWhiteBackground]}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}


        
      />
      <TextInput
        style={[styles.input, styles.inputWhiteBackground]}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}


      />

      <View style={styles.buttonContainer}>
        <Button
          title="Ir para login"
        />
      </View>


      <View style={styles.buttonContainer}>
        <Button
          title="Logar"
          onPress={login}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Ir para Registro"
          onPress={navigationRegister}
        />
      </View>

    </View>
  );
}

;

