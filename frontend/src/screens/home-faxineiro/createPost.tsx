import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
//import axios from 'axios';
import styles from './styles'; 

const CreatePostScreen = () => {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [horarios, setHorarios] = useState('');
  const [faxineiroId, setFaxineiroId] = useState('');

  /*
  const handleCreatePost = async () => {
    const postagem = {
      titulo,
      descricao,
      preco,
      horarios,
      faxineiroId,
    };

    try {
      const response = await axios.post('URL_DA_API_PARA_CRIAR_POSTAGEM', postagem);
      console.log(response.data); 
    } catch (error) {
      console.error('Erro ao criar postagem:', error);
    }
  };
*/
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
        />
      </View>
  

    </View>
  );
};

export default CreatePostScreen;
