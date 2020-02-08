import React from 'react';
import AppMode from "./../AppMode.js";

class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        //Create a ref for the email input DOM element
        this.emailInputRef = React.createRef();
        this.state = {loginBtnIcon: "fa fa-sign-in",
                    loginBtnLabel: "Log In"};
    }

    //Focus cursor in email input field when mounted
    componentDidMount() {
        this.emailInputRef.current.focus();
    }

//handleLogin -- Callback function that sets up initial app state upon login.
handleLogin = () => {
    this.setState({loginBtnIcon: "fa fa-sign-in",
                   loginBtnLabel: "Log In"});
    //Set the userId of current user
    let thisUser = this.emailInputRef.current.value;
    this.props.setUserId(thisUser);
    //Check whether we have saved data on this (or any) user:
    let data = localStorage.getItem("speedgolfUserData");
    if (data == null) { 
      //No user app data stored yet -- create blank record for current user
      localStorage.setItem("speedgolfUserData",
      JSON.stringify({[thisUser] : {"rounds" : {}, "roundCount": 0}}));  
    } else {
      //app data exists -- check if data exists for thisUser
      data = JSON.parse(data);
      if  (!data.hasOwnProperty(thisUser)) { 
          //No data for this user -- create empty data
          data[thisUser] = {"rounds": {}, "roundCount": 0}; 
          localStorage.setItem("speedgolfUserData",JSON.stringify(data));
      } 
    }  
    //Trigger switch to FEED mode
    this.props.changeMode(AppMode.FEED);
}

//handleSubmit -- Called when user clicks on login button. Initiate spinner
//for 1 second and call handleLogin to do the work.
handleSubmit = (event) => {
this.setState({loginBtnIcon: "fa fa-spin fa-spinner",
                loginBtnLabel: "Logging In..."});
//Initiate spinner for 1 second
setTimeout(this.handleLogin,1000);
event.preventDefault();
}

render() {
    return(
    <div id="login-mode-div" className="padded-page">
    <center>
        <h1 />
        <form onSubmit={this.handleSubmit}>
        <label htmlFor="emailInput" style={{ padding: 0, fontSize: 24 }}>
            Email:
            <input
            ref={this.emailInputRef}
            className="form-control login-text"
            type="email"
            placeholder="Enter Email Address"
            id="emailInput"
            pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}"
            required={true}
            />
        </label>
        <p />
        <label htmlFor="passwordInput" style={{ padding: 0, fontSize: 24 }}>
            Password:
            <input
            className="form-control login-text"
            type="password"
            placeholder="Enter Password"
            pattern="[A-Za-z0-9!@#$%^&*()_+\-]+"
            required={true}
            />
        </label>
        <p className="bg-danger" id="feedback" style={{ fontSize: 16 }} />
        <button
            type="submit"
            className="btn-color-theme btn btn-primary btn-block login-btn">
            <span className={this.state.loginBtnIcon}/>
            &nbsp;{this.state.loginBtnLabel}
        </button>
        <br />
        <a role="button" className="login-btn">
            <img src="https://drive.google.com/uc?export=view&id=1YXRuG0pCtsfvbDSTzuM2PepJdbBpjEut" />
        </a>
        <a role="button" className="login-btn">
            <img src="https://drive.google.com/uc?export=view&id=1ZoySWomjxiCnC_R4n9CZWxd_qXzY1IeL" />
        </a>
        <p>
            <i>Version CptS 489 Sp20 React</i>
        </p>
        <p>
            <i>© 2020 Professor of Speedgolf. All rights reserved.</i>
        </p>
        </form>
    </center>
    </div>
    )
}
}

export default LoginPage;
