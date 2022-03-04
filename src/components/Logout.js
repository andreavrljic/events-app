import GoogleLogout from 'react-google-login';
import key from '../keys.json'
import { useHistory } from 'react-router-dom';

const Logout = (props) => {

    console.log(props , "!!!!!!!!!!!")
    let history = useHistory(); 

    
    const onSuccess =() => {
        console.log("Logout success!")
        history.push("/")
        console.log(props)
        props.change(false)
    }

    return(
        <div className='logout-button'>
            <GoogleLogout
                clientId={key.CLIENT_ID}
                buttonText='LOGOUT'
                onLogoutSuccess={() => onSuccess()}
            />
        </div>
    )
    

}
export default Logout