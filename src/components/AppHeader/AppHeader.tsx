import React from 'react';
import './app-header.css'

const AppHeader: React.FC = () => {
  return (
    <div className='header_container'>
       <img src='/clo_app_logo.svg'/>

       <div className='app_user_container'>
          <button className='sign_in_btn'>SIGN IN</button>
          <button className='sign_up_btn'>SIGN UP</button>
       </div>
    </div>
  );
};

export default AppHeader;