import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView } from 'react-native';
import api from '../../service/api';
import styles from './style';
import { useNavigation } from '@react-navigation/native';
import { StackTypes } from '../../routes/StackNavigation';
import { Picker } from '@react-native-picker/picker';
import { useScreenGuard } from '../../hooks/useScreenGuard';

const contractPost = ({ route }: any) => {
  const navigation = useNavigation<StackTypes>()
  useScreenGuard('contractPost');

  const { postId } = route.params;

  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [horarios, setHorarios] = useState('');
  const [tiposDeServico, setTiposDeServico] = useState([]);
  const [tipoServicoSelecionado, setTipoServicoSelecionado] = useState('');
  const [responsavelId, setResponsavelId] = useState('');
  const [contratanteId, setContratanteId] = useState('');



  
  const navigationHome = () => {
    navigation.navigate('CreatePost')
  }

  const handleContrato = async () => {
    try {  
      const response = await api.post('/soliciteContract', {
        responsavelId: parseInt(responsavelId),
        postagemId: postId,
        contratanteId: parseInt(contratanteId)
      });
  
      if (response.status === 200) {
        alert('Contrato solicitado com sucesso');
      } else {
        console.error('Erro ao solicitar contrato');
        alert('Erro ao solicitar contrato');
      }
    } catch (error) {
      console.error('Erro ao solicitar contrato:', error);
      alert('Erro ao solicitar contrato: ' + error);
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
      setContratanteId(postData.faxineiroId);

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
    <ScrollView>
    <View>
            <View style={styles.container}>
            <Text style={styles.title}>Contratar Serviço</Text>
      <TextInput
        placeholder="Responsável ID"
        value={responsavelId}
        onChangeText={setResponsavelId}
        style={[styles.input, styles.inputWhiteBackground]}
      />
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
          title="Contratar Serviço"
          onPress={handleContrato}
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
    </ScrollView>
  );
};

export default contractPost;
