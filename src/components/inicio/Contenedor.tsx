import React, { ReactNode } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View } from 'react-native';

interface ContainerProps {
  children: ReactNode;
  floatingButton?: ReactNode;
  dialButton?: ReactNode; 
}

const Container = ({ children, floatingButton, dialButton }: ContainerProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {children}
      </ScrollView>
      {floatingButton}
      {dialButton}
    </SafeAreaView>
  );
};

const ContainerWithoutScroll = ({ children, floatingButton }: ContainerProps) => {
  return (
    <SafeAreaView style={styles.container}>
        {children}
      {floatingButton}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
  },
  
});

export { Container, ContainerWithoutScroll };

