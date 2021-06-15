import React from "react";
import { View } from 'react-native';
import { Drawer, Text } from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/materialcommunityicons';

const DrawerContent: React.FC = () => {
    return(
        <View  style={{flex:1}}>
            <DrawerContentScrollView >
                <View>
                    <Text>Test content</Text>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section>
                <Drawer.Item
                    icon="exit-to-app" label="Sign Out" onPress={() => {}} />
            </Drawer.Section>
        </View>
    )
}

export default DrawerContent;