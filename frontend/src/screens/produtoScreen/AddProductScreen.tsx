import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import api from '../../service/api'; 
import { useNavigation } from '@react-navigation/native';
import { StackTypes } from '../../routes/StackNavigation';

const AddProductScreen = () => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');

  const navigation = useNavigation<StackTypes>()

  const navigationRegister = () => {
    navigation.navigate('CreatePost')
  }

  const handleAddProduct = async () => {
    try {
      const response = await api.post('/cadastrar-produto', {
        nome,
        descricao,
        preco: parseFloat(preco),
        lojaId: 1, 
      });

      console.log('Produto cadastrado:', response.data);
    } catch (error) {
      console.error('Erro ao cadastrar produto:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Produto</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do Produto"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição do Produto"
        value={descricao}
        onChangeText={setDescricao}
      />
      <TextInput
        style={styles.input}
        placeholder="Preço do Produto"
        value={preco}
        onChangeText={setPreco}
        keyboardType="numeric"
      />
      <Button title="Adicionar Produto" onPress={handleAddProduct} />

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

export default AddProductScreen;
