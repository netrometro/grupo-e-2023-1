import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import styles from './styles'; // Importe os estilos do arquivo styles.js
import api from '../../service/api';
import { useNavigation } from '@react-navigation/native';
import { StackTypes } from '../../routes/StackNavigation';

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  const [password, setPassword] = useState('');
  const [telefone, setTelefone] = useState('');

  const navigation = useNavigation<StackTypes>()

  const navigationHome = () => {
    navigation.navigate('CreatePost')
  }

  const navigationLogin = () => {
    navigation.navigate('Login')
  }

  const handleRegisterFornecedor = async () => {
    try {
      const response = await api.post('/faxineiros', {
        email,
        nome,
        senha: password,
      });

  if (response.status === 200) {
    const responseData = response.data;
    
    console.log('Fornecedor registrado:', responseData);
    navigationHome();
  } else {
    console.error('Erro ao registrar fornecedor');
  }
} catch (error) {
  console.error('Erro ao realizar o registro:', error);
}
};

  const handleRegister = async () => {
        try {
          const response = await api.post('/faxineiros', {
            email,
            nome,
            senha: password,
          });

      if (response.status === 200) {
        const responseData = response.data;
        
        console.log('Faxineiro registrado:', responseData);
        navigationHome();
      } else {
        console.error('Erro ao registrar faxineiro');
      }
    } catch (error) {
      console.error('Erro ao realizar o registro:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Clean Connect</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={[styles.input, styles.inputWhiteBackground]}
      />
      <TextInput
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
        style={[styles.input, styles.inputWhiteBackground]}
      />
      <TextInput
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={[styles.input, styles.inputWhiteBackground]} 
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Registrar como Faxineiro(Usuário)"
          onPress={handleRegister}
        />
      </View>
      
      <View style={styles.buttonContainer}>
        <Button
          title="Registrar como Fornecedor"
          onPress={handleRegisterFornecedor}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Ir para login"
          onPress={navigationLogin}
        />
      </View>

    </View>
  );
};
export default RegisterScreen;
