import React, { useState, useEffect } from 'react';
import { Table, Row, Rows } from 'react-native-table-component';
//import React from 'react';
import {Feather} from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, FlatList, Text, Image, TouchableOpacity, Linking } from 'react-native';
import * as MailComposer from 'expo-mail-composer';

import api from '../../../services/api'

import styles from './styles';

export default function ListaExame(params) {
    const [exame, setExame] = useState([]);

    const navigation = useNavigation();
    const route = useRoute();
    const message = 'Ola teste Deu certo';

    const tipoExame = route.params.tipoExame;

    const state = {
        tableHead : ['Instituição', 'Data', 'Ações']
    }

    function navegarDetalhesExame(exame) {
        let nomeExame = tipoExame.nomeExame;
        navigation.navigate('DetalhesExame', { exame, nomeExame })
    }

    function navigateBack() {
        navigation.goBack();
    }

    function sendMail() {
        MailComposer.composeAsync({
            subject: 'Exame tal',
            recipients: ['mariopereira398@gmail.com'],
            body: message,
        });
    }

    function sendWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=5551998379633&text=${message}`);
    }

    async function loadExame() {
        let parametrosAxios  = { params: { idTipoExame: tipoExame.id } };
        let paramInstituicao = { params: { idUsuario: 1 } }

        const respParametrosGerais = await api.get('parametrosGerais', parametrosAxios );
        const respInstituicao      = await api.get('instituicao', paramInstituicao);

        let data;
        let aux = [];
        let arrayParamets = [];
        let arrAtrib = [];
        let arrValor = [];
        //////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////COD -- NOVO///////////////////////////////////////////////
        const exameFiltrado = respParametrosGerais.data.reduce((obj, { idExame, dataExame, idInstituicao, nome, linkImage, campo, valor }) => {
            if (!obj[idExame]){
                //aux.push(idExame);
                arrAtrib = [];
                arrValor = [];
                obj[idExame] = [];
                data = dataExame;
                data = data.substr(0, 10);
                data = data.split('-').reverse().join('/');
                arrayParamets.push({ ids: idInstituicao });
                arrAtrib.push(campo);
                arrValor.push(valor);
                aux.push({ 
                    'idExame': idExame, 
                    'dataExame': data,
                    'idInstituicao': idInstituicao,
                    'nome': nome,
                    'linkImage': linkImage,
                    'campo': arrAtrib,
                    'valor' : arrValor
                });
            }
            else{
                if (obj[idExame].campo != campo){
                    arrAtrib.push(campo);
                    arrValor.push(valor);
                }
            }
            return obj;
        }, {});
        //setExame(aux);
        const respLocal = await api.post('/localidade/local', { arrayParamets });

        let AuxInstituicao;
        for (let i = 0; i < aux.length; i++) {
            console.log("Entrou " + i)

            if (respInstituicao.data.find(obj => obj.id == aux[i].idInstituicao)) {
                AuxInstituicao = respInstituicao.data.find(obj => obj.id == (aux[i].idInstituicao));
                if (respLocal.data.find(obj => obj.id == (AuxInstituicao.idLocal))) {
                    aux[i].localidade = (respLocal.data.find(obj => obj.id == (AuxInstituicao.idLocal) ) );
                }
                
            }
        }

        setExame(aux);

        //////////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////
 
    }

    useEffect(() => {
        loadExame();
    }, []);

    return (
        
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#E82041" />
                </TouchableOpacity>
                <Text style={styles.propriedade}> { tipoExame.nomeExame }</Text>
            </View>

            <View style={styles.containert}>
                <Table>
                    <Row data={state.tableHead} style={styles.head} textStyle={styles.text} />
                    
                    <FlatList
                        data={exame}
                        style={styles.tipoExameList}
                        keyExtractor={exame => String(exame.idExame)}
                        showsVerticalScrollIndicator={false} 
                        renderItem={({ item : exame }) => ( 
                            <View style={styles.containerValor}>
                                <Text style={styles.nome}> {exame.nome} </Text>
                                <Text style={styles.dataExame}> {exame.dataExame} </Text>
                                <TouchableOpacity style={styles.detalhesBotao} onPress={() => navegarDetalhesExame(exame)} >
                                    <Text style={styles.detalhesBotaoText}>Visualizar</Text>
                                    <Feather name="arrow-right" size={16} color="#E02041" />
                                </TouchableOpacity>

                                {/*<Image sytle={styles.imageExame} source={exame.linkImage} />*/}
                            </View>
                        )}
                    />
                </Table>
            </View>
            
            {/*
            <View style={styles.contactBox}>
                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
                        <Text style={styles.actionText}>whatsapp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.action} onPress={sendMail}>
                        <Text style={styles.actionText}>Email</Text>
                    </TouchableOpacity>
                </View>
            </View>*/}
        </View>
    );
}
