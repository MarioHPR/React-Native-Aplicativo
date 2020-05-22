import React, { useState, useEffect } from 'react';
import { Table, Row, Rows } from 'react-native-table-component';
//import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, FlatList, Text, Image, TouchableOpacity, Linking, ScrollView  } from 'react-native';
import * as MailComposer from 'expo-mail-composer';

import logoImg from '../../../images/icon56.png'

import styles from './styles';

export default function DetalhesExame(params) {

    const [tipoExame, setTipoExame] = useState([]);

    const navigation = useNavigation();
    const route = useRoute();
    const message = 'Ola teste Deu certo';

    const exame = route.params.exame;
    const nomeExame = route.params.nomeExame;

    function navigateBack() {
        navigation.goBack();
    }

    return (

        <View style={styles.container}>

            <View style={styles.header}>
                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#E82041" />
                </TouchableOpacity>
                <Text>Exame: {nomeExame}</Text>
                <Text style={styles.propriedade}> Data: {exame.dataExame}</Text>
            </View>

            <View style={styles.head}>
                <Text style={styles.propriedade}> Dados básicos </Text>
            </View>
            <View style={styles.containerT}>
                <View style={styles.boxUm}>
                    <View style={styles.containerTeste}>
                        <Text style={styles.label}> Instituição: </Text>
                        <Text style={styles.valor}> {exame.nome}</Text>
                    </View>
                    <View style={styles.containerTeste}>
                        <Text style={styles.label}> Cidade: </Text>
                        <Text style={styles.campoValor}> {exame.localidade.cidade}</Text>
                    </View>
                    <View style={styles.containerTeste}>
                        <Text style={styles.label}> CEP: </Text>
                        <Text style={styles.campoValor}> {exame.localidade.cep}</Text>
                    </View>
                </View>
                <View style={styles.boxDois}>
                    <View style={styles.containerTeste}>
                        <Text style={styles.label}> Bairro: </Text>
                        <Text style={styles.campoValor}>{exame.localidade.bairro}</Text>
                    </View>
                    <View style={styles.containerTeste}>
                        <Text style={styles.label}> Numero: </Text>
                        <Text style={styles.campoValor}> {exame.localidade.numero}</Text>
                    </View>
                    <View style={styles.containerTeste}>
                        <Text style={styles.label}> Rua: </Text>
                        <Text style={styles.campoValor}> {exame.localidade.rua}</Text>
                    </View>
                </View>
            </View>
            
            <View >
                <ScrollView showsVerticalScrollIndicator={false} >
                    <View style={styles.parametros}>
                        <View style={styles.boxUm}>
                            <View style={styles.head}>
                                <Text style={styles.propriedade}> Atributo: </Text>
                            </View>
                            <Row data={exame.campo} style={styles.campoAtributo} textStyle={styles.text} />
                        </View>
                        <View style={styles.boxDois}>
                            <View style={styles.head}>
                                <Text style={styles.propriedade}> Valor: </Text>
                            </View>
                            <Row data={exame.valor} style={styles.campoAtributo} textStyle={styles.text} />
                        </View>
                    </View>
                </ScrollView>
            </View>
            
        </View>
    );
}
