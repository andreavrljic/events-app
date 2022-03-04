import { useState } from 'react';
import {GoogleLogin} from 'react-google-login';
import key from '../keys.json'
import EventsList from './EventsList';
import Header from './Header'
import './Main.css'


const Main = () => {

var gapi = window.gapi

const [signedIn, setSignedIn] = useState(false);
const [accessToken, setAccessToken] = useState('');
const [events, setEvents] = useState([])
const calendarId="primary";

const onFailure = () => {
    console.log("Login failed!")
}
// const forceUpdate = React.useCallback(() => updateState({}), []);

const onSuccessLogin = async(e) => {
    console.log("Login success!")
    //Check access token exist
    if(e.accessToken){
        setSignedIn(true);
        setAccessToken(e.accessToken)
        console.log(e)
        window.localStorage.setItem("userName", e.profileObj.familyName + " " +e.profileObj.givenName )
        window.localStorage.setItem("userEmail", e.profileObj.email)
        window.localStorage.setItem("accessToken", e.accessToken)
        // history.push("/events")
        listOfEvents()

        // console.log("end a", events)
    }



    // history.push("/events")
    // await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events')
    // .then(response => response.json())
    // .then(data => console.log(data));
}

const onSuccessLogut =() => {
    console.log("Logout success!")
    // history.push("/")

    setSignedIn(false);
    window.localStorage.removeItem("accessToken")

}

const addDays =(number)=>{
  
  var result = new Date();
  return new Date(result.setDate(result.getDate() + number)).toISOString();
  
}


const listOfEvents = (numDays) => {
  
    let defaultDays = 100; 
    let today = new Date().toISOString();
    const timeZone = "timeZone=Europe%2FBelgrade"
    let maxDays = addDays(numDays? numDays : defaultDays)
    // &timeMax=${maxDays}

    gapi.load("client:auth2", () => {
             fetch(
                `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${key.API_KEY}&orderBy=startTime&singleEvents=true&timeMin=${today}&timeMax=${maxDays}&timeZone=${timeZone}`,
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
                    setSignedIn(false);
                  }
                })
                .then((data) => {
                  if (data?.items) {
                    console.log(data);
                    setEvents(data)
                  }
                });
        })

        // &timeMin=today
    // let data;

    //  gapi.load("client:auth2",  () => {
    //     console.log("Listef of events")
    //     gapi.auth2.getAuthInstance()
    //     .then( ()=> {
    //          gapi.client.request({'path': `https://www.googleapis.com/calendar/v3/calendars/primary/events?key=${key.API_KEY}&orderBy=startTime&singleEvents=true`,})
    //     })
    //     .then( res => {
    //         console.log(res)
    //         setEvents(res)
    //         data=res;
    //     })

    //     //&timeMin=2022-04-20T17:00:00.000Z

    // })
    // console.log(events)
    // return data
}

const deleteEvent =(eventId) => {
console.log("dELETING" , eventId )
  if (window.gapi.client || localStorage.getItem("accessToken")) {
      fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events/${eventId}?key=${key.API_KEY}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          }
        }
      )
      .then(res => console.log(res))
      ;
  }

}


const addEvent = (newItem) => {
  console.log(newItem.summary)
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
                dateTime: '2022-04-4T19:00:00.000Z',
              },
              start: {
                dateTime: '2022-04-4T18:00:00.000Z',
                // dateTime: new Date("Apr 20, 2022"),

              },
              summary: newItem.summary,
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
        {
            !signedIn ?
            <div className="loginPage">
              <h1>LOGIN TO CHECK YOUR EVENT LIST</h1>
                <GoogleLogin
                    clientId={key.CLIENT_ID}
                    buttonText='LOGIN'
                    onSuccess={(e)=>onSuccessLogin(e)}
                    onFailure={()=>onFailure()}
                    cookiePolicy={'single_host_origin'}
                    render={renderProps => (
                      <button onClick={renderProps.onClick}
                      className="button"
                      >
                          LOGIN</button>
                    )}
                />
                </div>
            :
            <div>
              <Header logout={onSuccessLogut} addEvent={addEvent}/>
              <div>
                {/* <GoogleLogout
                clientId={key.CLIENT_ID}
                buttonText='LOGOUT'
                onLogoutSuccess={() => onSuccessLogut()}
                /> */}
                {/* <div onClick={() => listOfEvents()}> click me!</div>
                <div onClick={()=>addEvent()}>add event </div> */}
              </div>
              <EventsList 
                            events ={events}
                            listOfEvents ={() => listOfEvents()}
                            addEvent = {()=>addEvent()}
                            deleteEvent ={(e) => deleteEvent(e)}/>     
              </div>
        }

    </div>
)

}
export default Main;