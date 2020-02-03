import React from 'react';
import AppMode from '../AppMode.js';

class ModeBar extends React.Component {
    render() {
      return(
        <div className={"modebar" + (this.props.mode === AppMode.LOGIN ? " invisible" : " visible")}>
        <a className="modebar-btn">
          <span className="modebaricon fa fa-th-list"></span>
          <span className="modebar-text">Feed</span>
        </a>
        <a className="modebar-btn">
          <span className="modebar-icon  fa fa-history"></span>
          <span className="modebar-text">Rounds</span>
        </a>
        <a className="modebar-btn">
          <span className="modebar-icon  fa fa-flag"></span>
          <span className="modebar-text">Courses</span>
        </a> 
        </div>
      );
    }
}

export default ModeBar;
