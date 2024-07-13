import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/AntDesign';

const BotonFlotante = () => {

    const navigation = useNavigation();

    const BotonFlotanteTocado = () => {
        navigation.navigate("Panel");
    }    

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.botonflotante}
                onPress={BotonFlotanteTocado}
            >
                <Icon name="home" size={30} color="#FFF" />
            </TouchableOpacity>
        </View>
    )
} 

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    botonflotante: {
        backgroundColor: '#5A87C6',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 30,
        right: 15,
    },
});


export default BotonFlotante