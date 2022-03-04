import './App.css';
import EventsList from './components/EventsList';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {useState} from 'react'
import Main from './components/Main'
import MainAgain from './components/MainAgain';


const App =()=> { 
  
  return (
    // <div onClick={()=>console.log("i am inside")}>
    //   Click me to check   
    //   <Main/> 
    // </div>

    // <div>
    //   {console.log(signedIn)}
    //   {!signedIn ? <Login change ={setSignedIn } signedIn ={signedIn}/> : <Logout change ={setSignedIn}  signedIn ={signedIn}/>} 
    // </div>
    <BrowserRouter>
        <Switch>
          <Route path="/events">
            <EventsList/>
          </Route>
          <Route exact path="/">
            <Main/>
          </Route>
        </Switch>
      </BrowserRouter>

  );
}

export default App;


