import React from 'react';
import { View, Text, Button } from 'react-native';
import styles from './styles'; 
import { useNavigation } from '@react-navigation/native';
import { StackTypes } from '../../routes/StackNavigation';
import api from '../../service/api';


const CardContract = ({ id, titulo, descricao, preco, horarios, telefoneResponsavel, contratos,
  solicitacoes, bairro, uf, cep, localidade, logradouro }: CardContractProps) => {

  const navigation = useNavigation<StackTypes>();
  const handleEditPress = () => {
         navigation.navigate('EditarPostagem', { postId: id });
  };

  const handleCancelarContrato = async () => {
    try {
      if (contratos && contratos.length > 0) {
        const contratoId = contratos[0].id; 
        console.log("ID do Contrato:", contratoId);

        const response = await api.delete(`deleteContract/${contratoId}`);
        if (response.status === 200) {
          alert('Contrato cancelado com sucesso');
        } else {
          alert('Erro ao cancelar contrato');
        }
      } else {
        alert('Nenhum contrato encontrado');
      }
    } catch (error) {
      console.error('Erro ao cancelar contrato:', error);
    }
  };

  // const handleCancelarSolicitacao = async (solicitacaoId: any) => {
  //   try {
  //     const response = await api.delete(`deleteSolicitacao/${solicitacaoId}`);
  //     if (response.status === 200) {
  //       alert('Solicitação de contrato cancelada com sucesso');
  //     } else {
  //       alert('Erro ao cancelar solicitação de contrato');
  //     }
  //   } catch (error) {
  //     console.error('Erro ao cancelar solicitação:', error);
  //   }
  // };

  // const handleAceitarSolicitacao = async () => {
  //   try {
  //   } catch (error) {
  //     console.error('Erro ao cancelar solicitação:', error);
  //   }
  // };


  return (
    <View style={styles.cardContainer}>
      <Text style={styles.cardTitle}>{titulo}</Text>
      <Text style={styles.cardText}>{descricao}</Text>
      <Text style={styles.cardText}>Preço: R${preco}</Text>
      <Text style={styles.cardText}>Horários: {horarios}</Text>
      <Text style={styles.cardText}>Telefone do Responsável: {telefoneResponsavel}</Text>
      <Text style={styles.cardText}>Cep: {cep}</Text>
      <Text style={styles.cardText}>Logradouro: {logradouro}</Text>
      <Text style={styles.cardText}>Localidade: {localidade}</Text>
      <Text style={styles.cardText}>Bairro: {bairro}</Text>
      <Text style={styles.cardText}>UF: {uf}</Text>
  
      {solicitacoes && solicitacoes.length > 0 ? (
        <View style={styles.buttonContainer}>
          <View style={[styles.button]}>
            <Button title="Aceitar Solicitação" />
          </View>
          <View style={[styles.button]}>
            <Button title="Cancelar Solicitação" color="red" />
          </View>
        </View>
      ) : contratos && contratos.length > 0 ? (
        <View style={styles.buttonContainer}>
          <View style={[styles.button]}>
            <Button title="Cancelar Contrato" onPress={handleCancelarContrato} color="red" />
          </View>
        </View>
      ) : null}
  
      <View style={styles.editButton}>
        <Button title="Editar" onPress={handleEditPress} />
      </View>
    </View>
  );
  
  
};

export default CardContract;
