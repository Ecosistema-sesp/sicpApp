import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Keyboard, Animated } from 'react-native';

const Escudo = () => {
  const [offsetAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        Animated.timing(offsetAnim, {
          toValue: -60,
          duration: 200,
          useNativeDriver: true
        }).start();
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        Animated.timing(offsetAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true
        }).start();
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY: offsetAnim }] }]}>
      <Image
        style={styles.image}
        source={require('../../assets/escudo_unp.png')}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default Escudo;

