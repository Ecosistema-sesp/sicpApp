import React, { useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Icon from 'react-native-vector-icons/Ionicons';
import { BackHandler } from 'react-native';

import NovedadesStackScreen from "./Novedades";
import EsquemaStackScreen from "./Esquema";
import DirectorioStackScreen from "./Directorio";
import RutasStackScreen from "./Rutas";

const Tab = createMaterialBottomTabNavigator();

export const Panel = () => {
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const backAction = () => {
          BackHandler.exitApp();
          return true;
        };

      
        const backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          backAction
        );
      
        return () => backHandler.remove(); 
      }, []);
      
    useEffect(() => {
        const loadComponents = async () => {
            setTimeout(() => {
                setLoading(false);
            }, 1000); 
        };
        loadComponents();
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#5A87C6" />
            </View>
        );
    }



    return (
        
        <Tab.Navigator
            barStyle={{
                backgroundColor: '#FFF',
            }}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color }) => {
                    let iconName;

                    if (route.name === 'Reportes') {
                        iconName = focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline';
                    } else if (route.name === 'Esquema') {
                        iconName = focused ? 'car' : 'car-outline';
                    } else if (route.name === 'Directorio') {
                        iconName = focused ? 'call' : 'call-outline';
                    } else if (route.name === 'Rutas') {
                        iconName = focused ? 'map' : 'map-outline';
                    }

                    return <Icon name={iconName} size={25} color="#5A87C6" />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name='Reportes' component={NovedadesStackScreen} />
            <Tab.Screen name='Esquema' component={EsquemaStackScreen} />
            <Tab.Screen name='Directorio' component={DirectorioStackScreen} />
            <Tab.Screen name='Rutas' component={RutasStackScreen} />
        </Tab.Navigator>

    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
    },
});

