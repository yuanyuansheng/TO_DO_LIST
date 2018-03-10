import React, { Component } from 'react';

import './App.css';
import LoginScreen from './Loginscreen';
import UserPage from './UserPage';


/* Material-UI is used for designing ui of the app */
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';
import {blue500, red500, greenA200} from 'material-ui/styles/colors';

/* Dropzone is used for local file selection */
import Dropzone from 'react-dropzone';

import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

/* superagent is used to handle post/get requests to server */
import axios from 'axios';
var request = require('superagent');


/* Screen for user to edit their information */
class ProfileScreen extends Component {


	/* user information is used here to update user information */
  	constructor(props){

    	super(props);
	  	console.log(props);
    
    	this.state={
			user:this.props.user,
			userid:this.props.user.id,
			username:this.props.user.username,
			password: this.props.user.password,
    	}
  	}

 
	isValidEmailAddress(emailAddress) {
	    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
	    return pattern.test(emailAddress);
	};


	/* This function was originally created to update user information like firstname, lastname, username, email and password, but 
	decided to just have user update password. Left it in here for reference */
	handleClick(event) {

		var self = this;
		if(this.state.first_name.length==0 || this.state.last_name.length==0 || this.state.username.length==0 || this.state.email.length==0 || this.state.password.length==0) {
			alert("Input Value must not be empty!");
		}
		else if( !this.isValidEmailAddress(this.state.email)){
			alert("Email format is wrong!");
		}
		else {

      		var payload={
      			"email":this.state.email,
      		}

      		axios.post('/api/users/'+this.state.userid, payload)
     		.then(function (response) {

			    console.log(response);

			    if(response.data.code == 200) {
					alert("Edit profile successfully!");
				}
       			else {
         			console.log("some error ocurred",response.data.code);
       			}
     		})

     		.catch(function (error) {
       			console.log(error);
     		});
    	}
	}


	/* Calls updatePwd in server/controllers/users to update password */
  	handleClickPwd(event) {

		var self = this;
    	//To be done:check for empty values before hitting submit
    	if(this.state.password.length>0) {
      		var payload={
      			"password":this.state.password
      		}
      		axios.post('/api/users/pwd/'+this.state.userid, payload)

     		.then(function (response) {
       			console.log(response);

       			if(response.data.code == 200){
		   			alert("Edit password successfully!");
		   			self.setState({password:""});
       			}
       			else {
         			console.log("some error ocurred",response.data.code);
       			}
     		})
     		.catch(function (error) {
       			console.log(error);
     		});
    	}
    	else{
      		alert("Input field value is missing");
    	}
  	}


	/* Used to toggle drawer state */
	toggleDrawer(event){
	  	this.setState({draweropen: !this.state.draweropen})
	}


	/* Used to end user session and redirect the user back to login page */
	handleLogout(event){
	  	var loginPage =[];
	  	loginPage.push(<LoginScreen appContext={this.props.appContext}/>);
	  	this.props.appContext.setState({loginPage:loginPage,uploadScreen:[]})
	}


	/* Used to udate and chack password validity */
	render() {
	    return (
		    <div className="App">
		        <div className="container">

		        	<p>Welcome {this.state.user.username}</p>
				    <center><h3>Edit Password</h3></center>

					<MuiThemeProvider>
						<div>          
						   	<TextField
								hintText={"Enter your Password"}
								floatingLabelText={"password"}
								floatingLabelText="password"
								type="password"
								onChange = {(event,newValue) => this.setState({password:newValue})}
							/>
						   	<br/>
						   	<RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClickPwd(event)}/>
						</div>
					</MuiThemeProvider>

		        </div>
		    </div>
	    );
	}


}

	const style = {
  		margin: 15,
	};

	const style1 = {
  		margin: 0,
	};

export default ProfileScreen;

