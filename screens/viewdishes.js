import React, { Component } from 'react';
import { FlatList, ActivityIndicator, Text, View, Button, StyleSheet, Box, Image, Modal } from 'react-native';
import { TextInput, TouchableOpacity, ScrollView } from 'react-native-web';
import styles from './assets/stylesheet.js';

export default class ViewDishes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            menuData: [],
            itemOptionsModal: false,
            dishID: '',
        }
    }

    getMenu() {
        return fetch("http://16.16.126.246/menu.php",
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
                });
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

    componentDidMount() {
        this.getMenu();

        this.props.navigation.addListener('focus', async () => {
            await this.setState({
                isLoading: true,
                dishID:'',
            })
            this.getMenu()
        });
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
                                onPress={() => { this.setState({itemOptionsModal: false}), this.props.navigation.navigate('EditDishes', {dishID: this.state.dishID})}}>
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
                                onPress={() => { this.setState({ itemOptionsModal: false })}}>
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
                            data={this.state.menuData}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity onPress={()=>{ this.setState({ itemOptionsModal: true, dishID: item.id})}}>
                                        <View style={[styles.box, { flex: 1, flexDirection: 'column', paddingBottom: 15 }]}>
                                            <View style={[{ flex: 1, }]}>
                                                <Text style={[styles.menuText, { fontSize: 24 }]}>
                                                    {item.dish} - £{item.price / 100}
                                                </Text>
                                            </View>
                                            <View style={[{ flex: 1, marginVertical: 20 }]}>
                                                <Text style={[styles.menuTextDesc, { fontSize: 18 }]}>{item.desc}
                                                </Text>
                                            </View>
                                            <View style={[{ flex: 1, flexDirection: 'row', marginTop: -5 }]}>
                                                <Text style={[styles.menuTextDesc, { flex: 1, fontSize: 18, marginTop: 5 }]}>Available: {item.available}
                                                </Text>
                                                <Text style={[styles.menuTextDesc, { flex: 1, fontSize: 18, alignSelf: 'center' }]}>Type: {item.type}
                                                </Text>
                                            </View>
                                            <View style={[{ flex: 1, flexDirection: 'row', marginTop: -5 }]}>
                                                <Text style={[styles.menuText, { flex: 1, fontSize: 18, alignSelf: 'center' }]}>Quantity: {item.quantity}
                                                </Text>
                                                <Text style={[styles.menuTextDesc, { flex: 1, fontSize: 18, alignSelf: 'center' }]}>Special: {item.special}
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
