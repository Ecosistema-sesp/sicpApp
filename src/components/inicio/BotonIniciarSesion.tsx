import React, { useEffect, useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Keyboard, Animated } from "react-native";

interface BtnIniciarSesionProps {
  onPress: () => void;
}

const BtnIniciarSesion: React.FC<BtnIniciarSesionProps> = ({ onPress }) => {
    const [paddingTopAnim] = useState(new Animated.Value(0));
    const [opacityAnim] = useState(new Animated.Value(1));

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                Animated.parallel([
                    Animated.timing(paddingTopAnim, {
                        toValue: 60,
                        duration: 200,
                        useNativeDriver: false
                    }),
                    Animated.timing(opacityAnim, {
                        toValue: 0,
                        duration: 200,
                        useNativeDriver: false
                    })
                ]).start();
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                Animated.parallel([
                    Animated.timing(paddingTopAnim, {
                        toValue: 0,
                        duration: 200,
                        useNativeDriver: false
                    }),
                    Animated.timing(opacityAnim, {
                        toValue: 1,
                        duration: 200,
                        useNativeDriver: false
                    })
                ]).start();
            }
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    return (
        <Animated.View style={[styles.iniciarsesion, { transform: [{ translateY: paddingTopAnim }], opacity: opacityAnim }]}>
            <TouchableOpacity style={styles.boton} onPress={onPress}>
                <Text style={styles.text}>Iniciar sesión</Text>
            </TouchableOpacity>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    iniciarsesion: {
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

export default BtnIniciarSesion;
