
import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    TextInput,
    Image,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView
} from 'react-native'
import { Header, OpponentItem, InfoModal } from '../../components'

export class Opponents extends Component {

    users = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]


    constructor(props) {
        super(props)
        this.state = {
            filterType: 1,
            startModalVisible: false
        }
    }

    _renderUsers() {
        return this.users.map((item, i) => (
            <OpponentItem
            onPress={()=>{
                this.setState({
                    startModalVisible: true
                })
            }}
            key={i} />
        ))
    }

    render() {
        return (
            <View
                style={styles.content}>
                <Header
                    title='Find opponent'
                    goBack={() => {
                        this.props.navigation.goBack()
                    }}
                />
                <View style={styles.searchContainer}>
                    <Image
                        style={styles.searchIcon}
                        source={require('../../assets/images/search.png')}
                    />
                    <TextInput
                        style={styles.searchInput}
                        onChangeText={() => {

                        }}
                        placeholder='Search your oponent'
                        placeholderTextColor='#D2D2D2'
                    />
                </View>
                <Text style={styles.filterTitle}>
                    Filter by
                </Text>
                <View style={styles.filterRow}>
                    <TouchableWithoutFeedback
                        onPress={() => {
                            this.setState({
                                filterType: 1
                            })
                        }}
                    >
                        <View
                            style={this.state.filterType === 1 ? styles.filterButtonActive : styles.filterButton}
                        >
                            <Text style={[styles.filterButtonText, this.state.filterType === 1 ? { color: '#fff' } : null]}>
                                victory
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                        onPress={() => {
                            this.setState({
                                filterType: 2
                            })
                        }}
                    >
                        <View
                            style={this.state.filterType === 2 ? styles.filterButtonActive : styles.filterButton}
                        >
                            <Text style={[styles.filterButtonText, this.state.filterType === 2 ? { color: '#fff' } : null]}>
                                score
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                        onPress={() => {
                            this.setState({
                                filterType: 3
                            })
                        }}
                    >
                        <View
                            style={this.state.filterType === 3 ? styles.filterButtonActive : styles.filterButton}
                        >
                            <Text style={[styles.filterButtonText, this.state.filterType === 3 ? { color: '#fff' } : null]}>
                                strike
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <Text style={styles.desc}>
                    find your opponent from this list
                </Text>
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                >
                    <View style={styles.scrollInner}>
                        {this._renderUsers()}
                    </View>
                </ScrollView>
                <InfoModal
                text={'Do you want to start a game now?'}
                close={()=>{
                    this.setState({
                        startModalVisible: false
                    })
                }}
                yesPress={()=>{
                    this.setState({
                        startModalVisible: false
                    })
                    this.props.navigation.navigate('Game')
                }}
                visible={this.state.startModalVisible}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: '#fff',
    },
    searchContainer: {
        marginTop: 20,
        marginHorizontal: 19,
        height: 40,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#fff',
        backgroundColor: '#E9E9E9',
    },
    searchInput: {
        fontFamily: 'demi',
        fontSize: 16,
        padding: 0,
        flex: 1,
        paddingLeft: 24,
        paddingRight: 50
    },
    searchIcon: {
        position: "absolute",
        top: 12,
        right: 24,
        height: 16,
        width: 16
    },
    scrollInner: {
        paddingHorizontal: 18,
        paddingVertical: 8
    },
    filterTitle: {
        color: '#747474',
        fontFamily: 'ITCFranklinGothicStd-Med',
        fontSize: 20,
        lineHeight: 22,
        marginLeft: 18,
        marginTop: 15
    },
    filterRow: {
        flexDirection: "row",
        marginHorizontal: 18,
        marginVertical: 16
    },
    filterButton: {
        marginRight: 16,
        borderWidth: 1,
        borderColor: '#343434',
        height: 40,
        width: 77,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: 'center'
    },
    filterButtonActive: {
        marginRight: 16,
        backgroundColor: '#343434',
        height: 40,
        width: 77,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: 'center'
    },
    filterButtonText: {
        color: '#747474',
        fontSize: 16,
        fontFamily: 'ITCFranklinGothicStd-Med',
        lineHeight: 18
    },
    desc: {
        color: '#747474',
        fontFamily: 'ITCFranklinGothicStd-Book',
        fontSize: 12,
        lineHeight: 14,
        marginLeft: 18,
        marginBottom: 16
    },
});
