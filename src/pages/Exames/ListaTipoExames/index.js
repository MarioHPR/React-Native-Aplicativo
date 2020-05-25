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
    function navegarFormularioTipoExame(tipoExame) {
        navigation.navigate('FormularioTipoExame', { tipoExame })
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
            <View style={styles.tarja}>
            </View>
            <View style={styles.conteinerSecundario}>
                <Text style={styles.title}> Exames </Text>
                <View style={styles.tipoExamePropriedade}>
                    <Text style={styles.propriedade}> Tipo </Text>
                    <Text style={styles.propriedade}> Quantidade </Text>
                    <Text style={styles.propriedade}>
                        Ações
                    <Feather name="menu" size={16} color="#E02041" />
                    </Text>
                </View>
                <FlatList 
                    data={tipoExame}
                    keyExtractor={tipoExame => String(tipoExame.id)}
                    showsVerticalScrollIndicator={false}
                    renderItem={( {item: tipoExame} )=>(
                        <View style={styles.tipoExame}>
                            <Text style={styles.exameTipo}> {tipoExame.nomeExame} </Text>
                            <Text style={styles.exameQuant}> ( {tipoExame.quantidade} ) </Text>

                            <View style={styles.containerBotoes}>
                                <TouchableOpacity style={styles.detalhesBotao} onPress={() => navegarFormularioTipoExame(tipoExame)} >
                                    <Feather name="plus" keyExtractor={String('add' + tipoExame.id)} size={16} color="#87C772" />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.detalhesBotao} onPress={() => navegarListaExames(tipoExame)} >
                                    <Feather name="eye" keyExtractor={String('visu' + tipoExame.id)} size={16} color="#45C1BD" />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.detalhesBotao} onPress={() => {}} >
                                    <Feather name="edit-3" keyExtractor={String('edit' + tipoExame.id)} size={16} color="#F8FAFA" />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.detalhesBotao} onPress={() => {}} >
                                    <Feather name="trash-2" keyExtractor={String('excluir' + tipoExame.id)} size={16} color="#E02041" />
                                </TouchableOpacity>
                            </View>
                            
                        </View>
                    )}
                />
            </View>
        </View>
    );
}
