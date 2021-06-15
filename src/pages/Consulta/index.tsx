import React from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { useAuth } from '../../contexts/auth';
import { Appbar } from 'react-native-paper';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

const Consulta: React.FC = () => {

    const { user, signOut } = useAuth();

    function handleSignOut() {
        signOut();
    }
    const _handleMore = () => console.log('Shown more');
    return (
        <>
            <Appbar.Header >
                {/* <Appbar.BackAction 
                    color='white'
                    onPress={handleSignOut} /> */}
                <Appbar.Content title="Consulta" subtitle={" "} color='white' />
                <Appbar.Action icon="dots-vertical" onPress={_handleMore} />
            </Appbar.Header>
            <View style={styles.container}>
                <Text>{user}</Text>
                <Button title="Sign out" onPress={handleSignOut} />
            </View>
        </>
    )
};

export default Consulta;