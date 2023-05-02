import React, { Component } from 'react';
import { FlatList, ActivityIndicator, Text, View, Button, StyleSheet, Box, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-web';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

    getMenu() {
        return fetch("http://192.168.1.102:8080/api/menu.php",
            {
                headers: { 'Content-Type': 'application/json' }
            })
            .then((response) => {
                return response.json();
            })
            .then((responseJson) => {
                this.setState({
                    menuData: responseJson,
                    isLoading: false,
                },()=>{console.log(this.state.menuData)});
            })
            .catch((error) => {
                console.log(error);
            });
    }

    addItem(name, id, price) {
        var newCartItems = [];
        var updatedCartItems = this.state.cartItems

        if (updatedCartItems.find(data => data.itemid == id)) {
            var index = updatedCartItems.findIndex(data => data.itemid == id)
            updatedCartItems[index].amount += 1
            updatedCartItems[index].price += Number(price)

            this.setState({
                counterUpdate: this.state.counterUpdate += 1
            })
            return console.log("increased item by 1")
        } else {
            newCartItems.push({ itemid: id, dish: name, amount: 1, price: Number(price) });
            this.setState({
                cartItems: [...this.state.cartItems, ...newCartItems]
            });

            this.setState({
                counterUpdate: this.state.counterUpdate += 1
            })
            return console.log("added item")
        }
    }

    getTable() {
        let url = window.location.pathname
        this.setState({
            table: url.substr(7)
        })
    }

    remItem(id, price) {
        var updatedCartItems = this.state.cartItems

        if (updatedCartItems.find(data => data.itemid == id)) {
            var index = updatedCartItems.findIndex(data => data.itemid == id)

            switch (true) {
                case updatedCartItems[index].amount == 1: {
                    updatedCartItems.splice(index, 1)

                    this.setState({
                        counterUpdate: this.state.counterUpdate += 1
                    })
                    return console.log("removed item")
                }
                case updatedCartItems[index].amount > 1: {
                    updatedCartItems[index].amount -= 1
                    updatedCartItems[index].price -= Number(price)
                    this.setState({
                        counterUpdate: this.state.counterUpdate += 1
                    })
                    return console.log("reduced item by 1")
                }
            }
        } else {
            return
        }
    }

    goToCheckout() {
        console.log(this.state.cartItems);
        if (!this.state.cartItems.length > 0) {
            alert("cart empty")
        }
        else {
            this.props.navigation.navigate("Checkout", { cart: this.state.cartItems, tableNumber: this.state.table });
        }
    }

    getAmount = (id) => {
        const carts = this.state.cartItems
        if (carts.find(data => data.itemid == id)) {
            var index = carts.findIndex(data => data.itemid == id)
            return "x" + carts[index].amount
        } else {
            return ""
        }
    }

    isItemSpecial = (id) => {
        if(this.state.menuData.find(data => data.id == id)){
            var index = this.state.menuData.findIndex(data => data.id == id)

            switch(true){
                case Number(this.state.menuData[index].special)==1:{
                    return "*special*"
                }
                default:{
                    return ""
                }
            }
        }
    }

    componentDidMount() {
        this.getTable();
        this.getMenu();
    }

    render() {
        if (this.state.isLoading == true) {
            return (
                <View style={[{top:'50%'}]}>
                    <ActivityIndicator />
                </View>
            )
        }
        return (
            <View style={[styles.viewHome]}>
                <View style={[{ flex: 1, marginTop:'50%'}]}>
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
