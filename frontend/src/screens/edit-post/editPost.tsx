import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import api from '../../service/api';
import styles from './style';
import { useNavigation } from '@react-navigation/native';
import { StackTypes } from '../../routes/StackNavigation';
import { Picker } from '@react-native-picker/picker';

const editPost = ({ route }: any) => {
  const navigation = useNavigation<StackTypes>()

  const { postId } = route.params;

  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [horarios, setHorarios] = useState('');
  const [tiposDeServico, setTiposDeServico] = useState([]);
  const [tipoServicoSelecionado, setTipoServicoSelecionado] = useState('');

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
        tipoServicoId: parseInt(tipoServicoSelecionado), 
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

  const getPosts = async () => {
    try {
      const response = await api.get(`/postagens/${postId}`);
      const postData = response.data;

      setTitulo(postData.titulo);
      setDescricao(postData.descricao);
      setPreco(postData.preco.toString());
      setHorarios(postData.horarios);
      setTipoServicoSelecionado(postData.tipoServicoId.toString());
    } catch (error) {
      console.error('Erro ao obter dados da postagem:', error);
    }
  };

  const getTiposDeServico = async () => {
    try {
      const response = await api.get('/allService');
      setTiposDeServico(response.data);
    } catch (error) {
      console.error('Erro ao carregar tipos de serviço:', error);
    }
  };

  useEffect(() => {
    getPosts();
    getTiposDeServico();
  }, [postId]);

  return (
    <View>
            <View style={styles.container}>
            <Text style={styles.title}>Atualizar Postagem</Text>
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

      <Picker
        style={[styles.input, styles.inputWhiteBackground]}
        selectedValue={tipoServicoSelecionado}
        onValueChange={(itemValue) => setTipoServicoSelecionado(itemValue)}
      >
        <Picker.Item label="Selecione um tipo de serviço" value="" />
        {tiposDeServico.map((tipo) => (
          <Picker.Item key={tipo.id} label={tipo.nomeServico} value={tipo.id.toString()} />
        ))}
      </Picker>

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
