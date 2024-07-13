import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity } from 'react-native';

type BotonSubmitProps = {
    handleSubmit: () => void;
    buttonText: string;
  };
  
const BotonSubmit: React.FC<BotonSubmitProps> = ({ handleSubmit, buttonText }) => {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity style={styles.boton} onPress={handleSubmit}>
            <Text style={styles.botontexto}>{buttonText}</Text>
        </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    boton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#5A87C6',
        height: 60,
        marginTop: 5,
        marginBottom: 50,
        borderRadius: 7,
        width: '60%',
        alignContent: 'center'
      },
      botontexto: {
        color: '#FFF',
        fontWeight: '800',
        fontSize: 16,
      }
})

export { BotonSubmit }
