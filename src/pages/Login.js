import GoogleLogin from 'react-google-login';
import key from '../keys.json'
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import './Login.css'

const API_KEY = process.env.REACT_APP_API_KEY;
const CLIENT_ID= process.env.REACT_APP_CLIENT_ID

const Login = () => {

    var gapi = window.gapi
    let history = useHistory();

    const [defaultDays, setDefaultDays] = useState(7);

    const calendarId = "primary";

    const addDays = (number) => {

        var result = new Date();
        return new Date(result.setDate(result.getDate() + number)).toISOString();

    }

    const listOfEvents = (numDays) => {

        if (numDays) setDefaultDays(numDays)
        let today = new Date().toISOString();
        const timeZone = "Europe%2FBelgrade"
        let maxDays = addDays(numDays ? numDays : defaultDays)

        gapi.load("client:auth2", () => {
            fetch(
                `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${API_KEY}&orderBy=startTime&singleEvents=true&timeMin=${today}&timeMax=${maxDays}&timeZone=${timeZone}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                }
            )
                .then((res) => {
                    if (res.status !== 401) {
                        return res.json();
                    } else {
                        localStorage.removeItem("accessToken");
                    }
                })
                .then(async (data) => {
                    if (data?.items) {
                        history.push({ pathname: '/events', state: data })
                    }
                });
        })
    }


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