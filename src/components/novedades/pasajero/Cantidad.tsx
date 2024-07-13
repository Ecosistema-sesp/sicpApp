import React, { useState } from "react";
import { View, TextInput, StyleSheet, Button } from "react-native";
import BotonMasMenos from "./BotonIncremento";

interface CantidadProps {
    pasajero: any;
    valor : number;
    onValueChange: (value: string) => void; 
}

const Cantidad = ({ pasajero, valor, onValueChange}: CantidadProps) => {
    const [value, setValue] = useState('0');

    const handleChange = (text: string) => {
        if (!isNaN(Number(text)) && Number(text) >= 0 && Number(text) <= valor) {
            setValue(text);
            onValueChange(text);
        }
    };

    const increment = () => {
        let num = Number(value);
        if (num < valor) {
            num++;
            setValue(num.toString());
            onValueChange(num.toString());
        }
    };

    const decrement = () => {
        let num = Number(value);
        if (num > 0) {
            num--;
            setValue(num.toString());
            onValueChange(num.toString());
        }
    };

    return (
        <View style={styles.container}>
            <BotonMasMenos title="-" onPress={decrement} />
            <TextInput
                style={styles.input}
                onChangeText={handleChange}
                value={value}
                keyboardType="numeric"
            />
            <BotonMasMenos title="+" onPress={increment} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
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
        width: '43%',
    },
    boton: {

    }
});

export default Cantidad;
