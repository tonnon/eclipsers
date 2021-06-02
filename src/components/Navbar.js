import React from 'react';

import './navbarStyle.css';

import logo from '../assets/logo.png';

function Navbar() {
  return (
      <div id="div-navbar" className="flex">
          <div>
              <div>
                  <img 
                    src={logo} 
                    width="50" 
                    alt="Logotipo"/>
              </div>
          </div>
          <div>
            <span>
              Login
            </span>
          </div>
      </div>
  );
}

export default Navbar;