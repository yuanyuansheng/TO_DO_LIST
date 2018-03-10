import React, { Component } from 'react';

import LoginScreen from './Loginscreen';
import ProfileScreen from './ProfileScreen';
import NoteScreen from './NoteScreen';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import FontIcon from 'material-ui/FontIcon';
import {blue500, red500, greenA200} from 'material-ui/styles/colors';


/* UserPage in my case was the page which I needed to display after successful user 
login which will change as per your needs. App.js is the parent component of all 
the pages. 
THIS APPEARS AS A BLANK SCREEN WITH CONTROL PANEL AT TOP. USED AS A DIRECTORY TO OTHER PAGES */
/* THIS USERPAGE IS VERY SIMILAR TO UPLOAD PAGE OF GITHUB FROM TUTORIAL */
class App extends Component {


    constructor(props) {
        super(props);
        this.state = {draweropen: false,currentScreen:[]};
    }


    /* https://reactjs.org/docs/react-component.html#componentdidmount */
    componentDidMount() {
        var currentScreen=[];
        currentScreen.push(<NoteScreen appContext={this.props.appContext} role={this.props.role}/>);
        this.setState({currentScreen})
    }


    /* Toggle opening and closing of drawer */ 
    toggleDrawer(event){
        // console.log("drawer click");
        this.setState({draweropen: !this.state.draweropen})
    }


    /* Sends user to screen from whatever they clicked in Control Pannel */
    handleMenuClick(event,page){

        switch(page) {

            case "notelist":
            // console.log("need to open uploadapge")
            var currentScreen=[];
            currentScreen.push(<NoteScreen appContext={this.props.appContext} role={this.props.role} user={this.props.user}/>);
            this.setState({currentScreen})
            break;

            case "profile":
            // console.log("need to open pastfiles")
            var currentScreen=[];
            currentScreen.push(<ProfileScreen appContext={this.props.appContext} role={this.props.role} user={this.props.user}/>);
            this.setState({currentScreen})
            break;

            case "logout":
            var loginPage =[];
            loginPage.push(<LoginScreen appContext={this.props.appContext}/>);
            this.props.appContext.setState({loginPage:loginPage,uploadScreen:[]})
            break;

        }
        this.setState({draweropen:false})
    }


    /* Sends info to handleMenuClick to send user to whatever button they clicked on that they wanted to go to */
    render() {
        return (

            <div className="App">
                <MuiThemeProvider>
                    <AppBar title="Control Panel"
                        onLeftIconButtonTouchTap={(event) => this.toggleDrawer(event)}
                    />
                </MuiThemeProvider>

                <MuiThemeProvider>
                    <Drawer open={this.state.draweropen}>
                        <div>

                            <MenuItem onClick={(event) => this.handleMenuClick(event,"notelist")}>
                                Note list
                            </MenuItem>

                            <MenuItem onClick={(event) => this.handleMenuClick(event,"profile")}>
                                Profile
                            </MenuItem>

                            <MenuItem onClick={(event) => this.handleMenuClick(event,"logout")}>
                                Logout
                            </MenuItem>

                        </div> 
                    </Drawer>
                </MuiThemeProvider>

                <div>
                    {this.state.currentScreen}
                </div>

            </div>

        ); /* END RETURN */
    } /* END RENDER */

}

export default App;


