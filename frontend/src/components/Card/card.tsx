import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles'; 

const Card = ({ titulo, descricao, preco, horarios }: CardProps) => {
  return (
    <View style={styles.cardContainer}>
    <Text style={styles.cardTitle}>{titulo}</Text>
    <Text style={styles.cardText}>{descricao}</Text>
    <Text style={styles.cardText}>Preço: R${preco}</Text>
    <Text style={styles.cardText}>Horários: {horarios}</Text>
  </View>
  );
};

export default Card;
