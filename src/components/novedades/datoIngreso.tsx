import React from 'react';
import { TextInput, StyleSheet, Text, View } from 'react-native';

interface DatoIngresoProps {
    label: string;
    onChangeText: (text: string) => void;
}

const DatoIngreso: React.FC<DatoIngresoProps> = ({ label, onChangeText }) => {
    return (
        <View>
            <Text style={styles.texto}>{label}</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                maxLength={50} 
            />
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        height: 48,
        fontSize: 17,
        color: '#5A87C6',
        fontWeight: '400',
        borderColor: '#CED4DA',
        borderWidth: 1,
        marginBottom: 10,
        borderRadius: 7,
        paddingLeft: 15,
    },
    texto: {
        color: '#00447C',
        marginBottom: 5,
        fontWeight: '500',
        fontSize: 16,
    },
});

export default DatoIngreso;
