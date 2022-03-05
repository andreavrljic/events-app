import './Header.css'
import key from '../keys.json'
import {GoogleLogin, GoogleLogout} from 'react-google-login';
import NewEvent from './NewEvent';
import { useState } from 'react';

const Header =(props)=>{

    const name= {
        "summary":"OnClick"
    }
    let user = {
        name : window.localStorage.getItem("userName"),
        email: window.localStorage.getItem("userEmail")
        };
    
    const [open, setOpen] = useState(false)
  
    const closeModal =()=>{
        setOpen(false)
    }

    return(
    <header className="header">
        <div className='headerContainer'>
            <h3 className="headerLabel">User: {user.name}</h3>
            <h3 className="headerLabel">Email: {user.email}</h3>
            <div className="buttonGroup">
            <GoogleLogout
                    clientId={key.CLIENT_ID}
                    buttonText='LOGOUT'
                    onLogoutSuccess={() => props.logout()}
                    render={renderProps => (
                        <button onClick={renderProps.onClick}
                        className="button"
                        >
                            LOGOUT</button> 
                      )}
            /></div>
        </div>
        
         </header>
    )


}
export default Header;