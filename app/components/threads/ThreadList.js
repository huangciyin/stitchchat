import React, { Component, View, Text, ListView, TouchableHighlight, PropTypes } from 'react-native';
import {messageStyle} from '../../styles/MessageStyles';
import {commons, smallIconSize} from '../../styles/CommonStyles';
import moment from 'moment';
import ThreadItem from './ThreadItem';
import LoginService from '../../services/LoginService';

class ThreadList extends Component {
    constructor(props, context) {
        super(props, context);
    }

    loadMoreThreads(){
        this.props.loadMoreThreads();
    }

    showLoginPage(){
        let DigitsLogin = new LoginService();
        DigitsLogin.startLoginProcess();
    }

    logout(){
        let DigitsLogin = new LoginService();
        DigitsLogin.logout();
    }

    render() {
        const { threads } = this.props;
        let threadsDS = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2 });
        threadsDS = threadsDS.cloneWithRows(threads);
        return (
            <View style={commons.listContainer}>
                <ListView
                    dataSource={threadsDS}
                    loadData={this.loadMoreThreads()}
                    renderRow={this.renderThreadItem.bind(this)}/>
                <TouchableHighlight onPress={this.showLoginPage.bind(this)}>
                    <Text>Login</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.logout.bind(this)}>
                    <Text>Logout</Text>
                </TouchableHighlight>
            </View>
        );
    }

    renderThreadItem(rowData, sectionID, rowID) {
        return (
            <ThreadItem  key={rowData.id}
                         thread={rowData}
                         router={this.props.router}
                         selectThread={this.props.selectThread}
                         setCurrentThread={this.props.setCurrentThread}
                         loadMessagesForThread={this.props.loadMessagesForThread}
                         isEditing={this.props.isEditing}/>
        );
    }
}

ThreadList.propTypes = {
    threads: PropTypes.array.isRequired,
    loadMoreThreads: PropTypes.func.isRequired,
    selectThread: PropTypes.func.isRequired,
    setCurrentThread: PropTypes.func.isRequired,
    loadMessagesForThread: PropTypes.func.isRequired,
    isEditing: PropTypes.bool.isRequired,
    router: PropTypes.object.isRequired
};

export default ThreadList;
