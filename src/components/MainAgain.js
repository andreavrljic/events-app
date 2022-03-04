import { useState } from 'react';
import {GoogleLogin, GoogleLogout} from 'react-google-login';
import key from '../keys.json'
import EventsList from './EventsList';
import { useHistory } from 'react-router-dom';
import * as funct from './helpers/getData'

const Main = () => {

var gapi = window.gapi
let history = useHistory();

const [signedIn, setSignedIn] = useState(false);
const [accessToken, setAccessToken] = useState(''); 
const [events, setEvents] = useState([])
const [loading, setLoading] = useState(true)

const onFailure = () => {
    console.log("Login failed!")
}
// const forceUpdate = React.useCallback(() => updateState({}), []);

const onSuccessLogin = (e) => {
    console.log("Login success!", e)
    //Check access token exist
    if(e.accessToken){
        setSignedIn(true); 
        setAccessToken(e.accessToken)
        window.localStorage.setItem("accessToken", e.accessToken)
        // console.log(listOfEvents())
        // history.push("/events")
    }
}

const onSuccessLogut =() => {
    console.log("Logout success!")
    history.push("/")
    
    setSignedIn(false); 
    window.localStorage.removeItem("accessToken")
    
}


const listOfEvents =  () => {
   
    let data; 
    
     gapi.load("client:auth2",  () => {
         gapi.auth2.getAuthInstance()
        .then(  () => {
            return  gapi.client.request({'path': `https://www.googleapis.com/calendar/v3/calendars/primary/events?key=${key.API_KEY}&orderBy=startTime&singleEvents=true&timeMin=2022-04-20T17:00:00.000Z`,})
        })
        .then( res => {
            console.log(res)
            data=res;
            // await setEvents(res)
        })

        //&timeMin=2022-04-20T17:00:00.000Z
        
    }) 
    console.log("Data fetch", data)
    return data
}


const addEvent = () => {
    if (window.gapi.client || localStorage.getItem("accessToken")) { 
      let today = new Date();

        fetch(
          `https://www.googleapis.com/calendar/v3/calendars/primary/events?key=${key.API_KEY}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body:
             JSON.stringify({
              end: {
                // dateTime: new Date("Apr 20, 2022"),
                dateTime: '2022-04-30T19:00:00.000Z',
              },
              start: {
                dateTime: '2022-04-30T17:00:00.000Z',
                // dateTime: new Date("Apr 20, 2022"),

              },
              summary: "One more test",
              location: '800 Howard St., San Francisco, CA 94103',
            }),
          }
        )
        .then(res => console.log(res))
        ;
    }
  };


return (
    <div className='container'>
        <nav>
            Navbar
        </nav>
        {
            
            !signedIn ?<div>
                
            <GoogleLogin  
                clientId={key.CLIENT_ID}
                buttonText='LOGIN'
                onSuccess={(e) => onSuccessLogin(e)}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'} 
            />
                </div> 
            : 
            <div>
                <GoogleLogout
                clientId={key.CLIENT_ID}
                buttonText='LOGOUT'
                onLogoutSuccess={() => onSuccessLogut()}
                />
                {/* <div onClick={() => funct.listOfEvents()}> click me</div> */}
                <EventsList events ={events} listOfEvents ={() => listOfEvents()}/>
                {/* <div onClick={()=>addEvent()}>add event </div> */}
            </div>
        }

    </div>
)

}
export default Main; 