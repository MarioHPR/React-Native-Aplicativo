import React, { useState, useEffect } from 'react';
import { Table, Row, Rows } from 'react-native-table-component';

import { Feather, Foundation, Ionicons, Entypo } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
    View, FlatList,Text, Image, 
    TouchableOpacity, ScrollView, 
    TextInput } from 'react-native';
import * as MailComposer from 'expo-mail-composer';
import Moment from 'moment';
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';
import api from '../../../../services/api'

import styles from './styles';
/** TALVEZ TENTAR USAR ESSE CASO O PICKER NÃO RESOLVER FAZER COMPONENTES
 * {/*<View style={styles.conteinerInstituicao}>
                    <Picker
                        selectedValue={selectedValue}
                        style={styles.selectInstituicao}
                        onValueChange={(itemValue) => setSelectedValue(itemValue)}
                    >
                        {
                            console.log(selectedValue),
                            instituicao ?
                                instituicao.map((v) => {
                                    return <Picker.Item color='red' textAlign='center' key={v.id} label={v.nome} value={v.id} />
                                }) : <Picker.Item label="" value="" />
                        }
                    </Picker>
                    </View>
  */

export default function FormularioTipoExame(params) {

    const navigation = useNavigation();
    const route = useRoute();
    const tipoExame = route.params.tipoExame;
    const [dateAux, setDateAux] = useState(new Date());
    const [date, setDate] = useState(Moment(new Date()).format('DD/MM/YYYY') );
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [instituicao, setInstituicao] = useState('');

    function navigateBack() {
        navigation.goBack();
    }

    async function loadFormularioExame() {
        let aux = [];
        let paramInstituicao = { params: { idUsuario: 1 } };
        const response = await api.get('instituicao', paramInstituicao);
        for (const item of response.data) {
            aux.push({ label: item.nome, value: item.id })
        }
        //setInstituicao(response.data);
        setInstituicao(aux);
    }

    useEffect(() => {
        loadFormularioExame();
    },[]);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        if (currentDate != date){
            let data = Moment(currentDate).format('DD/MM/YYYY');
            setDate( data );
            setShow(false);
        }

    };

    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const [selectedValue, setSelectedValue] = useState("");

    return (
        <View style={styles.container}>
            <View style={styles.tarja}>
            </View>
            <View style={styles.header}>
                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={25} color="#E82041" />
                </TouchableOpacity>
                <Text>Exame: q</Text>
                <Text style={styles.propriedade}> Data: q</Text>
            </View>
            <View style={styles.conteinerSecundario}>

                <View style={styles.regForm}>
                    <Text style={styles.titulo}> Registrar novo {tipoExame.nomeExame}</Text>
                </View>

                <View >
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

                <View style={styles.conteinerInstituicao}>
                    <View style={styles.btInstituicao}>
                        <RNPickerSelect
                            placeholder={{
                                label: 'Selecione uma instituição',
                                value: null,
                            }}
                            style={{
                                ...styles,
                                iconContainer: {
                                    top: 6,
                                    right: 10,
                                },
                                placeholder: {
                                    color: 'gray',
                                    fontSize: 19,
                                    fontWeight: 'bold',
                                    borderWidth: 1,
                                    borderColor: 'purple',
                                    borderRadius: 8,
                                },
                            }}
                            onValueChange={(value) => console.log(value)}
                            items={instituicao ? instituicao : [{ label: 'carregando', value: 'nulo' }]}
                            Icon={() => {
                                return <Ionicons name="md-arrow-down" size={24} color="white" />;
                            }}
                        />
                    </View>
                    <Entypo style={styles.btAdd} name="add-to-list" size={24} />
                </View>



                <TextInput style={styles.textInput}
                    placeholder='Exame'
                    underlineColorAndroid={'transparent'} />
            </View>
        </View>
    );
}
