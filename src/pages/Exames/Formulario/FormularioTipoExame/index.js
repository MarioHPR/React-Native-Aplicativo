import React, { useState, useEffect } from 'react';
import { Table, Row, Rows } from 'react-native-table-component';

import { Feather, Foundation } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { View, FlatList, Text, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import * as MailComposer from 'expo-mail-composer';
import Moment from 'moment';

import styles from './styles';

export default function FormularioTipoExame(params) {

    const navigation = useNavigation();
    const route = useRoute();
    const tipoExame = route.params.tipoExame;
    const [dateAux, setDateAux] = useState(new Date());
    const [date, setDate] = useState(Moment(new Date()).format('DD/MM/YYYY') );
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [dt, setDt] = useState(" ");
    
    function navigateBack() {
        navigation.goBack();
    }
/*
    async function loadFormularioExame() {
        //setDt(date);
        console.log("___________________")
        console.log("___________________")
        console.log(date)
        console.log("___________________")
        console.log("___________________")
    }

    useEffect(() => {
        loadFormularioExame();
    }, []);
*/
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        if (currentDate != date){
            let data = Moment(currentDate).format('DD/MM/YYYY');
            setDate( data );
        }
    };

    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    return (

        <View style={styles.container}>
            <View style={styles.tarja}>
            </View>
            <View style={styles.header}>
                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#E82041" />
                </TouchableOpacity>
                <Text>Exame: q</Text>
                <Text style={styles.propriedade}> Data: q</Text>
            </View>
            <View style={styles.conteinerSecundario}>

                <View style={styles.regForm}>
                    <Text style={styles.titulo}> Registrar novo {tipoExame.nomeExame}</Text>
                </View>

                <View>
                    <View style={styles.conteinerBt}>
                        <Text style={styles.label}>Data do exame:</Text>
                        <TouchableOpacity style={styles.btData} onPress={showDatepicker} > 
                            <Text style={styles.data}>
                                {date}
                            </Text>
                            <Foundation style={styles.calendario}  name="calendar"/>
                        </TouchableOpacity>
                    </View>


                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={dateAux}
                            mode={mode}
                            display="spinner"
                            onChange={onChange}
                        />
                    )}
                    
                </View>


                <TextInput style={styles.textInput}
                    placeholder='Exame'
                    underlineColorAndroid={'transparent'} />
            </View>
        </View>
    );
}
