import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import api from '../../service/api';
import { useNavigation } from '@react-navigation/native';
import { StackTypes } from '../../routes/StackNavigation';

const AddStoreScreen = () => {
  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [contato, setContato] = useState('');

  const navigation = useNavigation<StackTypes>()

  const navigationRegister = () => {
    navigation.navigate('CreatePost')
  }

  const handleAddStore = async () => {
    try {
      const response = await api.post('/criar-loja', {
        nome,
        endereco,
        contato
      });

      console.log('Resposta do backend:', response.data);
    } catch (error) {
      console.error('Erro ao cadastrar loja:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Loja</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome da Loja"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Endereço da Loja"
        value={endereco}
        onChangeText={setEndereco}
      />
      <TextInput
        style={styles.input}
        placeholder="Contato da Loja"
        value={contato}
        onChangeText={setContato}
      />
      <Button title="Adicionar Loja" onPress={handleAddStore} />

      <TouchableOpacity onPress={navigationRegister} style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Trocar aba</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  loginButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AddStoreScreen;
