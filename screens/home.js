import React, { Component } from 'react';
import { FlatList, ActivityIndicator, Text, View, Button, StyleSheet, Box, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-web';
import styles from './assets/stylesheet.js';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            menuData: [],
            cartItems: [],
            table: 0,
            counterUpdate: 0,
        }
    }
    
    render() {
        return (
            <View style={[styles.viewHome]}>
                <View style={[{ flex: 1}]}>
                    <TouchableOpacity style={[styles.box]}>
                        <Text style={[styles.text]} onPress={()=>{this.props.navigation.navigate('ViewDishes')}}>
                            View Dishes
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.box]} onPress={()=>{this.props.navigation.navigate('AddDish')}}>
                        <Text style={[styles.text]}>
                            Add New Dish
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.box]} onPress={()=>{this.props.navigation.navigate('ViewOrders')}}>
                        <Text style={[styles.text]}>
                            View Orders
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
