import './Header.css'
import { GoogleLogout } from 'react-google-login';

const Header = (props) => {
    
    const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

    let user = {
        name: window.localStorage.getItem("userName"),
        email: window.localStorage.getItem("userEmail")
    };

    return (
        <header className="header">
            <div className='headerContainer'>
                <h3 className="headerLabel">User: {user.name}</h3>
                <h3 className="headerLabel">Email: {user.email}</h3>
                <div className="buttonGroup">
                    <GoogleLogout
                        clientId={CLIENT_ID}
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