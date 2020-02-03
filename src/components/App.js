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
    this.state = {mode: AppMode.LOGIN};
  }

  handleChangeMode = (newMode) => {
    this.setState({mode: newMode});
  }

  render() {
    return (
      <div>
        <NavBar title="Welcome to SpeedScore" mode={this.state.mode}/>
        <SideMenu mode={this.state.mode}/>
        <ModeBar mode={this.state.mode} 
                 changeMode={this.handleChangeMode}/>
        <FloatingButton mode={this.state.mode}/>
        <LoginPage changeMode={this.handleChangeMode}/>
      </div>
      );  
  }
}

export default App;