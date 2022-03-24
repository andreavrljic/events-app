import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Main from './pages/Main'
import Login from './pages/Login';


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


