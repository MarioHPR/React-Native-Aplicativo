import React from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { useAuth } from '../../contexts/auth';
import { Appbar } from 'react-native-paper';
import DrawerContent from '../../componentes/Drawer/DrawerContent';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

const Instituicoes: React.FC = () => {

    const { user, signOut } = useAuth();

    function handleSignOut() {
        signOut();
    }
    const _handleMore = () => console.log('Shown more');
    return (
        <>
            <Appbar.Header >
                <Appbar.Content title="Instituicoes" subtitle={" "} color='white' />
            </Appbar.Header>
            <View style={styles.container}>
                <Text>{user}</Text>
                <Button title="Sign out" onPress={handleSignOut} />
            </View>
        </>
    )
};

export default Instituicoes;