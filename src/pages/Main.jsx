import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import EventsList from '../components/EventsList';
import Header from '../components/Header'
import './Main.css'


const Main = () => {

  const API_KEY = process.env.REACT_APP_API_KEY;
  var gapi = window.gapi
  let history = useHistory();
  const location = useLocation();
  
  const [events, setEvents] = useState([])
  const [defaultDays, setDefaultDays] = useState(7);

  const calendarId = "primary";

  useEffect(()=>{
  
    listOfEvents()
  
  },[])


  const onSuccessLogut = () => {
    console.log("Logout success!")
    window.localStorage.removeItem("accessToken")
    window.localStorage.removeItem("firstData");
    window.localStorage.removeItem("userName")
    window.localStorage.removeItem("userEmail")

    history.push("/")
  }

  const addDays = (number) => {

    var result = new Date();
    return new Date(new Date(result.setDate(result.getDate() + number)).setHours(0,0,0,0)).toISOString();

  }

  const listOfEvents = (numDays) => {

    if (numDays) setDefaultDays(numDays)

    let today = new Date().toISOString();
    const timeZone = "Europe%2FBelgrade"
    let maxDays = addDays(numDays ? numDays: defaultDays)

    gapi.load("client:auth2",  () => {
       fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${API_KEY}&orderBy=startTime&singleEvents=true&timeMin=${today}&timeMax=${maxDays}&timeZone=${timeZone}&timeZone=${timeZone}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
        )
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            localStorage.removeItem("accessToken");
            console.log(res.status)
          }
        })
        .then((data) => {
          if (data) {
            setEvents(data)
          }
        });
    })
  }

  const deleteEvent = async (eventId) => {

    if (window.gapi.client || localStorage.getItem("accessToken")) {
      await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events/${eventId}?key=${API_KEY}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          }
        }
      )
        .then(res => {
          if (!res.ok) {
            alert("Can not delete event!")

          }
          console.log(res)
        });
    }
    listOfEvents();

  }


  const addEvent = async (eventInfo) => {

    if (window.gapi.client || localStorage.getItem("accessToken")) {
      await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/primary/events?key=${API_KEY}`,
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
          if (!res.ok) {
            console.log(res)
            alert("Invalid input! Be careful with time AM and PM.")
          }
          console.log(res)
        })
        ;
      listOfEvents();
    }


  };


  return (
   
    <div className='container'>
       <div>
        <Header logout={onSuccessLogut} />
        <EventsList
          events={events.items ? events : location.state}
          listOfEvents={(days) => listOfEvents(days)}
          addEvent={(eventInfo) => addEvent(eventInfo)}
          deleteEvent={(e) => deleteEvent(e)}
          defaultDays={defaultDays} />
      </div> 
    </div>
  )

}
export default Main;



// const Main = () => {

//   const API_KEY = process.env.REACT_APP_API_KEY;
  
//   var gapi = window.gapi
//   let history = useHistory();
//   const location = useLocation();

//   const [events, setEvents] = useState([])
//   const [defaultDays, setDefaultDays] = useState(7);

//   const calendarId = "primary";


//   const onSuccessLogut = () => {
//     console.log("Logout success!")
//     window.localStorage.removeItem("accessToken")
//     window.localStorage.removeItem("firstData");
//     window.localStorage.removeItem("userName")
//     window.localStorage.removeItem("userEmail")
//     history.push("/")
//   }

//   const addDays = (number) => {

//     var result = new Date();
//     return new Date(new Date(result.setDate(result.getDate() + number)).setHours(0,0,0,0)).toISOString();

//   }

//   const listOfEvents = (numDays) => {

//     if (numDays) setDefaultDays(numDays)

//     let today = new Date().toISOString();
//     const timeZone = "Europe%2FBelgrade"
//     let maxDays = addDays(numDays ? numDays: defaultDays)

//     gapi.load("client:auth2", () => {
//       fetch(
//         `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${API_KEY}&orderBy=startTime&singleEvents=true&timeMin=${today}&timeMax=${maxDays}&timeZone=${timeZone}&timeZone=${timeZone}`,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//           },
//         }
//       )
//         .then((res) => {
//           if (res.status !== 401) {
//             return res.json();
//           } else {
//             localStorage.removeItem("accessToken");
//           }
//         })
//         .then((data) => {
//           if (data) {
//             setEvents(data)
//           }
//         });
//     })
//   }

//   const deleteEvent = async (eventId) => {

//     if (window.gapi.client || localStorage.getItem("accessToken")) {
//       await fetch(
//         `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events/${eventId}?key=${API_KEY}`,
//         {
//           method: "DELETE",
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//           }
//         }
//       )
//         .then(res => {
//           if (!res.ok) {
//             alert("Can not delete event!")

//           }
//           console.log(res)
//         });
//     }
//     listOfEvents();

//   }


//   const addEvent = async (eventInfo) => {

//     if (window.gapi.client || localStorage.getItem("accessToken")) {
//       await fetch(
//         `https://www.googleapis.com/calendar/v3/calendars/primary/events?key=${API_KEY}`,
//         {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//           },
//           body:
//             JSON.stringify({
//               end: {

//                 dateTime: new Date(eventInfo.timeEnd).toISOString(),
//               },
//               start: {
//                 dateTime: new Date(eventInfo.timeStart).toISOString()
//               },
//               summary: eventInfo.summary,
//             }),
//         }
//       )
//         .then(res => {
//           if (!res.ok) {
//             console.log(res)
//             alert("Invalid input! Be careful with time AM and PM.")
//           }
//           console.log(res)
//         })
//         ;
//       listOfEvents();
//     }


//   };


//   return (
//     <div className='container'>
//       <div>
//         <Header logout={onSuccessLogut} />
//         <EventsList
//           events={events.items ? events : location.state}
//           listOfEvents={(days) => listOfEvents(days)}
//           addEvent={(eventInfo) => addEvent(eventInfo)}
//           deleteEvent={(e) => deleteEvent(e)}
//           defaultDays={defaultDays} />
//       </div>
//     </div>
//   )

// }
// export default Main;