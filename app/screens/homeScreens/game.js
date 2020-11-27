
import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    Text,
    TouchableWithoutFeedback,
    ScrollView
} from 'react-native'
import {
    InfoModal,
    GameSettingsModal,
    GameOverModal,
    PlayModal,
    Switch
} from '../../components'

export class Game extends Component {


    activeGameStep = 0
    gameState = [
        {
            balls: 0,
            outs: 0,
            team1: 0,
            team2: 0,
            inning: 1,
            bases: [
                {
                    active: false,
                },
                {
                    active: false,
                },
                {
                    active: false,
                }
            ],
            topBottom: 1,
            hitCount: 9,
            doneHits: 0
        },
    ]

    baseStyles = [
        {
            top: 110,
            right: 110
        },
        {
            top: 60,
            left: 179
        },
        {
            top: 110,
            left: 108
        }
    ]

    constructor(props) {
        super(props)
        this.state = {
            settingsModalVisible: false,

            game: {
                balls: 0,
                outs: 0,
                team1: 0,
                team2: 0,
                inning: 1,
                bases: [
                    {
                        active: false,
                    },
                    {
                        active: false,
                    },
                    {
                        active: false,
                    }
                ],
                topBottom: 1,
                hitCount: 9,
                doneHits: 0
            },

            terminateModalVisible: false,
            finishModalVisible: false,
            gameOverModalVisible: false,
            infoModalVisible: false
        }
    }

    undo() {
        console.log('qqqqqqq', this.gameState[this.activeGameStep]);
        this.activeGameStep--
        this.setState({
            game: { ...this.gameState[this.activeGameStep] },
            settingsModalVisible: false,
        })
        console.log('undo');
    }

    redo() {
        this.activeGameStep++
        this.setState({
            game: { ...this.gameState[this.activeGameStep] },
            settingsModalVisible: false,
        })
        console.log('redo');
    }

    scoreFormat(value) {
        return value < 10 ? '0' + value : value
    }

    editGame(data) {
        console.log('DATA: ', data);
        let tempGame = {
            ...this.state.game,
            ...data,
        }
        if (data.inning || data.topBottom) {
            tempGame.doneHits = 0
        }
        else {
            if (this.state.game.doneHits + 1 >= this.state.game.hitCount) {
                tempGame.doneHits = 0
                tempGame.hitCount = 9
                tempGame.bases = this.state.game.bases.map(() => ({ active: false }))
                tempGame.balls = 0
                tempGame.outs = 0
                if (this.state.game.topBottom === 1) {
                    tempGame.topBottom = 2
                }
                else {
                    tempGame.topBottom = 1
                    tempGame.inning = this.state.game.inning + 1
                }
            }
            else {
                tempGame.doneHits = this.state.game.doneHits + 1
            }
        }
        this.setState({
            game: tempGame,
            settingsModalVisible: false,
        })
        let tempArr = this.gameState.slice(0, this.activeGameStep + 1)
        console.log('aaaaaaaa', this.gameState);
        this.activeGameStep++
        tempArr.push(tempGame,)
        this.gameState = tempArr.map((obj) => ({
            ...obj,
            bases: obj.bases.map((o) => (Object.assign({}, o)))
        }))//JSON.parse(JSON.stringify(tempArr))
        console.log(this.activeGameStep);
        console.log(this.gameState);
    }

    changeScore(i, ball) {
        let tmpScore = 0
        let data = {
            balls: ball ? this.state.game.balls : 0
        }
        let mutationIndexes = []
        let array = Object.assign([], this.state.game.bases)
        for (let index = 0; index < array.length; index++) {
            if (array[index].active) {
                if (index + 1 + i + 1 >= 4) {
                    array[index].active = false
                    tmpScore++
                }
            }
        }

        for (let index = 0; index < array.length; index++) {
            if (array[index].active) {
                console.log('active base number: ', array[index].baseNumber);
                if (index + 1 + i + 1 < 4) {
                    array[index].active = false
                    mutationIndexes.push(index + i + 1)
                }
            }
        }
        console.log('mutationIndexes', mutationIndexes);
        for (let mutInd = 0; mutInd < mutationIndexes.length; mutInd++) {
            array[mutationIndexes[mutInd]].active = true
        }
        if (!ball) {
            array[i].active = true
        }

        data.bases = array
        console.log('ARRAY');
        console.log(array);
        if (this.state.game.topBottom === 1) {
            data.team1 = this.state.game.team1 + tmpScore
        }
        else {
            data.team2 = this.state.game.team2 + tmpScore
        }
        this.editGame(data)
    }

    _renderBases() {
        return this.state.game.bases.map((item, i) => (
            <TouchableWithoutFeedback
                onPress={() => {
                    this.changeScore(i)
                }}
                key={i}>
                <View style={[
                    styles.base,
                    this.baseStyles[i],
                    item.active ? { backgroundColor: 'red' } : null
                ]}>

                </View>
            </TouchableWithoutFeedback>
        ))
    }

    _renderHR() {
        return (<TouchableWithoutFeedback
            onPress={() => {
                let tmpScore = 1
                let data = {}
                let array = Object.assign([], this.state.game.bases)
                for (let index = 0; index < array.length; index++) {
                    if (array[index].active) {
                        array[index].active = false
                        tmpScore++
                    }
                }
                data.bases = array
                if (this.state.game.topBottom === 1) {
                    data.team1 = this.state.game.team1 + tmpScore
                }
                else {
                    data.team2 = this.state.game.team2 + tmpScore
                }
                this.editGame(data)
            }}
        >
            <View style={[
                styles.base,
                {
                    borderRadius: 20,
                    height: 40,
                    width: 40,
                    bottom: 16,
                    left: 176.5
                },
            ]}>

            </View>
        </TouchableWithoutFeedback>)
    }

    resetAll() {
        this.setState({
            game: {
                balls: 0,
                outs: 0,
                team1: 0,
                team2: 0,
                inning: 1,
                topBottom: 1,
                bases: [
                    {
                        active: false,
                    },
                    {
                        active: false,
                    },
                    {
                        active: false,
                    }
                ],
            },

            settingsModalVisible: false
        })
        this.activeGameStep = 0
        this.gameState = [
            {
                balls: 0,
                outs: 0,
                team1: 0,
                team2: 0,
                inning: 1,
                topBottom: 1,
                bases: [
                    {
                        active: false,
                    },
                    {
                        active: false,
                    },
                    {
                        active: false,
                    }
                ],
            }
        ]
    }

    out() {
        let data = {
            outs: this.state.game.outs + 1,
            balls: 0
        }

        if (data.outs > 2) {
            data.topBottom = this.state.game.topBottom == 1 ? 2 : 1,
                data.outs = 0
            data.bases = this.state.game.bases.map(() => ({ active: false }))
            if (this.state.game.topBottom == 2) {
                data.inning = this.state.game.inning + 1
                if (this.state.game.inning > 9 && this.state.game.team1 != this.state.game.team2) {
                    this.setState({
                        gameOverModalVisible: true
                    })
                }
            }
            else {
                if (this.state.game.inning == 9 && this.state.game.team1 != this.state.game.team2) {
                    this.setState({
                        gameOverModalVisible: true
                    })
                }
            }
        }
        this.editGame(data)

    }

    ball() {

        let data = {
            balls: this.state.game.balls + 1
        }
        this.state.game.balls = this.state.game.balls + 1
        console.log(this.state.game.balls);
        console.log(this.state.game.bases);
        let array = Object.assign([], this.state.game.bases)
        if (data.balls == 4) {
            if (array.filter((item) => item.active).length == 3) {
                if (this.state.game.topBottom === 1) {
                    data.team1 = this.state.game.team1 + 1
                }
                else {
                    data.team2 = this.state.game.team2 + 1
                }
            }
            else {
                for (let index = 0; index < array.length; index++) {
                    if (!array[index].active) {
                        array[index].active = true
                        break
                    }
                }
            }
            this.editGame(data)
        }
        else if (data.balls == 5) {
            if (array.filter((item) => item.active).length == 3) {
                console.log('OOOOOOOOOOOOOOOOOOO');
                console.log(array);
                this.changeScore(0, true)
            }
            else {
                for (let i = 2; i >0; i--) {
                    console.log('INDEX: ',i);
                    if (!array[i].active && array[i - 1].active) {
                        array[i].active = true
                        array[i - 1].active = false
                    }
                }
                data.bases = array
                this.editGame(data)
            }
          
        }
        else if (data.balls > 4 && !array.filter((item) => item.active).length) {
            array[0].active = true
            data.bases = array
            this.editGame(data)
        }
        else if (data.balls > 4) {
            this.changeScore(0, true)
        }
        else {
            this.editGame(data)
        }


    }

    render() {
        return (
            <View
                style={styles.content}>
                <View style={styles.header}>
                    <Image
                        style={styles.logo}
                        source={require('../../assets/images/logoBlack.png')}
                    />
                    <TouchableOpacity
                        onPress={() => {
                            this.scroll.scrollTo({ x: 0, y: 0, animated: true })
                            this.setState({
                                settingsModalVisible: true
                            })
                        }}
                        activeOpacity={0.8}
                    >
                        <View style={styles.buttonLine} />
                        <View style={styles.buttonLine} />
                        <View style={styles.buttonLine} />
                    </TouchableOpacity>
                </View>
                <ScrollView
                    ref={(ref) => { this.scroll = ref }}
                    contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={styles.scoreContainer}>
                        <View style={styles.scoreContainerInner}>
                            <View style={styles.topScoreRow}>
                                <View style={styles.scoreRowInner}>
                                    <Text style={styles.scoreTitle}>
                                        Balls:
                    </Text>
                                    <View style={styles.scoreBox}>
                                        <Text style={styles.scoreText}>
                                            {this.scoreFormat(this.state.game.balls)}
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.scoreRowInner}>
                                    <Text style={styles.scoreTitle}>
                                        Outs:
                    </Text>
                                    <View style={styles.scoreBox}>
                                        <Text style={styles.scoreText}>
                                            {this.scoreFormat(this.state.game.outs)}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.scoreRow}>
                                <View>
                                    <Text style={styles.scoreTitle2}>
                                        Home
                        </Text>
                                    <Text style={styles.scoreTitle}>
                                        Team 1 Name
                        </Text>
                                </View>
                                <View style={[styles.scoreBox, { width: 69 }]}>
                                    <Text style={styles.scoreText}>
                                        {this.scoreFormat(this.state.game.team1)}
                                    </Text>
                                </View>
                            </View>
                            <View style={[styles.scoreRow, { borderBottomWidth: 0 }]}>
                                <View>
                                    <Text style={styles.scoreTitle2}>
                                        Away
                        </Text>
                                    <Text style={styles.scoreTitle}>
                                        Team 2 Name
                        </Text>
                                </View>
                                <View style={[styles.scoreBox, { width: 69 }]}>
                                    <Text style={styles.scoreText}>
                                        {this.scoreFormat(this.state.game.team2)}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.topRow, { marginTop: 4 }]}>
                        <View style={styles.innContainer}>
                            <Text style={styles.scoreTitle}>
                                Inn
                        </Text>
                            <Text style={[styles.scoreText, { marginLeft: 10 }]}>
                                {this.state.game.inning}
                            </Text>
                        </View>
                        <View style={styles.buttonsRow1}>
                            <TouchableWithoutFeedback
                                onPress={() => {
                                    if (this.state.game.topBottom != 1) {
                                        let data = {
                                            bases: this.state.game.bases.map(() => ({ active: false })),
                                            outs: 0,
                                            topBottom: 1
                                        }
                                        this.editGame(data)
                                    }
                                }}
                            >
                                <View style={[styles.topBottom,
                                this.state.game.topBottom == 1 ? { backgroundColor: '#009400' } : null]}>
                                    <Text style={[styles.scoreTitle,
                                    this.state.game.topBottom == 1 ? null : { color: '#747474' }]}>
                                        Top
                        </Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback
                                onPress={() => {
                                    if (this.state.game.topBottom != 2) {
                                        let data = {
                                            bases: this.state.game.bases.map(() => ({ active: false })),
                                            outs: 0,
                                            topBottom: 2
                                        }
                                        this.editGame(data)
                                    }
                                }}
                            >
                                <View style={[styles.bottomButton,
                                this.state.game.topBottom == 2 ? { backgroundColor: '#009400' } : null]}>
                                    <Text style={[styles.scoreTitle,
                                    this.state.game.topBottom == 2 ? null : { color: '#747474' }]}>
                                        Bottom
                        </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                    <View style={[styles.topRow, { marginTop: 45, marginBottom: 32 }]}>
                        <View style={[styles.buttonsRow1, { width: 160 }]}>
                            <View style={[styles.topBottom, { backgroundColor: '#009400' }]}>
                                <View style={styles.row}>
                                    <Text style={styles.scoreTitle}>
                                        Done
                        </Text>
                                    <Text style={[styles.scoreText, { marginLeft: 8 }]}>
                                        {this.state.game.doneHits}
                                    </Text>
                                </View>
                            </View>
                            <View style={[styles.bottomButton, { backgroundColor: '#343434' }]}>
                                <View style={styles.row}>
                                    <Text style={styles.scoreTitle}>
                                        Total
                        </Text>
                                    <Text style={[styles.scoreText, { marginLeft: 8 }]}>
                                        {this.state.game.hitCount}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <Text style={[styles.scoreTitle, { color: '#747474', fontSize: 16 }]}>
                                EH
                        </Text>
                            <Switch
                                active={this.state.game.hitCount == 10}
                                activeBackgroundColor='#DFDFDF'
                                inactiveBackgroundColor='#DFDFDF'
                                activeButtonColor='#009400'
                                inactiveButtonColor='#009400'
                                activeButtonPressedColor='#009400'
                                inactiveButtonPressedColor='#009400'
                                buttonRadius={7.2}
                                border={4}
                                onActivate={() => {
                                    console.log('onActivate');
                                    let data = {
                                        hitCount: 10
                                    }
                                    this.editGame(data)
                                }}
                                onDeactivate={() => {
                                    console.log('onDeactivate');
                                    let data = {
                                        hitCount: 9
                                    }
                                    this.editGame(data)
                                }}
                            />
                            <TouchableWithoutFeedback
                                onPress={() => {
                                    this.setState({
                                        infoModalVisible: true
                                    })
                                }}
                            >
                                <View style={styles.infoButton}>
                                    <Image
                                        source={require('../../assets/images/info.png')}
                                        style={styles.infoIcon}
                                    />
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                    <View style={styles.squareContainer}>
                        <Image
                            source={require('../../assets/images/square.png')}
                            style={styles.squareImage}
                        />
                        {this._renderBases()}
                        {this._renderHR()}
                    </View>
                    <Text style={[styles.scoreTitle, { textAlign: "center", color: '#747474' }]}>
                        HR
                        </Text>
                    <View style={styles.buttonsRow2}>
                        <TouchableWithoutFeedback
                            onPress={() => {
                                this.out()
                            }}
                        >
                            <View style={[styles.outBallButton, { marginRight: 8 }]}>
                                <Text style={styles.scoreText}>
                                    Out
                        </Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback
                            onPress={() => {
                                this.ball()
                            }}
                        >
                            <View style={styles.outBallButton}>
                                <Text style={styles.scoreText}>
                                    Ball
                        </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <TouchableWithoutFeedback
                        onPress={() => {
                            this.scroll.scrollTo({ x: 0, y: 0, animated: true })
                            this.setState({
                                settingsModalVisible: true
                            })
                        }}
                    >
                        <View style={styles.settingsButton}>
                            <Text style={styles.scoreText}>
                                Game settings
                        </Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <GameSettingsModal
                        undo={() => {
                            this.undo()
                        }}
                        undoActive={this.activeGameStep}
                        redo={() => {
                            this.redo()
                        }}
                        redoActive={this.gameState.length > this.activeGameStep + 1}
                        terminate={() => {
                            this.setState({
                                settingsModalVisible: false,
                                terminateModalVisible: true
                            })
                        }}
                        close={() => {
                            this.setState({
                                settingsModalVisible: false
                            })
                        }}
                        changeInnings={() => {
                            let data = {}
                            data.inning = this.state.game.inning + 1
                            data.bases = this.state.game.bases.map(() => ({ active: false }))
                            this.editGame(data)
                        }}
                        resetAll={() => {
                            this.resetAll()
                        }}
                        finishGame={() => {
                            this.setState({
                                settingsModalVisible: false,
                                finishModalVisible: true
                            })
                        }}
                        visible={this.state.settingsModalVisible}
                    />
                </ScrollView>
                <InfoModal
                    text={'Are you sure you want to terminate the game ?'}
                    close={() => {
                        this.setState({
                            terminateModalVisible: false
                        })
                    }}
                    yesPress={() => {
                        this.setState({
                            terminateModalVisible: false
                        })
                        this.props.navigation.navigate('Home')
                    }}
                    visible={this.state.terminateModalVisible}
                />
                <InfoModal
                    text={'Are you sure you want to finish the game and find out who is the winner ?'}
                    close={() => {
                        this.setState({
                            finishModalVisible: false
                        })
                    }}
                    yesPress={() => {
                        this.setState({
                            finishModalVisible: false,
                            gameOverModalVisible: true
                        })
                    }}
                    visible={this.state.finishModalVisible}
                />
                <GameOverModal
                    game={this.state.game}
                    menu={() => {
                        this.setState({
                            gameOverModalVisible: false
                        })
                        this.props.navigation.navigate('Home')
                    }}
                    replay={() => {
                        this.setState({
                            gameOverModalVisible: false
                        })
                        this.resetAll()
                    }}
                    visible={this.state.gameOverModalVisible}
                />
                <PlayModal
                    close={() => {
                        this.setState({
                            infoModalVisible: false
                        })
                    }}
                    visible={this.state.infoModalVisible}
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
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 16,
        marginHorizontal: 32,
    },
    logo: {
        height: 50,
        width: 50
    },
    buttonLine: {
        width: 35,
        height: 5,
        borderRadius: 2.5,
        backgroundColor: '#686868',
        marginVertical: 2
    },
    scoreContainer: {
        backgroundColor: '#343434',
        height: 168,
        marginTop: 18,
        paddingHorizontal: 16,
        paddingVertical: 5
    },
    scoreContainerInner: {
        flex: 1,
        borderColor: '#fff',
        borderWidth: 1
    },
    topScoreRow: {
        height: 47,
        paddingHorizontal: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: '#fff',
        borderBottomWidth: 1
    },
    scoreRowInner: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    scoreTitle: {
        color: '#fff',
        fontFamily: 'ITCFranklinGothicStd-Med',
        fontSize: 16,
        lineHeight: 22
    },
    scoreText: {
        color: '#fff',
        fontFamily: 'ITCFranklinGothicStd-Med',
        fontSize: 20,
        lineHeight: 22
    },
    scoreBox: {
        height: 39,
        width: 43,
        backgroundColor: 'rgba(0,0,0,0.2)',
        marginLeft: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    scoreRow: {
        flex: 1,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between',
        paddingHorizontal: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#fff'
    },
    scoreTitle2: {
        fontFamily: 'ITCFranklinGothicStd-Book',
        fontSize: 12,
        lineHeight: 14,
        color: '#fff',
        marginBottom: 5
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        marginHorizontal: 18,
    },
    innContainer: {
        height: 33,
        width: 91,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: '#FF5C00',
        borderRadius: 5,
        flexDirection: 'row'
    },
    buttonsRow1: {
        flexDirection: "row",
        width: 184,
        height: 33
    },
    topBottom: {
        flex: 1,
        backgroundColor: '#C8C8C8',
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        justifyContent: "center",
        alignItems: 'center'
    },
    bottomButton: {
        flex: 1,
        backgroundColor: '#C8C8C8',
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        justifyContent: "center",
        alignItems: 'center'
    },
    buttonsRow2: {
        marginTop: 30,
        flexDirection: "row",
        width: 238,
        alignSelf: "center",
        height: 40
    },
    outBallButton: {
        flex: 1,
        backgroundColor: '#FF5C00',
        borderRadius: 5,
        justifyContent: "center",
        alignItems: 'center'
    },
    settingsButton: {
        width: 238,
        alignSelf: "center",
        height: 40,
        marginTop: 8,
        backgroundColor: '#FF5C00',
        borderRadius: 5,
        justifyContent: "center",
        alignItems: 'center',
        marginBottom: 60
    },
    squareContainer: {

    },
    squareImage: {
        height: 231,
        width: 375,
        alignSelf: 'center'
    },
    base: {
        position: 'absolute',
        height: 32,
        width: 32,
        backgroundColor: 'transparent',
        borderRadius: 16
    },
    infoButton: {
        height: 30,
        width: 30,
        justifyContent: "center",
        alignItems: 'center',
    },
    infoIcon: {
        height: 21,
        width: 20
    },
    row: {
        flexDirection: 'row',
        alignItems: "center"
    }
});
