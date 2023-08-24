import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import api from '../../service/api';

const editPost = ({ route }: any) => {
  const { postId } = route.params; // Obtém o ID da postagem da rota

  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [horarios, setHorarios] = useState('');

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
      <Text>Editar Postagem</Text>
      <TextInput
        placeholder="Título"
        value={titulo}
        onChangeText={setTitulo}
      />
      <TextInput
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
      />
      <TextInput
        placeholder="Preço"
        value={preco}
        onChangeText={setPreco}
      />
      <TextInput
        placeholder="Horários"
        value={horarios}
        onChangeText={setHorarios}
      />
      <Button title="Atualizar" onPress={handleUpdate} />
    </View>
  );
};

export default editPost;
