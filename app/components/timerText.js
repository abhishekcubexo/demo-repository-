
import React, { Component } from 'react';
import {
    Text
} from 'react-native'

export class TimerText extends Component {

    constructor(props) {
        super(props)
        this.state = {
            sec: 5
        }
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            let tempSec = this.state.sec - 1
            if (tempSec == 0) {
                clearInterval(this.interval)
                this.props.canSend()
            }
            else {
                this.setState({
                    sec: tempSec
                })
            }
        }, 1000);
    }

    render() {
        return (
            <Text style={this.props.style}>{this.state.sec} sec</Text>
        )
    }
}

