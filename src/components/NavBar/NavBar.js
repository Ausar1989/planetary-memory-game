import React from 'react';
import './NavBar.css';

const NavBar = props => (
  <div className="navbar ">
    <div>Planetary Memory Game</div>
    <div className={props.navMsgColor}>{props.navMessage}</div>
    <div>
      Score: {props.score} <span className="pipe">|</span> High Score: {props.highScore}
    </div>
  </div>
);

export default NavBar;