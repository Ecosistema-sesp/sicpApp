import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

interface InputProps {
    placeholder: string;
    onChangeText: (text: string) => void;   
}

const AreaInput: React.FC<InputProps> = ({ placeholder, onChangeText }) => {
    return (
        <TextInput
            style={styles.input}
            placeholder={placeholder}
            multiline={true}
            numberOfLines={4}
            onChangeText={onChangeText} 
        />
    );
};

const styles = StyleSheet.create({
    input: {
        height: 100,
        fontSize: 18,
        color: '#00447C',
        fontWeight: '500',
        borderColor: '#CED4DA',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 20,
        paddingLeft: 15,
        textAlignVertical: 'top',
    },
});

export default AreaInput;
