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
  const handleContract = () => {
    navigation.navigate('ContractPost', { postId: id });
};


  return (
    <View style={styles.cardContainer}>
    <Text style={styles.cardTitle}>{titulo}</Text>
    <Text style={styles.cardText}>{descricao}</Text>
    <Text style={styles.cardText}>Preço: R${preco}</Text>
    <Text style={styles.cardText}>Horários: {horarios}</Text>
    <View style={styles.editButton}>
        <Button title="Editar" onPress={handleEditPress} />
      </View>
      <View style={styles.editButton}>
      <Button title="Contratar Post" onPress={handleContract}/>    
      </View>
    
  </View>
  );
};

export default Card;
