import React from 'react';

class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        //Create a ref for the email input DOM element
        this.emailInputRef = React.createRef();
    }

    //Focus cursor in email input field when mounted
    componentDidMount() {
        this.emailInputRef.current.focus();
    }

    render() {
        return(
        <div id="login-mode-div" className="padded-page">
        <center>
            <h1 />
            <form id="loginInterface">
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
                <span id="login-btn-icon" className="fa fa-sign-in"/>
                &nbsp;Log In
            </button>
            <br />
            <a role="button" className="login-btn">
                <img src="https://drive.google.com/uc?export=view&id=1YXRuG0pCtsfvbDSTzuM2PepJdbBpjEut" />
            </a>
            <a role="button" className="login-btn">
                <img src="https://drive.google.com/uc?export=view&id=1ZoySWomjxiCnC_R4n9CZWxd_qXzY1IeL" />
            </a>
            <p>
                <i>Version CptS 489 Sp20</i>
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
