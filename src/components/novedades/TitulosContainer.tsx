import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface TituloContainerProps {
    iconName: string;
    titulo: string;
}

const TituloContainer = ({ iconName, titulo }: TituloContainerProps) => {
    return (
        <View style={styles.TituloContainer}>
            <Icon
                name={iconName}
                size={30}
                color="black"
            />
            <Text style={styles.TextoTitulo}>
                {titulo}
            </Text>
        </View>
    );
};

const InfoContainer = () => {
    return (
        <View style={styles.ContainerInfo}>
            <Text style={styles.TextoInfo}>
                Los datos para el cierre de este reporte deben ser diligenciados una vez este finalice.
                Usted podrá hacerlo accediendo al registro correspondiente desde la vista de los reportes individuales. 
            </Text>
        </View>
)
}
  
const styles = StyleSheet.create({
    
    TituloContainer: {
        flex: 1,
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row',
        backgroundColor: 'transparent',
    },

    TextoTitulo: {
        fontSize: 19,
        paddingTop: 1,
        paddingLeft: 5,
        fontWeight: '700',
        color: 'black',
    },

    ContainerInfo: {
        color: '#5A87C6',
        fontWeight: '400',
        borderColor: '#CED4DA',
        borderWidth: 1,
        marginTop: 10,
        marginBottom: 15,
        borderRadius: 7,
        padding: 15,
    },

    TextoInfo: {
        fontSize: 16,
        textAlign: 'center',
        color: 'gray',
        lineHeight: 24,
        fontWeight: '500'
    },

});

export { TituloContainer, InfoContainer }

