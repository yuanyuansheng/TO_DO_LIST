import React, { Component } from 'react';

import axios from 'axios';
import Login from './Login';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';



/* Lets user register to use API */
class Register extends Component {


    /* Empty variables so user can create their information */
    constructor(props) {
        super(props);
        this.state={
            username:'',
            firstname:'',
            lastname:'',
            password:'',
            email:'',
            
        }
    } /* END CONSTRUCTOR */


    /* Used for testing 
    https://reactjs.org/docs/react-component.html#componentwillreceiveprops */
    componentWillReceiveProps(nextProps){
        console.log("nextProps",nextProps);
    }


    /* Check Email Validation*/
    isValidEmailAddress(emailAddress) {
        var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        return pattern.test(emailAddress);
    };


    /* On receiving code 200 from backend we are reverting user back to login page for login 
    I have sent context of Loginscreen.js page as parentContext prop which allows us to 
    manipulate state variables of loginscreen from child */
    handleClick(event,role) {
        
        // console.log("values in register handler",role);
        var self = this;
        //To be done:check for empty values before hitting submit

        if(this.state.firstname.length==0 || this.state.lastname.length==0 || this.state.username.length==0 || this.state.email.length==0 || this.state.password.length==0) {
            alert("Invalid input, please try again");
        }
        else if(!this.isValidEmailAddress(this.state.email)) {
            alert("Email format is wrong!");
        }

        else {

            var payload={
                "username": this.state.username,
                "firstname": this.state.firstname,
                "lastname":this.state.lastname,
                "password":this.state.password,
                "email":this.state.email,
            }

            axios.post('api/users', payload)
            .then(function (response) {

                console.log(response);

                if(response.data.code == 200) {

                    //  console.log("registration successfull");
                    var loginscreen=[];
                    loginscreen.push(<Login parentContext={this} appContext={self.props.appContext} role={role}/>);
                    var loginmessage = "Not Registered yet.Go to registration";

                    self.props.parentContext.setState({
                        loginscreen:loginscreen,
                        loginmessage:loginmessage,
                        buttonLabel:"Register",
                        isLogin:true
                    });   
                    alert("Resgister successfully!"); 
                }

                else{
                    console.log("some error ocurred",response.data.code);
                }
            })
            .catch(function (error) {
                console.log("Error in registration: "+error);
            });

        } /* END Else, valid input */

    } /* END HANDLECLICK */


    /* We are taking username, firstname,lastname, email and password from user and storing them in 
    relevant state variables. We need to send these details to backend on click of submit button 
    which is executed by handleClick function */
    render() {
        // console.log("props",this.props);
    
        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        <AppBar title="Register" />

                        <TextField
                           hintText="Enter your Username"
                           floatingLabelText="Username"
                           onChange = {(event,newValue) => this.setState({username:newValue})}
                           />
                         <br/>
                         <TextField
                           hintText="Enter your First Name"
                           floatingLabelText="First Name"
                           onChange = {(event,newValue) => this.setState({firstname:newValue})}
                           />
                         <br/>
                         <TextField
                           hintText="Enter your Last Name"
                           floatingLabelText="Last Name"
                           onChange = {(event,newValue) => this.setState({lastname:newValue})}
                           />
                         <br/>
                         <TextField
                           type = "password"
                           hintText="Enter your Password"
                           floatingLabelText="Password"
                           onChange = {(event,newValue) => this.setState({password:newValue})}
                           />
                         <br/>
                         <TextField
                           hintText="Enter your User Email"
                           floatingLabelText="Email"
                           onChange = {(event,newValue) => this.setState({email:newValue})}
                           />
                         <br/>
                         
                        <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event,this.props.role)}/>
                    </div>
                </MuiThemeProvider>
            </div>
        ); /* END RETURN */
    } /* END RENDER */
} /* END CLASS */


const style = {
    margin: 15,
};

export default Register;

