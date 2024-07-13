import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, Keyboard, Animated } from 'react-native';

const Unp = () => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [opacityAnim] = useState(new Animated.Value(1));
  const [offsetAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
        Animated.parallel([
          Animated.timing(opacityAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true
          }),
          Animated.timing(offsetAnim, {
            toValue: -60,
            duration: 200,
            useNativeDriver: true
          })
        ]).start();
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
        Animated.parallel([
          Animated.timing(opacityAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true
          }),
          Animated.timing(offsetAnim, {
            toValue: 0, 
            duration: 200,
            useNativeDriver: true
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
    <Animated.View style={[styles.container, { opacity: opacityAnim, transform: [{ translateY: offsetAnim }] }]}>
      <Text style={styles.unp}>
        Unidad Nacional de Protección
      </Text>
      <Text style={styles.sesp}>
        Subdirección Especializada de Seguridad y Protección
      </Text>
      <Text style={styles.sicp}>— SICP —</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    height: 120,
    marginBottom: 10,
  },
  unp: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '800',
    marginBottom: 5,
    color: '#02467E'
  },
  sesp: {
    fontSize: 13,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#5A87C6',
    marginBottom: 5,
  },
  sicp: {
    fontSize: 15,
    textAlign: 'center',
    fontWeight: '800',
    color: '#00447C',
    marginBottom: 5,
  }
});

export default Unp;
