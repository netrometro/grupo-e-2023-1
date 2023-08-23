import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import styles from './styles'; 
import api from '../../service/api'
import { useNavigation } from '@react-navigation/native';
import { StackTypes } from '../../routes/StackNavigation';


const CreatePostScreen = () => {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [horarios, setHorarios] = useState('');
  const [faxineiroId, setFaxineiroId] = useState('');

  const navigation = useNavigation<StackTypes>()

  const navigationRegister = () => {
    navigation.navigate('Register')
  }
  const navigationLogin = () => {
    navigation.navigate('Login')
  }

  const navigationProduto = () => {
    navigation.navigate('CreateProducts')
  }

  const navigationStore = () => {
    navigation.navigate('CreateStore')
  }
  
  const handleCreatePost = async () => {
    const postagem = {
      titulo,
      descricao,
      preco: parseFloat(preco), // Converte para número
      horarios,
      faxineiroId:parseFloat(faxineiroId),
    };
    console.log(postagem)

    try {
      const response = await api.post(`faxineiros/${faxineiroId}/postagens`, postagem);
      console.log(response.data); 
    } catch (error) {
      console.error('Erro ao criar postagem:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Nova Postagem</Text>
      <TextInput
        placeholder="Título"
        value={titulo}
        onChangeText={setTitulo}
        style={[styles.input, styles.inputWhiteBackground]}
      />
      <TextInput
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
        style={[styles.input, styles.inputWhiteBackground]}
      />
      <TextInput
        placeholder="Preço"
        value={preco}
        onChangeText={setPreco}
        style={[styles.input, styles.inputWhiteBackground]}
      />
      <TextInput
        placeholder="Horários"
        value={horarios}
        onChangeText={setHorarios}
        style={[styles.input, styles.inputWhiteBackground]}
      />
      <TextInput
        placeholder="ID do Faxineiro"
        value={faxineiroId}
        onChangeText={setFaxineiroId}
        style={[styles.input, styles.inputWhiteBackground]}
      />

<View style={styles.buttonContainer}>
        <Button
          title="Visualizar Postagens"
        />
      </View>
      
      <View style={styles.buttonContainer}>
        <Button
          title="Criar Postagem"
          onPress={handleCreatePost}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Ir para cadastro"
          onPress={navigationRegister}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Ir para login"
          onPress={navigationLogin}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Ir para pagina de produto"
          onPress={navigationProduto}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Ir para pagina da loja"
          onPress={navigationStore}
        />
      </View>
  

    </View>
  );
};

export default CreatePostScreen;
