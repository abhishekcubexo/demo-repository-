
import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    ScrollView
} from 'react-native'
import Modal from 'react-native-modal';

export class PlayModal extends Component {

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
                        <Text style={styles.title}>
                            HOW TO PLAY
                        </Text>
                        <ScrollView>
                            <Text style={styles.text}>
                    1. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat{'\n'}2. sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,{'\n'}3. consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.{'\n'}4. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.{'\n'}5. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
                            </Text>
                        </ScrollView>
                        <TouchableWithoutFeedback
                        onPress={()=>{
                            this.props.close()
                        }}
                        >
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>
                                    Close
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
        justifyContent: 'flex-end'
    },
    alertContent: {
        backgroundColor: '#fff',
        maxHeight: '80%',
        paddingHorizontal: 20
    },
    title:{
        fontFamily: 'ITCFranklinGothicStd-Med',
        color: '#747474',
        fontSize: 16,
        marginTop: 24,
        marginBottom: 16,
        textAlign: "center"
    },
    text:{
        color: '#747474',
        fontSize: 16,
        fontFamily: 'ITCFranklinGothicStd-Book',
        lineHeight: 24,
    },
    button:{
        height: 40,
        width: 123,
        backgroundColor: '#FF5C00',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: "center",
        borderRadius: 5,
        marginTop: 32,
        marginBottom: 40
    },
    buttonText: {
        fontFamily: 'ITCFranklinGothicStd-Med',
        fontSize: 20,
        lineHeight: 22,
        color: '#fff'
    }
});
