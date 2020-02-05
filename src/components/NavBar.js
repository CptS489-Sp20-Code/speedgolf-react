import React from 'react';
import AppMode from '../AppMode.js';

class NavBar extends React.Component {
    
    handleMenuBtnClick = () => {
      if (this.props.mode != AppMode.LOGIN) {
        this.props.toggleMenuOpen();
      }
    }

    render() {
       return (
        <div className="navbar">  
        <span className="navbar-items">
          <button className="sidemenu-btn" onClick={this.handleMenuBtnClick}>
            <span className={"sidemenu-btn-icon " + 
                (this.props.menuOpen ? "fa fa-times":"fa fa-bars")}>
            </span>
          </button>
          <img src="http://tiny.cc/sslogo" alt="Speed Score Logo" height="38px"
          width="38px" />
          <span className="navbar-title">
            &nbsp;{this.props.title}
          </span>
        </span>
      </div>
    ); 
  }
}

export default NavBar;
