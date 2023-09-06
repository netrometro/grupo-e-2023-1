import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, Button, ScrollView } from 'react-native';
import styles from './style';
import api from '../../service/api';
import Card from '../../components/Card/card';
import { Picker } from '@react-native-picker/picker';

const ListagemPostagensScreen = ({ route }: any) => {
  const [exibirPostagens, setExibirPostagens] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [tiposDeServico, setTiposDeServico] = useState([]);
  const [tipoServicoSelecionado, setTipoServicoSelecionado] = useState('');
  const [tipoContratoSelecionado, setTipoContratoSelecionado] = useState('');
  const [filtroModificado, setFiltroModificado] = useState(false);
  const [cep, setCep] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [localidade, setLocalidade] = useState('');
  const [bairro, setBairro] = useState('');
  const [uf, setUF] = useState('');
  const [complemento, setComplemento] = useState('');


  const getPostagens = async () => {
    try {
      const response = await api.get('/postagens');
      setExibirPostagens(response.data);
    } catch (error) {
      console.error('Erro', error);
    }
  };

  const applyFilters = async () => {
    let response;
    
    if (minPrice !== '' || maxPrice !== '') {
      response = await api.get('/postagens/filter-price', {
        params: {
          minPrice: minPrice !== '' ? parseFloat(minPrice) : undefined,
          maxPrice: maxPrice !== '' ? parseFloat(maxPrice) : undefined,
        },
      });
    } else if (tipoContratoSelecionado === 'com') {
      response = await api.get('/postagens/comContrato');
    } else if (tipoContratoSelecionado === 'sem') {
      response = await api.get('/postagens/semContrato');
    } else if (tipoServicoSelecionado) {
      response = await api.get(`/typeService/${tipoServicoSelecionado}`, {
        params: {
          tipoServicoId: tipoServicoSelecionado,
        },
      });
    } else {
      response = await getPostagens(); 
    }
    
    console.log('Response data:', response.data);
    setExibirPostagens(response.data);
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
    getPostagens()
    
  }, [ minPrice, maxPrice]);

  return (
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.title}>Postagens</Text>
      <TextInput
        placeholder="Preço mínimo"
        value={minPrice}
        onChangeText={setMinPrice}
        style={[styles.input, styles.inputWhiteBackground]}
      />
      <TextInput
        placeholder="Preço máximo"
        value={maxPrice}
        onChangeText={setMaxPrice}
        style={[styles.input, styles.inputWhiteBackground]}
      />

      <Picker
        style={[styles.input, styles.inputWhiteBackground]}
        selectedValue={tipoServicoSelecionado}
        onValueChange={itemValue => setTipoServicoSelecionado(itemValue)}
        
      >
        <Picker.Item label="Selecione um tipo de serviço" value="" />
        {tiposDeServico.map(tipo => (
          <Picker.Item
            key={tipo.id}
            label={tipo.nomeServico}
            value={tipo.id.toString()}
          />
        ))}
      </Picker>

      <Picker
        style={[styles.input, styles.inputWhiteBackground]}
        selectedValue={tipoContratoSelecionado}
        onValueChange={itemValue => setTipoContratoSelecionado(itemValue)}
      >
        <Picker.Item label="Selecione um tipo de contrato" value="" />
        <Picker.Item label="Com contrato" value="com" />
        <Picker.Item label="Sem contrato" value="sem" />
        <Picker.Item label="Com todos os contratos" value="todos" />
      </Picker>

      <View style={styles.buttonContainer}>
        <Button title="Filtrar" onPress={applyFilters} />
      </View>

      <FlatList
        data={exibirPostagens}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Card
            id={item.id}
            titulo={item.titulo}
            descricao={item.descricao}
            preco={item.preco}
            horarios={item.horarios}
            cep = {item.cep}
            bairro = {item.bairro}
            localidade = {item.localidade}
            logradouro = {item.logradouro}
            uf = {item.uf}
            complemento = {item.complemento}

          />
        )}
      />
    </View>
    </ScrollView>
  );
};

export default ListagemPostagensScreen;
