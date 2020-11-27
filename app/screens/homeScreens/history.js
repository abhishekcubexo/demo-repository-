
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
import { Header } from '../../components'
import Dash from 'react-native-dash';

export class History extends Component {

    games = [1, 2, 3, 4, 5, 6, 7]

    constructor(props) {
        super(props)
    }

    _renderGames() {
        return this.games.map((item, i) => (<View key={i}>
            <View style={styles.dateRow}>
                <Text style={styles.dateText}>
                    27/07/2020
                </Text>
                <TouchableOpacity
                    activeOpacity={0.8}
                >
                    <Image
                        source={require('../../assets/images/delete.png')}
                        style={styles.deleteIcon}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.topScoreRow}>
                <View style={styles.scoreRowInner}>
                    <Text style={styles.scoreText}>
                        Balls:
                    </Text>
                    <View style={styles.scoreBox}>
                        <Text style={styles.scoreText}>
                            03
                    </Text>
                    </View>
                </View>
                <View style={styles.scoreRowInner}>
                    <Text style={styles.scoreText}>
                        Outs:
                    </Text>
                    <View style={styles.scoreBox}>
                        <Text style={styles.scoreText}>
                            05
                    </Text>
                    </View>
                </View>
            </View>
            <View style={styles.bottomScoreContainer}>
                <Dash
                    dashStyle={{
                        height: 5,
                        width: 1,
                    }}
                    dashGap={5}
                    dashColor='#343434'
                    style={{
                        height: '100%',
                        width: 1,
                        flexDirection: 'column',
                        position: 'absolute',
                        left: '50%',
                        overflow: 'hidden',
                    }} />
                <Dash
                    dashStyle={{
                        height: 1,
                        width: 5,
                    }}
                    dashGap={5}
                    style={{
                        width: '100%',
                        height: 1,
                        position: 'absolute',
                        overflow: 'hidden',
                        top: '50%'
                    }} />
                <View style={styles.bottomScoreRow}>
                    <Text
                        numberOfLines={1}
                        style={styles.nameText}>
                        Name 1
                    </Text>
                    <Text
                        numberOfLines={1}
                        style={styles.nameText}>
                        Name 2
                    </Text>
                </View>
                <View style={styles.bottomScoreRow}>
                    <View style={styles.scoreBox2}>
                        <Text style={styles.scoreText}>
                            05
                    </Text>
                    </View>
                    <View style={styles.scoreBox2}>
                        <Text style={styles.scoreText}>
                            10
                    </Text>
                    </View>
                </View>
            </View>
        </View>))
    }

    render() {
        return (
            <View
                style={styles.content}>
                <Header
                    title='History'
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
                        placeholder='Search'
                        placeholderTextColor='#D2D2D2'
                    />
                </View>
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                >
                    <View style={styles.scrollInner}>
                        {this._renderGames()}
                    </View>
                </ScrollView>
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
        paddingHorizontal: 19,
        paddingVertical: 8
    },
    dateRow: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 33
    },
    dateText: {
        color: '#747474',
        fontSize: 16,
        lineHeight: 18,
        fontFamily: 'ITCFranklinGothicStd-Book'
    },
    deleteIcon: {
        height: 19.73,
        width: 16.12
    },
    topScoreRow: {
        backgroundColor: '#343434',
        height: 40,
        marginTop: 16,
        paddingHorizontal: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    scoreRowInner: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    scoreText: {
        color: '#fff',
        fontFamily: 'ITCFranklinGothicStd-Med',
        fontSize: 20,
        lineHeight: 22
    },
    nameText: {
        color: '#fff',
        fontFamily: 'ITCFranklinGothicStd-Med',
        fontSize: 20,
        lineHeight: 22,
        width: '50%',
        textAlign: "center",
        paddingHorizontal: 10
    },
    scoreBox: {
        height: 39,
        width: 43,
        backgroundColor: 'rgba(0,0,0,0.2)',
        marginLeft: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottomScoreContainer: {
        backgroundColor: '#00AF40',
        height: 102,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5
    },
    bottomScoreRow: {
        height: 51,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    scoreBox2: {
        height: 39,
        width: 69,
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.2)'
    }
});
