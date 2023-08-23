import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import styles from './styles'; // Importe os estilos do arquivo styles.js

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  const [password, setPassword] = useState('');
  const [telefone, setTelefone] = useState('');

  const handleRegister = () => {
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
      <TextInput
        placeholder="Telefone"
        value={telefone}
        onChangeText={setTelefone}
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
          onPress={handleRegister}
        />
      </View>

    </View>
  );
};

export default RegisterScreen;
