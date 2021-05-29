import React from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { useAuth } from '../../contexts/auth';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

const CadastroUsuario: React.FC = () => {

    const { user, navegarCadastroUsuario } = useAuth();

    function handleSignOut() {
        navegarCadastroUsuario();
    }

    return (
        <View style={styles.container}>
            <Text>{user}</Text>
            <Button title="Logout" onPress={handleSignOut} />
        </View>
    )
};

export default CadastroUsuario;