import React from 'react';
import AppMode from "./../AppMode.js";

class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        //Create a ref for the email input DOM element
        this.emailInputRef = React.createRef();
        this.passwordInputRef = React.createRef();
        this.repeatPassRef = React.createRef();
        this.newUserRef = React.createRef();
        this.state = {loginBtnIcon: "fa fa-sign-in",
                      loginBtnLabel: "Log In",
                      showAccountDialog: false,
                      showPasswordDialog: false,
                      accountName: "",
                      accountPassword: "",
                      accountPasswordRepeat: "",
                      accountSecurityQuestion: "",
                      accountSecurityAnswer: ""};
    }

//Focus cursor in email input field when mounted
    componentDidMount() {
        this.emailInputRef.current.focus();
}

//handleLogin -- Callback function that sets up initial app state upon login.
handleLogin = () => {
    //Stop spinner
    this.setState({loginBtnIcon: "fa fa-sign-in",
                loginBtnLabel: "Log In"});
    //Set current user
    this.props.setUserId(this.emailInputRef.current.value);
    //Trigger switch to FEED mode (default app landing page)
    this.props.changeMode(AppMode.FEED);
}

//handleLoginSubmit -- Called when user clicks on login button. Initiate spinner
//for 1 second and call handleLogin to do the work.
handleLoginSubmit = (event) => {
    event.preventDefault();
    this.setState({loginBtnIcon: "fa fa-spin fa-spinner",
                    loginBtnLabel: "Logging In..."});
    //Initiate spinner for 1 second
    setTimeout(this.handleLogin,1000);
}

//checkAccountValidity -- Callback function invoked after a form element in
//the 'Create Account' dialog box changes and component state has been
//updated. We need to check whether the passwords match and whether an
//account is already associated with the email address entered. If so, we
//set a custom validity message to be displayed when the user clicks the
//'Create Account' button. Otherwise, we reset the custom validity message
//to empty so that it will NOT fire when the user clicks 'Create Account'.
checkAccountValidity = () => {
    if (this.state.accountPassword != this.state.accountPasswordRepeat) {
        //Passwords don't match
        this.repeatPassRef.current.setCustomValidity("This password must match original password.");
    } else {
        this.repeatPassRef.current.setCustomValidity("");
    }
    let data = JSON.parse(localStorage.getItem("speedgolfUserData"));
    if (data != null && data.hasOwnProperty(this.state.accountName)) {
        //The user name is already taken
        this.newUserRef.current.setCustomValidity("An account already exists under this email address. Use 'Reset password' to recover the password.");
    } else {
        this.newUserRef.current.setCustomValidity("");
    }
}
    
//handleNewAccountChange -- Called when a field in a dialog box form changes.
//Update corresponding state variable and potentially update the custom
//message.
handleNewAccountChange = (event) => {
    this.setState({[event.target.name]: event.target.value},this.checkAccountValidity);
}

//handleCreateAccount -- Triggered when user clicks on "Create Account."
//Custom data checking ensures user account under this email does not exist
//and that the rest of the info is valid. At this point, we can create 
//new object for user, save to localStorage and take user to app's landing page. 
handleCreateAccount = (event) => {
    event.preventDefault();
    let data = JSON.parse(localStorage.getItem("speedgolfUserData"));
    //Create fresh user data object for new user
    if (data == null) {
        data = {}; //create empty data object
    }
    data[this.state.accountName] = {
        accountInfo: {
        password: this.state.accountPassword,
        securityQuestion: this.state.accountSecurityQuestion,
        securityAnswer: this.state.accountSecurityAnswer
        },
        rounds: {}, 
        roundCount: 0
    };
    //Commit to localStorage:
    localStorage.setItem("speedgolfUserData",JSON.stringify(data));
    //Set current user
    this.props.setUserId(this.state.accountName);
    //Log in user by switching to FEED mode
    this.props.changeMode(AppMode.FEED);
}

//handleLoginChange -- Check the validity of the username (email address)
//password entered into the login page, setting the customValidity message 
//appropriately. 
handleLoginChange = (event) => {
    let thisUser = this.emailInputRef.current.value;
    let data = JSON.parse(localStorage.getItem("speedgolfUserData"));
    //Check username and password:
    if (data == null || !data.hasOwnProperty(thisUser)) { 
       this.emailInputRef.current.setCustomValidity("No account with this email address exists. Choose 'Create an account'.");
         return; //Exit the function; no need to check pw validity
     } else {
         this.emailInputRef.current.setCustomValidity("");
     }
     if (data[thisUser].accountInfo.password != this.passwordInputRef.current.value) {
        this.passwordInputRef.current.setCustomValidity("The password you entered is incorrect. Please try again or choose 'Reset your password'.");
     } else {
        this.passwordInputRef.current.setCustomValidity("");
     }
 }
 
        
    //renderAccountDialog -- Present the "create account" dialog
    renderAccountDialog = () => {
        return (
        <div className="modal" role="dialog">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h3 className="modal-title"><b>Create New Account</b>
                  <button className="close-modal-button" 
                    onClick={() => {this.setState({showAccountDialog: false})}}>
                    &times;</button>
                </h3>
              </div>
              <div className="modal-body">
                <form onSubmit={this.handleCreateAccount}>
                <label>
                    Email: 
                    <input
                    className="form-control form-text"
                    name="accountName"
                    type="email"
                    size="35"
                    placeholder="Enter Email Address"
                    pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}"
                    ref={this.newUserRef}
                    required={true}
                    value={this.state.accountName}
                    onChange={this.handleNewAccountChange}
                    />
                </label>
                
                <label>
                    Password:
                    <input
                    className="form-control form-text"
                    name="accountPassword"
                    type="password"
                    size="35"
                    placeholder="Enter Password"
                    pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
                    required={true}
                    ref={this.repeatPassRef}
                    value={this.state.accountPassword}
                    onChange={this.handleNewAccountChange}
                    />
                </label>
                
                <label>
                    Repeat Password:
                    <input
                    className="form-control form-text"
                    name="accountPasswordRepeat"
                    type="password"
                    size="35"
                    placeholder="Repeat Password"
                    required={true}
                    ref={this.repeatPassRef}
                    value={this.state.accountPasswordRepeat}
                    onChange={this.handleNewAccountChange}
                    />
                </label>
                
                <label>
                    Security Question:
                    <textarea
                    className="form-control form-text"
                    name="accountSecurityQuestion"
                    size="35"
                    placeholder="Security Question"
                    rows="2"
                    cols="35"
                    maxLength="100"
                    required={true}
                    value={this.state.accountSecurityQuestion}
                    onChange={this.handleNewAccountChange}
                    />
                </label>
                <label>
                    Answer to Security Question:
                    <textarea
                    className="form-control form-text"
                    name="accountSecurityAnswer"
                    type="text"
                    placeholder="Answer"
                    rows="2"
                    cols="35"
                    maxLength="100"
                    required={true}
                    value={this.state.accountSecurityAnswer}
                    onChange={this.handleNewAccountChange}
                    />
                </label>
                <button role="submit" className="btn btn-primary btn-color-theme form-submit-btn">
                    <span className="fa fa-user-plus"></span>&nbsp;Create Account
                </button>
                </form>
            </div>
          </div>
        </div>
    </div>
    );

}

//renderPasswordDialog -- Present the 'reset password' dialog
renderPasswordDialog = () => {
    
}

render() {
    return(
    <div id="login-mode-div" className="padded-page">
    <center>
        <h1 />
        <form onSubmit={this.handleLoginSubmit} onChange={this.handleLoginChange}>
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
            ref={this.passwordInputRef}
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
        <p><button type="button" className="btn btn-link login-link" 
             onClick={() => {this.setState({showAccountDialog: true});}}>Create an account</button> | 
           <button type="button" className="btn btn-link login-link"
             onClick={() => {this.setState({showPasswordDialog: true});}}>Reset your password</button>
        </p>
     
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
        {this.state.showAccountDialog ? this.renderAccountDialog() : null}
        {this.state.showPasswordDialog ? this.renderPasswordDialog() : null}
    </center>
    </div>
    )
}
}

export default LoginPage;
