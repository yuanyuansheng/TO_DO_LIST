import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

import './App.css';

import LoginScreen from './Loginscreen';
import NoteScreen from './NoteScreen';
import UserPage from './UserPage';

/* The parent page of all the pages/file, so we need to import dependend pages 
and create objs */
class App extends Component {

    constructor(props) {

        super(props);
        this.state={
            loginPage:[],
            uploadScreen:[]
        }
    }

    /* We have set loginscreen as default page in componentWillMount method and passed context 
    of app as ‘parentContext’ prop to loginscreen. */
    componentWillMount() {

        var loginPage =[];
        loginPage.push(<LoginScreen appContext={this}/>);
        this.setState({
            loginPage:loginPage
        })
    }

    render() {
        return (
            <div className="App">
                {this.state.loginPage}
                {this.state.uploadScreen}
            </div>
        );
    }

}

const style = {
    margin: 15,
};


export default App;

