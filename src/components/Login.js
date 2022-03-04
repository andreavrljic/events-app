// import GoogleLogin from 'react-google-login';
// import key from '../keys.json'
// import { useHistory } from 'react-router-dom';
// import * as funct from './helpers/getData'
// import { useState } from 'react';


// const Login = (props) => {

//     let history = useHistory();     

    
//     const onFailure = () => {
//         console.log("Login failed!")
        
        
//     }
    
//       const onSuccess =(e) => {
//         console.log("Login success!", e)
//         console.log(props)
//         props.change(true)
//         // history.push("/events") 
//         // await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events')
//         // .then(response => response.json())
//         // .then(data => console.log(data)); 
//     }

//     return(
//         <div className='container'>
//             <GoogleLogin
//                 clientId={key.CLIENT_ID}
//                 buttonText='LOGIN'
//                 onSuccess={(e) => onSuccess(e)}
//                 onFailure={onFailure}
//                 cookiePolicy={'single_host_origin'}
//                 // isSignedIn={true}
//                 // redirectUri={"/1"}
//             />
//             <button onClick={() => {}/*funct.getData()*/}>Get data</button>
//         </div>
//     )
    

// }
// export default Login