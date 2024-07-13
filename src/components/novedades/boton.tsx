import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

interface BtnEnviarDatosProps {
  onPress: () => void;
}

const BtnEnviarDatos: React.FC<BtnEnviarDatosProps> = ({ onPress }) => {
    return (
        <View style={styles.EnviarDatos}>
            <TouchableOpacity style={styles.boton} onPress={onPress}>
                <Text style={styles.text}>Registrar</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    EnviarDatos: {
      minHeight: 20,
      flex: 1,
      alignItems: 'center',
      marginTop: 5
    },
    boton: {
        backgroundColor: '#5A87C6',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 10,
        marginLeft: 16,
        marginRight: 16,
        width: 150,
        height: 60

    },
    text: {
        color: '#fff',
        fontSize: 18,
    },
})

export default BtnEnviarDatos
