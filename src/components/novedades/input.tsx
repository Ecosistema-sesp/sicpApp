import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

interface InputProps {
    placeholder: string;
    onChangeText: (text: string) => void;
    secureTextEntry?: boolean;
}

const Input: React.FC<InputProps> = ({ placeholder, onChangeText, secureTextEntry = false }) => {
    return (
        <TextInput
            style={styles.input}
            placeholder={placeholder}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
        />
    );
};

const styles = StyleSheet.create({
    input: {
        height: 40,
        fontSize: 18,
        color: '#00447C',
        fontWeight: '500',
        borderColor: '#00467E',
        borderWidth: 1,
        marginRight: 18,
        marginLeft: 18,
        borderRadius: 10,
        marginBottom: 10,
        paddingLeft: 15
    },
});

export default Input;
