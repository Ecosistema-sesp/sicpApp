import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, Keyboard, Animated } from 'react-native';

interface CredencialesProps {
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
}

const Credenciales: React.FC<CredencialesProps> = ({ setUsername, setPassword }) => {
  const [paddingTopAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        Animated.timing(paddingTopAnim, {
          toValue: -60,
          duration: 200,
          useNativeDriver: false
        }).start();
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        Animated.timing(paddingTopAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false
        }).start();
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY: paddingTopAnim }] }]}>
      <TextInput
        style={styles.input}
        placeholder="Usuario"
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        onChangeText={setPassword}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 130,
    marginTop: 50
  },
  input: {
    height: 50,
    fontSize: 18,
    color: '#00447C',
    fontWeight: '500',
    borderColor: '#00467E',
    borderWidth: 1,
    marginRight: 8,
    marginLeft: 8,
    borderRadius: 10,
    marginBottom: 10,
    paddingLeft: 15
  },
})

export default Credenciales;
