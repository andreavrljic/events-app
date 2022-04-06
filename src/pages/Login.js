import GoogleLogin from 'react-google-login';
import key from '../keys.json'
import './Login.css'

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID

const Login = () => {

    const onFailure = (e) => {
        console.log("Login failed!", e)
        alert("Login failed")
    }

    const onSuccessLogin = async (e) => {

        if (e.accessToken) {
            window.localStorage.setItem("userName", e.profileObj.familyName + " " + e.profileObj.givenName)
            window.localStorage.setItem("userEmail", e.profileObj.email)
            window.localStorage.setItem("accessToken", e.accessToken)
            listOfEvents();
        }
    }

    return (

        <div className='loginPage-container'>

            <div className="loginForm">
                <h1>LOGIN TO SEE YOUR EVENT LIST</h1>
                <GoogleLogin
                    clientId={CLIENT_ID}
                    buttonText='LOGIN'
                    onSuccess={(e) => onSuccessLogin(e)}
                    onFailure={(e) => onFailure(e)}
                    cookiePolicy={'single_host_origin'}
                    prompt="select_account"
                    scope={key.SCOPES}
                    render={renderProps => (
                        <button onClick={renderProps.onClick}
                            className="button"
                        >
                            LOGIN</button>
                    )}
                />
            </div>

        </div>
    )


}
export default Login