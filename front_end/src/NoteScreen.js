import React, { Component } from 'react';

/* LoginScreen - Main screen which the user is shown on first visit to page and after hitting logout */
import LoginScreen from './Loginscreen';
import UserPage from './UserPage';
import axios from 'axios';

/* Superagent - used to handle post/get requests to server */
var request = require('superagent');

/* Used for local file selection */
import Dropzone from 'react-dropzone';

/* Material-UI - used for designing ui of the app */
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';
import {blue500, red500, greenA200} from 'material-ui/styles/colors';


/* Note List page */
class NoteScreen extends Component {


    /* Create information for user to create, edit, delete notes */
    constructor(props){

        super(props);
        console.log(props);
    
        this.state={
            role:'student',
            filesPreview:[],
            filesToBeSent:[],
            draweropen:false,
            printcount:10,
            printingmessage:'',
            printButtonDisabled:false,
            user:this.props.user,
            noteItems:this.props.user.noteItems,
            notePreview:[],
            newtitle:'',
            newcontent:'',
            userid:this.props.user.id,
            edittitle:'abc',
            editcontent:'ccc',
        }
    } /* END CONSTRUCTOR */


    /* https://reactjs.org/docs/react-component.html#componentdidmount */
    componentDidMount(){
        this.renderNotelist(this.state.noteItems);
    }

    /* Information for triggering click events on table row
    https://stackoverflow.com/questions/37771316/react-triggering-click-event-on-table-row */  
    fetchDetails = (e) => {
        const data = e.target.getAttribute('data-item');
        console.log('We need to get the details for ', data);
    }

    /* Information for triggering click events on table row
    https://stackoverflow.com/questions/37771316/react-triggering-click-event-on-table-row */
    isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }


    /* https://reactjs.org/docs/react-component.html#setstate */
    renderNotelist(noteItems) {

        var self = this;    
        var notePreview=[];
        console.log(noteItems);
        self.setState({noteItems:noteItems});
        notePreview = this.renderResultTable(noteItems);
        this.setState({notePreview});
    
        this.setState({role:this.props.role,user:this.props.user});
    }


    /* Show Notes Table Frame*/
    /* Information for triggering click events on table row
    https://stackoverflow.com/questions/37771316/react-triggering-click-event-on-table-row */
    renderResultRows(noteItems) {

        var self = this;

        return noteItems.map((data,index) =>{

            return (
                <tr key={index} data-item={data} onClick={(event) =>this.fetchDetails(event)}>
                    <td data-title="id">{data.id}</td>
                    <td data-title="title">{data.title}</td>
                    <td data-title="content">{data.content}</td>
                        <td data-title="content">
                            <RaisedButton label="Edit" primary={true} style={style} onClick={(event) => self.handleNoteEditClick(event,index)}/>
                            <RaisedButton label="Delete" primary={true} style={style} onClick={(event) => self.handleNoteDelClick(event,index)}/>
                        </td>
                </tr>
            );
        });
    }


    /* Information for triggering click events on table row
    https://stackoverflow.com/questions/37771316/react-triggering-click-event-on-table-row */
    renderResultTable(data) {

        var self = this;

        return(
            <MuiThemeProvider>
                <div>

                    <div className="noteheader">
                        <center><h3>Note list</h3></center>
                        <RaisedButton  label="NewNote" primary={true} style={style1} onClick={(event) => this.handleNoteCreateClick(event)}/>
                    </div>

                    <div className="notecontainer">

                        <table className="notetable">
                            <tr>
                                <th>ID</th>
                                <th>TITLE</th>
                                <th>CONTENT</th>
                                <th></th>
                            </tr>
                            <tbody>
                          
                                {!this.isEmpty(data)
                                      ? this.renderResultRows(data)
                                      : ''}
                            </tbody>

                        </table>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }


    /* Used to remove file from filesPreview div
    if user clicks close icon adjacent to selected file */ 
    handleCloseClick(event,index) { 

        // console.log("filename",index);
        var filesToBeSent=this.state.filesToBeSent;
        filesToBeSent.splice(index,1);

        var filesPreview=[];

        for(var i in filesToBeSent) {

            filesPreview.push(
                <div>
                    {filesToBeSent[i][0].name}

                    <MuiThemeProvider>
                        <a href="#" onClick={(event) => this.handleDivClick(event)}><FontIcon
                            className="material-icons customstyle"
                            color={blue500}
                        >edit</FontIcon></a>
                  </MuiThemeProvider>
              </div>
            )
        }
        this.setState({filesToBeSent,filesPreview});
    }


    /* Handler of submit button which is responsibel fo rhandling file uploads to backend */
    /* Notes Edition */
    handleNoteEditClick(event,i) {


        var self = this;
        console.log(i);
        console.log(event.target.getAttribute('data-tag'));

        this.state.edittitle = this.state.noteItems[i].title;
        this.state.editcontent = this.state.noteItems[i].content;
        console.log(this.state.edittile );
        var localloginComponent = [];

        localloginComponent.push(

            <MuiThemeProvider>
                <div>

                    <TextField
                        type="text"
                        hintText="Enter Note title"
                        value={this.state.edittitle}
                        floatingLabelText="Title"
                        onChange = {(event,newValue) => this.onTodoChange(newValue,0,i)}
                    />
                    <br/>
                    <TextField
                        type="text"
                        hintText="Enter Note Content!"
                        value = {this.state.editcontent}
                        floatingLabelText="Content"
                        onChange = {(event,newValue) => this.onTodoChange(newValue,1,i)}
                    />
                    <br/>
                    <RaisedButton label="Edit" primary={true} style={style} onClick={(event) => this.handleNoteEditData(event,i)}/>
                    <RaisedButton label="Cancel" primary={true} style={style} onClick={() => this.renderNotelist(this.state.noteItems)}/>
                </div>
            </MuiThemeProvider>
        )
        this.setState({notePreview:localloginComponent})
        //this.props.appContext.setState({userPage:userPage,uploadScreen:[]})
    }


    /* Delete Notes */
    handleNoteDelClick(event,i) {

        var self = this;
        console.log(i);
        console.log(event.target.getAttribute('data-tag'));
        axios.delete('/api/notes/'+this.state.userid+"/items/"+this.state.noteItems[i].id)//api/notes/1/items/1

        .then(function (response) {

            console.log(response);

            if(response.data.code == 200) {

                console.log("note delete successfull");
                self.setState({edittitle:""});
                self.setState({editcontent:""});
                alert("Congradulations!Delete Note info Successfully!");

                axios.get('/api/users/'+self.state.userid)//api/notes/1/items/1

                .then(function (response) {

                    console.log(response);

                    if(response.data.code == 200) {
                        console.log("get successfull");
                        self.renderNotelist(response.data.user.noteItems);
                    }

                    else if(response.data.code == 404) {
                        console.log("get fail");
                    }
                    else {
                        console.log("get fail");
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
            }

            else if(response.data.code == 404) {
                console.log("Note update fail");
                alert(response.data.success)
            }
            else {
                console.log("Note update fail");
                alert("Note update fail");
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }


    /* Get input Content Change */
    onTodoChange(value,index,i) {

        console.log(index);
        var titlev = this.state.edittitle;
        var contilev = this.state.editcontent;

        if(index == 0) {
            titlev = value;
        } else {
            contilev = value;
        }

        var localloginComponent = [];

        localloginComponent.push(
            <MuiThemeProvider>
                <div>

                    <TextField
                        type="text"
                        hintText="Enter Note title"
                        value={titlev}
                        floatingLabelText="Title"
                        onChange = {(event,newValue) => this.onTodoChange(newValue,0,i)}
                    />
                    <br/>

                    <TextField
                        type="text"
                        hintText="Enter Note Content!"
                        value = {contilev}
                        floatingLabelText="Content"
                        onChange = {(event,newValue) => this.onTodoChange(newValue,1,i)}
                    />
                    <br/>
                    <RaisedButton label="Create" primary={true} style={style} onClick={(event) => this.handleNoteEditData(event,i)}/>
                    <RaisedButton label="Cancel" primary={true} style={style} onClick={() => this.renderNotelist(this.state.noteItems)}/>
                    
                </div>
            </MuiThemeProvider>
        )
        this.setState({edittitle:titlev});
        this.setState({editcontent:contilev});
        this.setState({notePreview:localloginComponent})
    }


    /* Edit Note */
    handleNoteEditData(event,i) {

        var self = this;
        console.log(this.state.edittitle);
        console.log(this.state.editcontent);
        console.log(this.state.noteItems[i]);

        if(this.state.edittitle.length>0 && this.state.editcontent.length>0) {

            var payload={
                "title":this.state.edittitle,
                "content":this.state.editcontent,
            }
            console.log(payload);

            axios.post('/api/notes/'+this.state.userid+"/items/"+this.state.noteItems[i].id, payload)//api/notes/1/items/1

            .then(function (response) {

                console.log(response);

                if(response.data.code == 200) {

                    console.log("note update successfull");
                    self.setState({edittitle:""});
                    self.setState({editcontent:""});
                    alert("Congradulations!Update Note info Successfully!");

                    axios.get('/api/users/'+self.state.userid)//api/notes/1/items/1

                    .then(function (response) {
                        console.log(response);

                        if(response.data.code == 200) {
                            console.log("get successfull");
                            self.renderNotelist(response.data.user.noteItems);
                        }
                        else if(response.data.code == 404) {
                            console.log("get fail");
                        }
                        else {
                            console.log("get fail");
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                }
                else if(response.data.code == 404) {
                    console.log("Note update fail");
                    alert(response.data.success)
                }
                else {
                    console.log("Note update fail");
                    alert("Note update fail");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        } 
        else {
            alert("title or content is null!");
        } 
    }


    /* Create Notes */
    handleNoteCreateClick(event) {

        var self = this;
        var localloginComponent = [];

        if(1) {

            localloginComponent.push(

                <MuiThemeProvider>
                    <div>
                          <TextField
                              type="text"
                              hintText="Enter Note title"
                              floatingLabelText="Title"
                              onChange = {(event,newValue) => this.setState({newtitle:newValue})}
                           />
                          <br/>
                          <TextField
                              type="text"
                              hintText="Enter Note Content!"
                              floatingLabelText="Content"
                              onChange = {(event,newValue) => this.setState({newcontent:newValue})}
                          />
                          <br/>
                          <RaisedButton label="Create" primary={true} style={style} onClick={(event) => this.handleNoteUploadData(event)}/>
                          <RaisedButton label="Cancel" primary={true} style={style} onClick={() => this.renderNotelist(this.state.noteItems)}/>
                      </div>
                  </MuiThemeProvider>
              )
          }
          this.setState({notePreview:localloginComponent})
      }


      /* Upload Note info */
      handleNoteUploadData(event) {

          var self = this;

          if(this.state.newtitle.length>0 && this.state.newcontent.length>0) {

              var payload={
                  "title":this.state.newtitle,
                  "content":this.state.newcontent,
              }
              console.log(payload);

              axios.post('/api/notes/'+this.state.userid, payload)

            .then(function (response) {

                console.log(response);
                var ss = self;

                if(response.data.code == 200) {

                    console.log("note create successfull");
                    self.setState({newtitle:""});
                    self.setState({newcontent:""});
                    alert("Congradulations!Create Note Successfully!");

                    axios.get('api/users/'+self.state.userid)

                    .then(function (response) {

                        console.log(response);

                        if(response.data.code == 200) {
                            console.log("note create successfull");
                            console.log(response.data.user);
                            self.renderNotelist(response.data.user.noteItems);
                        }
                        else if(response.data.code == 404) {
                            console.log("Note create fail");
                            alert(response.data.success)
                        }
                        else {
                            console.log("Note create fail");
                            alert("Note create fail");
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });  
                }
                else if(response.data.code == 404){
                    console.log("Note create fail");
                    alert(response.data.success)
                }
                else {
                    console.log("Note create fail");
                    alert("Note create fail");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        } 
        else {
            alert("title or content is null");
        } 

    }


    /* Used to toggle drawer state */
    toggleDrawer(event){
        this.setState({draweropen: !this.state.draweropen})
    }


    /* Used to end user session and redirect the user back to login page */
    handleLogout(event) {
        var loginPage =[];
        loginPage.push(<LoginScreen appContext={this.props.appContext}/>);
        this.props.appContext.setState({loginPage:loginPage,uploadScreen:[]})
    }


    render() {
        return (
            <div className="App">
                <div className="container">
                    {this.state.notePreview}
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

export default NoteScreen;

