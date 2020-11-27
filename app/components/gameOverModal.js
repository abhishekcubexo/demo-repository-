
import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableWithoutFeedback
} from 'react-native'
import Dash from 'react-native-dash';
import Modal from 'react-native-modal';

export class GameOverModal extends Component {

    constructor(props) {
        super(props)
    }

    scoreFormat(value) {
        return value < 10 ? '0' + value : value
    }

    _renderScoreItem() {
        return (<View style={{ marginTop: '20%' }}>
            <View style={styles.topScoreRow}>
                <View style={styles.scoreRowInner}>
                    <Text style={styles.scoreText}>
                        Balls:
                    </Text>
                    <View style={styles.scoreBox}>
                        <Text style={styles.scoreText}>
                            {this.scoreFormat(this.props.game.balls)}
                    </Text>
                    </View>
                </View>
                <View style={styles.scoreRowInner}>
                    <Text style={styles.scoreText}>
                        Outs:
                    </Text>
                    <View style={styles.scoreBox}>
                        <Text style={styles.scoreText}>
                        {this.scoreFormat(this.props.game.outs)}
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
                        {this.scoreFormat(this.props.game.team1)}
                    </Text>
                    </View>
                    <View style={styles.scoreBox2}>
                        <Text style={styles.scoreText}>
                        {this.scoreFormat(this.props.game.team2)}
                    </Text>
                    </View>
                </View>
            </View>
        </View>)
    }

    _renderResultText(){
        let text = 'Team 1 and Team 2 have the same number of points, this is a draw'
        if(this.props.game.team1 > this.props.game.team2){
            text = 'Winner is Team1'
        }
        else if(this.props.game.team1 < this.props.game.team2){
            text = 'Winner is Team2'
        }
        return text
    }

    render() {
        return (<Modal
            backdropTransitionOutTiming={0}
            style={{ margin: 0 }}
            isVisible={this.props.visible}>
            <View
                style={styles.content}>
                <Text style={styles.title}>
                    GAME OVER
                    </Text>
                <Text style={styles.desc}>
                    {this._renderResultText()}
                    </Text>
                {this._renderScoreItem()}
                <View style={styles.buttonsRow}>
                    <TouchableWithoutFeedback
                        onPress={() => {
                            this.props.menu()
                        }}
                    >
                        <View style={styles.yesButton}>
                            <Text style={styles.buttonText}>
                                Menu
                                    </Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                        onPress={() => {
                            this.props.replay()
                        }}
                    >
                        <View style={styles.noButton}>
                            <Text style={[styles.buttonText, { color: '#747474' }]}>
                                Replay
                                    </Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        </Modal>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: "center",
        paddingHorizontal: 19
    },
    title: {
        color: '#747474',
        fontFamily: 'ITCFranklinGothicStd-Med',
        fontSize: 32,
        lineHeight: 36,
        textAlign: "center"
    },
    desc: {
        color: '#00AF40',
        fontSize: 20,
        lineHeight: 24,
        fontFamily: 'ITCFranklinGothicStd-Med',
        textAlign: "center",
        marginTop: 16
    },
    topScoreRow: {
        backgroundColor: '#343434',
        height: 40,
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
    },
    buttonsRow: {
        marginTop: '30%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    yesButton: {
        backgroundColor: '#00AF40',
        flex: 1,
        height: 40,
        marginRight: 7,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    noButton: {
        flex: 1,
        height: 40,
        marginLeft: 7,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#FF5C00'
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        lineHeight: 22,
        fontFamily: 'ITCFranklinGothicStd-Med',

    }
});
