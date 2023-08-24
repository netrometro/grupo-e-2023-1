import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import api from '../../service/api';
import styles from './style';
import { useNavigation } from '@react-navigation/native';
import { StackTypes } from '../../routes/StackNavigation';

const editPost = ({ route }: any) => {
  const navigation = useNavigation<StackTypes>()

  const { postId } = route.params;

  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [horarios, setHorarios] = useState('');

  const navigationHome = () => {
    navigation.navigate('CreatePost')
  }

  const handleUpdate = async () => {
    try {
      const response = await api.put(`/postagem/${postId}`, {
        titulo,
        descricao,
        preco: parseFloat(preco),
        horarios,
      });

      if (response.status === 200) {
        console.log('Postagem atualizada com sucesso:', response.data);
      } else {
        console.error('Erro ao atualizar postagem');
      }
    } catch (error) {
      console.error('Erro ao atualizar postagem:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await api.delete(`/postagem/${postId}`);

      if (response.status === 200) {
        navigationHome();
      } else {
      }
    } catch (error) {
    }
  };

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await api.get(`/postagens/${postId}`);
        const postData = response.data;

        setTitulo(postData.titulo);
        setDescricao(postData.descricao);
        setPreco(postData.preco.toString());
        setHorarios(postData.horarios);
      } catch (error) {
        console.error('Erro ao obter dados da postagem:', error);
      }
    };

    getPosts();
  }, [postId]);

  return (
    <View>
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
                style={[styles.input, styles.inputWhiteBackground]}


      />
      <TextInput
        placeholder="Horários"
        value={horarios}
        onChangeText={setHorarios}
        style={[styles.input, styles.inputWhiteBackground]}

      />

      <View style={styles.buttonContainer}>
        <Button
          title="Atualizar Postagem"
          onPress={handleUpdate}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Deletar Postagem"
          onPress={handleDelete}
          color="red"
        />
      </View>

      
      <View style={styles.buttonContainer}>
        <Button
          title="Ir para Home"
          onPress={navigationHome}
        />
      </View>
    </View>
    </View>

  );
};

export default editPost;
