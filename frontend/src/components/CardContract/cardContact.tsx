import React from 'react';
import { View, Text, Button } from 'react-native';
import styles from './styles'; 
import { useNavigation } from '@react-navigation/native';
import { StackTypes } from '../../routes/StackNavigation';


const CardContract = ({ id, titulo, descricao, preco, horarios, telefoneResponsavel }: CardContractProps) => {

  const navigation = useNavigation<StackTypes>();
  const handleEditPress = () => {
         navigation.navigate('EditarPostagem', { postId: id });
  };


  return (
    <View style={styles.cardContainer}>
    <Text style={styles.cardTitle}>{titulo}</Text>
    <Text style={styles.cardText}>{descricao}</Text>
    <Text style={styles.cardText}>Preço: R${preco}</Text>
    <Text style={styles.cardText}>Horários: {horarios}</Text>
    <Text style={styles.cardText}>Telefone do Responsável:{telefoneResponsavel}</Text>


    <Button title="Editar" onPress={handleEditPress}/>
    
  </View>
  );
};

export default CardContract;
