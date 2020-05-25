import React, { useState, useEffect } from 'react';
import { Table, Row, Rows } from 'react-native-table-component';
//import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import DatePicker from 'react-native-datepicker';
import { View, FlatList, Text, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import * as MailComposer from 'expo-mail-composer';

//import logoImg from '../../../images/icon56.png'

import styles from './styles';

export default function FormularioTipoExame(params) {
    const navigation = useNavigation();
    const route = useRoute();
    const tipoExame = route.params.tipoExame;
    
    function navigateBack() {
        navigation.goBack();
    }
/*
    async function loadTipoExame() {
        const response = await api.get('tipoExame', { params: { idUsuario: 1 } });

        setTipoExame(response.data);
    }

    useEffect(() => {
        loadTipoExame();
    }, []);
*/
    return (

        <View style={styles.container}>

            <View style={styles.header}>
                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#E82041" />
                </TouchableOpacity>
                <Text>Exame: q</Text>
                <Text style={styles.propriedade}> Data: q</Text>
            </View>

            <View style={styles.regForm}>
                <Text style={styles.titulo}> Registrar novo {tipoExame.nomeExame}</Text>
            </View>

            <DatePicker
                format='DD/MM/YYYY'
                style={styles.dataExame}
                
            />

            <TextInput style={styles.textInput}
                placeholder='Exame'
                underlineColorAndroid={'transparent'} />

        </View>
    );
}
