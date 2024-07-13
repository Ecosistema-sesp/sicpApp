import React from 'react';
import { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Linking, StyleSheet, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const DialButton = () => {
    const [keyboardStatus, setKeyboardStatus] = useState(false);

    const slideUp = () => {
        Linking.openURL('tel:103');
    };

    useEffect(() => {
        const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
          setKeyboardStatus(true);
        });
        const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
          setKeyboardStatus(false);
        });
    
        return () => {
          showSubscription.remove();
          hideSubscription.remove();
        };
      }, []);

    if (keyboardStatus) {
        return null;
    }

    return (
        <View style={styles.container}>
        <TouchableOpacity onPress={slideUp} style={styles.botonflotante}>
            <Icon name="call" size={30} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={slideUp} style={styles.textContainer}>
            <Text style={styles.text}>Línea vida</Text>
        </TouchableOpacity>
        </View>
    );
}

const DialButtonA = () => {

    const slideUp = () => {
        Linking.openURL('tel:103');
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={slideUp} style={styles.botonflotantea}>
                <Icon name="call" size={30} color="#FFF" />
            </TouchableOpacity>
        </View>
    );

}

const DialButtonB = () => {

    const slideUp = () => {
        Linking.openURL('tel:103');
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={slideUp} style={styles.botonflotanteb}>
                <Icon name="call" size={30} color="#FFF" />
            </TouchableOpacity>
        </View>
    );

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
        backgroundColor: '#008f39',
        width: 60,
        height: 60,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 30,
        right: 18,
    },
    text: {
        color: 'black',
        fontSize: 20,
        textAlign: 'center',
        fontWeight: '800',
        alignItems: 'center',
        position: 'absolute',
        bottom: 48,
        right: 90,
    },
    textContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
      },
    botonflotantea: {
        backgroundColor: '#008f39',
        width: 55,
        height: 55,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 85,
        right: -5,
    },
    botonflotanteb: {
        backgroundColor: '#008f39',
        width: 55,
        height: 55,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 5,
        right: -5,
    },     
});

export { DialButton, DialButtonA, DialButtonB }
