import React from 'react';
import { Icon, Button } from 'react-native-elements';
import { ButtonProps } from '../../interfaces/ParametrosRequestTypes';

export default({nomeBotao, acao, style, icon, type}: ButtonProps) => {
    return (
        <>
            <Button
                containerStyle={style}        
                icon={
                    <Icon
                        type="font-awesome"
                        name={icon}
                        size={15}
                        color="white"
                    />
                }iconRight
                title={nomeBotao}
                onPress={acao}
                type={type}
            />
        </>
    );
}