import './Header.css'
import key from '../keys.json'
import {GoogleLogin, GoogleLogout} from 'react-google-login';

const Header =(props)=>{

    const name= {
        "summary":"OnClick"
    }
    let user = {
        name : window.localStorage.getItem("userName"),
        email: window.localStorage.getItem("userEmail")
        };
    console.log(user)
    return(
    <header className="header">
        <div className='headerContainer'>
            <div>User: {user.name}</div>
            <div>Email: {user.email}</div>
            <div className="buttonGroup">
            <button type="button" className="button" onClick={() => props.addEvent(name)}> Add New Event</button>
            <GoogleLogout
                    className="button"
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