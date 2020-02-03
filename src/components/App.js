import React from 'react';
import NavBar from './NavBar.js';
import SideMenu from './SideMenu.js';
import ModeBar from './ModeBar.js';
import FloatingButton from './FloatingButton.js';
import LoginPage from './LoginPage.js';
import AppMode from "./../AppMode.js";
import { render } from '@testing-library/react';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {mode: AppMode.LOGIN,
                  menuOpen: false};
  }

  handleChangeMode = (newMode) => {
    this.setState({mode: newMode});
  }

  openMenu = () => {
    this.setState({menuOpen : true});
  }
  
  closeMenu = () => {
    this.setState({menuOpen : false});
  }

  toggleMenuOpen = () => {
    this.setState(prevState => ({menuOpen: !prevState.menuOpen}));
  }


  render() {
    return (
      <div>
        <NavBar title="Welcome to SpeedScore" 
          mode={this.state.mode}
          changeMode={this.handleChangeMode}
          menuOpen={this.state.menuOpen}
          toggleMenuOpen={this.toggleMenuOpen}/>
        <SideMenu 
          mode={this.state.mode}
          menuOpen={this.state.menuOpen}
          changeMode={this.handleChangeMode}/>
        <ModeBar 
          mode={this.state.mode} 
          changeMode={this.handleChangeMode}
          menuOpen={this.state.menuOpen}/>
        <FloatingButton mode={this.state.mode}/>
        <LoginPage changeMode={this.handleChangeMode}/>
      </div>
      );  
  }
}

export default App;