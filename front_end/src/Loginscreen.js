import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

import Login from './Login';
import Register from './Register';


/* Loginscreen.js is the page which acts as a container to switch between login and 
registration components defined in Login.js and Register.js respectively. */
class Loginscreen extends Component {


    /*Coinstructor with register as student and teacher on first page of frontend
    has multiple states for this file */
    constructor(props) {

        super(props);
        var loginButtons=[];

        loginButtons.push(
            <div>
                <MuiThemeProvider>
                    <div>
                         <RaisedButton label={"Register"} primary={true} style={style} onClick={(event) => this.handleClick(event,'userRegiser')}/>
                    </div>
                </MuiThemeProvider>
            </div>
        ) /* END PUSH */

        this.state={
            username:'',
            password:'',
            loginscreen:[],
            loginmessage:'',
            loginButtons:loginButtons,
            userbuttonLabel:'Register',
            isLogin:true
        }

    } /* END CONSTRUCTOR */


    /* Set login component as default component to be displayed on first user visit
    We are passing loginscreen context as’ ‘parentContext’ prop and App.js context as ‘appContext’ prop. */
    componentWillMount() {

        var loginscreen=[];
        loginscreen.push(<Login parentContext={this} appContext={this.props.appContext}/>);

        var loginmessage = "Not registered yet, Register Now";

        this.setState({
            loginscreen:loginscreen,
            loginmessage:loginmessage
        })
    } /* END COMPONENT WILL MOUNT  */


    /* We need to switch component when user clicks on register button which is executed by handleClick 
    We are switching between login and registration component based on value of isLogin flag which was 
    set to true initially in constructor method. */
    handleClick(event,userRole) {

        console.log("event",userRole);
        var loginmessage;

        /* If user wants to Login */
        if(this.state.isLogin) {

            var loginscreen=[];
            loginscreen.push(<Register parentContext={this} appContext={this.props.appContext} role={userRole}/>);
            loginmessage = "Already registered.Go to Login";
            var loginButtons=[];

            loginButtons.push(
                <div>
                    <MuiThemeProvider>
                        <div>
                            <RaisedButton label={"Login"} primary={true} style={style} onClick={(event) => this.handleClick(event,userRole)}/>
                       </div>
                    </MuiThemeProvider>
                </div>
            )

            this.setState({
                loginscreen:loginscreen,
                loginmessage:loginmessage,
                loginButtons:loginButtons,
                isLogin:false
            })

        } /* END STATE IS LOGIN */

        /* Else, user wants to Register */
        else { 
            var loginscreen=[],loginButtons=[];
            loginButtons.push(
                <div>
                    <MuiThemeProvider>
                        <div>
                            <RaisedButton label={"Register"} primary={true} style={style} onClick={(event) => this.handleClick(event,'userRegiser')}/>
                        </div>
                     </MuiThemeProvider>
                </div>
            ) /* END PUSH */
            
            loginscreen.push(<Login parentContext={this} appContext={this.props.appContext} role={userRole}/>);
            loginmessage = "Not Registered yet.Go to registration";

            this.setState({
                loginscreen:loginscreen,
                loginmessage:loginmessage,
                loginButtons:loginButtons,
                isLogin:true
            })
        } /* END ELSE STATE IS NOT LOGIN */
        
    } /* END HANDLECLICK */


    render() {
        return (
            <div className="loginscreen">
                {this.state.loginscreen}
                <div>
                    {this.state.loginmessage}
                    {this.state.loginButtons}
                </div>
            </div>
        );
    } /* END RENDER */

} /* END CLASS */


const style = {
  margin: 15,
};

export default Loginscreen;

