import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Main from './components/Main'
import Login from './components/Login';


const App = () => {

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/events">
          <Main />
        </Route>
        <Route exact path="/">
          <Login />
        </Route>
      </Switch>
    </BrowserRouter>

  );
}

export default App;


