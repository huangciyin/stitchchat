import React, { Component, PropTypes, View, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {commons, defaultStyle} from '../styles/CommonStyles';
import {messageStyle} from './MessageStyles';

class MessageOptionsBox extends Component {

    render() {
        const { copySelectedMessages, forwardSelected, deleteSelected } = this.props;
        return (
            <View style={[messageStyle.msgOptions]}>
                <TouchableHighlight style={[commons.defaultIconContainer]}
                                    onPress={copySelectedMessages}>
                    <Icon name='ios-copy'
                          style={commons.defaultIcon}/>
                </TouchableHighlight>
                <TouchableHighlight style={commons.defaultIconContainer}
                                    onPress={forwardSelected}>
                    <Icon name='forward'
                          style={commons.defaultIcon}/>
                </TouchableHighlight>
                <TouchableHighlight style={commons.defaultIconContainer}
                                    onPress={deleteSelected}>
                    <Icon name='ios-trash'
                          style={commons.defaultIcon}/>
                </TouchableHighlight>
            </View>
        );
    }
}

MessageOptionsBox.propTypes = {
    copySelectedMessages: PropTypes.func.isRequired,
    forwardSelected: PropTypes.func.isRequired,
    deleteSelected: PropTypes.func.isRequired
};

export default MessageOptionsBox;
