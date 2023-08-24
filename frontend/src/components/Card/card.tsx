import React from 'react';
import { View, Text, Button } from 'react-native';
import styles from './styles'; 
import { useNavigation } from '@react-navigation/native';
import { StackTypes } from '../../routes/StackNavigation';


const Card = ({ id, titulo, descricao, preco, horarios }: CardProps) => {

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
    <Button title="Editar" onPress={handleEditPress}/>    
  </View>
  );
};

export default Card;
