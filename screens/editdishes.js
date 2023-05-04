import React, { Component } from 'react';
import { FlatList, ActivityIndicator, Text, View, Button, StyleSheet, Box, Image, Modal } from 'react-native';
import { TextInput, TouchableOpacity, ScrollView } from 'react-native-web';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './assets/stylesheet.js';

export default class EditDishes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dishData: undefined,
            itemOptionsModal: false,
            updatedDishData: [],
            dishID: '',
            dishName: '',
            dishPrice: '',
            dishDescription: '',
            dishQuantity: '',
            dishAvailable: '',
            dishSpecial: '',
        }
    }

    getDish() {
        return fetch("http://13.53.140.87/getdish.php",
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    'dishID': this.state.dishID
                })
            })
            .then((response) => {
                return response.json();
            })
            .then((responseJson) => {
                this.setState({
                    dishData: responseJson,
                    isLoading: false,
                }, () => { console.log(this.state.dishData) });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    updateDish() {
        return fetch("http://13.53.140.87/updatedish.php",
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    'updatedDish': this.state.updatedDishData[0]
                })
            })
            .then((response) => {
                this.setState({
                    updatedDishData: [],
                    dishName: '',
                    dishPrice: '',
                    dishDescription: '',
                    dishQuantity: '',
                    dishAvailable: '',
                    dishSpecial: '',
                })
                this.getDish();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    isItemSpecial = (id) => {
        if (this.state.menuData.find(data => data.id == id)) {
            var index = this.state.menuData.findIndex(data => data.id == id)

            switch (true) {
                case Number(this.state.menuData[index].special) == 1: {
                    return "*special*"
                }
                default: {
                    return ""
                }
            }
        }
    }

    dishNameChange = (text) => {
        this.setState({ dishName: text, })
    }
    dishPriceChange = (text) => {
        this.setState({ dishPrice: text, })
    }
    dishDescriptionChange = (text) => {
        this.setState({ dishDescription: text, })
    }
    dishQuantityChange = (text) => {
        this.setState({ dishQuantity: text, })
    }
    dishAvailableChange = (text) => {
        this.setState({ dishAvailable: text, })
    }
    dishSpecialChange = (text) => {
        this.setState({ dishSpecial: text, })
    }

    componentDidMount() {
        this.setState({
            dishID: this.props.route.params.dishID
        }, () => { this.getDish(); })
    }

    updateDishInfo() {
        var updatedDish = this.state.dishData
        if (this.state.dishName == '') {
            updatedDish[0].dish = this.state.dishData[0].dish
        }
        else {
            updatedDish[0].dish = this.state.dishName
        }
        if (this.state.dishPrice == '') {
            updatedDish[0].price = Number(this.state.dishData[0].price)
        }
        else {
            updatedDish[0].price = Number(this.state.dishPrice)
        }
        if (this.state.dishDescription == '') {
            updatedDish[0].desc = this.state.dishData[0].desc
        }
        else {
            updatedDish[0].desc = this.state.dishDescription
        }
        if (this.state.dishQuantity == '') {
            updatedDish[0].quantity = Number(this.state.dishData[0].quantity)
        }
        else {
            updatedDish[0].quantity = Number(this.state.dishQuantity)
        }
        if (this.state.dishAvailable == '') {
            updatedDish[0].available = Number(this.state.dishData[0].available)
        }
        else {
            updatedDish[0].available = Number(this.state.dishAvailable)
        }
        if (this.state.dishSpecial == '') {
            updatedDish[0].special = Number(this.state.dishData[0].special)
        }
        else {
            updatedDish[0].special = Number(this.state.dishSpecial)
        }

        updatedDish[0].id = Number(this.state.dishData[0].id)

        this.setState({
            updatedDishData: updatedDish
        }, () => { this.updateDish() })
    }

    render() {
        if (this.state.isLoading == true) {
            return (
                <View style={[{ top: '50%' }]}>
                    <ActivityIndicator />
                </View>
            )
        }
        return (
            <View style={[{ flex: 1, height: '100%', padding: 0 }]}>

                <Modal
                    animationType="none"
                    transparent={true}
                    visible={this.state.itemOptionsModal}
                    onRequestClose={() => {
                        this.setState({ itemOptionsModal: false });
                    }}>
                    <TouchableOpacity
                        style={{ width: '100%', flex: 1, backgroundColor: '#00000080', alignSelf: 'center' }}
                        activeOpacity={1}>
                        <View style={[styles.optionsPanelContacts, { height: 160, width: '90%', top: 200, right: '5%', borderRadius: 15 }]}>
                            <TouchableOpacity
                                style={{ alignSelf: 'center', width: '80%', marginTop: 5 }}
                                onPress={() => { this.props.navigation.navigate('EditDishes', { dishID: this.state.dishID }) }}>
                                <Text style={[styles.text, {
                                    fontSize: 20, color: '#2e4052', alignSelf: 'Center', alignItems: 'center',
                                    paddingHorizontal: 12, paddingVertical: 5,
                                    borderRadius: 5, borderWidth: 2, borderColor: '#000000', height: 40
                                }]}>
                                    Edit dish information
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ alignSelf: 'center', width: '80%', marginTop: 5 }}
                                onPress={() => { this.setState({ itemOptionsModal: false }) }}>
                                <Text style={[styles.text, {
                                    fontSize: 20, color: '#2e4052', alignSelf: 'Center', alignItems: 'center',
                                    paddingHorizontal: 12, paddingVertical: 5,
                                    borderRadius: 5, borderWidth: 2, borderColor: '#000000', height: 40
                                }]}>
                                    Cancel
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </Modal>

                <View style={[{ flex: 1, padding: 5, marginTop: 60 }]}>
                    <ScrollView style={{ flex: 8 }}>
                        <Text style={[styles.text]}>
                            Name: {this.state.dishData[0].dish}
                        </Text>
                        <TextInput style={[styles.textInput]} placeholder='Dish Name' value={this.state.dishName} onChangeText={this.dishNameChange} />
                        <Text style={[styles.text]}>
                            Price: {this.state.dishData[0].price}
                        </Text>
                        <TextInput style={[styles.textInput]} placeholder='price in pence (999 for £9.99)' value={this.state.dishPrice} onChangeText={this.dishPriceChange} />
                        <Text style={[styles.text]}>
                            Description: {this.state.dishData[0].desc}
                        </Text>
                        <TextInput style={[styles.textInput]} placeholder='Description' value={this.state.dishDescription} onChangeText={this.dishDescriptionChange} />
                        <Text style={[styles.text]}>
                            Quantity: {this.state.dishData[0].quantity}
                        </Text>
                        <TextInput style={[styles.textInput]} placeholder='Quantity' value={this.state.dishQuantity} onChangeText={this.dishQuantityChange} />
                        <Text style={[styles.text]}>
                            Available: {this.state.dishData[0].available}
                        </Text>
                        <TextInput style={[styles.textInput]} placeholder='1 = available, 0 = unavailable' value={this.state.dishAvailable} onChangeText={this.dishAvailableChange} />
                        <Text style={[styles.text]}>
                            Special: {this.state.dishData[0].special}
                        </Text>
                        <TextInput style={[styles.textInput]} placeholder='1 = special, 0 = not special' value={this.state.dishSpecial} onChangeText={this.dishSpecialChange} />
                    </ScrollView>
                    <View style={{ flex: 3, }}>
                        <TouchableOpacity style={[styles.box]} onPress={() => { this.updateDishInfo() }}>
                            <Text style={[styles.text]}>
                                Update Dish Information
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.box]} onPress={() => { this.props.navigation.navigate('ViewDishes') }}>
                            <Text style={[styles.text]}>
                                Back
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}
