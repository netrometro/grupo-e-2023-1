import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, Button, TouchableOpacity } from 'react-native';
import styles from './style';
import api from '../../service/api'
import Card from '../../components/Card/card';
import { Picker } from '@react-native-picker/picker';

const ListagemPostagensScreen = ({ route }: any) => {
    const [exibirPostagens, setExibirPostagens] = useState(false);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [tiposDeServico, setTiposDeServico] = useState([]);
    const [tipoServicoSelecionado, setTipoServicoSelecionado] = useState('');

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

    const getPostagens = async () => {
      try {
        const response = await api.get('/postagens');
        setExibirPostagens(response.data);
      } catch (error) {
        console.error('Erro', error);
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

    const tipoServicoFilter = () => {
      api.get(`/typeService/${tipoServicoSelecionado}`, {
        params: {
          tipoServicoId: tipoServicoSelecionado
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
      getPostagens();
      getTiposDeServico();
    }, []);

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

      <Picker
        style={[styles.input, styles.inputWhiteBackground]}
        selectedValue={tipoServicoSelecionado}
        onValueChange={(itemValue) => setTipoServicoSelecionado(itemValue)}
      >
        <Picker.Item label="Selecione um tipo de serviço" value="" />
        {tiposDeServico.map((tipo) => (
          <Picker.Item key={tipo.id} label={tipo.nomeServico} value={tipo.id.toString()} />
        ))}
      </Picker>
        <View style={styles.buttonContainer}>
        <Button
        
          title="Filtrar por preço"
          onPress={priceFilter}

        />
      
      </View>
      <View style={styles.buttonContainer}>
      <Button
        title="Filtrar por tipo de serviço"
        onPress={tipoServicoFilter}
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
