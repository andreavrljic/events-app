// import key from '../../keys.json'
// var gapi = window.gapi

// export const listOfEvents =  () => {

//     let data; 

//     gapi.load("client:auth2", () => {
//         gapi.auth2.getAuthInstance()
//         .then( async () => {
//             return  await gapi.client.request({'path': `https://www.googleapis.com/calendar/v3/calendars/primary/events?key=${key.API_KEY}&orderBy=startTime&singleEvents=true`,})
//         })
//         .then(res => {
//             console.log(res)
//             // setEvents(res)
//             data = res;
//             return res
//         })

//         //&timeMin=2022-04-20T17:00:00.000Z
        
//     }) 
//     return data
// }


// export const addEvent = () => {
//     if (window.gapi.client || localStorage.getItem("access_token")) {
//       let today = new Date();

//         fetch(
//           `https://www.googleapis.com/calendar/v3/calendars/primary/events?key=${key.API_KEY}`,
//           {
//             method: "POST",
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//             },
//             body:
//              JSON.stringify({
//               end: {
//                 // dateTime: new Date("Apr 20, 2022"),
//                 dateTime: '2022-04-30T19:00:00.000Z',
//               },
//               start: {
//                 dateTime: '2022-04-30T17:00:00.000Z',
//                 // dateTime: new Date("Apr 20, 2022"),

//               },
//               summary: "One more test",
//               location: '800 Howard St., San Francisco, CA 94103',
//             }),
//           }
//         )
//         .then(res => console.log(res))
//         ;
//     }
//   };
























// // import key from '../../keys.json'

// // var gapi = window.gapi
// // /**
// //  *  On load, called to load the auth2 library and API client library.
// //  */
// // // export function getData(){
// // //     var gapi = window.gapi
// // //     /* 
// // //       Update with your own Client Id and Api key 
// // //     */
// //     // var API_KEY= "AIzaSyB3BNpi4Q7ipYME9t0KaNaU5p3LYLUS3Gg";
// //     // var CLIENT_ID ="61176771644-00eknqkfenr1aobt8e443nahi27rk9m4.apps.googleusercontent.com";
// //     // var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
// //     // var SCOPES = "https://www.googleapis.com/auth/calendar"

    
  
// // export function handleClick() {


  
// //     console.log("Andrea")
// //     console.log(key.API_KEY," 111 ",  key.CLIENT_ID," 111 ",key.DISCOVERY_DOCS," 111 ",key.SCOPES)
// //       gapi.load('client:auth2', () => {
// //         console.log('loaded client')
  
// //         gapi.client.init({
// //           apiKey: key.API_KEY,
// //           clientId: key.CLIENT_ID,
// //           discoveryDocs: key.DISCOVERY_DOCS,
// //           scope: key.SCOPES,
// //         })
  
// //         gapi.client.load('calendar', 'v3', () => console.log('bam!'))
  
// //         gapi.auth2.getAuthInstance().signIn()
// //         .then(()=> {
// //             gapi.client.calendar.events.list({
// //                     'calendarId': 'primary',
// //                     'timeMin': (new Date()).toISOString(),
// //                     'showDeleted': false,
// //                     'singleEvents': true,
// //                     'maxResults': 10,
// //                     'orderBy': 'startTime'
// //                   }).then(response => {
// //                     const events = response.result.items
// //                     console.log('EVENTS: ', events)
// //                   })
// //         })
        
// //         // .then(() => {
          
// //         //   var event = {
// //         //     'summary': 'Awesome Event!',
// //         //     'location': '800 Howard St., San Francisco, CA 94103',
// //         //     'description': 'Really great refreshments',
// //         //     'start': {
// //         //       'dateTime': '2020-06-28T09:00:00-07:00',
// //         //       'timeZone': 'America/Los_Angeles'
// //         //     },
// //         //     'end': {
// //         //       'dateTime': '2020-06-28T17:00:00-07:00',
// //         //       'timeZone': 'America/Los_Angeles'
// //         //     },
// //         //     'recurrence': [
// //         //       'RRULE:FREQ=DAILY;COUNT=2'
// //         //     ],
// //         //     'attendees': [
// //         //       {'email': 'lpage@example.com'},
// //         //       {'email': 'sbrin@example.com'}
// //         //     ],
// //         //     'reminders': {
// //         //       'useDefault': false,
// //         //       'overrides': [
// //         //         {'method': 'email', 'minutes': 24 * 60},
// //         //         {'method': 'popup', 'minutes': 10}
// //         //       ]
// //         //     }
// //         //   }
  
// //         //   var request = gapi.client.calendar.events.insert({
// //         //     'calendarId': 'primary',
// //         //     'resource': event,
// //         //   })
  
// //         //   request.execute(event => {
// //         //     console.log(event)
// //         //     window.open(event.htmlLink)
// //         //   })
          
  
// //         //   /*
// //         //       Uncomment the following block to get events
// //         //   */
// //         //   /*
// //         //   // get events
// //         //   gapi.client.calendar.events.list({
// //         //     'calendarId': 'primary',
// //         //     'timeMin': (new Date()).toISOString(),
// //         //     'showDeleted': false,
// //         //     'singleEvents': true,
// //         //     'maxResults': 10,
// //         //     'orderBy': 'startTime'
// //         //   }).then(response => {
// //         //     const events = response.result.items
// //         //     console.log('EVENTS: ', events)
// //         //   })
// //         //   */
      
  
// //         // })

        
// //       })
    
    
   
// // }   