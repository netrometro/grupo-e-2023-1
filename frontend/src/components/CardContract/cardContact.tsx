import React from 'react';
import { View, Text, Button } from 'react-native';
import styles from './styles'; 
import { useNavigation } from '@react-navigation/native';
import { StackTypes } from '../../routes/StackNavigation';


const CardContract = ({ id, titulo, descricao, preco, horarios, telefoneResponsavel, contratos,
  solicitacoes }: CardContractProps) => {

  const navigation = useNavigation<StackTypes>();
  const handleEditPress = () => {
         navigation.navigate('EditarPostagem', { postId: id });
  };

  const handleCancelarContrato = async () => {
    try {
    } catch (error) {
      console.error('Erro ao cancelar contrato:', error);
    }
  };

  const handleCancelarSolicitacao = async () => {
    try {
    } catch (error) {
      console.error('Erro ao cancelar solicitação:', error);
    }
  };

  const handleAceitarSolicitacao = async () => {
    try {
    } catch (error) {
      console.error('Erro ao cancelar solicitação:', error);
    }
  };


  return (
    <View style={styles.cardContainer}>
      <Text style={styles.cardTitle}>{titulo}</Text>
      <Text style={styles.cardText}>{descricao}</Text>
      <Text style={styles.cardText}>Preço: R${preco}</Text>
      <Text style={styles.cardText}>Horários: {horarios}</Text>
      <Text style={styles.cardText}>Telefone do Responsável: {telefoneResponsavel}</Text>
  
      {solicitacoes && solicitacoes.length > 0 ? (
        <View style={styles.buttonContainer}>
          <View style={[styles.button]}>
            <Button title="Aceitar Solicitação" onPress={handleAceitarSolicitacao} />
          </View>
          <View style={[styles.button]}>
            <Button title="Cancelar Solicitação" onPress={handleCancelarSolicitacao} color="red" />
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
