import React, { Component } from 'react';
import { FlatList, ActivityIndicator, Text, View, Button, StyleSheet, Box, Image, Modal } from 'react-native';
import { TextInput, TouchableOpacity, ScrollView } from 'react-native-web';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './assets/stylesheet.js';

export default class ViewOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            orderData: [],
            orderTime: new Date(),
            orderTableNumber: '',
            orderCompleteModal: false,
            counter: 0,
            orderid: 0,
            noMoreOrders: false,
        }
    }

    getOrders() {
        return fetch("http://192.168.1.102:8080/api/vieworders.php",
            {
                headers: { 'Content-Type': 'application/json' }
            })
            .then((response) => {
                return response.json();
            })
            .then((responseJson) => {
                this.setState({
                    orderData: responseJson,
                    isLoading: false,
                }, () => { console.log(this.state.orderData) });
            })
            .catch((error) => {
                this.setState({
                    noMoreOrders: true
                })
                console.log(error);
            });
    }

    orderComplete() {
        return fetch("http://192.168.1.102:8080/api/ordercomplete.php",
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    'orderID': this.state.orderid
                })
            })
            .then(() => {
                this.setState({
                    orderid: 0,
                    isLoading: false,
                }, () => { this.getOrders() });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    timeSince = (time) => {
        let currentTime = new Date();
        let orderTime = new Date(time);

        var timeDifference = (currentTime.getTime() - orderTime.getTime()) / 1000

        switch (true) {
            case timeDifference < 60: {
                return Math.round(timeDifference) + " seconds"
            }
            case timeDifference > 60 && timeDifference / 60 < 60: {
                return Math.round(timeDifference / 60) + " minutes"
            }
            case timeDifference / 60 > 60: {
                return Math.round(timeDifference / 60 / 60) + " hours"
            }
        }
        //return (currentTime.getTime() - orderTime.getTime()) /1000/60
    }

    componentDidMount() {
        this.getOrders();

        this.timerId = setInterval(() => { this.getOrders() }, 10000)
    }

    componentWillUnmount() {
        clearInterval(this.timerId)
    }

    render() {
        if (this.state.noMoreOrders == true) {
            return (
                <View style={[{ top: '40%' }]}>
                    <Text style={{ color: 'gray', fontSize: 25, alignSelf: 'center' }}>
                        (No Orders)
                    </Text>
                    <TouchableOpacity style={[styles.box, { width: '40%', marginTop: 20, alignSelf: 'center' }]} onPress={() => { this.props.navigation.navigate('Home') }}>
                        <Text style={[styles.text]}>
                            Back
                        </Text>
                    </TouchableOpacity>
                </View>
            )
        }
        if (this.state.isLoading == true) {
            <View style={[{ top: '50%' }]}>
                <ActivityIndicator />
            </View>
        }
        return (
            <View style={[{ flex: 1, height: '100%', padding: 0 }]}>

                <Modal
                    animationType="none"
                    transparent={true}
                    visible={this.state.orderCompleteModal}
                    onRequestClose={() => {
                        this.setState({ orderCompleteModal: false });
                    }}>
                    <TouchableOpacity
                        style={{ width: '100%', flex: 1, backgroundColor: '#00000080', alignSelf: 'center' }}
                        activeOpacity={1}>
                        <View style={[styles.optionsPanelContacts, { height: 160, width: '90%', top: 200, right: '5%', borderRadius: 15 }]}>
                            <TouchableOpacity
                                style={{ alignSelf: 'center', width: '80%', marginTop: 5 }}
                                onPress={() => { this.setState({ orderCompleteModal: false }), this.orderComplete() }}>
                                <Text style={[styles.text, {
                                    fontSize: 20, color: '#2e4052', alignSelf: 'Center', alignItems: 'center',
                                    paddingHorizontal: 12, paddingVertical: 5,
                                    borderRadius: 5, borderWidth: 2, borderColor: '#000000', height: 40
                                }]}>
                                    Order Complete
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ alignSelf: 'center', width: '80%', marginTop: 5 }}
                                onPress={() => { this.setState({ orderCompleteModal: false }) }}>
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
                    <ScrollView style={{ flex: 9 }}>
                        <FlatList
                            data={this.state.orderData}
                            keyExtractor={item => item.orderid}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity activeOpacity={1} onPress={() => { this.setState({ orderCompleteModal: true, orderid: item.orderid }) }}>
                                        <View style={[styles.box, { flex: 1, flexDirection: 'column', paddingBottom: 15 }]}>
                                            <ScrollView style={[{ flex: 2, }]}>
                                                <Text style={[styles.menuText, { fontSize: 24 }]}>
                                                    {item.dish}
                                                </Text>
                                            </ScrollView>
                                            <View style={[{ flex: 1, }]}>
                                                <Text style={[styles.menuText, { fontSize: 18 }]}>
                                                    Table: {item.tablenumber} -- Order: {item.orderid}
                                                </Text>
                                            </View>
                                            <View style={[{ flex: 1, flexDirection: 'row', marginTop: -5 }]}>
                                                <Text style={[styles.menuText, { flex: 1, fontSize: 18, alignSelf: 'center' }]}>Ordered at: {item.time}
                                                </Text>
                                            </View>
                                            <View style={[{ flex: 1, flexDirection: 'row', marginTop: -5 }]}>
                                                <Text style={[styles.menuText, { flex: 1, fontSize: 18, alignSelf: 'center' }]}>Time Since: {this.timeSince(item.time)}
                                                </Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )
                            }}
                        />
                    </ScrollView>
                    <View style={{ flex: 1, marginBottom: 20 }}>
                        <TouchableOpacity style={[styles.box]} onPress={() => { this.props.navigation.navigate('Home') }}>
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
