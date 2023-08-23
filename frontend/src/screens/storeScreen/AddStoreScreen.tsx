import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import api from '../../service/api';

const AddStoreScreen = () => {
  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [contato, setContato] = useState('');

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
});

export default AddStoreScreen;
