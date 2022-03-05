import { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import key from '../keys.json'
import EventsList from './EventsList';
import Header from './Header'
import './Main.css'


function useForceUpdate(data) {

  const [trying, setTrying] = useState([]);
  return () => setTrying(data)

}


const Main = () => {

  var gapi = window.gapi

  const [signedIn, setSignedIn] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [events, setEvents] = useState([])
  const forceUpdate = useForceUpdate();
  const [defaultDays, setDefaultDays] = useState(7); 

  const calendarId = "primary";

  const onFailure = () => {
    console.log("Login failed!")
  }
  // const forceUpdate = React.useCallback(() => updateState({}), []);

  const onSuccessLogin = async (e) => {
    console.log("Login success!")
    //Check access token exist
    if (e.accessToken) {
      setSignedIn(true);
      setAccessToken(e.accessToken)
      window.localStorage.setItem("userName", e.profileObj.familyName + " " + e.profileObj.givenName)
      window.localStorage.setItem("userEmail", e.profileObj.email)
      window.localStorage.setItem("accessToken", e.accessToken)
      // history.push("/events")
      listOfEvents()
    }



    // history.push("/events")
    // await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events')
    // .then(response => response.json())
    // .then(data => console.log(data));
  }

  const onSuccessLogut = () => {
    console.log("Logout success!")
    // history.push("/")

    setSignedIn(false);
    window.localStorage.removeItem("accessToken")

  }

  const addDays = (number) => {

    var result = new Date();
    return new Date(result.setDate(result.getDate() + number)).toISOString();

  }


  const listOfEvents = (numDays) => {

    if(numDays) setDefaultDays(numDays)
    let today = new Date().toISOString();
    const timeZone = "timeZone=Europe%2FBelgrade"
    let maxDays = addDays(numDays ? numDays : defaultDays)
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
            setEvents(data)
          }
        });
    })
  }

  const deleteEvent = async (eventId) => {
    console.log("dELETING", eventId)
    if (window.gapi.client || localStorage.getItem("accessToken")) {
      await fetch(
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
    listOfEvents();

  }


  const addEvent = async (eventInfo) => {

    if (window.gapi.client || localStorage.getItem("accessToken")) {
      await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/primary/events?key=${key.API_KEY}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body:
            JSON.stringify({
              end: {

                dateTime: new Date(eventInfo.timeEnd).toISOString(),
              },
              start: {
                dateTime: new Date(eventInfo.timeStart).toISOString()
              },
              summary: eventInfo.summary,
            }),
        }
      )
        .then(res => {
          if(!res.ok){
            alert("Invalid input! Be careful with time AM and PM.")
            console.log(res)}
          })
        ;
      listOfEvents();
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
              onSuccess={(e) => onSuccessLogin(e)}
              onFailure={() => onFailure()}
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
            <Header logout={onSuccessLogut} />
            <EventsList
              events={events}
              listOfEvents={(days) => listOfEvents(days)}
              addEvent={(eventInfo) => addEvent(eventInfo)}
              deleteEvent={(e) => deleteEvent(e)} 
              defaultDays={defaultDays}/>
          </div>
      }

    </div>
  )

}
export default Main;