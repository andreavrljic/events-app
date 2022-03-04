// import key from '../keys.json'
// import { useEffect } from 'react';

// const Help = () => {

//     useEffect(() => {
//         const script = document.createElement("script");
//         script.async = true;
//         script.defer = true;
//         script.src = "https://apis.google.com/js/api.js";
    
//         document.body.appendChild(script);
    
//         script.addEventListener("load", () => {
//           if (window.gapi) console.log(window.gapi);
//         });
//       }, []);

//     // var gapi = window.gapi
//     // // Authorization scopes required by the API; multiple scopes can be
//     //   // included, separated by spaces.
//     // //   var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

//     // //   var authorizeButton = document.getElementById('authorize_button');
//     // //   var signoutButton = document.getElementById('signout_button');

//     //   /**
//     //    *  On load, called to load the auth2 library and API client library.
//     //    */
//     //   function handleClientLoad() {
//     //     gapi.load('client:auth2', initClient);
//     //   }

//     //   /**
//     //    *  Initializes the API client library and sets up sign-in state
//     //    *  listeners.
//     //    */
//     //   function initClient() {
//     //     gapi.client.init({
//     //       apiKey: key.API_KEY,
//     //       clientId: key.CLIENT_ID,
//     //       discoveryDocs: key.DISCOVERY_DOCS,
//     //       scope: key.SCOPES
//     //     }).then(function () {
//     //       // Listen for sign-in state changes.
//     //       console.log("drva")
//     //       gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

//     //       // Handle the initial sign-in state.
//     //       updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
//     //     //   authorizeButton.onclick = handleAuthClick;
//     //     //   signoutButton.onclick = handleSignoutClick;
//     //     console.log("prvi ")
//     //     }
//     //     , function(error) {
//     //     //   appendPre(JSON.stringify(error, null, 2));
//     //     console.log(error)
//     //     });
//     //   }

//     //   /**
//     //    *  Called when the signed in status changes, to update the UI
//     //    *  appropriately. After a sign-in, the API is called.
//     //    */
//     //   function updateSigninStatus(isSignedIn) {
//     //     if (isSignedIn) {
//     //     //   authorizeButton.style.display = 'none';
//     //     //   signoutButton.style.display = 'block';
//     //     console.log("drugi")
//     //       listUpcomingEvents();
//     //     } else {
//     //     //   authorizeButton.style.display = 'block';
//     //     //   signoutButton.style.display = 'none';
//     //     console.log("TReci")
//     //     }
//     //   }

//     //   /**
//     //    *  Sign in the user upon button click.
//     //    */
//     //   function handleAuthClick(event) {
//     //     gapi.auth2.getAuthInstance().signIn();
//     //   }

//     //   /**
//     //    *  Sign out the user upon button click.
//     //    */
//     //   function handleSignoutClick(event) {
//     //     gapi.auth2.getAuthInstance().signOut();
//     //   }

//     //   /**
//     //    * Append a pre element to the body containing the given message
//     //    * as its text node. Used to display the results of the API call.
//     //    *
//     //    * @param {string} message Text to be placed in pre element.
//     //    */
//     //   function appendPre(message) {
//     //     var pre = document.getElementById('content');
//     //     var textContent = document.createTextNode(message + '\n');
//     //     pre.appendChild(textContent);
//     //   }

//     //   /**
//     //    * Print the summary and start datetime/date of the next ten events in
//     //    * the authorized user's calendar. If no events are found an
//     //    * appropriate message is printed.
//     //    */
//     //   function listUpcomingEvents() {
//     //     gapi.client.calendar.events.list({
//     //       'calendarId': 'primary',
//     //       'timeMin': (new Date()).toISOString(),
//     //       'showDeleted': false,
//     //       'singleEvents': true,
//     //       'maxResults': 10,
//     //       'orderBy': 'startTime'
//     //     }).then(function(response) {
//     //       var events = response.result.items;
//     //       appendPre('Upcoming events:');

//     //       if (events.length > 0) {
//     //         for (let i = 0; i < events.length; i++) {
//     //           var event = events[i];
//     //           var when = event.start.dateTime;
//     //           if (!when) {
//     //             when = event.start.date;
//     //           }
//     //           appendPre(event.summary + ' (' + when + ')')
//     //         }
//     //       } else {
//     //         appendPre('No upcoming events found.');
//     //       }
//     //     });
//     //   }

//     var gapi = window.gapi
//   /* 
//     Update with your own Client Id and Api key 
//   */
//   var API_KEY= "AIzaSyB3BNpi4Q7ipYME9t0KaNaU5p3LYLUS3Gg";
//   var CLIENT_ID ="61176771644-00eknqkfenr1aobt8e443nahi27rk9m4.apps.googleusercontent.com";
//   var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
//   var SCOPES = "https://www.googleapis.com/auth/calendar"

//   const handleClick = () => {
//     gapi.load('client:auth2', () => {
//       console.log('loaded client')

//       gapi.client.init({
//         apiKey: key.API_KEY,
//         clientId: key.CLIENT_ID,
//         discoveryDocs: key.DISCOVERY_DOCS,
//         scope: key.SCOPES,
//       })

//       gapi.client.load('calendar', 'v3', () => console.log('bam!'))

//       gapi.auth2.getAuthInstance().signIn()
//       .then(() => {
        
//         // var event = {
//         //   'summary': 'Awesome Event!',
//         //   'location': '800 Howard St., San Francisco, CA 94103',
//         //   'description': 'Really great refreshments',
//         //   'start': {
//         //     'dateTime': '2020-06-28T09:00:00-07:00',
//         //     'timeZone': 'America/Los_Angeles'
//         //   },
//         //   'end': {
//         //     'dateTime': '2020-06-28T17:00:00-07:00',
//         //     'timeZone': 'America/Los_Angeles'
//         //   },
//         //   'recurrence': [
//         //     'RRULE:FREQ=DAILY;COUNT=2'
//         //   ],
//         //   'attendees': [
//         //     {'email': 'lpage@example.com'},
//         //     {'email': 'sbrin@example.com'}
//         //   ],
//         //   'reminders': {
//         //     'useDefault': false,
//         //     'overrides': [
//         //       {'method': 'email', 'minutes': 24 * 60},
//         //       {'method': 'popup', 'minutes': 10}
//         //     ]
//         //   }
//         // }

//         // var request = gapi.client.calendar.events.insert({
//         //   'calendarId': 'primary',
//         //   'resource': event,
//         // })

//         // request.execute(event => {
//         //   console.log(event)
//         //   window.open(event.htmlLink)
//         // })
        

//         /*
//             Uncomment the following block to get events
//         */
        
//         // get events
//         gapi.client.calendar.events.list({
//           'calendarId': 'primary',
//           'timeMin': (new Date()).toISOString(),
//           'showDeleted': false,
//           'singleEvents': true,
//           'maxResults': 10,
//           'orderBy': 'startTime'
//         }).then(response => {
//           const events = response.result.items
//           console.log('EVENTS: ', events)
//         })
        
    

//       })
//     })
//   }


//     return(
//         <div onClick={() => handleClick()}>
//             Eksport 
//         </div>
//     )
// }
// export default Help