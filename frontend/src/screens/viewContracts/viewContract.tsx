import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, Button } from 'react-native';
import styles from './style';
import api from '../../service/api';
import { Picker } from '@react-native-picker/picker';
import CardContract from '../../components/CardContract/cardContact';

const ViewContract = ({ route }: any) => {
  const [exibirPostagensComContrato, setExibirPostagensComContrato] = useState([]);
  const [exibirPostagensComSolicitacao, setExibirPostagensComSolicitacao] = useState([]);
  const [exibirPostagensLivres, setExibirPostagensLivres] = useState([]);
  const [tiposDeServico, setTiposDeServico] = useState([]);
  const [faxineiroID, setFaxineiroID] = useState('');

  const getPostagensComContratoDoUsuario = async () => {
    try {
      const response = await api.get(`/postagens/comContrato/${faxineiroID}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar postagens com contrato:', error);
      return [];
    }
  };

  const getPostagensComSolicitacaoDeContrato = async () => {
    try {
      const response = await api.get(`/postagens/comSolicitacaoContrato/${faxineiroID}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar postagens com solicitação de contrato:', error);
      return [];
    }
  };

  const getPostagens = async () => {
    try {
      const response = await api.get(`postagens/livres/${faxineiroID}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar postagens livres:', error);
      return [];
    }
  };

  const fetchPostagens = async () => {
    try {
      const responseComContrato = await getPostagensComContratoDoUsuario();
      console.log("Contratos recebidos:", responseComContrato); 

      setExibirPostagensComContrato(responseComContrato);

      const responseComSolicitacao = await getPostagensComSolicitacaoDeContrato();
      console.log("Solicitações recebidas:", responseComSolicitacao); 

      setExibirPostagensComSolicitacao(responseComSolicitacao);

      const responseLivres = await getPostagens();
      setExibirPostagensLivres(responseLivres);
    } catch (error) {
      console.error('Erro ao buscar postagens:', error);
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
      <Text style={styles.title}>Postagens</Text>
      <TextInput
        placeholder="ID do Faxineiro"
        value={faxineiroID}
        onChangeText={setFaxineiroID}
        style={[styles.input, styles.inputWhiteBackground]}
      />
      <View style={styles.buttonContainer}>
        <Button title="Pesquisar" onPress={fetchPostagens} />
      </View>


      <Text style={styles.title}>Com Contrato</Text>
      <FlatList
  data={exibirPostagensComContrato}
  keyExtractor={item => item.id.toString()}
  renderItem={({ item }) => (
    <CardContract
      id={item.id}
      titulo={item.titulo}
      descricao={item.descricao}
      preco={item.preco}
      horarios={item.horarios}
      telefoneResponsavel={item.contratos[0]?.responsavel.telefone}
      contratos={item.contratos}
    />
  )}
/>

<Text style={styles.title}>Com Solicitação</Text>
<FlatList
  data={exibirPostagensComSolicitacao}
  keyExtractor={item => item.id.toString()}
  renderItem={({ item }) => (
    <CardContract
      id={item.id}
      titulo={item.titulo}
      descricao={item.descricao}
      preco={item.preco}
      horarios={item.horarios}
      solicitacoes={item.SolicitacaoContrato}      telefoneResponsavel={''}
    />
  )}
/>


      <Text style={styles.title}>Livres</Text>
      <FlatList
        data={exibirPostagensLivres}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <CardContract
                id={item.id}
                titulo={item.titulo}
                descricao={item.descricao}
                preco={item.preco}
                horarios={item.horarios} telefoneResponsavel={''}          />
        )}
      />
    </View>
  );
};

export default ViewContract;
