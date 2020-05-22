import React, {useState, useEffect} from 'react';
import {Feather} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';

import api from '../../../services/api'

import logoImg from '../../../images/icon56.png'

import styles from './styles';

export default function ListaTipoExame(params) {
    const [tipoExame, setTipoExame] = useState([]);
    const navigation = useNavigation(); 

    function navegarListaExames(tipoExame) {
        navigation.navigate('ListExame', { tipoExame })
    }

    async function loadTipoExame(){
        const response = await api.get('tipoExame',{params:{idUsuario:1}});
        
        setTipoExame(response.data);
    }

    useEffect(() => {
        loadTipoExame();
    }, []);

    return ( 
        <View style={styles.container}>
            <Text style={styles.title}> Exames </Text>
            <View style={styles.tipoExamePropriedade}>
                <Text style={styles.propriedade}> Tipo </Text>
                <Text style={styles.propriedade}> Quantidade </Text>
                <Text style={styles.propriedade}> Ação </Text>
            </View>

            <FlatList 
                data={tipoExame}
                keyExtractor={tipoExame => String(tipoExame.id)}
                showsVerticalScrollIndicator={false}
                renderItem={( {item: tipoExame} )=>(
                    <View style={styles.tipoExame}>
                        <Text style={styles.exameTipo}>{tipoExame.nomeExame} </Text>
                        <Text style={styles.exameQuant}> {tipoExame.quantidade} </Text>

                        <TouchableOpacity style={styles.detalhesBotao} onPress={() => navegarListaExames(tipoExame)} >
                            <Feather name="arrow-right" size={16} color="#E02041" />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}
