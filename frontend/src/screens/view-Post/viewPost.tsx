import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import styles from './style';
import api from '../../service/api'
import Card from '../../components/Card/card';

interface Postagem {
    id: number;
    titulo: string;
    descricao: string;
    preco: number;
    horarios: string;
  }

const ListagemPostagensScreen = ({ route }: any) => {
    const [exibirPostagens, setExibirPostagens] = useState(false);

      useEffect(() => {
        api.get('/postagens')
        .then(response =>{
            setExibirPostagens(response.data)
        })
        .catch(error => {
            console.error('Erro', error);
        
        })
    },[]);


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Postagens</Text>
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
          />
        )}
      />
    </View>
  );
};

export default ListagemPostagensScreen;
