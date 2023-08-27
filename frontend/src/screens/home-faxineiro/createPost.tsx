import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button,  } from 'react-native';
import styles from './styles'; 
import api from '../../service/api'
import { useNavigation } from '@react-navigation/native';
import { StackTypes } from '../../routes/StackNavigation';
import {Picker} from '@react-native-picker/picker'

interface Postagem {
  id: number;
  titulo: string;
  descricao: string;
  preco: number;
  horarios: string;
}

const CreatePostScreen = () => {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [horarios, setHorarios] = useState('');
  const [faxineiroId, setFaxineiroId] = useState('');
  const [exibirPostagens, setExibirPostagens] = useState(false); // Novo estado
  const [postagens, setPostagens] = useState<Postagem[]>([]);
  const [tiposDeServico, setTiposDeServico] = useState([]);
  const [tipoServicoSelecionado, setTipoServicoSelecionado] = useState('');


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

  const navigationView = () => {
    navigation.navigate('ListagemPostagens')
  }
  
  const handleCreatePost = async () => {
    const postagem = {
      titulo,
      descricao,
      preco: parseFloat(preco),
      horarios,
      faxineiroId:parseFloat(faxineiroId),
      tipoServicoId: parseInt(tipoServicoSelecionado), 

    };
    console.log(postagem)

    try {
      const response = await api.post(`faxineiros/${faxineiroId}/postagens`, postagem);
      console.log(response.data); 
    } catch (error) {
      console.error('Erro ao criar postagem:', error);
    }
  };

  const handleExibirPostagens = async () => {
    try {
      const response = await api.get(`/postagens`);
      setPostagens(response.data);
      setExibirPostagens(true);
      navigationView()
    } catch (error) {
      console.error('Erro ao carregar postagens:', error);
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
  getTiposDeServico();
}, []);


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
        
          title="Visualizar Postagens"
          onPress={handleExibirPostagens}

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
