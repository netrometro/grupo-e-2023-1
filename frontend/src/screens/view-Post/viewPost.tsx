import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, Button, TouchableOpacity } from 'react-native';
import styles from './style';
import api from '../../service/api'
import Card from '../../components/Card/card';

const ListagemPostagensScreen = ({ route }: any) => {
    const [exibirPostagens, setExibirPostagens] = useState(false);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    const priceFilter = () => {
      api.get('/postagens/filter-price', {
        params: {
          minPrice: minPrice !== '' ? parseFloat(minPrice) : undefined,
          maxPrice: maxPrice !== '' ? parseFloat(maxPrice) : undefined
        }
      })
      .then(response => {
        setExibirPostagens(response.data);
      })
      .catch(error => {
        console.error('Erro', error);
      });
    };

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
        <View style={styles.buttonContainer}>
        <Button
        
          title="Filtrar por preço"
          onPress={priceFilter}

        />
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
          />
        )}
      />
    </View>
  );
};

export default ListagemPostagensScreen;
