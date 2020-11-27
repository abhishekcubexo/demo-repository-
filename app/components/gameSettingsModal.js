
import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Image,
    Text,
    TouchableWithoutFeedback,
    TouchableOpacity
} from 'react-native'
import Modal from 'react-native-modal';

export class GameSettingsModal extends Component {

    constructor(props) {
        super(props)

    }

    render() {
        return (
            <Modal
                backdropTransitionOutTiming={0}
                style={{ margin: 0 }}
                isVisible={this.props.visible}>
                <View style={styles.content}>
                    <TouchableWithoutFeedback
                        onPress={() => {
                            this.props.close()
                        }}
                    >
                        <View style={{ flex: 1 }} />
                    </TouchableWithoutFeedback>
                    <View style={styles.alertContent}>
                        <TouchableWithoutFeedback
                            onPress={() => {
                                this.props.close()
                            }}
                        >
                            <Image
                                source={require('../assets/images/close.png')}
                                style={styles.closeImage}
                            />
                        </TouchableWithoutFeedback>
                        <View style={styles.buttonsRow}>
                            <TouchableOpacity
                            disabled={!this.props.undoActive}
                            onPress={()=>{
                                this.props.undo()
                            }}
                                activeOpacity={0.8}
                                style={styles.undoButton}
                            >
                                <Image
                                    source={require('../assets/images/undo.png')}
                                    style={[
                                        styles.undoIcon,
                                         { marginRight: 16 },
                                         this.props.undoActive ? {tintColor: '#FF5C00'} : {tintColor: '#747474'}
                                         ]} />
                                <Text style={[styles.buttonText, { color: '#fff' }]}>
                                    Undo
                            </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                               disabled={!this.props.redoActive}
                                 onPress={()=>{
                                    this.props.redo()
                                }}
                                activeOpacity={0.8}
                                style={[styles.undoButton, { marginLeft: 14 }]}
                            >
                                <Text style={[styles.buttonText, { color: '#fff' }]}>
                                    Redo
                            </Text>
                                <Image
                                    source={require('../assets/images/redo.png')}
                                    style={[
                                        styles.undoIcon,
                                         { marginLeft: 16 },
                                         this.props.redoActive ? {tintColor: '#FF5C00'} : {tintColor: '#747474'}
                                         ]} />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.changeInnings()
                            }}
                            activeOpacity={0.8}
                            style={styles.inningRow}
                        >
                            <Text style={styles.buttonText}>
                                Inning Number
                            </Text>
                            <View
                                activeOpacity={0.8}
                                style={[styles.changeContainer, {
                                    marginLeft: 13,
                                    marginRight: 8
                                }]}
                            >
                                <Text style={styles.buttonText}>+</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.resetAll()
                            }}
                            activeOpacity={0.8}
                            style={[styles.button, { backgroundColor: '#FF5C00' }]}
                        >
                            <Text style={[styles.buttonText, { color: '#fff', fontFamily: 'demi' }]}>
                                Reset All
                  </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.finishGame()
                            }}
                            activeOpacity={0.8}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>
                                End Game & Announce Winner
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.terminate()
                            }}
                            activeOpacity={0.8}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>
                                Terminate Game
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    alertContent: {
        backgroundColor: '#fff',
        height: 430,
        paddingHorizontal: 20
    },
    closeImage: {
        height: 26,
        width: 26,
        marginTop: 20,
        alignSelf: 'flex-end',
        marginBottom: 40
    },
    button: {
        backgroundColor: '#C8C8C8',
        height: 40,
        borderRadius: 5,
        marginBottom: 16,
        justifyContent: "center",
        alignItems: 'center'
    },
    buttonText: {
        color: '#747474',
        fontSize: 16,
        fontFamily: 'ITCFranklinGothicStd-Med',
        lineHeight: 22
    },
    inningRow: {
        backgroundColor: '#C8C8C8',
        height: 40,
        borderRadius: 5,
        marginBottom: 16,
        justifyContent: "center",
        alignItems: 'center',
        flexDirection: 'row'
    },
    changeContainer: {
        width: 31,
        height: 28,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.2)'
    },
    buttonsRow: {
        flexDirection: 'row',
        height: 40,
        marginBottom: 16,
    },
    undoButton: {
        flex: 1,
        backgroundColor: '#C8C8C8',
        height: 40,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: 'center'
    },
    undoIcon: {
        height: 22,
        width: 25
    }
});
