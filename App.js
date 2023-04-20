import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableOpacity, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import styles from './screens/assets/stylesheet.js';
import Home from './screens/home.js'
import ViewDishes from './screens/viewdishes.js'
import EditDishes from './screens/editdishes.js'
import ViewOrders from './screens/vieworders.js'
import AddDish from './screens/adddish.js'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="ViewDishes" component={ViewDishes}
          options={{
            headerTitle: "", headerTransparent: true,
            animationEnabled: 'true',
          }}
        />
        <Stack.Screen name="EditDishes" component={EditDishes}
          options={{
            headerTitle: "", headerTransparent: true,
            animationEnabled: 'true',
          }}
        />
        <Stack.Screen name="ViewOrders" component={ViewOrders}
          options={{
            headerTitle: "", headerTransparent: true,
            animationEnabled: 'true',
          }}
        />
        <Stack.Screen name="AddDish" component={AddDish}
          options={{
            headerTitle: "", headerTransparent: true,
            animationEnabled: 'true',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
